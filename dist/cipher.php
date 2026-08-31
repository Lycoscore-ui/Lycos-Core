<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed. Use POST.']);
    exit;
}

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

$message = isset($data['message']) ? trim($data['message']) : '';
$previousInteractionId = isset($data['previous_interaction_id']) ? trim($data['previous_interaction_id']) : null;

if (empty($message)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Missing message string.']);
    exit;
}

// Enforce max length constraint (2000 chars)
if (mb_strlen($message) > 2000) {
    $message = mb_substr($message, 0, 2000);
}

// 1. Locate and parse GEMINI_API_KEY from v2-development/cms/.env or environment
$apiKey = getenv('GEMINI_API_KEY');

if (empty($apiKey)) {
    $envPaths = [
        __DIR__ . '/../../v2-development/cms/.env',
        __DIR__ . '/../v2-development/cms/.env',
        __DIR__ . '/.env',
        __DIR__ . '/../.env',
        __DIR__ . '/../../.env'
    ];

    foreach ($envPaths as $envPath) {
        if (file_exists($envPath)) {
            $lines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
            foreach ($lines as $line) {
                $line = trim($line);
                if (strpos($line, '#') === 0) continue;
                if (strpos($line, 'GEMINI_API_KEY=') === 0) {
                    $apiKey = trim(substr($line, strlen('GEMINI_API_KEY=')));
                    $apiKey = trim($apiKey, '"\'');
                    break 2;
                }
            }
        }
    }
}

if (empty($apiKey) || $apiKey === 'YOUR_GEMINI_API_KEY_HERE') {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'GEMINI_API_KEY is missing or unconfigured in v2-development/cms/.env.'
    ]);
    exit;
}

// 2. Load lycos_core_knowledge.txt
$kbPath = __DIR__ . '/lycos_core_knowledge.txt';

$kbContent = '';
if (file_exists($kbPath)) {
    $kbContent = file_get_contents($kbPath);
}

$systemInstruction = "You are Cipher, the official AI representative for Lycos Core. Your voice is direct, technical, professional, precise, and authoritative.\n\n"
    . "================================================================================\n"
    . "KNOWLEDGE BASE\n"
    . "================================================================================\n"
    . $kbContent . "\n\n"
    . "================================================================================\n"
    . "RULES & BEHAVIOR:\n"
    . "1. Answer user questions thoroughly and contextually using ONLY the KNOWLEDGE BASE provided above.\n"
    . "2. Synonym & Mapping: Understand that \"Incubation Hub\" includes Protocol Kinetic, Protocol Apex, Protocol Citadel, and related pathways. Summarize these details when asked about the hub.\n"
    . "3. If a question is completely unrelated to Lycos Core, reply:\n"
    . "   \"I am Cipher, dedicated specifically to Lycos Core services and technical offerings. I cannot assist with topics outside our scope.\"\n"
    . "4. If a query is about Lycos Core but the detail is missing from the Knowledge Base, reply:\n"
    . "   \"I don't have that specific information in my active database right now. Please reach out to our team directly via our contact form.\"\n\n"
    . "================================================================================\n"
    . "RESPONSE STYLING RULES:\n"
    . "1. CONCISE & EXECUTIVE: Keep responses ultra-concise (maximum 120–150 words total). Never dump long paragraphs or heavy text blocks.\n"
    . "2. DO NOT REPEAT VERBATIM TEXT: Synthesize and reframe knowledge base details dynamically in a modern executive voice. Speak using \"we\" for Lycos Core.\n"
    . "3. MANDATORY STRUCTURED FORMAT:\n"
    . "   - Hook/Overview: 1–2 crisp, high-level summary sentences.\n"
    . "   - Key Highlights/Specs: 2–3 short, scannable bullet points (* Item: Details). Keep bullets under 18 words each. Do NOT use section headers like ###.\n"
    . "   - Closing Action: Exactly 1 relevant follow-up question inviting them to explore a specific protocol or contact us.\n"
    . "4. TONE: Modern, consultative, direct enterprise AI representative.";

