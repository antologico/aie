import EventDispatcher from './EventDispatcher'
import { DEFAULT_MAX_LEVELS } from './History'

const DEFAULT_AUTO_APPLY = 0

class ConfigPanel extends EventDispatcher {
    constructor (history) {    
        super()  
        this.history = history
        this.levels = document.getElementById('config_level')
        this.autoApply = document.getElementById('config_autoapply')
        this.md5Field = document.getElementById('config_md5')
        this.nameField = document.getElementById('config_name')
        this.loadFromServerButton = document.getElementById('config_load_from_server')
        this.serverField = document.getElementById('config_loader_server')
        this.serverUrl = document.getElementById('config_get_call')

        this.events = {
            onLevelChange: () => {},
            onApply: () => {},
            onLoadFromServer: () => {},
            onError: () => {},
        }

        this.updateServerURI(localStorage.getItem('aie_server'))

        this.serverField.addEventListener('input', (e) => this.updateServerURI(e.currentTarget.value))
        this.levels.addEventListener('input', (e) => this.onLevelChange(e.currentTarget.value))
        this.autoApply.addEventListener('input', (e) => this.onAutoApplyChange(e.currentTarget.value))
        this.loadFromServerButton.addEventListener('click', 
            () => {
                this.enableFromServerButton('Data loaded from server', 'message')
                this.events.onLoadFromServer({
                baseUrl: this.serverField.value,
                md5: this.history.getMD5(),
                name: this.history.getName()
            })}
        )
    }

    enableFromServerButton() {
        this.loadFromServerButton.removeAttribute('disabled')
    }

    loadConfig() {
        const levels = localStorage.getItem("aie.config.levels")
        const autoApply = localStorage.getItem("aie.config.autoApply")
        this.levels.value = levels || DEFAULT_MAX_LEVELS
        this.autoApply.value = autoApply || DEFAULT_AUTO_APPLY
        this.events.onLevelChange(this.levels.value)
    }

    saveConfig(item, value) {
        localStorage.setItem("aie.config." + item, value)
    }

    onLevelChange (value) {
        this.events.onLevelChange(value)
        this.saveConfig('levels', value)
    }

    onAutoApplyChange (value) {
        this.saveConfig('autoApply', value)
    }

    updateServerURI (server) {
        if (server) {
            localStorage.setItem('aie_server', server)
            this.serverUrl.innerHTML =
                server + '/' +
                this.history.getName() + '/' +
                this.history.getMD5()
        }
    }

    update () {
        const val = parseInt(this.autoApply.value)
        this.md5Field.value = this.history.getMD5()
        this.nameField.value = this.history.getName()
        this.loadFromServerButton.removeAttribute('disabled')
        this.updateServerURI(this.serverField.value)
        if (val && (this.history.getLength() % val === 0)) {
            this.events.onApply()
        }
    }
}

export default ConfigPanel