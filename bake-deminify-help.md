# ?? Guide d'utilisation : `bake-deminify.bat`

Ce guide explique clairement comment fonctionne et comment utiliser le script batch (`bake-deminify.bat`) que tu utilises pour déminifier les fichiers JavaScript (`.min.js`) générés par ImpactJS.

---

## ?? À quoi sert ce script ?

Le fichier `bake-deminify.bat` permet de rendre lisible un fichier JavaScript minifié (compressé) en restaurant l'indentation, les espaces et les sauts de lignes pour faciliter la lecture et la modification.

**Exemple :**

- Avant (minifié) :

```js
var a=function(){console.log("Hello")};a();
```

- Après déminification :

```js
var a = function() {
    console.log("Hello")
};
a();
```

---

## ?? Pré-requis avant utilisation

Avant d'exécuter ce script, assure-toi d'avoir installé :

- **Node.js** ([Téléchargement ici](https://nodejs.org))
- **UglifyJS** (installation via Node.js avec la commande ci-dessous)

Installation rapide de UglifyJS :

```batch
npm install -g uglify-js
```

---

## ?? Comment utiliser le script ?

1. **Placer le fichier à déminifier**

   Copie clairement ton fichier JavaScript minifié (par exemple `game.min.js`) dans le même dossier que le fichier `bake-deminify.bat`.

2. **Exécution du script**

   Double-clique simplement sur :

```
bake-deminify.bat
```

ou via la console :

```batch
cd C:\tools
bake-deminify.bat
```

3. **Résultat obtenu**

   Le script génère un fichier nommé automatiquement :

```
game.deminified.js
```

---

## ?? Comprendre le script (avec commentaires)

Voici une explication claire et détaillée des commandes utilisées dans `bake-deminify.bat` :

```batch
@echo off
REM Désactive l'affichage des commandes dans la console

REM Affichage du message de démarrage
echo Demarrage de la deminification...

REM Commande directe de déminification avec UglifyJS
uglifyjs "game.min.js" --beautify -o "game.deminified.js"

REM --beautify : Ajoute automatiquement espaces et indentations
REM -o : indique clairement le fichier de sortie (output)

REM Affichage final de confirmation du succès
echo.
echo Fichier cree avec succes : game.deminified.js

REM Pause finale pour voir les résultats avant fermeture automatique
pause
```

---

## ?? Résolution des problèmes courants

**Erreur : `'uglifyjs' n'est pas reconnu`**

Si tu rencontres cette erreur, vérifie que tu as bien installé UglifyJS globalement via npm :

```batch
npm install -g uglify-js
```

Vérifie aussi que Node.js est bien installé (commande : `node -v` et `npm -v`).

---

## ?? Conclusion

Ce script simple et efficace te permet de déminifier rapidement tes fichiers JavaScript minifiés. Utilise-le chaque fois que tu souhaites modifier ou analyser clairement le code généré par ImpactJS.

? **Bonne déminification et bon développement !** ?