import AIEAbstractMaduration from './AIEAbstractMaduration'
import AIEAbstractPregnancySpeed from './AIEAbstractPregnancySpeed'
import AIEElement from './AIEElement'

export default class AIEPregnancyCalculator {
  private maduration: AIEAbstractMaduration
  private speed: AIEAbstractPregnancySpeed

  public constructor(speed: AIEAbstractPregnancySpeed, maduration: AIEAbstractMaduration) {
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
