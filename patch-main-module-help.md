# 📄 Guide d'utilisation : `patch-main-module.js`

Ce guide explique le fonctionnement du script `patch-main-module.js`, utilisé pour personnaliser automatiquement les fichiers JavaScript extraits avec ImpactJS après l'étape de déminification et d'extraction des modules.

---

## 🎯 Objectif du script

Le script `patch-main-module.js` permet d'ajouter automatiquement :

1. Un **en-tête personnalisé** (style bannière commentée) au début de chaque fichier `.js`
2. Des **blocs ASCII** visuels avant les fonctions `init`, `update`, et `draw`
3. L'exclusion de certains répertoires pour ne modifier que les fichiers pertinents

---

## 📁 Répertoires exclus du traitement

Les fichiers des dossiers suivants **ne seront pas modifiés** par le script :

- `game/levels`
- `game/plugins`
- `impact`
- (`game/config` est prévu en commentaire si besoin)

Cela permet d'éviter d'appliquer les modifications sur des fichiers de configuration ou des niveaux.

---

## 🔍 Fonctionnement du script

Le script :
- Parcourt tous les sous-dossiers depuis le dossier racine (`C:\tools`)
- Ignore les répertoires exclus
- Pour chaque fichier `.js` :
  - Ajoute un en-tête si non présent
  - Recherche les fonctions `init`, `update`, `draw` et insère un bloc ASCII avant

---

## 📥 Exemple de contenu ajouté

### En-tête personnalisé :
```js
/*
----------------------------------------------------------------------------
* DESKTOP VERSION
* @author PATRICK ANCHER
* GLOBAL GAME
...
----------------------------------------------------------------------------
*/
```

### Bloc ASCII avant `init` :
```js
/*
██╗███╗   ██╗██╗████████╗
██║████╗  ██║██║╚══██╔══╝
...
*/
init: function() {
```

---

## 🛠️ Exécution

1. Le script doit être exécuté **après** `extract-modules.js`
2. Depuis une console :
```bash
cd C:\tools
node patch-main-module.js
```

3. Tu peux l'intégrer dans `run-all.bat` pour automatiser l'étape.

---

## 💡 Options avancées (facultatif)

Tu peux ajouter une option `--force` dans le script pour forcer le patch même si un fichier semble déjà traité (non inclus par défaut mais possible).

---

## ✅ Bonnes pratiques

- Toujours exécuter ce script **après** l'extraction des modules (`extract-modules.js`)
- Ne pas appliquer le patch sur les fichiers dans `game/levels`, `plugins`, etc.
- Personnaliser librement les blocs ASCII ou l'en-tête selon tes besoins

---

## 🏁 Conclusion

Ce script permet de styliser automatiquement tes fichiers de jeu avec des en-têtes clairs et des marqueurs visuels pour mieux repérer les fonctions importantes (`init`, `update`, `draw`).

Idéal pour améliorer la lisibilité de ton code tout en gardant une structure propre.

✨ **Bonne personnalisation et bon dev !** ✨

