import AIE from './AIE'
import AIEElement from './AIEElement'
import AIEHTMLElement from './AIEHTMLElement'
import AIEAbstractPrestanceSpeed from './AIEAbstractPrestanceSpeed'
import AIEAbstractMaduration from './AIEAbstractMaduration'
import AIEDefaultPrestanceSpeed from './AIEDefaultPrestanceSpeed'
import AIEDefaultMaduration from './AIEDefaultMaduration'

/*
  The BaseElement is a DOM element
*/
export default class AIEHTML extends AIE {
  public getElements():NodeListOf<HTMLElement> {
    return document.querySelectorAll('[aie]')
  }

  public createElement(el: HTMLElement): AIEElement {
    return new AIEHTMLElement(el)
  }

  public getPrestanceSpeed(): AIEAbstractPrestanceSpeed {
    return new AIEDefaultPrestanceSpeed()
  }

  public getMaduration(): AIEAbstractMaduration {
    return new AIEDefaultMaduration()
  }

  public updateAIEESpace(): void {
    if (!(<any>window).aiee) {
      (<any>window).aiee = []
    }
    (<any>window).aiee.push(this)
  }
}
