import AIEMemory from './AIEMemory'
import AIEHTMLMonitor from './AIEHTMLMonitor'
import Warehouse, { IndexDBWarehouse, LocalStorageWarehouse } from './Warehouse'

export default class AIEHTMLMemory extends AIEMemory {
  private name: string

  public constructor(name: string) {
    super (name)
    this.name = name
  }

  public getWarehouseAvailble (): Warehouse {
    const indexDB = new IndexDBWarehouse(name)
    if (indexDB.isAvailable()) {
      return indexDB;
    }
    AIEHTMLMonitor.log('[AIE] LocalStorage enabled')
    return new LocalStorageWarehouse(name)
  }

  public loadScoreFromStore (id: string): number {
    return this.warehouse.load(id)
  }

  public saveScoreToStore (id: string, value: number): void {
    this.warehouse.save(id, `${value}`)
  }

  public removeScoreFromStore (id: string): void {
    this.warehouse.remove(id)
  }
}
