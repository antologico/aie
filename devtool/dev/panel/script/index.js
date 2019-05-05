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
const configPanel = new ConfigPanel(history)
const panel = new Panel()

history.registerEvent('change', historyPanel.update.bind(historyPanel))
history.registerEvent('change', panel.updateMemoryField.bind(panel))

configPanel.registerEvent('onLevelChange', history.changeMaxLevels.bind(history))
configPanel.registerEvent('onApply', connection.applyState.bind(connection))
configPanel.registerEvent('onLoadFromServer', connection.onLoadFromServer.bind(connection))
connection.registerEvent('onMessage', panel.onMessage.bind(panel))
configPanel.loadConfig()

connection.registerEvent('onFailUpdate', configPanel.enableFromServerButton.bind(configPanel))
connection.registerEvent('initValues', panel.reciveValues.bind(panel))
connection.registerEvent('initValues', statePanel.drawTable.bind(statePanel))
connection.registerEvent('initValues', configPanel.update.bind(configPanel))
connection.registerEvent('updateValues', statePanel.updateValues.bind(statePanel))
connection.registerEvent('updateValues', hitmapPanel.update.bind(hitmapPanel))
connection.registerEvent('updateValues', configPanel.update.bind(configPanel))
connection.registerEvent('reciveMark', panel.changeMark.bind(panel))
connection.registerEvent('activeMark', panel.activeMark.bind(panel))
connection.registerEvent('onReceiveUpdate', history.add.bind(history))
connection.registerEvent('onClean', history.clean.bind(history))

panel.registerEvent('onDeleteHistory', history.clean.bind(history))
panel.registerEvent('onDeleteHistory', connection.deleteHistory.bind(connection))
panel.registerEvent('onApply', connection.applyState.bind(connection))
panel.registerEvent('onActiveMarksChange', connection.activeMarks.bind(connection))
panel.registerEvent('onMarkChange', connection.sendMark.bind(connection))
panel.registerEvent('onConnect', connection.sendConnect.bind(connection))
panel.registerEvent('onFilterHitmap', hitmapPanel.onSearchChange.bind(hitmapPanel))

hitmapPanel.registerEvent('onApply', connection.applyState.bind(connection))
hitmapPanel.registerEvent('onRestore', connection.applyState.bind(connection))

historyPanel.registerEvent('onApply', connection.applyState.bind(connection))
historyPanel.registerEvent('onRestore', connection.restoreScores.bind(connection))

connection.begin()