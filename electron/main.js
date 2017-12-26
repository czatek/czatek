const { app, BrowserWindow, Tray, Menu, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

let prefix = '';
if (fs.existsSync(path.resolve(process.resourcesPath, 'app.asar'))) {
  prefix = path.resolve(process.resourcesPath, 'app.asar');
}

let mainWindow, tray;
function createWindow() {
  const menuTemplate = [
    { label: 'Pokaż', click: () => mainWindow.show() },
    { label: 'Ukryj', click: () => mainWindow.hide() },
    {
      label: 'Zamknij',
      click: () => {
        tray.destroy();
        app.quit();
      }
    }
  ];
  Menu.setApplicationMenu(
    Menu.buildFromTemplate([
      {
        label: 'Plik',
        submenu: menuTemplate
      }
    ])
  );

  tray = new Tray(path.resolve(prefix, 'build/icons/512x512.png'));
  tray.setToolTip('Pokaż lub ukryj czat.');
  tray.setContextMenu(Menu.buildFromTemplate(menuTemplate));
  tray.on('click', () => {
    if (mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      mainWindow.show();
    }
  });

  ipcMain.on('notification_click', _ => mainWindow.show());
  ipcMain.on('esc_pressed', _ => mainWindow.hide());
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    icon: path.resolve(prefix, 'build/icons/512x512.png'),
    webPreferences: {
      experimentalFeatures: true,
      preload: path.resolve(prefix, 'renderer.js')
    }
  });
  mainWindow.loadURL('https://czat.tk');

  mainWindow.on('close', event => {
    if (!tray.isDestroyed()) {
      event.preventDefault();
      mainWindow.hide();
    }
  });
}

app.on('ready', createWindow);
