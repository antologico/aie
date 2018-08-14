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
    const interactions = element.getInteractions()
    const enviromentInterarions = element.getParentInteractions()
    const maduration = this.maduration.calculate(interactions/enviromentInterarions)
    const speed = this.speed.calculate(interactions)
    console.log(element.getName(), { interactions, enviromentInterarions, speed, maduration, total: speed * maduration })
    return speed * maduration
  }
}
