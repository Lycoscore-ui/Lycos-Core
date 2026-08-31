import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS })
}

// System Instruction Base with Cipher Persona & Knowledge Base Guardrails
const SYSTEM_INSTRUCTION_PREFIX = `You are Cipher, the official AI representative for Lycos Core. Your voice is direct, technical, professional, precise, and authoritative.

================================================================================
KNOWLEDGE BASE
================================================================================
`

const SYSTEM_INSTRUCTION_SUFFIX = `

================================================================================
RULES & BEHAVIOR:
1. Answer user questions thoroughly and contextually using ONLY the KNOWLEDGE BASE provided above.
2. Synonym & Mapping: Understand that "Incubation Hub" includes Protocol Kinetic, Protocol Apex, Protocol Citadel, and related pathways. Summarize these details when asked about the hub.
3. If a question is completely unrelated to Lycos Core, reply:
   "I am Cipher, dedicated specifically to Lycos Core services and technical offerings. I cannot assist with topics outside our scope."
4. If a query is about Lycos Core but the detail is missing from the Knowledge Base, reply:
   "I don't have that specific information in my active database right now. Please reach out to our team directly via our contact form."

================================================================================
RESPONSE STYLING RULES:
1. CONCISE & EXECUTIVE: Keep responses ultra-concise (maximum 120–150 words total). Never dump long paragraphs or heavy text blocks.
2. DO NOT REPEAT VERBATIM TEXT: Synthesize and reframe knowledge base details dynamically in a modern executive voice. Speak using "we" for Lycos Core.
3. MANDATORY STRUCTURED FORMAT:
   - Hook/Overview: 1–2 crisp, high-level summary sentences.
   - Key Highlights/Specs: 2–3 short, scannable bullet points (* Item: Details). Keep bullets under 18 words each. Do NOT use section headers like ###.
   - Closing Action: Exactly 1 relevant follow-up question inviting them to explore a specific protocol or contact us.
4. TONE: Modern, consultative, direct enterprise AI representative.`

function getSystemInstruction(): string {
  try {
    // Attempt to load full lycos_core_knowledge.txt from project root or public directory
    const rootKbPath = path.resolve(process.cwd(), '../../lycos_core_knowledge.txt')
    const publicKbPath = path.resolve(process.cwd(), '../public/lycos_core_knowledge.txt')
    
    let kbContent = ''
    if (fs.existsSync(rootKbPath)) {
      kbContent = fs.readFileSync(rootKbPath, 'utf-8')
    } else if (fs.existsSync(publicKbPath)) {
      kbContent = fs.readFileSync(publicKbPath, 'utf-8')
    }

    if (kbContent) {
      return `${SYSTEM_INSTRUCTION_PREFIX}${kbContent}${SYSTEM_INSTRUCTION_SUFFIX}`
    }
  } catch (err) {
    console.warn('[Cipher API] Could not dynamically read lycos_core_knowledge.txt:', err)
  }

  // Fallback default knowledge
  return `${SYSTEM_INSTRUCTION_PREFIX}Lycos Core is an elite AI systems architecture firm, technical co-builder, and enterprise incubation studio. Protocols: Kinetic (Seed), Apex (Series A), Citadel (Spin-outs). Products: Sentinel, Vector, Aegis, Synapse, Vanguard.${SYSTEM_INSTRUCTION_SUFFIX}`
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, previous_interaction_id } = body

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Missing or invalid message string.' },
        { status: 400, headers: CORS_HEADERS },
      )
    }

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      console.error('[Cipher API] GEMINI_API_KEY environment variable is missing.')
      return NextResponse.json(
        { 
          success: false, 
          error: 'Gemini API key is not configured on the server. Please set GEMINI_API_KEY.' 
        },
        { status: 500, headers: CORS_HEADERS },
      )
    }

    const systemInstruction = getSystemInstruction()

    // Build payload according to Gemini Interactions API format
    const payload: Record<string, unknown> = {
      model: 'models/gemini-3.5-flash',
      input: message,
      system_instruction: systemInstruction,
      generation_config: {
        max_output_tokens: 65536,
        thinking_level: 'medium',
      },
    }

    if (previous_interaction_id) {
      payload.previous_interaction_id = previous_interaction_id
    }

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/interactions?key=${apiKey}`

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('[Cipher API Error Response]', response.status, errorText)
      
      // Attempt fallback to standard generateContent if interactions endpoint requires different scope/model
      const fallbackUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`
      const fallbackPayload = {
        contents: [
          {
            role: 'user',
            parts: [{ text: `${systemInstruction}\n\nUser Question: ${message}` }]
          }
        ]
      }
      
      const fallbackRes = await fetch(fallbackUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fallbackPayload)
      })

      if (fallbackRes.ok) {
        const fallbackData = await fallbackRes.json()
        const text = fallbackData.candidates?.[0]?.content?.parts?.[0]?.text || 'No response text generated.'
        return NextResponse.json(
          { success: true, reply: text },
          { status: 200, headers: CORS_HEADERS }
        )
      }

      return NextResponse.json(
        { success: false, error: `Gemini API call failed: ${errorText}` },
        { status: response.status, headers: CORS_HEADERS },
      )
    }

    const data = await response.json()
    
    // Extract response reply text & interaction ID across possible API return structures
    let replyText = ''
    const interactionId = data.interaction_id || data.id || undefined

    if (data.outputs && Array.isArray(data.outputs)) {
      replyText = data.outputs.map((out: Record<string, unknown>) => (out.text || out.content || '') as string).join('\n')
    } else if (data.text) {
      replyText = data.text
    } else if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
      replyText = data.candidates[0].content.parts[0].text
    } else {
      replyText = JSON.stringify(data)
    }

    return NextResponse.json(
      {
        success: true,
        reply: replyText.trim(),
        previous_interaction_id: interactionId,
      },
      { status: 200, headers: CORS_HEADERS },
    )
  } catch (err: unknown) {
    console.error('[Cipher API Internal Error]', err)
    const errorMsg = err instanceof Error ? err.message : 'Internal server error.'
    return NextResponse.json(
      { success: false, error: errorMsg },
      { status: 500, headers: CORS_HEADERS },
    )
  }
}
