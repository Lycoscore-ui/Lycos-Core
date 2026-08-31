$ports = @(1234, 1235, 8080, 5000, 11434)
$found = $false

foreach ($port in $ports) {
    try {
        $url = "http://127.0.0.1:$port/v1/models"
        $res = Invoke-RestMethod -Uri $url -Method Get -TimeoutSec 3 -ErrorAction Stop
        Write-Output "=== Found active server on port $port ==="
        if ($res.data) {
            foreach ($m in $res.data) {
                Write-Output "Model ID: $($m.id)"
            }
        } else {
            Write-Output ($res | ConvertTo-Json -Depth 3)
        }
        $found = $true
    } catch {
        # Silent retry on next port
    }
}

if (-not $found) {
    Write-Output "Scanning all open listening TCP ports on local machine..."
    $conns = Get-NetTCPConnection -State Listen | Select-Object -ExpandProperty LocalPort -Unique
    foreach ($p in $conns) {
        if ($p -lt 1000 -or $p -eq 135 -or $p -eq 445 -or $p -eq 3306 -or $p -eq 8123) { continue }
        try {
            $res = Invoke-RestMethod -Uri "http://127.0.0.1:$p/v1/models" -Method Get -TimeoutSec 1 -ErrorAction Stop
            Write-Output "=== Found active server on port $p ==="
            if ($res.data) {
                foreach ($m in $res.data) {
                    Write-Output "Model ID: $($m.id)"
                }
            } else {
                Write-Output ($res | ConvertTo-Json -Depth 3)
            }
            $found = $true
        } catch {}
    }
}

if (-not $found) {
    Write-Output "No active OpenAI-compatible LM Studio server endpoints responded on standard ports."
}
