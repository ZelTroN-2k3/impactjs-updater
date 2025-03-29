@echo off
REM Execution automatique complète du processus ImpactJS

echo ============================================
echo 🚀 Lancement automatique du processus complet
echo ============================================

REM 1. Deminification rapide du fichier JS
echo.
echo --------------------------------------------
echo 🟢 Etape 1 : Deminification (bake-deminify.bat)
echo --------------------------------------------
call bake-deminify.bat

if errorlevel 1 (
  echo 🔴 Erreur lors de la deminification, arret du processus.
  pause
  exit /b 1
)

REM 2. Extraction automatique des modules JS (extract-modules.js)
echo.
echo --------------------------------------------
echo 🟢 Etape 2 : Extraction des modules ImpactJS
echo --------------------------------------------
node extract-modules.js

if errorlevel 1 (
  echo 🔴 Erreur lors de l'extraction des modules, arret du processus.
  pause
  exit /b 1
)

REM 3. Ajout rapide des marqueurs JSON (json-markers-levels.js)
echo.
echo --------------------------------------------
echo 🟢 Etape 3 : Ajout des marqueurs JSON aux levels
echo --------------------------------------------
node json-markers-levels.js

if errorlevel 1 (
  echo 🔴 Erreur lors de l'ajout des marqueurs JSON, arret du processus.
  pause
  exit /b 1
)

echo.
echo --------------------------------------------
echo 🟢 Etape 4 : Ajout de commentaires stylés dans main.js
echo --------------------------------------------
node patch-main-module.js

if errorlevel 1 (
  echo 🔴 Erreur lors de l'ajout des commentaires JSON, arret du processus.
  pause
  exit /b 1
)

echo.
echo ============================================
echo 🎉 Toutes les etapes se sont deroulees avec succes !
echo ============================================
pause
