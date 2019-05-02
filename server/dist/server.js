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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/server.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/config-local.json":
/*!*******************************!*\
  !*** ./src/config-local.json ***!
  \*******************************/
/*! exports provided: protocol, dbName, dbServer, user, password, port, default */
/***/ (function(module) {

eval("module.exports = {\"protocol\":\"mongodb://{dbServer}:{port}/{dbName}\",\"dbName\":\"aie\",\"dbServer\":\"localhost\",\"user\":\"aie\",\"password\":\"kKvayl0EtE0XFlzI\",\"port\":\"27017\"};\n\n//# sourceURL=webpack:///./src/config-local.json?");

/***/ }),

/***/ "./src/controllers/pregnancy.js":
/*!**************************************!*\
  !*** ./src/controllers/pregnancy.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\n\nvar _pregnancy = _interopRequireDefault(__webpack_require__(/*! ../models/pregnancy */ \"./src/models/pregnancy.js\"));\n\nvar _status = __webpack_require__(/*! ../converters/status */ \"./src/converters/status.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\n//Simple version, without validation or sanitation\nvar _default = {\n  get: function get(req, res) {\n    _pregnancy[\"default\"].aggregate([{\n      \"$match\": {\n        aie: req.params.id,\n        md5estructure: req.params.md5\n      }\n    }, {\n      \"$sort\": {\n        date: -1\n      }\n    }, {\n      \"$group\": {\n        _id: \"$user\",\n        status: {\n          \"$first\": \"$state\"\n        }\n      }\n    }], function (err, pregnances) {\n      if (err) {\n        console.log(err);\n      }\n\n      if (pregnances) {\n        res.send((0, _status.addStates)(pregnances.map(function (_ref) {\n          var status = _ref.status;\n          return status;\n        })));\n      } else {\n        res.send([]);\n      }\n    });\n  },\n  save: function save(req, res) {\n    try {\n      var pregnancy = new _pregnancy[\"default\"]({\n        event: req.body.event,\n        aie: req.body.aie,\n        element: req.body.element,\n        state: (0, _status.getBasicState)(req.body.state),\n        md5estructure: (0, _status.getMD5State)(req.body.state),\n        user: req.body.userName,\n        date: Date.now()\n      });\n      pregnancy.save(function (err) {\n        if (err) {\n          console.log('DB Error', err);\n          res.status(424).send('DB Error');\n          return err;\n        }\n\n        console.log('Created successfully');\n        res.send('Created successfully');\n      });\n    } catch (exception) {\n      res.status(423).send('Unexpected Error!');\n      console.log('Unexpected Error', exception);\n    }\n  }\n};\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack:///./src/controllers/pregnancy.js?");

/***/ }),

/***/ "./src/converters/status.js":
/*!**********************************!*\
  !*** ./src/converters/status.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.getBasicState = getBasicState;\nexports.getMD5State = getMD5State;\nexports.addStates = addStates;\n\nvar _crypto = _interopRequireDefault(__webpack_require__(/*! crypto */ \"crypto\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\nfunction getMD5State(element) {\n  return _crypto[\"default\"].createHash('md5').update(JSON.stringify(getBasicStructure(element))).digest(\"hex\");\n}\n\nfunction getBasicStructure() {\n  var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];\n  return element.map(function (_ref) {\n    var name = _ref.name,\n        children = _ref.children;\n    return {\n      name: name,\n      children: getBasicStructure(children)\n    };\n  });\n}\n\nfunction getBasicState() {\n  var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];\n  return element.map(function (_ref2) {\n    var name = _ref2.name,\n        pregnancy = _ref2.pregnancy,\n        score = _ref2.score,\n        children = _ref2.children;\n    return {\n      name: name,\n      pregnancy: pregnancy,\n      score: score,\n      children: getBasicState(children)\n    };\n  });\n}\n\nfunction getPregnancyAverage(elements, totalScore) {\n  if (totalScore === 0) {\n    return 0;\n  }\n\n  var pregnancy = elements.reduce(function (total, _ref3) {\n    var pregnancy = _ref3.pregnancy,\n        score = _ref3.score;\n    return total + pregnancy * parseFloat(score);\n  }, 0);\n  return parseFloat((pregnancy / totalScore).toPrecision(12));\n}\n\nfunction getScoresAddition(scores) {\n  return scores.reduce(function (total, score) {\n    return total + score;\n  }, 0);\n}\n\nfunction addStates() {\n  var elements = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];\n\n  if (!elements || !elements.length || !elements[0]) {\n    return;\n  }\n\n  return elements[0].map(function (_ref4, index) {\n    var name = _ref4.name;\n    var score = getScoresAddition(elements.map(function (element) {\n      return element[index].score;\n    }));\n    var pregnancy = getPregnancyAverage(elements.map(function (element) {\n      return element[index];\n    }), score);\n    var children = addStates(elements.map(function (element) {\n      return element[index].children;\n    }));\n    var value = {\n      name: name,\n      pregnancy: pregnancy,\n      score: score\n    };\n    children && (value.children = children);\n    return value;\n  });\n}\n\n//# sourceURL=webpack:///./src/converters/status.js?");

