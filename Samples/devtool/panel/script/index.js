import History from './History'
import Connection from './Connection'
import History from './History'
import HistoryPanel from './HistoryPanel'
import Panel from './Panel'
import PrestacesPanel from './PrestacesPanel'

const history = new History()
const historyPanel = new HistoryPanel(history)
const prestancesPanel = new PrestacesPanel()
const connection = new Connection()
const panel = new Panel()

history.registerEvent('change', historyPanel.update.bind(historyPanel))
history.registerEvent('change', panel.updateMemoryField.bind(panel))

connection.registerEvent('initValues', prestancesPanel.drawTable.bind(prestancesPanel))
connection.registerEvent('updateValues', prestancesPanel.updateValues.bind(prestancesPanel))
connection.registerEvent('reciveMark', panel.changeMark.bind(panel))
connection.registerEvent('reciveMark', panel.changeMark.bind(panel))
connection.registerEvent('onReceiveUpdate', history.add.bind(history))

panel.registerEvent('onDeleteHistory', history.clear.bind(history))
panel.registerEvent('onDeleteHistory', connection.deleteHistory.bind(connection))
panel.registerEvent('onApply', connection.applyPrestances.bind(connection))
panel.registerEvent('onActiveMarksChange', connection.activeMarks.bind(connection))
panel.registerEvent('onMarkChange', connection.sendMark.bind(connection))
panel.registerEvent('onConnect', connection.sendConnect.bind(connection))

historyPanel.registerEvent('onApply', connection.applyPrestances.bind(connection))
historyPanel.registerEvent('onRestore', connection.restoreScores.bind(connection))

connection.begin()