let initTable = false

function drawHeaders(header, levels) {
  const tr = document.createElement('tr')
  const vals = [...Array(levels+1).fill().keys()]
  vals.forEach((level) => {
      const th = document.createElement('th')
      tr.appendChild(th)
  })
  header.appendChild(tr)
}

function greenPercent(percent) {
  return `rgba(100, ${100 + (percent * 155)}, 100)`
}

function createUTFText (symbol) {
  return `&#x${symbol};`
}

function createUTFSymbol (symbol) {
  const el = document.createElement('span')
  el.innerHTML = createUTFText(symbol)
  return el
}

function drawLevel(aie, table, level, totalLevels, maxPrestance, className) {

    const trClass= 'parent_' + aie.name

    if (initTable) {
      if (level > 0) {
        const el = document.querySelector('[data-id="' + aie.name + '"] td:last-child')
        el.innerHTML = aie.prestance ? aie.prestance.toFixed(4) : '0'
        el.style.color = greenPercent(aie.prestance / maxPrestance)
        const starEl = document.querySelector('[data-id="' + aie.name + '"] td:first-child')
        starEl.innerHTML = (maxPrestance === aie.prestance) ? createUTFText('2606') : ''
      }
    } else {

      const tr = document.createElement('tr')

      if (level > 0) {
        const tdBlank = document.createElement('td')
        tdBlank.setAttribute('colspan', level)
        tr.appendChild(tdBlank)
      }

      const tdContent = document.createElement('td')
      tdContent.setAttribute('colspan', `${totalLevels - level}`)
      let content = document.createTextNode(aie.name)
      if (level === 0) {
        tdContent.appendChild(createUTFSymbol('2609'))
      } else {
        if (aie.children.length > 0) {
          const arrowElUp = document.createElement('span')
          arrowElUp.classList.add('arrowUp')
          arrowElUp.appendChild(createUTFSymbol('25B2'))
          const arrowElDown = document.createElement('span')
          arrowElDown.classList.add('arrowDown')
          arrowElDown.appendChild(createUTFSymbol('25BC'))
          tdContent.appendChild(arrowElUp)
          tdContent.appendChild(arrowElDown)
        }
      }
      tdContent.appendChild(content)
      tr.appendChild(tdContent)

      const tdPrestance = document.createElement('td')
      const prestance = document.createTextNode(aie.prestance ? aie.prestance.toFixed(4) : '0')

      tr.appendChild(tdPrestance)
      if (level > 0) {
        className.trim().split(' ').forEach((myClass) => tr.classList.add(myClass))
      } else {
        tr.classList.add('title')
      }


      tr.addEventListener('click', () => {
        let display = 'none'
        if (tr.hide) {
          display = 'table-row'
          tr.hide = false
          tr.classList.add('open')
        } else {
          tr.classList.remove('open')
          tr.hide = true
        }
        document.querySelectorAll('.'+trClass).forEach((el) =>{
          el.style.display = display
        })
      }, false)

      tr.classList.add('open')
      tr.setAttribute('data-id', aie.name)
      table.appendChild(tr)
    }

    aie.children.forEach((aie) => {
      drawLevel(aie, table, level + 1, totalLevels, maxPrestance, className + ' ' + trClass)
    })
}

function getMaxPrestance(aie) {
  let childrenPrestance = 0.1
  if (aie.children.length) {
    childrenPrestance = aie.children.map((el) => getMaxPrestance(el))
      .reduce((p, v) => ( p > v ? p : v ), 0)
  }
  return aie.prestance > childrenPrestance ? aie.prestance : childrenPrestance
}

function getDepth(aie, depth = 1) {
  if (aie.children.length) {
    return aie.children.map((el) => getDepth(el, depth + 1))
      .reduce((p, v) => ( p > v ? p : v ), 0)
  }
  return depth
}

function drawTable(prestances) {
  if (prestances) {
      const table = document.getElementById('mytable')
      const header = document.getElementById('myheader')
      const levels = getDepth(prestances)
      const maxPrestance = getMaxPrestance(prestances)
      if (!initTable) {
        table.innerHTML = ''
        header.innerHTML = ''
        drawHeaders(header, levels)
      }
      drawLevel(prestances, table, 0, levels, maxPrestance, '')
      initTable = true
  }
}

var port = chrome.runtime.connect(null, { name: "panel" });
var tabId = chrome.devtools.inspectedWindow.tabId;

port.onMessage.addListener(function(message, sender) {
  if (message.action == 'aie-update') {
    document.getElementById('loader').classList.add('hide');
    drawTable(JSON.parse(message.prestances)[0])
  }
});

/**
 * Helper for sending a message to the background script.
 */
function post(message) {
  message.tabId = tabId;
  port.postMessage(message);
}

post({action: "init"});