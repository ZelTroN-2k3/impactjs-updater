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

const baseDir = __dirname;

const excludedDirs = [
    path.join('game', 'levels'),
    path.join('game', 'plugins'),
    path.join('impact')
    //path.join('game', 'config')
];

const header = `/*
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
*/\n\n`;

const blocks = {
	init: `
		/*
		██ ███    ██ ██ ████████ 
		██ ████   ██ ██    ██    
		██ ██ ██  ██ ██    ██    
		██ ██  ██ ██ ██    ██    
		██ ██   ████ ██    ██    
		*/
		`,
	update: `
		/*
		██    ██ ██    ██ ██████  ████████ ███████ 
		██    ██ ██    ██ ██   ██    ██    ██      
		██    ██ ██    ██ ██████     ██    █████   
		██    ██ ██    ██ ██         ██    ██      
		 ██████   ██████  ██         ██    ███████ 
		*/
		`,
	draw: `
		/*
		██████  ██████   █████  ██     ██ 
		██   ██ ██   ██ ██   ██ ██     ██ 
		██   ██ ██████  ███████ ██  █  ██ 
		██   ██ ██   ██ ██   ██ ██ ███ ██ 
		██████  ██   ██ ██   ██  ███ ███   
		*/
		`
};

// Fonction récursive pour traiter tous les fichiers sauf ceux des dossiers exclus
function processDirectory(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const fullPath = path.join(dir, file);
        const relativePath = path.relative(baseDir, fullPath);

        // Ignorer les répertoires exclus
        if (excludedDirs.some(excl => relativePath.startsWith(excl))) continue;

        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            processDirectory(fullPath);
        } else if (file.endsWith('.js')) {
            processFile(fullPath);
        }
    }
}

// Traitement de chaque fichier
function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf-8');
    let modified = false;
	const force = process.argv.includes('--force'); // node patch-main-module.js --force
	
	//if (!content.startsWith('/*'))
    if (!content.includes('DESKTOP VERSION')) {
        content = header + content;
        modified = true;
    }

    for (const [key, block] of Object.entries(blocks)) {
        const regex = new RegExp(`(\\b${key}\\s*:\\s*function\\s*\\(.*?\\)\\s*\\{)`);
        if (regex.test(content)) {
            content = content.replace(regex, `${block}\n$1`);
            modified = true;
        }
    }

    if (modified) {
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`✅ Patch appliqué : ${filePath}`);
    } else {
        console.log(`ℹ️ Aucun changement : ${filePath}`);
    }
}

processDirectory(baseDir);

console.log("🎉 Patch terminé pour tous les fichiers JS hors dossiers exclus.");
