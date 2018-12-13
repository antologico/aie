import EventDispatcher from './EventDispatcher'
import { DEFAULT_MAX_LEVELS } from './History'

class ConfigPanel extends EventDispatcher {
    constructor () {    
        super()  
        this.levels = document.getElementById('config_level')

        this.events = {
            onLevelChange: () => {},
        }

        this.levels.addEventListener('input', (e) => this.onLevelChange(e.currentTarget.value))
    }

    loadConfig() {
        const levels = localStorage.getItem("aie.config.levels")
        this.levels.value = levels || DEFAULT_MAX_LEVELS
        this.events.onLevelChange(this.levels.value)
    }

    saveConfig(item, value) {
        localStorage.setItem("aie.config." + item, value)
    }

    onLevelChange (value) {
        this.events.onLevelChange(value)
        this.saveConfig('levels', value)
    }
}

export default ConfigPanel