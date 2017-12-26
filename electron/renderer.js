window.ipcRenderer = require('electron').ipcRenderer;

window.onkeydown = function(event) {
  if (event.keyCode == 27) {
    window.ipcRenderer.send('esc_pressed');
  }
};
