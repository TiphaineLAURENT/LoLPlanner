const { app, BrowserWindow, ipcMain, net } = require('electron');
const { readFileSync } = require('fs');
const { get, PATCH_VERSION } = require('./assets/js/common');

const summonerJson = JSON.parse(readFileSync("./assets/examples/summoner.json"));
const championsJson = JSON.parse(readFileSync("./assets/examples/champions.json"));
const itemsJson = JSON.parse(readFileSync("./assets/examples/items.json"));
const masteriesJson = JSON.parse(readFileSync("./assets/examples/masteries.json"));
const runesJson = JSON.parse(readFileSync("./assets/examples/runes.json"));
const summonerSpellsJson = JSON.parse(readFileSync("./assets/examples/summonerSpells.json"));
const activeGameJson = JSON.parse(readFileSync("./assets/examples/activeGame.json"));

// Gardez une reference globale de l'objet window, si vous ne le faites pas, la fenetre sera
// fermee automatiquement quand l'objet JavaScript sera garbage collected.
let win = null;
function createWindow () {
  // Créer le browser window.
  win = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      nodeIntegration: true
    }
  });
  win.maximize();

  // and load the index.html of the app.
  win.loadFile('index.html');

  // Ouvre les DevTools.
  win.webContents.openDevTools();

  // Émit lorsque la fenêtre est fermée.
  win.on('closed', () => {
    // Dé-référence l'objet window , normalement, vous stockeriez les fenêtres
    // dans un tableau si votre application supporte le multi-fenêtre. C'est le moment
    // où vous devez supprimer l'élément correspondant.
    win = null
  });
}

ipcMain.on('json-request', (event, arg) => {
  switch (arg) {
    case "summoner":
      event.returnValue = summonerJson;
      break;

    case "activeGame":
      event.returnValue = activeGameJson;
      break;

    case "champions":
      event.returnValue = championsJson;
      break;

    case "items":
      event.returnValue = itemsJson;
      break;

    case "masteries":
      event.returnValue = masteriesJson;
      break;

    case "runes":
      event.returnValue = runesJson;
      break;

    case "summonerSpells":
      event.returnValue = summonerSpellsJson;
      break;
  }
});


// Cette méthode sera appelée quant Electron aura fini
// de s'initialiser et sera prêt à créer des fenêtres de navigation.
// Certaines APIs peuvent être utilisées uniquement quand cet événement est émit.
app.on('ready', createWindow);

// Quitte l'application quand toutes les fenêtres sont fermées.
app.on('window-all-closed', () => {
  // Sur macOS, il est commun pour une application et leur barre de menu
  // de rester active tant que l'utilisateur ne quitte pas explicitement avec Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // Sur macOS, il est commun de re-créer une fenêtre de l'application quand
  // l'icône du dock est cliquée et qu'il n'y a pas d'autres fenêtres d'ouvertes.
  if (win === null) {
    createWindow();
  }
});
