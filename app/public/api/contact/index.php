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
if (!$data && !empty($_POST)) {
    $data = $_POST;
}

$name = isset($data['name']) ? trim($data['name']) : '';
$email = isset($data['email']) ? trim($data['email']) : '';
$message = isset($data['message']) ? trim($data['message']) : '';
if (empty($message) && isset($data['bottlenecks'])) {
    $message = trim($data['bottlenecks']);
}
if (empty($message) && isset($data['comments'])) {
    $message = trim($data['comments']);
}
$context = isset($data['serviceContext']) ? trim($data['serviceContext']) : (isset($data['context']) ? trim($data['context']) : 'General Engagement');
$phone = isset($data['phone']) ? trim($data['phone']) : '';
$company = isset($data['company']) ? trim($data['company']) : '';

if (empty($name)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Full Name is required.']);
    exit;
}

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'A valid email address is required.']);
    exit;
}

if (empty($message)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Message or description is required.']);
    exit;
}

$envPaths = [
    __DIR__ . '/../.env',
    __DIR__ . '/../../v2-development/cms/.env',
    __DIR__ . '/.env',
    __DIR__ . '/../../.env'
];

$config = [
    'SMTP_HOST' => 'mail.lycoscore.com',
    'SMTP_PORT' => 465,
    'SMTP_USER' => 'cipher@lycoscore.com',
    'SMTP_PASS' => 'LycosCore2026',
    'SMTP_SECURE' => 'ssl',
    'CONTACT_RECIPIENT' => 'cipher@lycoscore.com'
];

foreach ($envPaths as $envPath) {
    if (file_exists($envPath)) {
        $lines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        foreach ($lines as $line) {
            $line = trim($line);
            if (strpos($line, '#') === 0) continue;
            $parts = explode('=', $line, 2);
            if (count($parts) === 2) {
                $key = trim($parts[0]);
                $val = trim($parts[1], "'\" \t\n\r\0\x0B");
                if (array_key_exists($key, $config)) {
                    $config[$key] = $val;
                }
            }
        }
    }
}

$phpMailerPath = __DIR__ . '/../wp-includes/PHPMailer/PHPMailer.php';
$smtpPath = __DIR__ . '/../wp-includes/PHPMailer/SMTP.php';
$exceptionPath = __DIR__ . '/../wp-includes/PHPMailer/Exception.php';

if (!file_exists($phpMailerPath) || !file_exists($smtpPath)) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Mail delivery subsystem unavailable.']);
    exit;
}

require_once $exceptionPath;
require_once $phpMailerPath;
require_once $smtpPath;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$safeName = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
$safeEmail = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
$safeContext = htmlspecialchars($context, ENT_QUOTES, 'UTF-8');
$safeCompany = htmlspecialchars($company, ENT_QUOTES, 'UTF-8');
$safePhone = htmlspecialchars($phone, ENT_QUOTES, 'UTF-8');
$safeMessage = nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8'));
$timestamp = gmdate('Y-m-d H:i:s') . ' UTC';

