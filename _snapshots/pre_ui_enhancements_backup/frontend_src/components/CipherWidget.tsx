import React, { useState, useEffect, useRef } from 'react'
import { Bot, Send, X } from 'lucide-react'
import './CipherWidget.css'

interface Message {
  id: string
  role: 'assistant' | 'user'
  text: string
}

const INITIAL_GREETING =
  'Greetings. I am Cipher, the technical representative for Lycos Core. How can I assist you with our protocols, services, or architecture today?'

const SESSION_STORAGE_KEY = 'cipher_chat_history'
const SESSION_INTERACTION_KEY = 'cipher_interaction_id'

// Helper to determine API Base URL
const getApiEndpoint = () => {
  if (import.meta.env.VITE_API_URL) {
    return `${import.meta.env.VITE_API_URL}/cipher.php`
  }
  // If running on standalone Vite dev port (e.g. 8081 or 5173), target Next.js dev port 3000
  if (window.location.port === '8081' || window.location.port === '5173') {
    return 'http://localhost:3000/api/cipher'
  }
  // Default to relative route /cipher.php on LocalWP / Live Link
  return '/cipher.php'
}

// Helper to parse inline markdown (**bold**)
const parseInlineMarkdown = (text: string) => {
  const parts: React.ReactNode[] = []
  const regex = /(\*\*[^*]+\*\*)/g
  const tokens = text.split(regex)

  tokens.forEach((token, idx) => {
    if (token.startsWith('**') && token.endsWith('**')) {
      const content = token.slice(2, -2)
      parts.push(
        <strong key={idx} className="cipher-bold">
          {content}
        </strong>
      )
    } else {
      parts.push(token)
    }
  })

  return parts
}

// Helper to render formatted message content cleanly
const renderFormattedMessage = (text: string) => {
  if (!text) return null

  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean)
  const elements: React.ReactNode[] = []
  let listBuffer: string[] = []

  const flushListBuffer = (keyPrefix: string) => {
    if (listBuffer.length > 0) {
      elements.push(
        <ul key={`${keyPrefix}-list`} className="cipher-bullet-list">
          {listBuffer.map((item, idx) => (
            <li key={idx} className="cipher-bullet-item">
              {parseInlineMarkdown(item)}
            </li>
          ))}
        </ul>
      )
      listBuffer = []
    }
  }

  lines.forEach((line, index) => {
    // Headers (### or ##)
    if (line.startsWith('#')) {
      flushListBuffer(`line-${index}`)
      const cleanHeader = line.replace(/^#+\s*/, '')
      elements.push(
        <div key={`header-${index}`} className="cipher-msg-header">
          {cleanHeader}
        </div>
      )
      return
    }

    // Bullet points (* item or - item or 1. item)
    if (/^([\*\-\•]|\d+\.)\s+/.test(line)) {
      const cleanItem = line.replace(/^([\*\-\•]|\d+\.)\s+/, '')
      listBuffer.push(cleanItem)
      return
    }

    // Paragraph
    flushListBuffer(`line-${index}`)
    elements.push(
      <p key={`p-${index}`} className="cipher-msg-paragraph">
        {parseInlineMarkdown(line)}
      </p>
    )
  })

  flushListBuffer('end')

  return <>{elements}</>
}

interface CipherWidgetProps {
  isOpenControlled?: boolean
  onToggleControlled?: () => void
}

