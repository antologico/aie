const templateItem = document.getElementById('item-template').innerHTML
const templateList = document.getElementById('list-template').innerHTML
const container = document.getElementById('container')
let init = false
let printing = false

function generateList (list, id) {
  if (!list || list.length === 0) {
    return ''
  }
  let htmlCode = templateList.replace(
    /{items}/,
    list.map((item, key) => generateItem(item, `${id}_${key}`)).join('')
  )
  return htmlCode
}

const getPrestace = (prestance) => prestance ? prestance.toFixed(4) : '0'

function generateItem ({ name, prestance, children}, id) {
  let htmlCode = templateItem.replace(/{id}/g, id)
  htmlCode = htmlCode.replace(/{name}/g, name)
  htmlCode = htmlCode.replace(/{value}/i, getPrestace(prestance))
  htmlCode = htmlCode.replace(
    /{content}/i,
    generateList(children, id))

  return htmlCode
}

function drawTable(prestances) {
  if (prestances) {
    container.innerHTML = generateList(prestances, '0')
  }
}

function flatTree (list) {
  if (!list || list.length === 0) {
    return []
  }
  if (list) {
    list.reduce(({prestance, children}) => ([
      prestance,
      ...flatTree(children)
    ]), [])
  }
}

function updateValues(list) {
  if (!list || list.length === 0) {
    return null
  }
  console.log(flatTree(list))
  if (list) {
    list.map(({name, prestance, children}) => {
      document.getElementById(`value_${name}`).innerHTML = getPrestace(prestance)
      updateValues(children)
    })
  }
}

var port = chrome.runtime.connect(null, { name: "panel" });
var tabId = chrome.devtools.inspectedWindow.tabId;

port.onMessage.addListener(function(message) {
  if (message.action == 'aie-update') {
    if (!printing) {
        printing = true
      if (!message.prestances) {
        return null
      }
      printing = true
      const prestances = JSON.parse(message.prestances)
      if (init == false) {
        init = true;
        document.getElementById('loader').classList.add('hide');
        drawTable(prestances)
      } else {
        updateValues(prestances)
      }
      printing = false
    }
  }
});

/**
 * Helper for sending a message to the background script.
 */
function post(message) {
  message.tabId = tabId;
  port.postMessage(message);
}

post({action: 'init'});