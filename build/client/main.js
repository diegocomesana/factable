/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/client/entry.js","vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/client/app.js":
/*!***************************!*\
  !*** ./src/client/app.js ***!
  \***************************/
/*! exports provided: App, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"App\", function() { return App; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ \"./node_modules/styled-components/dist/styled-components.browser.esm.js\");\n/* harmony import */ var _style__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style */ \"./src/client/style.js\");\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ \"./node_modules/classnames/index.js\");\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);\nfunction _templateObject() {\n  var data = _taggedTemplateLiteral([\"\\n  width: 100%;\\n  margin: 0;\\n  padding: 0;\\n  /* background-color: orange; */\\n\\n  .\", \" {\\n    color: #1890ff;\\n    font-size: 12px;\\n    margin-right: 10px;\\n    font-weight: bold;\\n\\n    list-style: none;\\n\\n    li {\\n      background-color: pink;\\n    }\\n  }\\n\"]);\n\n  _templateObject = function _templateObject() {\n    return data;\n  };\n\n  return data;\n}\n\nfunction _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _iterableToArrayLimit(arr, i) { if (typeof Symbol === \"undefined\" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\n\n\n\n\nvar namespace = \"ui-app\";\n\nvar nsClassName = function nsClassName(name) {\n  return \"\".concat(namespace, \"__\").concat(name);\n};\n\nvar AppPrestyled = function AppPrestyled(_ref) {\n  var className = _ref.className;\n\n  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])([{\n    functionName: \"pepito\"\n  }]),\n      _useState2 = _slicedToArray(_useState, 2),\n      data = _useState2[0],\n      setData = _useState2[1];\n\n  var socket = new WebSocket(\"ws://localhost:8888\");\n\n  var onSocketOpen = function onSocketOpen(e) {\n    socket.send(\"Hello Server!\");\n  };\n\n  var onSocketMessage = function onSocketMessage(e) {\n    console.log(\"Message from server \", e.data);\n  };\n\n  Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(function () {\n    socket.addEventListener(\"open\", onSocketOpen);\n    socket.addEventListener(\"message\", onSocketMessage);\n    return function () {\n      socket.removeEventListener(\"open\", onSocketOpen);\n      socket.removeEventListener(\"message\", onSocketMessage);\n    };\n  }, []);\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_style__WEBPACK_IMPORTED_MODULE_2__[\"default\"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: classnames__WEBPACK_IMPORTED_MODULE_3___default()(namespace, className)\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h1\", null, \"VAAAAMOS!!\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"ul\", {\n    className: nsClassName(\"list\")\n  }, data.map(function (item) {\n    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\", null, item.functionName);\n  }))));\n};\n\nvar App = Object(styled_components__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(AppPrestyled)(_templateObject(), nsClassName(\"list\"));\n/* harmony default export */ __webpack_exports__[\"default\"] = (App);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY2xpZW50L2FwcC5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9jbGllbnQvYXBwLmpzPzNmYzMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBzdHlsZWQgZnJvbSBcInN0eWxlZC1jb21wb25lbnRzXCI7XG5pbXBvcnQgU3R5bGUgZnJvbSBcIi4vc3R5bGVcIjtcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gXCJjbGFzc25hbWVzXCI7XG5cbmNvbnN0IG5hbWVzcGFjZSA9IGB1aS1hcHBgO1xuY29uc3QgbnNDbGFzc05hbWUgPSAobmFtZSkgPT4gYCR7bmFtZXNwYWNlfV9fJHtuYW1lfWA7XG5cbmNvbnN0IEFwcFByZXN0eWxlZCA9ICh7IGNsYXNzTmFtZSB9KSA9PiB7XG4gIGNvbnN0IFtkYXRhLCBzZXREYXRhXSA9IHVzZVN0YXRlKFt7IGZ1bmN0aW9uTmFtZTogXCJwZXBpdG9cIiB9XSk7XG5cbiAgY29uc3Qgc29ja2V0ID0gbmV3IFdlYlNvY2tldChcIndzOi8vbG9jYWxob3N0Ojg4ODhcIik7XG5cbiAgY29uc3Qgb25Tb2NrZXRPcGVuID0gKGUpID0+IHtcbiAgICBzb2NrZXQuc2VuZChcIkhlbGxvIFNlcnZlciFcIik7XG4gIH07XG4gIGNvbnN0IG9uU29ja2V0TWVzc2FnZSA9IChlKSA9PiB7XG4gICAgY29uc29sZS5sb2coXCJNZXNzYWdlIGZyb20gc2VydmVyIFwiLCBlLmRhdGEpO1xuICB9O1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgLy8gQ29ubmVjdGlvbiBvcGVuZWRcbiAgICBzb2NrZXQuYWRkRXZlbnRMaXN0ZW5lcihcIm9wZW5cIiwgb25Tb2NrZXRPcGVuKTtcblxuICAgIC8vIExpc3RlbiBmb3IgbWVzc2FnZXNcbiAgICBzb2NrZXQuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgb25Tb2NrZXRNZXNzYWdlKTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBzb2NrZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm9wZW5cIiwgb25Tb2NrZXRPcGVuKTtcbiAgICAgIHNvY2tldC5yZW1vdmVFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCBvblNvY2tldE1lc3NhZ2UpO1xuICAgIH07XG4gIH0sIFtdKTtcblxuICByZXR1cm4gKFxuICAgIDxTdHlsZT5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWVzKG5hbWVzcGFjZSwgY2xhc3NOYW1lKX0+XG4gICAgICAgIDxoMT5WQUFBQU1PUyEhPC9oMT5cbiAgICAgICAgPHVsIGNsYXNzTmFtZT17bnNDbGFzc05hbWUoYGxpc3RgKX0+XG4gICAgICAgICAge2RhdGEubWFwKChpdGVtKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gPGxpPntpdGVtLmZ1bmN0aW9uTmFtZX08L2xpPjtcbiAgICAgICAgICB9KX1cbiAgICAgICAgPC91bD5cbiAgICAgIDwvZGl2PlxuICAgIDwvU3R5bGU+XG4gICk7XG59O1xuXG5leHBvcnQgY29uc3QgQXBwID0gc3R5bGVkKEFwcFByZXN0eWxlZClgXG4gIHdpZHRoOiAxMDAlO1xuICBtYXJnaW46IDA7XG4gIHBhZGRpbmc6IDA7XG4gIC8qIGJhY2tncm91bmQtY29sb3I6IG9yYW5nZTsgKi9cblxuICAuJHtuc0NsYXNzTmFtZShgbGlzdGApfSB7XG4gICAgY29sb3I6ICMxODkwZmY7XG4gICAgZm9udC1zaXplOiAxMnB4O1xuICAgIG1hcmdpbi1yaWdodDogMTBweDtcbiAgICBmb250LXdlaWdodDogYm9sZDtcblxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XG5cbiAgICBsaSB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBwaW5rO1xuICAgIH1cbiAgfVxuYDtcblxuZXhwb3J0IGRlZmF1bHQgQXBwO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBREE7QUFBQTtBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFHQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQUE7QUFFQTtBQUFBO0FBRUE7QUFDQTtBQUtBO0FBQ0E7QUFDQTtBQW9CQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/client/app.js\n");

