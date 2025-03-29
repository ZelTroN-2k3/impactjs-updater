; ImpactDevHelper Inno Setup Script
[Setup]
AppName=ImpactJS Dev Helper
AppVersion=1.0
DefaultDirName={pf}\ImpactJS Dev Helper
DefaultGroupName=ImpactJS Dev Helper
UninstallDisplayIcon={app}\ImpactDevHelper.exe
OutputDir=.
OutputBaseFilename=ImpactJS-Setup
SetupIconFile=mon-icone.ico
Compression=lzma
SolidCompression=yes

[Files]
Source: "ImpactDevHelper.exe"; DestDir: "{app}"; Flags: ignoreversion
Source: "sign-exe.bat"; DestDir: "{app}"; Flags: ignoreversion
Source: "mon-icone.ico"; DestDir: "{app}"; Flags: ignoreversion

[Icons]
Name: "{group}\ImpactJS Dev Helper"; Filename: "{app}\ImpactDevHelper.exe"; WorkingDir: "{app}"
Name: "{userdesktop}\ImpactJS Dev Helper"; Filename: "{app}\ImpactDevHelper.exe"; Tasks: desktopicon

[Tasks]
Name: "desktopicon"; Description: "Créer une icône sur le bureau"; GroupDescription: "Options supplémentaires :"

[Run]
Filename: "{app}\ImpactDevHelper.exe"; Description: "Lancer ImpactJS Dev Helper"; Flags: nowait postinstall skipifsilent
