import EventDispatcher from './EventDispatcher'
import { DEFAULT_MAX_LEVELS } from './History'

const DEFAULT_AUTO_APPLY = 0

class ConfigPanel extends EventDispatcher {
    constructor (history) {    
        super()  
        this.history = history
        this.levels = document.getElementById('config_level')
        this.autoApply = document.getElementById('config_autoapply')

        this.events = {
            onLevelChange: () => {},
            onApply: () => {},
        }

        this.levels.addEventListener('input', (e) => this.onLevelChange(e.currentTarget.value))
        this.autoApply.addEventListener('input', (e) => this.onAutoApplyChange(e.currentTarget.value))
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

    update () {
        const val = parseInt(this.autoApply.value)
        if (val && (this.history.getLength() % val === 0)) {
            this.events.onApply()
        }
    }
}

export default ConfigPanel