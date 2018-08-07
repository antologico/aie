var port

/**
 * Lazily setup port for communication with the background script
 * and send initialization message.
 */
function setupPortIfNeeded() {
    if (!port) {
      port = chrome.runtime.connect(null, { name: "content" });
      port.postMessage({ action: "init" })
      port.onDisconnect.addListener(function () {
        port = null
      });
    }
  }
  
  /**
   * Send mouse coordinates to DevTools panel script.
   */
  function sendPrestances(event) {
    setupPortIfNeeded();
    port.postMessage({
      action: "aie-update",
      prestances: event.detail,
      target: "panel",
    });
  }
  
  console.log('[AIEE Extension] Loaded')
  
  window.addEventListener("aie-update", event => sendPrestances(event))