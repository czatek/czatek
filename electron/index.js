const { app, BrowserWindow, Tray, Menu } = require('electron');
const path = require('path');
const fs = require('fs');

let prefix = '';
if (fs.existsSync(path.resolve(process.resourcesPath, 'app.asar'))) {
  prefix = path.resolve(process.resourcesPath, 'app.asar');
}

let mainWindow, tray;
function createTray() {
  tray = new Tray(path.resolve(prefix, 'build/icons/512x512.png'));
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Pokaż', type: 'normal', click: () => mainWindow.show() },
    { label: 'Ukryj', type: 'normal', click: () => mainWindow.hide() },
    {
      label: 'Zamknij',
      type: 'normal',
      click: () => {
        tray.destroy();
        app.quit();
      }
    }
  ]);

  tray.setToolTip('Czatek.');
  tray.setContextMenu(contextMenu);
  tray.on('click', () => {
    if (mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      mainWindow.show();
    }
  });

  createWindow();
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    icon: path.resolve(prefix, 'build/icons/512x512.png')
  });
  mainWindow.loadURL('https://czat.tk');

  mainWindow.on('close', event => {
    if (!tray.isDestroyed()) {
      event.preventDefault();
      mainWindow.hide();
    }
  });
}

app.on('ready', createTray);
