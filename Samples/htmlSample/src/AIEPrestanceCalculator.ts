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

    const interactionsPercent = interactions/enviromentInterarions
    const date = element.getDate()
    const lifePercent = element.getLife(date) / element.getParentLife(date)

    const maduration = this.maduration.calculate(interactionsPercent, lifePercent)
    const speed = this.speed.calculate(interactions)

    return speed * maduration
  }
}
