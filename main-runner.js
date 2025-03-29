/*
----------------------------------------------------------------------------
* DESKTOP VERSION
* @author PATRICK ANCHER
* GLOBAL GAME
*
* abstract: Game
* created: 23-04-2024
* license: do what you want and don't bother me. ;)
*
* Copyright (C) 2024 Patrick.A <admin@freelance-addons.net>
* URL:: http://freelance-addons.net
* X: @zeltron2k3
*
----------------------------------------------------------------------------
*/

const { execSync } = require('child_process');
const path = require('path');

console.log("==============================");
console.log("🚀 Lancement de l'outil complet");
console.log("==============================\n");

try {
    // Étape 1 : Déminification
    console.log("🔧 Étape 1 : Déminification (bake-deminify.bat)...");
    execSync('bake-deminify.bat', { stdio: 'inherit' });

    // Étape 2 : Extraction des modules
    console.log("\n📦 Étape 2 : Extraction des modules (extract-modules.js)...");
    execSync('node extract-modules.js', { stdio: 'inherit' });

    // Étape 3 : Marqueurs JSON
    console.log("\n🧩 Étape 3 : Ajout des marqueurs JSON (json-markers-levels.js)...");
    execSync('node json-markers-levels.js', { stdio: 'inherit' });

    // Étape 4 : Patch final
    console.log("\n🎨 Étape 4 : Patch des fichiers (patch-main-module.js)...");
    execSync('node patch-main-module.js', { stdio: 'inherit' });

    console.log("\n✅ Tous les traitements ont été effectués avec succès !");
} catch (err) {
    console.error("\n❌ Une erreur est survenue :", err.message);
    process.exit(1);
}
