try {
    $res = Invoke-WebRequest -Uri 'http://lycos-core.local/incubation/kinetic' -Method Get -UseBasicParsing
    Write-Output "Status: $($res.StatusCode)"
    foreach ($h in $res.Headers.Keys) {
        Write-Output "$h : $($res.Headers[$h])"
    }
} catch {
    Write-Output "Error: $_"
}
