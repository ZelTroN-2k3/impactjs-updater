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

const fs = require('fs');
const path = require('path');

const fileContent = fs.readFileSync('game.deminified.js', 'utf-8');

// Chercher précisément la déclaration du module et l'accolade ouvrante de "defines"
const moduleRegex = /ig\.module\(['"](.+?)['"]\)\.requires\(([\s\S]+?)\)\.defines\(function\(\)\s*{/g;

let match;
while ((match = moduleRegex.exec(fileContent)) !== null) {
    const moduleName = match[1];
    const startIndex = match.index;

    // Compter les accolades pour trouver la fin exacte du module
    let openBraces = 1;
    let currentIndex = moduleRegex.lastIndex;
    
    while (openBraces > 0 && currentIndex < fileContent.length) {
        if (fileContent[currentIndex] === '{') openBraces++;
        else if (fileContent[currentIndex] === '}') openBraces--;

        currentIndex++;
    }

    // Inclure proprement les accolades finales et les caractères restants "; });"
    const moduleContent = fileContent.substring(startIndex, currentIndex).trim() + ');';

    const filePath = path.join(...moduleName.split('.')) + '.js';
    const dirName = path.dirname(filePath);
    fs.mkdirSync(dirName, { recursive: true });

    fs.writeFileSync(filePath, moduleContent, 'utf-8');
    console.log(`✅ Module correctement extrait : ${filePath}`);
}

console.log('🚀 Extraction complète terminée avec succès !');
