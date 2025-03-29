# 🔐 Procédure : Ajouter une Signature Numérique à un .EXE compilé avec Node.js (pkg)

Cette procédure te permet de signer numériquement un exécutable `.exe` généré avec `pkg`, afin de :

- Supprimer les alertes Windows SmartScreen
- Éviter les faux positifs antivirus
- Afficher ton nom comme éditeur dans les propriétés du fichier

---

## ✅ Prérequis

- Windows avec **PowerShell** et **signtool** (inclus dans le Windows SDK)
- Un exécutable prêt : `ImpactDevHelper.exe`
- Soit un **certificat officiel** (.pfx), soit on génère un **auto-signé pour test**

---

## 👉 A. Générer un certificat auto-signé (pour test local)

### 1. Ouvrir PowerShell en mode Administrateur

Clique droit sur l'icône Windows > **PowerShell (Admin)**

### 2. Exécuter la commande suivante :

```powershell
New-SelfSignedCertificate -Type CodeSigningCert -Subject "CN=ZeltronDev" -CertStoreLocation "Cert:\\CurrentUser\\My"
```

Cette commande crée un certificat de signature pour l'utilisateur courant.

### 3. Exporter le certificat au format `.pfx`

#### a. Lance l'outil graphique de certificats :

```cmd
certmgr.msc
```

#### b. Va dans : **Certificats - Utilisateur actuel > Personnel > Certificats**

- Clique droit sur **ZeltronDev** > **Toutes les tâches > Exporter**
- Coche **Oui, exporter la clé privée**
- Choisir format `.PFX`
- Créer un mot de passe (ex : `Test1234`) pour protéger le fichier exporté
- Enregistrer sous : `zeltron-dev.pfx`

---

## 🔐 B. Signer ton fichier `.exe` avec signtool

### 1. Ouvre l'invite de commandes dans le dossier du `.exe`

```cmd
cd C:\tools
```

### 2. Utilise cette commande :

```cmd
signtool sign /f "zeltron-dev.pfx" /p 21209080 /tr http://timestamp.sectigo.com /td sha256 /fd sha256 ImpactDevHelper.exe
```

**Explication des options :**

- `/f` : chemin vers le fichier PFX
- `/p` : mot de passe du certificat
- `/fd sha256` : algo de hachage
- `/tr` : serveur de timestamp (important pour validité dans le temps)

---

## 🔍 C. Vérifier la signature appliquée

### 1. Utiliser signtool pour vérification

```cmd
signtool verify /pa /v ImpactDevHelper.exe
```

Tu dois voir une sortie indiquant :

- Signature trouvée
- Certificat valide
- Timestamp correct

### 2. Ou clic droit > **Propriétés > Signature numérique**

Tu devrais y voir :

- Ton nom (ZeltronDev)
- La date de signature
- L’indication « La signature est valide »

---

## 📊 Résultat attendu

Ton `.exe` est maintenant signé, avec ou sans certificat officiel.

- ✅ Moins d’alertes antivirus
- ✅ Affichage de ton nom comme éditeur
- ✅ Fichier prêt pour distribution/test

---

## ✨ Conseil

Pour un usage public (clients, Store, etc.), utilise un **certificat officiel** (EV ou OV) chez Sectigo, Certum, ou DigiCert.

Sinon, le certificat auto-signé est suffisant pour valider/tester en interne.

---

🎉 **Félicitations, tu maîtrises maintenant la signature numérique de tes outils Node.js/ImpactJS !**