export default function CipherWidget({
  isOpenControlled,
  onToggleControlled
}: CipherWidgetProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false)
  
  const isOpen = isOpenControlled !== undefined ? isOpenControlled : internalIsOpen

  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [interactionId, setInteractionId] = useState<string | null>(null)
  const [hasOpened, setHasOpened] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  // Auto-scroll messages to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading])

  // Initialize session history from sessionStorage
  useEffect(() => {
    try {
      const savedHistory = sessionStorage.getItem(SESSION_STORAGE_KEY)
      const savedInteractionId = sessionStorage.getItem(SESSION_INTERACTION_KEY)

      if (savedHistory) {
        const parsed = JSON.parse(savedHistory)
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Filter out any transient error messages from previous session attempts
          const validMessages = parsed.filter(
            (m: Message) => !m.text.includes('Error') && !m.text.includes('error')
          )
          if (validMessages.length > 0) {
            setMessages(validMessages)
            setHasOpened(true)
          } else {
            sessionStorage.removeItem(SESSION_STORAGE_KEY)
          }
        }
      }

      if (savedInteractionId) {
        setInteractionId(savedInteractionId)
      }
    } catch (e) {
      console.warn('Could not restore Cipher session history:', e)
    }
  }, [])

  // Save session state
  const saveSessionState = (newMessages: Message[], newInteractionId: string | null) => {
    try {
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(newMessages))
      if (newInteractionId) {
        sessionStorage.setItem(SESSION_INTERACTION_KEY, newInteractionId)
      }
    } catch (e) {
      console.warn('Could not save Cipher session history:', e)
    }
  }

  // Handle panel toggle
  const togglePanel = () => {
    const nextState = !isOpen
    if (onToggleControlled) {
      onToggleControlled()
    } else {
      setInternalIsOpen(nextState)
    }

    // Trigger initial greeting if opening for the first time in session
    if (nextState && !hasOpened && messages.length === 0) {
      const initialMsg: Message = {
        id: 'init-greeting',
        role: 'assistant',
        text: INITIAL_GREETING,
      }
      const updated = [initialMsg]
      setMessages(updated)
      setHasOpened(true)
      saveSessionState(updated, interactionId)
    }
  }

  const handleSend = async () => {
    const trimmed = input.trim()
    if (!trimmed || isLoading) return

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: trimmed,
    }

    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch(getApiEndpoint(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          previous_interaction_id: interactionId || undefined,
        }),
      })

      let data: any = {}
      try {
        data = await response.json()
      } catch (err) {
        console.error('Failed to parse JSON response:', err)
      }

      let replyText = ''
      let newInteractionId = interactionId

      if (response.ok && data.success && data.reply) {
        replyText = data.reply
        if (data.previous_interaction_id) {
          newInteractionId = data.previous_interaction_id
          setInteractionId(newInteractionId)
        }
      } else {
        replyText =
          data.error ||
          `Server Error (${response.status}). Unable to communicate with Cipher backend.`
      }

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        text: replyText,
      }

      const finalMessages = [...updatedMessages, assistantMessage]
      setMessages(finalMessages)
      saveSessionState(finalMessages, newInteractionId)
    } catch (err) {
      console.error('Cipher chat error:', err)
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        text: 'Connection error. Unable to reach Cipher backend service.',
      }
      const finalMessages = [...updatedMessages, errorMessage]
      setMessages(finalMessages)
      saveSessionState(finalMessages, interactionId)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="cipher-container">
      {/* Expanded Chat Panel (ALWAYS Bottom-Right Docked) */}
      {isOpen && (
        <div className="cipher-panel">
          {/* Header */}
          <div className="cipher-header">
            <div className="cipher-header-title">
              <div className="cipher-avatar">
                <Bot size={16} />
              </div>
              <div className="cipher-header-text">
                <h4>CIPHER // AI</h4>
                <span>Active Core Representative</span>
              </div>
            </div>
            <button className="cipher-close-btn" onClick={togglePanel} title="Collapse Cipher">
              <X size={18} />
            </button>
          </div>

          {/* Message History */}
          <div className="cipher-messages">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`cipher-msg ${
                  msg.role === 'assistant' ? 'cipher-msg-assistant' : 'cipher-msg-user'
                }`}
              >
                {renderFormattedMessage(msg.text)}
              </div>
            ))}

            {isLoading && (
              <div className="cipher-loading">
                <div className="cipher-dot" />
                <div className="cipher-dot" />
                <div className="cipher-dot" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input */}
          <div className="cipher-footer">
            <input
              className="cipher-input"
              type="text"
              placeholder="Inquire regarding Lycos Core protocols..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
            />
            <button
              className="cipher-send-btn"
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              title="Send Message"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
