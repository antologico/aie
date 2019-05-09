import Warehouse, { IndexDBWarehouse, LocalStorageWarehouse } from './Warehouse'

export default abstract class AIEMemory {
  private id: string
  private score: number
  protected warehouse: Warehouse

  public constructor(id: string) {
    this.id = id
    this.warehouse = this.getWarehouseAvailble()
    this.score = this.loadScoreFromStore(id)
  }

  public setId(id: string) {
    this.id = id
    this.removeScoreFromStore(id)
    this.saveScoreToStore(id, this.score)
  }

  public anoteEvent(goal = 1) {
    this.score += goal
    this.saveScoreToStore(this.id, this.score)
  }

  public getScore(): number {
    return this.score
  }

  public setScore(score: number) {
    return this.score = score
    this.saveScoreToStore(this.id, this.score)
  }

  public abstract getWarehouseAvailble (): Warehouse
  public abstract loadScoreFromStore (id: string): number
  public abstract saveScoreToStore (id: string, value: number): void
  public abstract removeScoreFromStore (id: string): void
}
