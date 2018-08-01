// This is included and executed in the inspected page
const th = document.getElementsByTagName('body')[0]
const s = document.createElement('script')
s.setAttribute('type', 'text/javascript')
s.setAttribute('src', chrome.extension.getURL('loader.js'))
th.appendChild(s)
