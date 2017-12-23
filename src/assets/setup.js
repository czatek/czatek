window.onGapiLoaded = () => {
  window.gapiLoaded = true
  if (window.onGapiReady) {
    window.onGapiReady()
  }
}
