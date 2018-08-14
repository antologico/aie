let port
let activeMaks = false

/**
 * Lazily setup port for communication with the background script
 * and send initialization message.
 */
function setupPortIfNeeded() {
    if (!port) {
      port = chrome.runtime.connect(null, { name: 'content' });
      port.postMessage({ action: 'init' })
      port.onDisconnect.addListener(function () {
        port = null
      });
    }
  }
  
  /**
   * Send mouse coordinates to DevTools panel script.
   */
  function sendPrestances(event) {
    setupPortIfNeeded()
    port.postMessage({
      action: 'aie-update',
      prestances: event.detail,
      target: 'panel',
    });
  }
  
  // Unique ID for the className.
const MOUSE_VISITED_CLASSNAME = 'aie_mouse_highlight';

function mark (marked, element) {
  if (!activeMaks) {
    return
  }
  if (!element) {
    return
  }
  if (element.hasAttribute('aie-name')) {
    marked ?
      element.classList.add(MOUSE_VISITED_CLASSNAME) :
      element.classList.remove(MOUSE_VISITED_CLASSNAME)
  }
}

function sendMark (marked, element) {
  if (!activeMaks) {
    return
  }
  if (element.hasAttribute('aie-name')) {
    mark(marked, element)
    port.postMessage({
      action: marked ? 'aie-mark' : 'aie-unmark',
      name: element.getAttribute('aie-name'),
      target: 'panel',
    });
  }
}

chrome.runtime.onMessage.addListener(function({ target, action, name }) {
  if (target !== 'content') {
    return
  }
  switch(action) {
    case 'aie-mark':
      mark (true, document.querySelector(`[aie-name="${name}"]`))
      break
    case 'aie-unmark':
      mark (false, document.querySelector(`[aie-name="${name}"]`))
      break
    case 'aie-active-mark':
      console.info('[AIEE Extension] Marker active')
      activeMaks = true
      break
    case 'aie-unactive-mark':
      console.info('[AIEE Extension] Marker unactive')
      activeMaks = false
      break
  }
})  


document.addEventListener('mouseover', function (e) {
  setupPortIfNeeded();
  sendMark(true, e.srcElement)
}, false)

document.addEventListener('mouseout', function (e) {
  setupPortIfNeeded();
  sendMark(false, e.srcElement)
}, false)

console.info('[AIEE Extension] Loaded')
  
window.addEventListener('aie-update', event => sendPrestances(event))