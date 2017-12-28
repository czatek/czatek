window.onGapiLoaded = function() {
  if (window.onGapiReady) {
    window.onGapiReady();
  }
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/service-worker.js');
  });
}
