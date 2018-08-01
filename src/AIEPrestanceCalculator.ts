import AIEAbstractMaduration from './AIEAbstractMaduration'
import AIEAbstractPrestanceSpeed from './AIEAbstractPrestanceSpeed'
import AIEElement from './AIEElement'

export default class AIEPrestanceCalculator {
  private maduration: AIEAbstractMaduration
  private speed: AIEAbstractPrestanceSpeed

  public constructor(speed: AIEAbstractPrestanceSpeed, maduration: AIEAbstractMaduration) {
    this.maduration = maduration
    this.speed = speed
  }

  public calculateIncrement(element: AIEElement): number {
    const interations = element.getInterations()
    const enviromentInterarions = element.getParentInteractions()
    const maduration = this.maduration.calculate(interations/enviromentInterarions)
    const speed = this.speed.calculate(interations)
    
    return speed * maduration
  }
}
