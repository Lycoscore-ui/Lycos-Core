param (
    [string]$Action = "get", # "get" or "set"
    [string]$Status = "Pending" # "Pending", "Approved", "Rejected", "Idle"
)

$url = "http://192.168.0.118:8123/api"
$token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIyY2VjZDE5NTlmYTM0NjAwOTFiNWE4MjNkMmJjOGFkMCIsImlhdCI6MTc4MzE2NTQwNywiZXhwIjoyMDk4NTI1NDA3fQ.sFrmRdK8CCFLAZ_Tdt2mk0CPwT47tsL3Rb8iYBAHB3A"

$headers = @{
    "Authorization" = "Bearer $token"
    "Content-Type"  = "application/json"
}

if ($Action -eq "set") {
    $body = @{
        "entity_id" = "input_select.antigravity_build_status"
        "option"    = $Status
    } | ConvertTo-Json

    try {
        $res = Invoke-RestMethod -Uri "$url/services/input_select/select_option" -Method Post -Headers $headers -Body $body
        Write-Output "Successfully set status to: $Status"
    } catch {
        Write-Error "Failed to set status: $_"
        exit 1
    }
} else {
    try {
        $res = Invoke-RestMethod -Uri "$url/states/input_select.antigravity_build_status" -Method Get -Headers $headers
        Write-Output $res.state
    } catch {
        Write-Error "Failed to get status: $_"
        exit 1
    }
}
