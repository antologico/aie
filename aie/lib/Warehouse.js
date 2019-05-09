var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import AIEHTMLMonitor from './AIEHTMLMonitor';
export default class Warehouse {
    constructor(name) {
        this.name = name;
    }
}
export class IndexDBWarehouse extends Warehouse {
    constructor(name) {
        super(name);
        this.request = null;
        this.store = null;
        if (window.indexedDB) {
            const request = window.indexedDB.open("AIE_" + name);
            this.enable = new Promise(resolve => {
                request.onerror = () => {
                    AIEHTMLMonitor.error('[AIE] Error creating/loading DB');
                    resolve(false);
                };
                request.onupgradeneeded = () => {
                    const db = request.result;
                    this.store = db.createObjectStore('elementos', { keyPath: 'id' });
                    this.store.createIndex('id', 'id', { unique: true });
                    this.store.createIndex('value', 'value', { unique: false });
                    AIEHTMLMonitor.log('[AIE] IndexDB enabled');
                    resolve(true);
                };
            });
        }
    }
    isEnabled() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('isEnabled?');
            const e = yield this.enable;
            console.log('isEnable = ', e);
            return e;
        });
    }
    remove(id) {
        this.isEnabled();
        this.store.delete(id);
    }
    save(id, value) {
        this.isEnabled();
        this.store.add(id, value);
    }
    get(id) {
        this.isEnabled();
        return new Promise(resolve => {
            const v = this.store.get(id);
            v.onsuccess = (event) => {
                resolve(event.target.result.name);
            };
            v.onerror = () => {
                AIEHTMLMonitor.log('[AIE] Error get value from DB');
                resolve(0);
            };
        });
    }
    loadFromDB(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.get(id);
            return res;
        });
    }
    load(id) {
        const e = this.isEnabled();
        return e ? this.loadFromDB(id) : 0;
    }
    isAvailable() {
        const e = this.isEnabled();
        return !!(e);
    }
}
export class LocalStorageWarehouse extends Warehouse {
    remove(id) {
        localStorage.removeItem(id);
    }
    save(id, value) {
        localStorage.setItem(id, value);
    }
    load(id) {
        const value = localStorage.getItem(id);
        return value ? parseFloat(value) : 0;
    }
    isAvailable() {
        AIEHTMLMonitor.log('[AIE] IndexDB available');
        return true;
    }
}
//# sourceMappingURL=Warehouse.js.map