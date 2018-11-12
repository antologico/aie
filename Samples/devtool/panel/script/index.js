import History from './History'
import Connection from './Connection'
import History from './History'
import HistoryPanel from './HistoryPanel'
import Panel from './Panel'
import StatePanel from './StatePanel'
import HitmapPanel from './HitmapPanel'
import ConfigPanel from './ConfigPanel'

const history = new History()
const historyPanel = new HistoryPanel(history)
const hitmapPanel = new HitmapPanel(history)
const statePanel = new StatePanel()
const connection = new Connection()
const configPanel = new ConfigPanel()
const panel = new Panel()

history.registerEvent('change', historyPanel.update.bind(historyPanel))
history.registerEvent('change', panel.updateMemoryField.bind(panel))

configPanel.registerEvent('onLevelChange', history.changeMaxLevels.bind(history))
configPanel.loadConfig()

connection.registerEvent('initValues', panel.reciveValues.bind(panel))
connection.registerEvent('initValues', statePanel.drawTable.bind(statePanel))
connection.registerEvent('updateValues', statePanel.updateValues.bind(statePanel))
connection.registerEvent('updateValues', hitmapPanel.update.bind(hitmapPanel))
connection.registerEvent('reciveMark', panel.changeMark.bind(panel))
connection.registerEvent('activeMark', panel.activeMark.bind(panel))
connection.registerEvent('onReceiveUpdate', history.add.bind(history))

panel.registerEvent('onDeleteHistory', history.clear.bind(history))
panel.registerEvent('onDeleteHistory', connection.deleteHistory.bind(connection))
panel.registerEvent('onApply', connection.applyState.bind(connection))
panel.registerEvent('onActiveMarksChange', connection.activeMarks.bind(connection))
panel.registerEvent('onMarkChange', connection.sendMark.bind(connection))
panel.registerEvent('onConnect', connection.sendConnect.bind(connection))

historyPanel.registerEvent('onApply', connection.applyState.bind(connection))
historyPanel.registerEvent('onRestore', connection.restoreScores.bind(connection))

connection.begin()