import AIEHTMLMonitor from './AIEHTMLMonitor'


export default abstract class Warehouse {
    private name: string
  
    public constructor(name: string) {
      this.name = name
    }
  
    static function initWarehouse(name: stringm ,fn: CallableFunction): Warehouse {
        const iDB = new IndexDBWarehouse(name, (result) => 
            result 
                ? this,
                :
        )
    }

    public abstract remove(id: string): void
    public abstract save(id: string, value: string): void
    public abstract load(id: string): number
  }
  
export class IndexDBWarehouse extends Warehouse {
    private static store: IDBObjectStore = null

    constructor (name: string) {
      super(name)
    }
  
    public enable (name: string, fn: CallableFunction) {
        if (window.indexedDB) {
            const request = window.indexedDB.open("AIE_" + name)
            new Promise(resolve => {
                request.onerror = () => {
                    AIEHTMLMonitor.error('[AIE] Error creating/loading DB');
                    fn(false)
                };
        
                request.onupgradeneeded = () => {
                    const db:IDBDatabase = request.result
                    IndexDBWarehouse.store = db.createObjectStore('elementos', { keyPath: 'id' })
                    IndexDBWarehouse.store.createIndex('id', 'id', { unique: true })
                    IndexDBWarehouse.store.createIndex('value', 'value', { unique: false })                
                    AIEHTMLMonitor.log('[AIE] IndexDB enabled')
                    fn(true)
                }
            })
        } else {
            fn(false)
        }
    }

    public remove(id: string): void {
        IndexDBWarehouse.store.delete(id);
    }
  
    public save(id: string, value: string): void {
        IndexDBWarehouse.store.add(id, value);
    }
  
    private get (id: string): Promise<number> {
      return new Promise(resolve => {
        const v = IndexDBWarehouse.store.get(id)
        v.onsuccess = (event: any) => {
          resolve(event.target.result.name)
        }
        v.onerror = () => {
          AIEHTMLMonitor.log('[AIE] Error get value from DB')
          resolve(0)
        }
      })
    }
  
    private async loadFromDB (id: string): Promise<number> {
      const res: number = await this.get(id) 
      return res
    }
  
    public load (id: string): number {
      return <number>(<unknown> this.loadFromDB(id))
    }
  }
  
export class LocalStorageWarehouse extends Warehouse {
    public remove(id: string): void {
      localStorage.removeItem(id)
    }
    public save(id: string, value: string): void {
      localStorage.setItem(id, value)
    }
    public load(id: string): number {
      const value = localStorage.getItem(id)
      return value ? parseFloat(value) : 0
    }
  }
  
  