import EventDispatcher from './EventDispatcher'
import MemoryBlock from './MemoryBlock'

export const DEFAULT_MAX_LEVELS = 1000

class History extends EventDispatcher {
    constructor () {
      super()
      this.maxLevels = null
      this.history = []
      this.disabled = false
      this.events = {
        change: () => {},
      }
    }
  
    changeMaxLevels (maxLevels) {
      this.maxLevels = maxLevels
    }

    disable (disabled = true) {
      this.disabled = disabled
    }
  
    add ({event, state, element}) {
      if (!this.disabled) {
        if (this.maxLevels) {
          if (this.history.length >= this.maxLevels) {
            this.history.splice(0, this.history.length + 1 - this.maxLevels)
          }
        }
        this.history.push ({
          time: new Date(),
          event,
          element,
          state,
        })
        this.events.change(this)
      }
    }
  
    clear () {
      this.history = []
      this.events.change(this)
    }
  
    getConsumedMemory () {
      return MemoryBlock.calculate(this.history)
    }
  
    getList () {
      return this.history
    }
  
    toItem (index) {
      const i = parseInt(index)
      const item = this.history[i]
      this.moveHeader(i)
      this.events.change(this)
      return item
    }
  
    getItem (index) {
      return this.history[parseInt(index)]
    }

    moveHeader (index) {
      this.history.length = index+1
    }
  
    getMoment(time) {
      return this.history.find((item) => item.time === time)
    }

    getLength() {
      return this.history.length
    }
  }

  export default History