// 3. Call Gemini Interactions API with model fallback
$modelsToTry = ['models/gemini-flash-latest', 'models/gemini-3.5-flash'];
$lastError = '';

foreach ($modelsToTry as $modelName) {
    $payload = [
        'model' => $modelName,
        'input' => $message,
        'system_instruction' => $systemInstruction
    ];

    if (!empty($previousInteractionId)) {
        $payload['previous_interaction_id'] = $previousInteractionId;
    }

    $apiUrl = "https://generativelanguage.googleapis.com/v1beta/interactions?key=" . urlencode($apiKey);

    $ch = curl_init($apiUrl);
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
        CURLOPT_POSTFIELDS => json_encode($payload),
        CURLOPT_TIMEOUT => 30,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_SSL_VERIFYHOST => false
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpCode >= 200 && $httpCode < 300 && !empty($response)) {
        $resData = json_decode($response, true);

        if (!isset($resData['error'])) {
            $replyText = '';
            $interactionId = isset($resData['id']) ? $resData['id'] : (isset($resData['interaction_id']) ? $resData['interaction_id'] : null);

            if (isset($resData['steps']) && is_array($resData['steps'])) {
                foreach ($resData['steps'] as $step) {
                    if (isset($step['type']) && $step['type'] === 'model_output' && isset($step['content']) && is_array($step['content'])) {
                        foreach ($step['content'] as $c) {
                            if (isset($c['text'])) {
                                $replyText .= $c['text'];
                            }
                        }
                    }
                }
            }

            if (empty($replyText) && isset($resData['outputs']) && is_array($resData['outputs'])) {
                $texts = [];
                foreach ($resData['outputs'] as $out) {
                    if (isset($out['text'])) $texts[] = $out['text'];
                    elseif (isset($out['content'])) $texts[] = $out['content'];
                }
                $replyText = implode("\n", $texts);
            } elseif (empty($replyText) && isset($resData['text'])) {
                $replyText = $resData['text'];
            } elseif (empty($replyText) && isset($resData['candidates'][0]['content']['parts'][0]['text'])) {
                $replyText = $resData['candidates'][0]['content']['parts'][0]['text'];
            }

            if (!empty(trim($replyText))) {
                echo json_encode([
                    'success' => true,
                    'reply' => trim($replyText),
                    'previous_interaction_id' => $interactionId
                ]);
                exit;
            }
        } else {
            $lastError = is_string($resData['error']) ? $resData['error'] : json_encode($resData['error']);
        }
    }
}

// 4. Fallback to generateContent API using gemini-flash-latest
$fallbackUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=" . urlencode($apiKey);
$fallbackPayload = [
    'contents' => [
        [
            'role' => 'user',
            'parts' => [
                ['text' => $systemInstruction . "\n\nUser Question: " . $message]
            ]
        ]
    ]
];

$chFb = curl_init($fallbackUrl);
curl_setopt_array($chFb, [
    CURLOPT_POST => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
    CURLOPT_POSTFIELDS => json_encode($fallbackPayload),
    CURLOPT_TIMEOUT => 30,
    CURLOPT_SSL_VERIFYPEER => false,
    CURLOPT_SSL_VERIFYHOST => false
]);

$fbResponse = curl_exec($chFb);
$fbHttpCode = curl_getinfo($chFb, CURLINFO_HTTP_CODE);
curl_close($chFb);

if ($fbHttpCode >= 200 && $fbHttpCode < 300 && !empty($fbResponse)) {
    $fbData = json_decode($fbResponse, true);
    $text = isset($fbData['candidates'][0]['content']['parts'][0]['text']) ? $fbData['candidates'][0]['content']['parts'][0]['text'] : '';
    if (!empty(trim($text))) {
        echo json_encode(['success' => true, 'reply' => trim($text)]);
        exit;
    }
}

http_response_code(500);
echo json_encode([
    'success' => false,
    'error' => 'Gemini API request failed. Details: ' . ($lastError ? $lastError : ($fbResponse ? $fbResponse : 'No response from API server.'))
]);
