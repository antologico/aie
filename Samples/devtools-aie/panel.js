const templateItem = document.getElementById('item-template').innerHTML
const templateList = document.getElementById('list-template').innerHTML
let tabId = chrome.devtools.inspectedWindow.tabId
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

const getPrestace = (prestance) => prestance ? prestance.toFixed(4) : ''

function generateItem ({ name, prestance, children}, id) {
  let htmlCode = templateItem.replace(/{id}/g, name)
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
    const map = list.reduce((prev, {name, prestance, children}) => ([
      ...prev,
      ...flatTree(children),
      { name, prestance },
    ]), [])
    return map
  }
}

function updateValues(list) {
  if (!list || list.length === 0) {
    return null
  }
  const valueList = flatTree(list)
  const minVal = valueList.map(a => a.prestance).reduce((a, b) => Math.min(a, b), 1)
  const maxVal = valueList.map(a => a.prestance).reduce((a, b) => Math.max(a, b), 0)
  if (list) {
    valueList.map(({name, prestance}) => {
      const el = document.getElementById(`value_${name}`)
      const arrowEl = document.getElementById(`arrow_${name}`)
      if (el) {
        const color = 'rgb(100, 100, ' + parseInt(255*(prestance-minVal)/(maxVal-minVal)) + ')'
        el.style.color = color
        arrowEl.style.color = color
        const prevValue = parseFloat(el.innerHTML)
        if (prevValue > prestance) {
          arrowEl.innerHTML = '&darr;'
        }
        if (prevValue < prestance) {
          arrowEl.innerHTML = '&uarr;'
        }
        el.innerHTML = getPrestace(prestance)
      }
    })
  }
}

var port = chrome.runtime.connect(null, { name: "panel" })

function reciveUpdate ({ prestances: prestancesJSON }) {
  if (printing || !prestancesJSON) {
    return
  }
  
  printing = true
  const prestances = JSON.parse(prestancesJSON)
  
  if (init == false) {
    init = true
    document.getElementById('loader').classList.add('hide');
    drawTable(prestances)
  } else {
    updateValues(prestances)
  }
  printing = false
}

function reciveMark (mark, { name }) {
  const el = document.getElementById('label_' + name)
  if (el) {
    mark ? el.classList.add('mark') : el.classList.remove('mark')
  }
}

port.onMessage.addListener((message) => {
  if (message.target !== 'panel') {
    return
  }
  switch(message.action) {
    case 'aie-update':
      reciveUpdate(message)
      break
    case 'aie-mark':
      reciveMark (true, message)
      break
    case 'aie-unmark':
      reciveMark (false, message)
      break
  }
})

/**
 * Helper for sending a message to the background script.
 */
function post(message) {
  message.tabId = tabId
  port.postMessage(message)
}

function sendMark (marked, element) {
  if (element.hasAttribute('aie-name')) {
    chrome.runtime.sendMessage({
      action: marked ? 'aie-mark' : 'aie-unmark',
      name: element.getAttribute('aie-name'),
      target: 'content',
      tabId
    })
  }
}

document.addEventListener('mouseover', function (e) {
  sendMark (true, e.srcElement)
}, false)

document.addEventListener('mouseout', function (e) {
  sendMark (false, e.srcElement)
}, false)

document.getElementById('active-marks-checker').addEventListener('change', function (e) {
  chrome.runtime.sendMessage({
    action: e.srcElement.checked ? 'aie-active-mark' : 'aie-unactive-mark',
    target: 'content',
    tabId
  })
  e.srcElement.checked
}, false)


post({ action: 'init' })