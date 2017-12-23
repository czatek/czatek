/* SystemJS module definition */
declare var module: NodeModule;
declare var gapi: any;
interface NodeModule {
  id: string;
}

interface Window {
  onGapiReady: any;
  gapiLoaded: boolean;
}
