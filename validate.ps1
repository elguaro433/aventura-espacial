# Validador de contenido del juego (PowerShell, sin dependencias)
# Uso: .\validate.ps1
#
# Detecta errores comunes en preguntas del juego y diccionario:
#   - Respuesta correcta fuera de rango (a >= número de opciones)
#   - Opciones vacías o duplicadas
#   - Grados/niveles desconocidos
#   - Categorías de diccionario desconocidas
#
# Devuelve exit code 0 si todo OK, 1 si hay errores.

$ErrorActionPreference = 'Stop'
$html = Get-Content "$PSScriptRoot\index.html" -Raw

$validGrades = @('cp','ce1','ce2','cm1','cm2','6e','5e','4e','3e')
$validDictCats = @('animales','colores','numeros','familia','cuerpo','comida','casa','escuela','verbos','frases','naturaleza','tiempo','andorra')

$errors = 0
$warnings = 0
$totalQ = 0
$totalDict = 0
$seenQuestions = @{}

# Validar preguntas - regex similar al de Node
$qRegex = [regex]"\{q:'((?:[^'\\]|\\.)*)',o:\[([^\]]+)\],a:(\d+)([^}]*)\}"
foreach ($m in $qRegex.Matches($html)) {
    $totalQ++
    $q = $m.Groups[1].Value
    $optsRaw = $m.Groups[2].Value
    $a = [int]$m.Groups[3].Value
    $tail = $m.Groups[4].Value

    # Parse options
    $optMatches = [regex]::Matches($optsRaw, "'((?:[^'\\]|\\.)*)'")
    $opts = @()
    foreach ($om in $optMatches) { $opts += $om.Groups[1].Value }

    if ($opts.Count -ne 4) {
        Write-Host "X Pregunta con $($opts.Count) opciones (debe tener 4): $($q.Substring(0,[Math]::Min(60,$q.Length)))" -ForegroundColor Red
        $errors++
        continue
    }
    if ($a -lt 0 -or $a -ge $opts.Count) {
        Write-Host "X Respuesta correcta fuera de rango (a=$a): $($q.Substring(0,[Math]::Min(60,$q.Length)))" -ForegroundColor Red
        $errors++
        continue
    }
    if (($opts | Where-Object { $_.Trim() -eq '' }).Count -gt 0) {
        Write-Host "X Opcion vacia en pregunta: $($q.Substring(0,[Math]::Min(60,$q.Length)))" -ForegroundColor Red
        $errors++
    }
    # Duplicados de opciones
    $uniqueOpts = $opts | ForEach-Object { $_.ToLower().Trim() } | Sort-Object -Unique
    if ($uniqueOpts.Count -lt $opts.Count) {
        Write-Host "! Opciones duplicadas: $($q.Substring(0,[Math]::Min(60,$q.Length)))" -ForegroundColor Yellow
        $warnings++
    }
    # Validar level
    $lvlMatch = [regex]::Match($tail, "level:'([^']+)'")
    if ($lvlMatch.Success) {
        $lvl = $lvlMatch.Groups[1].Value
        if ($validGrades -notcontains $lvl) {
            Write-Host "X Grado desconocido '$lvl' en: $($q.Substring(0,[Math]::Min(60,$q.Length)))" -ForegroundColor Red
            $errors++
        }
    }
    # Duplicados
    $key = $q.Trim()
    if ($seenQuestions.ContainsKey($key)) {
        Write-Host "! Pregunta duplicada: $($key.Substring(0,[Math]::Min(60,$key.Length)))" -ForegroundColor Yellow
        $warnings++
    }
    $seenQuestions[$key] = $true
}

# Validar diccionario
$dictRegex = [regex]"\{es:'((?:[^'\\]|\\.)*)',fr:'((?:[^'\\]|\\.)*)',en:'((?:[^'\\]|\\.)*)',ca:'((?:[^'\\]|\\.)*)',cat:'([^']+)'"
foreach ($m in $dictRegex.Matches($html)) {
    $totalDict++
    $es = $m.Groups[1].Value
    $fr = $m.Groups[2].Value
    $en = $m.Groups[3].Value
    $ca = $m.Groups[4].Value
    $cat = $m.Groups[5].Value
    if (-not $es.Trim() -or -not $fr.Trim() -or -not $en.Trim() -or -not $ca.Trim()) {
        Write-Host "X Palabra dict con traduccion vacia: es='$es'" -ForegroundColor Red
        $errors++
    }
    if ($validDictCats -notcontains $cat) {
        Write-Host "X Categoria desconocida '$cat' en palabra: $es" -ForegroundColor Red
        $errors++
    }
}

# Resumen
Write-Host ""
Write-Host "------------------------------------------------"
Write-Host "Preguntas validadas: $totalQ"
Write-Host "Palabras de diccionario validadas: $totalDict"
Write-Host "------------------------------------------------"
if ($errors -gt 0) {
    Write-Host "$errors error(es) - CORREGIR antes de subir." -ForegroundColor Red
    exit 1
} else {
    if ($warnings -gt 0) {
        Write-Host "Sin errores ($warnings advertencia(s)). Listo para subir." -ForegroundColor Green
    } else {
        Write-Host "Sin errores. Listo para subir." -ForegroundColor Green
    }
    exit 0
}
