try {
    $res = Invoke-WebRequest -Uri 'http://127.0.0.1:10005/incubation/kinetic' -Method Get -UseBasicParsing -Headers @{ Host = "lycos-core.local" }
    Write-Output "Status: $($res.StatusCode)"
    foreach ($h in $res.Headers.Keys) {
        Write-Output "$h : $($res.Headers[$h])"
    }
} catch {
    Write-Output "Error: $_"
}
