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

function drawLevel(aie, table, level, totalLevels, maxPrestance, className) {

    const trClass= 'parent_' + aie.name

    if (initTable) {
      if (level > 0) {
        const el = document.querySelector('[data-id="' + aie.name + '"] td:last-child')
        el.innerHTML = aie.prestance.toFixed(4)
        el.style.color = greenPercent(aie.prestance / maxPrestance)
        const starEl = document.querySelector('[data-id="' + aie.name + '"] td:first-child')
        starEl.innerHTML = (maxPrestance === aie.prestance) ? '★' : ''
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
        tdContent.appendChild(document.createTextNode('☉ '))
      } else {
        if (aie.children.length > 0) {
          const arrowElUp = document.createElement('span')
          arrowElUp.classList.add('arrowUp')
          arrowElUp.appendChild(document.createTextNode('▲'))
          const arrowElDown = document.createElement('span')
          arrowElDown.classList.add('arrowDown')
          arrowElDown.appendChild(document.createTextNode('▼'))
          tdContent.appendChild(arrowElUp)
          tdContent.appendChild(arrowElDown)
        }
      }
      tdContent.appendChild(content)
      tr.appendChild(tdContent)

      const tdPrestance = document.createElement('td')
      const prestance = document.createTextNode(aie.prestance.toFixed(4))

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

function drawTable(aiee) {
  if (aiee) {
    if (aiee.length) {
      const table = document.getElementById('mytable')
      const header = document.getElementById('myheader')
      const prestances = window.aiee[0].getPrestances()
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
}

document.getElementById('loader').innerHTML='loading.2..'

chrome.runtime.onMessageExternal.addListener(
	function(request, sender, sendResponse) {
    console.log('request', request, sender, sendResponse)
    if (sender.url == blacklistedWebsite) {
			// Don’t allow this web page access
			return;
		}
		if (request.openUrlInEditor) {
			openUrl(request.openUrlInEditor);
		}
	}
);
