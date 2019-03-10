/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/lib";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class AIEMonitor {
    static addEnvironments(env) {
        AIEMonitor.environments.push(env);
    }
    static getState() {
        return AIEMonitor.environments.map((env) => env.getState());
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AIEMonitor;

AIEMonitor.environments = [];


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AIEMonitor__ = __webpack_require__(0);

class AIEHTMLMonitor extends __WEBPACK_IMPORTED_MODULE_0__AIEMonitor__["a" /* default */] {
    static restorePrestances(event) {
        const prestances = JSON.parse(event.detail);
        AIEHTMLMonitor.log('[AIE] AIEHTMLMonitor restore prestances');
        prestances.map((group) => {
            const aie = __WEBPACK_IMPORTED_MODULE_0__AIEMonitor__["a" /* default */].environments.find((env) => env.getName() === group.name);
            if (aie) {
                aie.setState(group);
            }
        });
    }
    static mutateElements(event) {
        const prestances = JSON.parse(event.detail);
        AIEHTMLMonitor.log('[AIE] AIEHTMLMonitor mutate elements');
        prestances
            ? prestances.map((group) => {
                const aie = __WEBPACK_IMPORTED_MODULE_0__AIEMonitor__["a" /* default */].environments.find((env) => env.getName() === group.name);
                if (aie) {
                    aie.setState(group);
                    aie.mutate();
                }
            })
            : __WEBPACK_IMPORTED_MODULE_0__AIEMonitor__["a" /* default */].environments.forEach((env) => env.mutate());
        AIEHTMLMonitor.sendPrestances('Reconnect', 'Document', 'All');
    }
    static sendPrestances(eventName = '', elementName = '', environmentName = '') {
        AIEHTMLMonitor.log('[AIE] AIEHTMLMonitor send prestances for <' + eventName + '>');
        const state = __WEBPACK_IMPORTED_MODULE_0__AIEMonitor__["a" /* default */].getState();
        if (state && state.length) {
            const detail = {
                event: eventName,
                aie: environmentName,
                element: elementName,
                state,
            };
            const event = new CustomEvent(AIEHTMLMonitor.eventSendName, { 'detail': JSON.stringify(detail) });
            window.dispatchEvent(event);
        }
    }
    static log(text) {
        AIEHTMLMonitor.enableLog && console.log(text);
    }
    static exposeEnviroments() {
        // Wait for events
        const w = window;
        w.addEventListener(AIEHTMLMonitor.eventConnectName, () => { AIEHTMLMonitor.sendPrestances('Reconnect', 'Document', 'All'); });
        w.addEventListener(AIEHTMLMonitor.eventRestoreName, AIEHTMLMonitor.restorePrestances);
        w.addEventListener(AIEHTMLMonitor.eventApplyName, AIEHTMLMonitor.mutateElements);
        // Dispatch events
        __WEBPACK_IMPORTED_MODULE_0__AIEMonitor__["a" /* default */].environments.map((env) => {
            env.registerEvent('change', (myEvent, element) => {
                AIEHTMLMonitor.sendPrestances(myEvent, element.getName(), env.getName());
            });
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AIEHTMLMonitor;

AIEHTMLMonitor.eventSendName = 'aie-update';
AIEHTMLMonitor.eventRestoreName = 'aie-restore';
AIEHTMLMonitor.eventConnectName = 'aie-connect';
AIEHTMLMonitor.eventApplyName = 'aie-mutate';
AIEHTMLMonitor.enableLog = true;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AIEHTML__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__AIEHTMLMonitor__ = __webpack_require__(1);



const initAIE = (name, selector) => {
    const aie = new __WEBPACK_IMPORTED_MODULE_0__AIEHTML__["a" /* default */](name, selector)
    aie.start() 
}

const exposeAIE = () => {
    __WEBPACK_IMPORTED_MODULE_1__AIEHTMLMonitor__["a" /* default */].exposeEnviroments() 
}

module.export = {
    initAIE,
    exposeAIE
}

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(3)(module)))

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = function(originalModule) {
	if(!originalModule.webpackPolyfill) {
		var module = Object.create(originalModule);
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		Object.defineProperty(module, "exports", {
			enumerable: true,
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AIE__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__AIEHTMLElement__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__AIEDefaultPrestanceSpeed__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__AIEDefaultMaduration__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__AIEHTMLMonitor__ = __webpack_require__(1);





/*
  The BaseElement is a DOM element
*/
class AIEHTML extends __WEBPACK_IMPORTED_MODULE_0__AIE__["a" /* default */] {
    constructor(name, context = 'body') {
        super(name, context);
    }
    getElements() {
        return document.querySelectorAll(this.getContext() + ' [aie-name]');
    }
    createElement(el) {
        return new __WEBPACK_IMPORTED_MODULE_1__AIEHTMLElement__["a" /* default */](el);
    }
    getPrestanceSpeed() {
        return new __WEBPACK_IMPORTED_MODULE_2__AIEDefaultPrestanceSpeed__["a" /* default */]();
    }
    getMaduration() {
        return new __WEBPACK_IMPORTED_MODULE_3__AIEDefaultMaduration__["a" /* default */]();
    }
    start() {
        __WEBPACK_IMPORTED_MODULE_4__AIEHTMLMonitor__["a" /* default */].log('[AIE] Running ...');
        super.start();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AIEHTML;



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AIEMonitor__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__AIEEventProcessor__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__AIEPrestanceCalculator__ = __webpack_require__(7);



class AIE {
    constructor(name, context) {
        this.eventProcessor = new __WEBPACK_IMPORTED_MODULE_1__AIEEventProcessor__["a" /* default */](this);
        this.name = name;
        this.context = context;
        this.prestanceCalculator = new __WEBPACK_IMPORTED_MODULE_2__AIEPrestanceCalculator__["a" /* default */](this.getPrestanceSpeed(), this.getMaduration());
        __WEBPACK_IMPORTED_MODULE_0__AIEMonitor__["a" /* default */].addEnvironments(this);
    }
    registerEvent(event, func) {
        this.eventProcessor.registerEvent(event, func);
    }
    estructureElements(elements) {
        const toRemove = [];
        elements.forEach((element, index) => {
            const elParent = this.getParentNode(elements, element.getBaseElementParent());
            if (elParent) {
                elParent.setChildren(element);
                toRemove.push(index);
            }
        });
        this.createEnvironment(elements.reduce((total, element, index) => {
            return toRemove.includes(index) ? total : total.concat(element);
        }, []));
    }
    getParentNode(elements, element) {
        if (!element) {
            return null;
        }
        const parent = elements.find((el) => {
            return el.getBaseElement() === element;
        });
        return !parent
            ? this.getParentNode(elements, element.parentNode)
            : parent;
    }
    getName() {
        return this.name;
    }
    createEnvironment(elements) {
        this.environment = this.createElement(null);
        this.environment.setName(this.name);
        elements.forEach((el) => this.environment.setChildren(el));
    }
    initializeElements(matches) {
        const elements = [];
        matches.forEach((el) => {
            const aiee = this.createElement(el);
            aiee.setPrestanceCalculator(this.prestanceCalculator);
            aiee.setProccesor(this.eventProcessor);
            elements.push(aiee);
        });
        this.estructureElements(elements);
    }
    start() {
        this.initializeElements(this.getElements());
    }
    getState() {
        return this.getElementState(this.environment);
    }
    setState(value, child = null) {
        const parent = child ? child : this.environment;
        parent.setScore(value.score);
        parent.setPrestance(value.prestance);
        value.children.map((childValues) => {
            const el = parent.getChildren().find((e) => e.getName() === childValues.name);
            if (el) {
                this.setState(childValues, el);
            }
        });
    }
    getContext() {
        return this.context;
    }
    mutate() {
        const maxGroupPrestance = this.environment.getMaxPrestance();
        this.environment.getChildren().forEach((child) => {
            child.mutate(maxGroupPrestance);
        });
    }
    getElementState(element) {
        const values = {
            name: element.getName(),
            prestance: element.getPrestance(),
            score: element.getScore(),
            properties: element.getPropertiesNames(),
            physicalAttribute: element.getPhysicalAttributes(),
            children: element.getChildren().map((children) => {
                return this.getElementState(children);
            })
        };
        return values;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AIE;



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class AIEEventProcessor {
    constructor(enviroment) {
        this.enviroment = enviroment;
        this.queue = [];
        this.events = {
            change: () => { },
        };
        this.interaction = 0;
        this.inspect();
    }
    notify(event) {
        this.queue.push(event);
    }
    registerEvent(event, func) {
        this.events[event] = func;
    }
    inspect() {
        const event = this.queue.shift();
        if (event) {
            if (event.element.hasParent()) {
                const elParent = event.element.getParent();
                const increment = event.element.updatePrestance();
                elParent.updateChildrenPrestance(-increment, [event.element]);
                elParent.onTrigger(event.name);
                event.name && this.events.change(event.name, event.element);
            }
        }
        setTimeout(this.inspect.bind(this), 0);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AIEEventProcessor;



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class AIEPrestanceCalculator {
    constructor(speed, maduration) {
        this.maduration = maduration;
        this.speed = speed;
    }
    calculateIncrement(element) {
        const interactions = element.getInteractions();
        const enviromentInterarions = element.getParentInteractions();
        const interactionsPercent = interactions / enviromentInterarions;
        const date = element.getDate();
        const lifePercent = element.getLife(date) / element.getParentLife(date);
        const maduration = this.maduration.calculate(interactionsPercent, lifePercent);
        const speed = this.speed.calculate(interactions);
        return speed * maduration;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AIEPrestanceCalculator;



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AIEElement__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__AIEHTMLMemory__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__AIEHTMLProperty__ = __webpack_require__(12);



const MAX_ID = 'max';
const MIN_ID = 'min';
const HTML_SUFFIX_PRESTACE_FIELD = 'prestance-fields';
const HTML_PREFIX = 'aie-';
/*
  The BaseElement is a DOM element
*/
class AIEHTMLElement extends __WEBPACK_IMPORTED_MODULE_0__AIEElement__["a" /* default */] {
    constructor(baseElement) {
        super(baseElement);
    }
    parseAttr(text) {
        if (!text) {
            return [];
        }
        const properties = [];
        text.split(',').forEach(el => {
            const components = el.split('|');
            if (components.length) {
                const name = components.shift().trim();
                const property = new __WEBPACK_IMPORTED_MODULE_2__AIEHTMLProperty__["a" /* default */](name, this);
                components.forEach(element => {
                    const parts = element.split(':');
                    if (parts.length === 2) {
                        if (parts[0] === MAX_ID) {
                            property.setMax(parseFloat(parts[1].trim()));
                        }
                        if (parts[0] === MIN_ID) {
                            property.setMin(parseFloat(parts[1].trim()));
                        }
                    }
                });
                properties.push(property);
            }
        });
        return properties;
    }
    setChildren(element) {
        super.setChildren(element);
        this.setProperties(this.parseAttr(this.getAttr(HTML_SUFFIX_PRESTACE_FIELD)));
    }
    initializeMemory(seed) {
        return new __WEBPACK_IMPORTED_MODULE_1__AIEHTMLMemory__["a" /* default */](seed);
    }
    setBaseElement(baseElement) {
        this.baseElement = baseElement;
        this.style = Object.assign({}, window.getComputedStyle(baseElement));
    }
    getBaseElement() {
        return this.baseElement;
    }
    getAttr(attributeName) {
        const name = `${HTML_PREFIX}${attributeName}`;
        if (this.baseElement === undefined) {
            return undefined;
        }
        const val = this.baseElement.attributes.getNamedItem(name);
        return val ? val.value : undefined;
    }
    getAttrs(attributeName) {
        const values = this.getAttr(attributeName);
        return values === undefined
            ? undefined
            : values.split(',').map(function (item) {
                return item.trim();
            });
    }
    bindTriggers() {
        const triggers = this.getTriggersName();
        for (let t in triggers) {
            this.baseElement.addEventListener(triggers[t], this.onTrigger.bind(this, triggers[t]));
        }
    }
    generate(baseElement) {
        return new AIEHTMLElement(baseElement);
    }
    getBaseElementParent() {
        return this.getBaseElement().parentNode;
    }
    getDate() {
        const d = new Date();
        return d.getMilliseconds();
    }
    transform(percent) {
        this.getProperties().forEach(prop => {
            prop.transform(this);
        });
    }
    getPhysicalAttributes() {
        const el = this.getBaseElement();
        if (!el) {
            return {};
        }
        const val = this.getAbsoluteBoundingRect(el);
        return this.getAbsoluteBoundingRect(el);
    }
    getAbsoluteBoundingRect(el) {
        const doc = document, win = window, body = doc.body, rect = el.getBoundingClientRect();
        // pageXOffset and pageYOffset work everywhere except IE <9.
        let offsetX = win.pageXOffset, offsetY = win.pageYOffset;
        if (el !== body) {
            let parentNode = el.parentNode;
            // The element's rect will be affected by the scroll positions of
            // *all* of its scrollable parents, not just the window, so we have
            // to walk up the tree and collect every scroll offset. Good times.
            while (parentNode !== body) {
                offsetX += parentNode.scrollLeft;
                offsetY += parentNode.scrollTop;
                parentNode = parentNode.parentNode;
            }
        }
        return {
            height: rect.height,
            left: rect.left + offsetX,
            top: rect.top + offsetY,
            width: rect.width
        };
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AIEHTMLElement;



/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const DEFAULT_MAX_PRESTANCE = 1;
class AIEElement {
    constructor(baseElement) {
        this.maxUpdates = null;
        if (baseElement) {
            this.setBaseElement(baseElement);
            this.name = this.getAttr('name');
            this.trigger = this.getAttrs('trigger');
            this.bindTriggers();
        }
        this.born = this.getDate();
        this.children = [];
        this.processor = null;
        this.parent = null;
        this.prestance = 0;
        this.updates = 0;
        this.properties = [];
        this.maxPrestance = DEFAULT_MAX_PRESTANCE; // By default
        this.memory = this.initializeMemory(this.generateId());
    }
    setUpdates(updates) {
        this.maxUpdates = updates;
    }
    setMaxPrestance(prestance) {
        this.maxPrestance = prestance;
    }
    setName(name) {
        this.name = name;
        this.memory.setId(this.generateId());
    }
    generateId() {
        return 'aie::' + this.name;
    }
    updatePrestance(increment = null) {
        if (!this.hasParent() || (this.maxUpdates && (this.updates >= this.maxUpdates))) {
            return 0;
        }
        if (increment !== null) {
            this.prestance += (this.prestance + increment > 0) ? increment : 0;
            return increment;
        }
        this.updates++;
        const newIncrement = this.prestanceCalculator.calculateIncrement(this);
        this.prestance += newIncrement;
        return newIncrement;
    }
    getInteractions() {
        return this.memory.getScore();
    }
    getParentInteractions() {
        return this.parent ? this.parent.getInteractions() : 0;
    }
    getLife(now = null) {
        const myDate = now || this.getDate();
        return myDate - this.born;
    }
    getParentLife(now = null) {
        const myDate = now || this.getDate();
        return myDate - this.parent.born;
    }
    getName() {
        return this.name;
    }
    getTriggersName() {
        return this.trigger || [];
    }
    getEventName() {
        return this.name;
    }
    isAmbient() {
        return this.children.length > 0;
    }
    setParent(element) {
        this.parent = element;
    }
    setProccesor(processor) {
        this.processor = processor;
    }
    getParent() {
        return this.parent;
    }
    setProperties(properties) {
        this.properties = properties;
    }
    getProperties() {
        return this.properties || [];
    }
    getPropertiesNames() {
        return this.getProperties().map((prop) => prop.getName());
    }
    setChildren(element) {
        this.children.push(element);
        element.setParent(this);
    }
    onTrigger(name) {
        this.memory.anoteEvent();
        if (this.processor) {
            this.processor.notify({ name, element: this });
        }
    }
    getChildren() {
        return this.children;
    }
    getScore() {
        return this.memory.getScore();
    }
    getAmbientScore() {
        return this.isAmbient()
            ? this.children.reduce((total, child) => total + child.getScore(), 0)
            : 0;
    }
    updateChildrenPrestance(increment, excluded = []) {
        this.children.forEach((child) => !excluded.includes(child) && child.updatePrestance(increment));
    }
    getMaxPrestance() {
        return this.children.reduce((total, child) => Math.max(total, child.getPrestance()), 0);
    }
    hasParent() {
        return !!this.parent;
    }
    hasChildren() {
        return this.children.length !== 0;
    }
    setPrestanceCalculator(prestanceCalculator) {
        this.prestanceCalculator = prestanceCalculator;
    }
    getPrestance() {
        return this.prestance;
    }
    setScore(value) {
        return this.memory.setScore(value);
    }
    setPrestance(value) {
        this.prestance = value;
    }
    mutate(maxPrestance) {
        this.transform(maxPrestance ? this.getPrestance() / maxPrestance : 0);
        const maxGroupPrestance = this.getMaxPrestance();
        this.getChildren().forEach((child) => {
            child.mutate(maxGroupPrestance);
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AIEElement;



/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AIEMemory__ = __webpack_require__(11);

class AIEHTMLMemory extends __WEBPACK_IMPORTED_MODULE_0__AIEMemory__["a" /* default */] {
    loadScoreFromStore(id) {
        const value = localStorage.getItem(id);
        return value ? parseFloat(value) : 0;
    }
    saveScoreToStore(id, value) {
        localStorage.setItem(id, `${value}`);
    }
    removeScoreFromStore(id) {
        localStorage.removeItem(id);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AIEHTMLMemory;



/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class AIEMemory {
    constructor(id) {
        this.id = id;
        this.score = this.loadScoreFromStore(id);
    }
    setId(id) {
        this.id = id;
        this.removeScoreFromStore(id);
        this.saveScoreToStore(id, this.score);
    }
    anoteEvent(goal = 1) {
        this.score += goal;
        this.saveScoreToStore(this.id, this.score);
    }
    getScore() {
        return this.score;
    }
    setScore(score) {
        return this.score = score;
        this.saveScoreToStore(this.id, this.score);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AIEMemory;



/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AIEProperty__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Color__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__AIEHTMLMeasurement__ = __webpack_require__(15);



const COLOR = 'color';
const FONTSIZE = 'font-size';
const HEIGHT = 'height';
const WIDTH = 'width';
const POSITION = 'position';
const LEVEL = 'level';
function colorFn(element, initialValues) {
    element.getChildren().forEach((child) => {
        const initialValue = initialValues[child.getName()];
        const color = new __WEBPACK_IMPORTED_MODULE_1__Color__["a" /* default */](initialValue);
        child.getBaseElement().style.color = color.increment(1 + child.getPrestance()).toString();
    });
}
function fontSizeFn(element, initialValues) {
    element.getChildren().forEach((child) => {
        const measure = new __WEBPACK_IMPORTED_MODULE_2__AIEHTMLMeasurement__["a" /* default */](initialValues[child.getName()]);
        child.getBaseElement().style.fontSize = measure.multiply(1 + child.getPrestance()).toString();
    });
}
function widthFn(element, initialValues) {
    element.getChildren().forEach((child) => {
        const measure = new __WEBPACK_IMPORTED_MODULE_2__AIEHTMLMeasurement__["a" /* default */](initialValues[child.getName()]);
        child.getBaseElement().style.width = measure.multiply(1 + child.getPrestance()).toString();
    });
}
function heightFn(element, initialValues) {
    element.getChildren().forEach((child) => {
        const measure = new __WEBPACK_IMPORTED_MODULE_2__AIEHTMLMeasurement__["a" /* default */](initialValues[child.getName()]);
        child.getBaseElement().style.height = measure.multiply(1 + child.getPrestance()).toString();
    });
}
function positionFn(element) {
    const sortedElements = element.getChildren().sort((a, b) => b.getPrestance() - a.getPrestance());
    sortedElements.forEach(el => {
        element.getBaseElement().appendChild(el.getBaseElement());
    });
}
function getLevelParentElement(element, parentElement, topLevelParent) {
    if (parentElement === topLevelParent) {
        return parentElement;
    }
    const prestance = element.getPrestance();
    if (parentElement === null) {
        console.error("Error in element", element.getName(), ": null parent");
        return null;
    }
    if ((parentElement.getMaxPrestance() <= prestance) &&
        (parentElement.getPrestance() < prestance)) {
        return getLevelParentElement(element, parentElement.getParent(), topLevelParent);
    }
    return parentElement;
}
function levelFn(element, topLevelParent) {
    element.getChildren().forEach((child) => {
        const parent = getLevelParentElement(child, element, topLevelParent || element);
        !child.hasChildren()
            ? parent && parent.getBaseElement().appendChild(child.getBaseElement())
            : child.getParent().getBaseElement().appendChild(child.getBaseElement());
        levelFn(child, topLevelParent || element);
    });
}
function getChildrenComputedStyle(property, element) {
    return element.getChildren().reduce((prev, child) => {
        prev[child.getName()] = window.getComputedStyle(child.getBaseElement(), null).getPropertyValue(property);
        return prev;
    }, {});
}
function getInitialValue(property, element) {
    switch (property) {
        case LEVEL:
            return element.getParent() ? element.getParent().getBaseElement() : null;
        default:
            return getChildrenComputedStyle(property, element);
    }
}
class AIEHTMLProperty extends __WEBPACK_IMPORTED_MODULE_0__AIEProperty__["a" /* default */] {
    constructor(name, element) {
        super(name, getInitialValue(name, element));
        switch (name) {
            case COLOR:
                this.setTransform(colorFn);
                break;
            case FONTSIZE:
                this.setTransform(fontSizeFn);
                break;
            case HEIGHT:
                this.setTransform(heightFn);
                break;
            case WIDTH:
                this.setTransform(widthFn);
                break;
            case POSITION:
                this.setTransform(positionFn);
                break;
            case LEVEL:
                this.setTransform(levelFn);
                break;
            default:
                console.error('Property', name, 'is not supported');
                break;
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AIEHTMLProperty;



/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class AIEProperty {
    constructor(name, initialValue) {
        this.max = null;
        this.min = null;
        this.transformFn = null;
        this.name = name;
        this.initialValue = initialValue;
    }
    getName() {
        return this.name;
    }
    setMax(max) {
        if (max < 1) {
            console.error('Mininum value must be greater than 1');
        }
        this.max = max;
    }
    setMin(min) {
        if (min < 0) {
            console.error('Mininum value must be greater than 0');
        }
        this.min = min;
    }
    setTransform(fn) {
        this.transformFn = fn.bind(this);
    }
    transform(element) {
        this.transformFn && this.transformFn(element, this.initialValue);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AIEProperty;



/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Color {
    constructor(text) {
        this.r = 0;
        this.g = 0;
        this.b = 0;
        this.a = 1;
        const rgb = text.match(/^(rgb|rgba)\((\d+),\s*(\d+),\s*(\d+)(,\s*([\d|\.]+))?\)$/);
        if (!rgb) {
            this.r = parseInt(rgb[2]);
            this.g = parseInt(rgb[3]);
            this.b = parseInt(rgb[4]);
            this.a = rgb[5] && parseFloat(rgb[6]);
        }
    }
    incrementColor(prop, value) {
        const result = prop * value;
        if (result > 255) {
            return 255;
        }
        return result;
    }
    increment(value) {
        if (value < 0) {
            return;
        }
        this.r = this.incrementColor(this.r, value);
        this.g = this.incrementColor(this.g, value);
        this.b = this.incrementColor(this.b, value);
        return this;
    }
    toString() {
        return `rgba(${this.r},${this.g},${this.b},${this.a})`;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Color;



/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const DEFAULT_UNIT = 'px';
class AIEHTMLMeasurement {
    constructor(text) {
        this.val = null;
        this.unit = null;
        this.initial = null;
        this.valid = false;
        const arr = ('' + text).match(/(\d*)([a-z%]*)/);
        this.initial = text;
        if (arr && arr[1]) {
            this.val = parseFloat(arr[1]);
            this.unit = arr[2] || DEFAULT_UNIT;
            this.valid = true;
        }
    }
    isValid() {
        return this.valid;
    }
    toString() {
        if (!this.isValid()) {
            return '';
        }
        return `${this.val}${this.unit}`;
    }
    multiply(value) {
        if (!this.isValid()) {
            return this.initial;
        }
        this.val = Math.round(this.val * value);
        return this;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AIEHTMLMeasurement;



/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AIEAbstractPrestanceSpeed__ = __webpack_require__(17);

class AIEDefaultPrestanceSpeed extends __WEBPACK_IMPORTED_MODULE_0__AIEAbstractPrestanceSpeed__["a" /* default */] {
    calculate(interactions) {
        return interactions ? 1 / interactions : 0;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AIEDefaultPrestanceSpeed;



/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class AIEAbstractPrestanceSpeed {
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AIEAbstractPrestanceSpeed;



/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AIEAbstractMaduration__ = __webpack_require__(19);

class AIEDefaultMaduration extends __WEBPACK_IMPORTED_MODULE_0__AIEAbstractMaduration__["a" /* default */] {
    calculate(interactionsPercent, lifePercent) {
        return lifePercent < .001
            ? 0
            : interactionsPercent < .001 ? 0 : 1;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AIEDefaultMaduration;



/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class AIEAbstractMaduration {
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AIEAbstractMaduration;



/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map