try {
    // 1. Send Admin Notification to cipher@lycoscore.com
    $adminMail = new PHPMailer(true);
    $adminMail->isSMTP();
    $adminMail->Host       = $config['SMTP_HOST'];
    $adminMail->SMTPAuth   = true;
    $adminMail->Username   = $config['SMTP_USER'];
    $adminMail->Password   = $config['SMTP_PASS'];
    $adminMail->SMTPSecure = ($config['SMTP_SECURE'] === 'tls' || $config['SMTP_PORT'] == 587) ? PHPMailer::ENCRYPTION_STARTTLS : PHPMailer::ENCRYPTION_SMTPS;
    $adminMail->Port       = (int)$config['SMTP_PORT'];
    $adminMail->CharSet    = 'UTF-8';
    $adminMail->SMTPOptions = [
        'ssl' => [
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
        ]
    ];

    $adminMail->setFrom($config['SMTP_USER'], 'Lycos Core Intelligence');
    $adminMail->addAddress($config['CONTACT_RECIPIENT'], 'Lycos Core Operations');
    $adminMail->addReplyTo($email, $name);

    $adminMail->isHTML(true);
    $adminMail->Subject = "[Lycos Core Lead] New Inquiry: " . $name . " [" . $context . "]";

    $companyHtml = !empty($safeCompany) ? "<div style='margin-bottom:12px;'><div style='font-size:11px;color:#94a3b8;font-family:monospace;letter-spacing:0.05em;'>ORGANIZATION</div><div style='color:#ffffff;font-size:15px;margin-top:2px;'>" . $safeCompany . "</div></div>" : "";
    $phoneHtml = !empty($safePhone) ? "<div style='margin-bottom:12px;'><div style='font-size:11px;color:#94a3b8;font-family:monospace;letter-spacing:0.05em;'>PHONE</div><div style='color:#ffffff;font-size:15px;margin-top:2px;'>" . $safePhone . "</div></div>" : "";

    $adminMail->Body = "
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset='utf-8'>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #050d1a; color: #f1f5f9; margin: 0; padding: 24px; }
        .card { max-width: 600px; margin: 0 auto; background: #0a192f; border: 1px solid rgba(140, 255, 50, 0.3); border-radius: 12px; overflow: hidden; }
        .header { background: #030812; padding: 20px 24px; border-bottom: 1px solid rgba(140, 255, 50, 0.2); }
        .header h2 { margin: 0; color: #8CFF32; font-size: 15px; font-family: monospace; letter-spacing: 0.08em; }
        .header p { margin: 4px 0 0; color: #8a9df8; font-size: 12px; font-family: monospace; }
        .content { padding: 24px; }
        .field { margin-bottom: 14px; }
        .label { font-size: 11px; color: #94a3b8; font-family: monospace; letter-spacing: 0.05em; text-transform: uppercase; }
        .val { color: #ffffff; font-size: 15px; font-weight: 500; margin-top: 2px; }
        .val-accent { color: #8CFF32; font-weight: 600; }
        .msg-box { background: rgba(5, 13, 26, 0.85); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 8px; padding: 16px; color: #cbd5e1; font-size: 14px; line-height: 1.6; margin-top: 6px; }
        .footer { background: #030812; padding: 14px 24px; border-top: 1px solid rgba(255,255,255,0.06); text-align: center; font-size: 11px; color: #64748b; font-family: monospace; }
      </style>
    </head>
    <body>
      <div class='card'>
        <div class='header'>
          <h2>LYCOS CORE // LIVE TELEMETRY LEAD</h2>
          <p>Dispatched at " . $timestamp . "</p>
        </div>
        <div class='content'>
          <div class='field'>
            <div class='label'>Client Name</div>
            <div class='val'>" . $safeName . "</div>
          </div>
          <div class='field'>
            <div class='label'>Email Address</div>
            <div class='val val-accent'>" . $safeEmail . "</div>
          </div>
          " . $companyHtml . "
          " . $phoneHtml . "
          <div class='field'>
            <div class='label'>Engagement Pathway / Context</div>
            <div class='val' style='color:#8a9df8;'>" . $safeContext . "</div>
          </div>
          <div class='field' style='margin-top:16px;'>
            <div class='label'>Inquiry Details / Bottlenecks</div>
            <div class='msg-box'>" . $safeMessage . "</div>
          </div>
        </div>
        <div class='footer'>
          LYCOS CORE PROTOCOL &bull; CIPHER GATEWAY &bull; ENCRYPTED TRANSMISSION
        </div>
      </div>
    </body>
    </html>
    ";

    $adminMail->AltBody = "LYCOS CORE INQUIRY\nName: " . $name . "\nEmail: " . $email . "\nContext: " . $context . "\nOrganization: " . $company . "\nPhone: " . $phone . "\nTimestamp: " . $timestamp . "\n\nMessage:\n" . $message;

    $adminMail->send();

    // 2. Send Branded Confirmation to User
    try {
        $clientMail = new PHPMailer(true);
        $clientMail->isSMTP();
        $clientMail->Host       = $config['SMTP_HOST'];
        $clientMail->SMTPAuth   = true;
        $clientMail->Username   = $config['SMTP_USER'];
        $clientMail->Password   = $config['SMTP_PASS'];
        $clientMail->SMTPSecure = ($config['SMTP_SECURE'] === 'tls' || $config['SMTP_PORT'] == 587) ? PHPMailer::ENCRYPTION_STARTTLS : PHPMailer::ENCRYPTION_SMTPS;
        $clientMail->Port       = (int)$config['SMTP_PORT'];
        $clientMail->CharSet    = 'UTF-8';
        $clientMail->SMTPOptions = [
            'ssl' => [
                'verify_peer' => false,
                'verify_peer_name' => false,
                'allow_self_signed' => true
            ]
        ];

        $clientMail->setFrom($config['SMTP_USER'], 'Lycos Core');
        $clientMail->addAddress($email, $name);
        $clientMail->addReplyTo($config['CONTACT_RECIPIENT'], 'Lycos Core Operations');

        $clientMail->isHTML(true);
        $clientMail->Subject = "Lycos Core // Engagement Request Received";

        $clientMail->Body = "
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset='utf-8'>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #050d1a; color: #f1f5f9; margin: 0; padding: 24px; }
            .card { max-width: 600px; margin: 0 auto; background: #0a192f; border: 1px solid rgba(140, 255, 50, 0.3); border-radius: 12px; overflow: hidden; }
            .header { background: #030812; padding: 24px; border-bottom: 1px solid rgba(140, 255, 50, 0.2); }
            .header h2 { margin: 0; color: #8CFF32; font-size: 16px; font-family: monospace; letter-spacing: 0.05em; }
            .content { padding: 28px 24px; line-height: 1.65; color: #cbd5e1; font-size: 14px; }
            .highlight { color: #8CFF32; font-weight: 600; }
            .details-box { background: rgba(5, 13, 26, 0.7); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 8px; padding: 16px; margin: 20px 0; font-family: monospace; font-size: 13px; color: #94a3b8; }
            .footer { padding: 18px 24px; background: #030812; border-top: 1px solid rgba(255,255,255,0.06); font-size: 11px; color: #64748b; font-family: monospace; text-align: center; }
          </style>
        </head>
        <body>
          <div class='card'>
            <div class='header'>
              <h2>LYCOS CORE // INITIATION RECEIVED</h2>
            </div>
            <div class='content'>
              <p>Dear " . $safeName . ",</p>
              <p>Thank you for initiating an operational engagement request with <strong class='highlight'>Lycos Core</strong>.</p>
              <p>Your inquiry regarding <strong>" . $safeContext . "</strong> has been logged into our telemetry pipeline. One of our operational leads is reviewing your technical specifications and will contact you directly within 24 business hours.</p>
              
              <div class='details-box'>
                <strong style='color:#8a9df8;'>TRANSMISSION DETAILS:</strong><br/>
                &bull; Timestamp: " . $timestamp . "<br/>
                &bull; Pathway: " . $safeContext . "<br/>
                &bull; Status: Queued for Operational Review
              </div>

              <p>If you have urgent technical inquiries or require additional confidentiality protocols prior to initial briefing, you may reply directly to this transmission.</p>
              
              <p style='margin-top: 24px;'>Regards,<br/><strong style='color: #ffffff;'>The Lycos Core Intelligence Team</strong><br/><span style='font-size: 13px; color: #8a9df8;'>https://lycoscore.com</span></p>
            </div>
            <div class='footer'>
              CONFIDENTIAL &bull; LYCOS CORE ENTERPRISE SYSTEMS
            </div>
          </div>
        </body>
        </html>
        ";

        $clientMail->AltBody = "Dear " . $name . ",\n\nThank you for reaching out to Lycos Core. Your engagement request regarding '" . $context . "' has been received.\n\nOne of our operational leads will contact you within 24 business hours.\n\nRegards,\nLycos Core Team\nhttps://lycoscore.com";

        $clientMail->send();
    } catch (\Exception $e) {
        error_log('Autoresponder error: ' . $e->getMessage());
    }

    echo json_encode([
        'success' => true,
        'message' => 'Thank you. Your inquiry has been securely transmitted. An operational lead will contact you shortly.'
    ]);
    exit;

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Mail delivery failed: ' . $adminMail->ErrorInfo
    ]);
    exit;
}