/***/ }),

/***/ "./src/initConnection.js":
/*!*******************************!*\
  !*** ./src/initConnection.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\n\nvar _mongoose = _interopRequireDefault(__webpack_require__(/*! mongoose */ \"mongoose\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\nfunction initConnection(config) {\n  var protocol = config.protocol;\n  var devDbUrl = protocol.replace(/\\{[^}]+\\}/g, function (match) {\n    return config[match.slice(1, -1)];\n  });\n\n  _mongoose[\"default\"].connect(devDbUrl, {\n    useNewUrlParser: true\n  }, function (err, res) {\n    if (err) {\n      console.log('ERROR connecting to: ' + devDbUrl + '. ' + err);\n    } else {\n      console.log('Succeeded connected to: ' + devDbUrl);\n    }\n  });\n\n  _mongoose[\"default\"].Promise = global.Promise;\n}\n\nvar _default = initConnection;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack:///./src/initConnection.js?");

/***/ }),

/***/ "./src/models/pregnancy.js":
/*!*********************************!*\
  !*** ./src/models/pregnancy.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\n\nvar _mongoose = _interopRequireWildcard(__webpack_require__(/*! mongoose */ \"mongoose\"));\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj[\"default\"] = obj; return newObj; } }\n\nvar schema = new _mongoose.Schema({\n  state: {\n    type: Array,\n    required: true\n  },\n  date: {\n    type: Number,\n    required: true\n  },\n  aie: {\n    type: String,\n    required: true\n  },\n  event: {\n    type: String,\n    required: true\n  },\n  element: {\n    type: String,\n    required: true\n  },\n  user: {\n    type: String,\n    required: true\n  },\n  md5estructure: {\n    type: String,\n    required: true\n  }\n});\n\nvar Pregnancy = _mongoose[\"default\"].model('Pregnancy', schema);\n\nvar _default = Pregnancy;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack:///./src/models/pregnancy.js?");

/***/ }),

/***/ "./src/routes/pregnancy.js":
/*!*********************************!*\
  !*** ./src/routes/pregnancy.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\n\nvar _express = __webpack_require__(/*! express */ \"express\");\n\nvar _pregnancy = _interopRequireDefault(__webpack_require__(/*! ../controllers/pregnancy */ \"./src/controllers/pregnancy.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\nvar router = (0, _express.Router)(); // a simple test url to check that all of our files are communicating correctly.\n\nrouter.get('/:id/:md5', _pregnancy[\"default\"].get);\nrouter.post('/save', _pregnancy[\"default\"].save);\nvar _default = router;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack:///./src/routes/pregnancy.js?");

/***/ }),

/***/ "./src/server.js":
/*!***********************!*\
  !*** ./src/server.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _express = _interopRequireDefault(__webpack_require__(/*! express */ \"express\"));\n\nvar _bodyParser = _interopRequireDefault(__webpack_require__(/*! body-parser */ \"body-parser\"));\n\nvar _initConnection = _interopRequireDefault(__webpack_require__(/*! ./initConnection */ \"./src/initConnection.js\"));\n\nvar _configLocal = _interopRequireDefault(__webpack_require__(/*! ./config-local.json */ \"./src/config-local.json\"));\n\nvar _pregnancy = _interopRequireDefault(__webpack_require__(/*! ./routes/pregnancy */ \"./src/routes/pregnancy.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\n// initialize our Express app\nvar app = (0, _express[\"default\"])();\n(0, _initConnection[\"default\"])(_configLocal[\"default\"]);\napp.use(_express[\"default\"].json({\n  type: 'application/x-www-form-urlencoded'\n}));\napp.use(_bodyParser[\"default\"].urlencoded({\n  extended: false\n}));\napp.use('/pregnancy', _pregnancy[\"default\"]);\nvar port = 1234;\napp.listen(port, function () {\n  console.log('Server is up and running on port numner ' + port);\n});\n\n//# sourceURL=webpack:///./src/server.js?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"crypto\");\n\n//# sourceURL=webpack:///external_%22crypto%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mongoose\");\n\n//# sourceURL=webpack:///external_%22mongoose%22?");

/***/ })

/******/ });