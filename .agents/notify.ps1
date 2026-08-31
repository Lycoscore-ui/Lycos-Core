param (
    [string]$Title = "Antigravity IDE Update",
    [string]$Message = ""
)

if (-not $Message) {
    Write-Error "Message parameter is required."
    exit 1
}

$url = "http://192.168.0.118:8123/api/services/notify/mobile_app_rudi_s_ultra"
$token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIyY2VjZDE5NTlmYTM0NjAwOTFiNWE4MjNkMmJjOGFkMCIsImlhdCI6MTc4MzE2NTQwNywiZXhwIjoyMDk4NTI1NDA3fQ.sFrmRdK8CCFLAZ_Tdt2mk0CPwT47tsL3Rb8iYBAHB3A"

$headers = @{
    "Authorization" = "Bearer $token"
    "Content-Type" = "application/json"
}

$body = @{
    "title" = $Title
    "message" = $Message
} | ConvertTo-Json

try {
    $res = Invoke-RestMethod -Uri $url -Method Post -Headers $headers -Body $body
    Write-Output "Notification sent successfully."
} catch {
    Write-Error "Failed to send notification: $_"
    exit 1
}
