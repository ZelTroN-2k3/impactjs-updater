@echo off
echo ------------------------------------
echo Deminification directe du fichier game.min.js
echo ------------------------------------

REM Commande directe, sans vérifications intermédiaires
uglifyjs "game.min.js" --beautify -o "game.deminified.js"

REM Pause explicite pour ne pas fermer immédiatement
echo.
echo ------------------------------------
echo Deminification terminee.
echo Verifie la presence de game.deminified.js
echo ------------------------------------
pause
