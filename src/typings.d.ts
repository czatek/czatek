/* SystemJS module definition */
declare var module: NodeModule;
declare var gapi: any;
interface NodeModule {
  id: string;
}

interface Window {
  gapi: any;
  onGapiReady: any;
  ipcRenderer: any;
}
