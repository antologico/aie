import AIEAbstractMaduration from './AIEAbstractMaduration'
import AIEAbstractMutation from './AIEAbstractMutation'
import AIEElement from './AIEElement'
import AIE from './AIE';

export default class AIEPregnancyCalculator {
  private maduration: AIEAbstractMaduration
  private mutation: AIEAbstractMutation
  private speed: number
  private aie: AIE

  public constructor(aie:AIE, speed: number, maduration: AIEAbstractMaduration, mutation: AIEAbstractMutation) {
    this.aie = aie
    this.maduration = maduration
    this.speed = speed
    this.mutation = mutation
  }

  public calculate(element: AIEElement): number { 
    this.aie.addCycle()

    const interactions = element.getInteractions()
    const enviromentInterarions = element.getEnvInteractions()
    const interactionsPercent = enviromentInterarions ? interactions/enviromentInterarions : 0
    const mutation = this.mutation.calculate(
      this.speed,
      interactionsPercent,
      element.getParent().getPregnancy())
    
      const pregnancy = this.maduration.calculate(
      mutation,
      element.getPregnancy(),
      this.aie.getCycles(),
      this.aie.getMaxUpdatedCycles()
    )
    return pregnancy
  }
}
