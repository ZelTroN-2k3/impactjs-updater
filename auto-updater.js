const https = require('https');
const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');

const CURRENT_VERSION = '1.0.0';
const VERSION_URL = 'https://raw.githubusercontent.com/zeltron2k3/impactjs-updater/main/version.json';
const DOWNLOAD_PATH = path.join(__dirname, 'ImpactJS-Setup-new.exe');

function compareVersions(v1, v2) {
  const a = v1.split('.').map(Number);
  const b = v2.split('.').map(Number);
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    const diff = (b[i] || 0) - (a[i] || 0);
    if (diff !== 0) return diff;
  }
  return 0;
}

function fetchJSON(url, callback) {
  https.get(url, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      try {
        const json = JSON.parse(data);
        callback(null, json);
      } catch (e) {
        callback(e);
      }
    });
  }).on('error', callback);
}

function downloadFile(url, destination, callback) {
  const file = fs.createWriteStream(destination);
  https.get(url, (res) => {
    res.pipe(file);
    file.on('finish', () => file.close(callback));
  }).on('error', (err) => {
    fs.unlink(destination, () => callback(err));
  });
}

function updateApplication() {
  fetchJSON(VERSION_URL, (err, json) => {
    if (err) return console.error('❌ Erreur de récupération de la version :', err);

    const latestVersion = json.version;
    const downloadUrl = json.download_url;
    const changelog = json.changelog || '';

    if (compareVersions(CURRENT_VERSION, latestVersion) < 0) {
      console.log(`\n🔔 Nouvelle version disponible : ${latestVersion}`);
      console.log(`📝 Changements : ${changelog}\n`);

      console.log(`⬇️ Téléchargement de la nouvelle version depuis ${downloadUrl}...`);
      downloadFile(downloadUrl, DOWNLOAD_PATH, (err) => {
        if (err) return console.error('❌ Erreur de téléchargement :', err);

        console.log('✅ Téléchargement terminé.');
        console.log('🔁 Remplacement de l'ancienne version...');

        const currentPath = path.join(__dirname, 'ImpactDevHelper.exe');

        fs.rename(currentPath, currentPath + '.old', (err) => {
          if (err) return console.error('❌ Impossible de sauvegarder l'ancienne version :', err);

          fs.rename(DOWNLOAD_PATH, currentPath, (err) => {
            if (err) return console.error('❌ Impossible d'installer la mise à jour :', err);

            console.log('🚀 Mise à jour terminée avec succès. Redémarrage...');
            exec(`start "" "${currentPath}"`);
            process.exit(0);
          });
        });
      });
    } else {
      console.log('✅ Aucun mise à jour disponible. Version actuelle :', CURRENT_VERSION);
    }
  });
}

updateApplication();
