/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/content/core/Content.ts":
/*!*************************************!*\
  !*** ./src/content/core/Content.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar selectors = {\n    BASKET_ITEM_TABLE: '#basket-item-table',\n};\nvar Content = /** @class */ (function () {\n    function Content() {\n        var _this = this;\n        this._table = null;\n        this.init = function () {\n            _this._table = _this.getTableElement();\n            _this.inject();\n        };\n        /**\n         * Inject Button into row\n         */\n        this.inject = function () {\n            if (!_this._table) {\n                return;\n            }\n            var items = Array.from(_this._table.querySelector(\"tbody\").children);\n            items.forEach(function (item) {\n                var button = document.createElement('button');\n                button.textContent = \"Добавить\";\n                button.setAttribute(\"id\", \"add-into-excel\");\n                var td = document.createElement('td');\n                td.append(button);\n                item.append(td);\n            });\n        };\n        this.attachClickTable = function (cb) {\n            if (!_this._table) {\n                return;\n            }\n            _this._table.addEventListener('click', cb);\n        };\n        this.getTableElement = function () {\n            var table = document.querySelector(selectors.BASKET_ITEM_TABLE);\n            return table;\n        };\n    }\n    Object.defineProperty(Content.prototype, \"table\", {\n        get: function () {\n            return this._table;\n        },\n        enumerable: false,\n        configurable: true\n    });\n    return Content;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Content);\n\n\n//# sourceURL=webpack://my-webpack-project/./src/content/core/Content.ts?");

/***/ }),

/***/ "./src/content/index.ts":
/*!******************************!*\
  !*** ./src/content/index.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _core_Content__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/Content */ \"./src/content/core/Content.ts\");\n\nvar handleTableClick = function (event) {\n    var element = event.target;\n    if (!element.closest(\"tr\")) {\n        return;\n    }\n    var id = element.getAttribute(\"id\");\n    if (id === \"add-into-excel\") {\n        console.log(\"add\");\n    }\n    if (id === \"remove-from-excel\") {\n        console.log(\"remove\");\n    }\n    if (element.classList.contains(\"basket-item-amount-btn-plus\") ||\n        element.classList.contains(\"basket-item-amount-btn-minus\")) {\n        console.log(\"update\");\n    }\n    if (element.classList.contains(\"cart-remove\")) {\n        console.log(\"remove\");\n    }\n};\nvar content = new _core_Content__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\ncontent.init();\nif (content.table) {\n    content.attachClickTable(handleTableClick);\n}\n\n\n//# sourceURL=webpack://my-webpack-project/./src/content/index.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/content/index.ts");
/******/ 	
/******/ })()
;