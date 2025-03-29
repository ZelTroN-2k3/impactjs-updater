@echo off
setlocal

:: Configuration utilisateur
set SIGNTOOL_PATH="C:\Program Files (x86)\Windows Kits\10\bin\x64\signtool.exe"
set CERT_FILE=zeltron-dev.pfx
set CERT_PASS=Test1234
set TARGET_EXE=ImpactDevHelper.exe

:: Serveur de timestamp reconnu
set TIMESTAMP_URL=http://timestamp.sectigo.com

:: Vérification des fichiers
if not exist %SIGNTOOL_PATH% (
    echo ❌ signtool.exe introuvable. Vérifie le chemin dans SIGNTOOL_PATH.
    pause
    exit /b 1
)

if not exist %CERT_FILE% (
    echo ❌ Certificat .pfx introuvable : %CERT_FILE%
    pause
    exit /b 1
)

if not exist %TARGET_EXE% (
    echo ❌ Fichier à signer introuvable : %TARGET_EXE%
    pause
    exit /b 1
)

:: Signature du fichier
echo 🔐 Signature en cours de %TARGET_EXE%...
%SIGNTOOL_PATH% sign /f %CERT_FILE% /p %CERT_PASS% /fd sha256 /tr %TIMESTAMP_URL% %TARGET_EXE%

if %ERRORLEVEL% NEQ 0 (
    echo ❌ Erreur lors de la signature.
    pause
    exit /b 1
) else (
    echo ✅ Signature appliquée avec succès !
)

:: Vérification de la signature
echo 🧐 Vérification...
%SIGNTOOL_PATH% verify /pa /v %TARGET_EXE%

pause
endlocal