/***/ }),

/***/ "./src/client/entry.js":
/*!*****************************!*\
  !*** ./src/client/entry.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ \"./node_modules/react-dom/index.js\");\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app */ \"./src/client/app.js\");\n\n\n\nObject(react_dom__WEBPACK_IMPORTED_MODULE_1__[\"render\"])(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_app__WEBPACK_IMPORTED_MODULE_2__[\"default\"], null), document.getElementById(\"root\"));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY2xpZW50L2VudHJ5LmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2NsaWVudC9lbnRyeS5qcz9iYjUwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHJlbmRlciB9IGZyb20gXCJyZWFjdC1kb21cIjtcblxuaW1wb3J0IEFwcCBmcm9tIFwiLi9hcHBcIjtcblxucmVuZGVyKDxBcHAgLz4sIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm9vdFwiKSk7XG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFFQTtBQUVBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/client/entry.js\n");

/***/ }),

/***/ "./src/client/style.js":
/*!*****************************!*\
  !*** ./src/client/style.js ***!
  \*****************************/
/*! exports provided: GlobalStyle, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GlobalStyle\", function() { return GlobalStyle; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ \"./node_modules/styled-components/dist/styled-components.browser.esm.js\");\nfunction _templateObject() {\n  var data = _taggedTemplateLiteral([\"\\n  \\n  html {\\n    margin: 0;\\n    padding: 0;\\n  }\\n\\n  body {\\n    font-family: Proxima Nova;\\n    background-color: white;\\n    margin: 0;\\n    padding: 0;\\n    /* width: 100%;\\n    height: 100%; */\\n  }\\n  \\n  * {\\n    box-sizing: border-box;\\n    \\n  }\\n\\n  h2, h2, h3, h4, p, a {\\n    margin: 0;\\n    padding: 0;\\n  }\\n\\n  #root {\\n    margin: 0;\\n    padding: 0;\\n    /* width: 100%;\\n    height: 100%; */\\n  }\\n\\n  @font-face {\\n    font-family:'Proxima Nova';\\n    font-weight:300;\\n    font-display:swap;\\n    font-style:normal;\\n    src: url(https://http2.mlstatic.com/ui/webfonts/v3.0.0/proxima-nova/proximanova-light.woff2) format(\\\"woff2\\\"), url(https://http2.mlstatic.com/ui/webfonts/v3.0.0/proxima-nova/proximanova-light.woff) format(\\\"woff\\\"), url(https://http2.mlstatic.com/ui/webfonts/v3.0.0/proxima-nova/proximanova-light.ttf) format(\\\"truetype\\\")\\n  }\\n\\n  @font-face {\\n    font-family:'Proxima Nova';\\n    font-weight:400;\\n    font-display:swap;\\n    font-style:normal;\\n    src: url(https://http2.mlstatic.com/ui/webfonts/v3.0.0/proxima-nova/proximanova-regular.woff2) format(\\\"woff2\\\"), url(https://http2.mlstatic.com/ui/webfonts/v3.0.0/proxima-nova/proximanova-regular.woff) format(\\\"woff\\\"), url(https://http2.mlstatic.com/ui/webfonts/v3.0.0/proxima-nova/proximanova-regular.ttf) format(\\\"truetype\\\")\\n  }\\n\\n  @font-face {\\n    font-family:'Proxima Nova';\\n    font-weight:600;\\n    font-display:swap;\\n    font-style:normal;\\n    src: url(https://http2.mlstatic.com/ui/webfonts/v3.0.0/proxima-nova/proximanova-semibold.woff2) format(\\\"woff2\\\"), url(https://http2.mlstatic.com/ui/webfonts/v3.0.0/proxima-nova/proximanova-semibold.woff) format(\\\"woff\\\"), url(https://http2.mlstatic.com/ui/webfonts/v3.0.0/proxima-nova/proximanova-semibold.ttf) format(\\\"truetype\\\")\\n  }\\n\\n\\n\"]);\n\n  _templateObject = function _templateObject() {\n    return data;\n  };\n\n  return data;\n}\n\nfunction _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\n\n\nvar Style = Object(styled_components__WEBPACK_IMPORTED_MODULE_1__[\"createGlobalStyle\"])(_templateObject());\nvar GlobalStyle = function GlobalStyle(_ref) {\n  var children = _ref.children,\n      _ref$theme = _ref.theme,\n      theme = _ref$theme === void 0 ? {} : _ref$theme;\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(styled_components__WEBPACK_IMPORTED_MODULE_1__[\"ThemeProvider\"], {\n    theme: theme\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Style, null), children));\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (GlobalStyle);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY2xpZW50L3N0eWxlLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2NsaWVudC9zdHlsZS5qcz8wMGM2Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGNyZWF0ZUdsb2JhbFN0eWxlLCBUaGVtZVByb3ZpZGVyIH0gZnJvbSBcInN0eWxlZC1jb21wb25lbnRzXCI7XG4vLyBpbXBvcnQgeyBOb3JtYWxpemUgfSBmcm9tIFwic3R5bGVkLW5vcm1hbGl6ZVwiO1xuXG5jb25zdCBTdHlsZSA9IGNyZWF0ZUdsb2JhbFN0eWxlYFxuICBcbiAgaHRtbCB7XG4gICAgbWFyZ2luOiAwO1xuICAgIHBhZGRpbmc6IDA7XG4gIH1cblxuICBib2R5IHtcbiAgICBmb250LWZhbWlseTogUHJveGltYSBOb3ZhO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICAgIG1hcmdpbjogMDtcbiAgICBwYWRkaW5nOiAwO1xuICAgIC8qIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogMTAwJTsgKi9cbiAgfVxuICBcbiAgKiB7XG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICBcbiAgfVxuXG4gIGgyLCBoMiwgaDMsIGg0LCBwLCBhIHtcbiAgICBtYXJnaW46IDA7XG4gICAgcGFkZGluZzogMDtcbiAgfVxuXG4gICNyb290IHtcbiAgICBtYXJnaW46IDA7XG4gICAgcGFkZGluZzogMDtcbiAgICAvKiB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDEwMCU7ICovXG4gIH1cblxuICBAZm9udC1mYWNlIHtcbiAgICBmb250LWZhbWlseTonUHJveGltYSBOb3ZhJztcbiAgICBmb250LXdlaWdodDozMDA7XG4gICAgZm9udC1kaXNwbGF5OnN3YXA7XG4gICAgZm9udC1zdHlsZTpub3JtYWw7XG4gICAgc3JjOiB1cmwoaHR0cHM6Ly9odHRwMi5tbHN0YXRpYy5jb20vdWkvd2ViZm9udHMvdjMuMC4wL3Byb3hpbWEtbm92YS9wcm94aW1hbm92YS1saWdodC53b2ZmMikgZm9ybWF0KFwid29mZjJcIiksIHVybChodHRwczovL2h0dHAyLm1sc3RhdGljLmNvbS91aS93ZWJmb250cy92My4wLjAvcHJveGltYS1ub3ZhL3Byb3hpbWFub3ZhLWxpZ2h0LndvZmYpIGZvcm1hdChcIndvZmZcIiksIHVybChodHRwczovL2h0dHAyLm1sc3RhdGljLmNvbS91aS93ZWJmb250cy92My4wLjAvcHJveGltYS1ub3ZhL3Byb3hpbWFub3ZhLWxpZ2h0LnR0ZikgZm9ybWF0KFwidHJ1ZXR5cGVcIilcbiAgfVxuXG4gIEBmb250LWZhY2Uge1xuICAgIGZvbnQtZmFtaWx5OidQcm94aW1hIE5vdmEnO1xuICAgIGZvbnQtd2VpZ2h0OjQwMDtcbiAgICBmb250LWRpc3BsYXk6c3dhcDtcbiAgICBmb250LXN0eWxlOm5vcm1hbDtcbiAgICBzcmM6IHVybChodHRwczovL2h0dHAyLm1sc3RhdGljLmNvbS91aS93ZWJmb250cy92My4wLjAvcHJveGltYS1ub3ZhL3Byb3hpbWFub3ZhLXJlZ3VsYXIud29mZjIpIGZvcm1hdChcIndvZmYyXCIpLCB1cmwoaHR0cHM6Ly9odHRwMi5tbHN0YXRpYy5jb20vdWkvd2ViZm9udHMvdjMuMC4wL3Byb3hpbWEtbm92YS9wcm94aW1hbm92YS1yZWd1bGFyLndvZmYpIGZvcm1hdChcIndvZmZcIiksIHVybChodHRwczovL2h0dHAyLm1sc3RhdGljLmNvbS91aS93ZWJmb250cy92My4wLjAvcHJveGltYS1ub3ZhL3Byb3hpbWFub3ZhLXJlZ3VsYXIudHRmKSBmb3JtYXQoXCJ0cnVldHlwZVwiKVxuICB9XG5cbiAgQGZvbnQtZmFjZSB7XG4gICAgZm9udC1mYW1pbHk6J1Byb3hpbWEgTm92YSc7XG4gICAgZm9udC13ZWlnaHQ6NjAwO1xuICAgIGZvbnQtZGlzcGxheTpzd2FwO1xuICAgIGZvbnQtc3R5bGU6bm9ybWFsO1xuICAgIHNyYzogdXJsKGh0dHBzOi8vaHR0cDIubWxzdGF0aWMuY29tL3VpL3dlYmZvbnRzL3YzLjAuMC9wcm94aW1hLW5vdmEvcHJveGltYW5vdmEtc2VtaWJvbGQud29mZjIpIGZvcm1hdChcIndvZmYyXCIpLCB1cmwoaHR0cHM6Ly9odHRwMi5tbHN0YXRpYy5jb20vdWkvd2ViZm9udHMvdjMuMC4wL3Byb3hpbWEtbm92YS9wcm94aW1hbm92YS1zZW1pYm9sZC53b2ZmKSBmb3JtYXQoXCJ3b2ZmXCIpLCB1cmwoaHR0cHM6Ly9odHRwMi5tbHN0YXRpYy5jb20vdWkvd2ViZm9udHMvdjMuMC4wL3Byb3hpbWEtbm92YS9wcm94aW1hbm92YS1zZW1pYm9sZC50dGYpIGZvcm1hdChcInRydWV0eXBlXCIpXG4gIH1cblxuXG5gO1xuXG5leHBvcnQgY29uc3QgR2xvYmFsU3R5bGUgPSAoeyBjaGlsZHJlbiwgdGhlbWUgPSB7fSB9KSA9PiAoXG4gIDxUaGVtZVByb3ZpZGVyIHsuLi57IHRoZW1lIH19PlxuICAgIDxSZWFjdC5GcmFnbWVudD5cbiAgICAgIHsvKiA8Tm9ybWFsaXplIC8+ICovfVxuICAgICAgPFN0eWxlIC8+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9SZWFjdC5GcmFnbWVudD5cbiAgPC9UaGVtZVByb3ZpZGVyPlxuKTtcblxuZXhwb3J0IGRlZmF1bHQgR2xvYmFsU3R5bGU7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUdBO0FBNERBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBREE7QUFVQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/client/style.js\n");

/***/ })

/******/ });