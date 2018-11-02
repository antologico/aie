import EventDispatcher from './EventDispatcher'
import MemoryBlock from './MemoryBlock'

class History extends EventDispatcher {
    constructor () {
      super()
      this.maxItems = 50
      this.history = []
      this.disabled = false
      this.events = {
        change: () => {},
      }
    }
  
    disable (disabled = true) {
      this.disabled = disabled
    }
  
    add ({event, state, element}) {
      if (!this.disabled) {
        if (this.maxItems) {
          if (this.history.length >= this.maxItems) {
            this.history.splice(0, this.history.length + 1 - this.maxItems)
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
      console.log('moveHeader', i)
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
  }

  export default History