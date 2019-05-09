import AIEMemory from './AIEMemory';
import AIEHTMLMonitor from './AIEHTMLMonitor';
import { IndexDBWarehouse, LocalStorageWarehouse } from './Warehouse';
export default class AIEHTMLMemory extends AIEMemory {
    constructor(name) {
        super(name);
        this.name = name;
    }
    getWarehouseAvailble() {
        const indexDB = new IndexDBWarehouse(name);
        if (indexDB.isAvailable()) {
            return indexDB;
        }
        AIEHTMLMonitor.log('[AIE] LocalStorage enabled');
        return new LocalStorageWarehouse(name);
    }
    loadScoreFromStore(id) {
        return this.warehouse.load(id);
    }
    saveScoreToStore(id, value) {
        this.warehouse.save(id, `${value}`);
    }
    removeScoreFromStore(id) {
        this.warehouse.remove(id);
    }
}
//# sourceMappingURL=AIEHTMLMemory.js.map