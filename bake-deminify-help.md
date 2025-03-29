# ?? Guide d'utilisation : `bake-deminify.bat`

Ce guide explique clairement comment fonctionne et comment utiliser le script batch (`bake-deminify.bat`) que tu utilises pour d�minifier les fichiers JavaScript (`.min.js`) g�n�r�s par ImpactJS.

---

## ?? � quoi sert ce script ?

Le fichier `bake-deminify.bat` permet de rendre lisible un fichier JavaScript minifi� (compress�) en restaurant l'indentation, les espaces et les sauts de lignes pour faciliter la lecture et la modification.

**Exemple :**

- Avant (minifi�) :

```js
var a=function(){console.log("Hello")};a();
```

- Apr�s d�minification :

```js
var a = function() {
    console.log("Hello")
};
a();
```

---

## ?? Pr�-requis avant utilisation

Avant d'ex�cuter ce script, assure-toi d'avoir install� :

- **Node.js** ([T�l�chargement ici](https://nodejs.org))
- **UglifyJS** (installation via Node.js avec la commande ci-dessous)

Installation rapide de UglifyJS :

```batch
npm install -g uglify-js
```

---

## ?? Comment utiliser le script ?

1. **Placer le fichier � d�minifier**

   Copie clairement ton fichier JavaScript minifi� (par exemple `game.min.js`) dans le m�me dossier que le fichier `bake-deminify.bat`.

2. **Ex�cution du script**

   Double-clique simplement sur :

```
bake-deminify.bat
```

ou via la console :

```batch
cd C:\tools
bake-deminify.bat
```

3. **R�sultat obtenu**

   Le script g�n�re un fichier nomm� automatiquement :

```
game.deminified.js
```

---

## ?? Comprendre le script (avec commentaires)

Voici une explication claire et d�taill�e des commandes utilis�es dans `bake-deminify.bat` :

```batch
@echo off
REM D�sactive l'affichage des commandes dans la console

REM Affichage du message de d�marrage
echo Demarrage de la deminification...

REM Commande directe de d�minification avec UglifyJS
uglifyjs "game.min.js" --beautify -o "game.deminified.js"

REM --beautify : Ajoute automatiquement espaces et indentations
REM -o : indique clairement le fichier de sortie (output)

REM Affichage final de confirmation du succ�s
echo.
echo Fichier cree avec succes : game.deminified.js

REM Pause finale pour voir les r�sultats avant fermeture automatique
pause
```

---

## ?? R�solution des probl�mes courants

**Erreur : `'uglifyjs' n'est pas reconnu`**

Si tu rencontres cette erreur, v�rifie que tu as bien install� UglifyJS globalement via npm :

```batch
npm install -g uglify-js
```

V�rifie aussi que Node.js est bien install� (commande : `node -v` et `npm -v`).

---

## ?? Conclusion

Ce script simple et efficace te permet de d�minifier rapidement tes fichiers JavaScript minifi�s. Utilise-le chaque fois que tu souhaites modifier ou analyser clairement le code g�n�r� par ImpactJS.

? **Bonne d�minification et bon d�veloppement !** ?