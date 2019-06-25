var that = this;
function __skpm_run (key, context) {
  that.context = context;

var exports =
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/randomfill.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/randomfill.js":
/*!***************************!*\
  !*** ./src/randomfill.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ "./src/utils.js");


/* harmony default export */ __webpack_exports__["default"] = (function () {
  log('~~ Run Chippen charts ~~');
  var doc = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.getSelectedDocument();
  var selectedLayers = doc.selectedLayers; // Elements with these types will get fill colour applied

  var el_has_fillcolor = ["Rectangle", "ShapePath"];
  var el_has_textcolor = ["Text"]; // Default values for popup

  var defaultCol1 = "#eeeeee";
  var defaultCol2 = "#891c55";
  var defaultCategories = 5;
  /*
  	CHECK SELECTION
  */

  if (selectedLayers.length == 0) {
    sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.alert("Chippencharts", 'Please select at least 1 shape or text layers to apply the random fill colours to.');
    return false;
  }
  /*
  	Setup the popup window
  */


  var popup = COSAlertWindow.new();
  popup.setMessageText("Random fill");
  popup.addButtonWithTitle("Run");
  popup.addButtonWithTitle("Cancel");
  popup.setInformativeText("Get as many colours as you want between two colours and randomly apply as fill to selected layers.");
  /*
  	Input
  	*/

  var popup_width = 280;
  var colInput_label = Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["createLabel"])("Paste in your two colour values", 12, true, NSMakeRect(0, 0, popup_width, 16));
  var col_view = NSView.alloc().initWithFrame(NSMakeRect(0, 0, popup_width, 25));
  var col1Input = Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["createTextField"])(defaultCol1, null, NSMakeRect(0, 0, 130, 25));
  var col2Input = Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["createTextField"])(defaultCol2, null, NSMakeRect(150, 0, 130, 25));
  var categories_label = Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["createLabel"])("How many random colours do you want?", 12, true, NSMakeRect(0, 0, popup_width, 16));
  var categoriesInput = Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["createTextField"])(defaultCategories, null, NSMakeRect(0, 0, 130, 25));
  popup.addAccessoryView(colInput_label);
  col_view.addSubview(col1Input);
  col_view.addSubview(col2Input);
  popup.addAccessoryView(col_view);
  popup.addAccessoryView(categories_label);
  popup.addAccessoryView(categoriesInput);
  popup.alert().window().setInitialFirstResponder(col1Input);
  col1Input.setNextKeyView(col2Input);
  col2Input.setNextKeyView(categoriesInput);
  categoriesInput.setNextKeyView(col1Input);
  /*
  RESPONSE
  */

  var responseCode = popup.runModal();

  if (responseCode != 1000) {
    // User clicked "Cancel"
    return false;
  }

  var col1 = removeHash(col1Input.stringValue());
  var col2 = removeHash(col2Input.stringValue());
  var num_of_colours = parseFloat(categoriesInput.stringValue());
  /*
  	CALCULATE COLOURS AND APPLY
  */

  var col1_rgb = hexToRGB(col1);
  var col2_rgb = hexToRGB(col2);
  var colours = [col1, col2];

  for (var i = 0; i < num_of_colours - 2; i++) {
    var new_rgb = [];

    for (var j = 0; j < 3; j++) {
      var new_diff = col1_rgb[j] - col2_rgb[j];
      var new_dir = new_diff >= 0 ? -1 : 1;
      var new_add = Math.abs(new_diff) / (num_of_colours - 1);
      var new_dim = col1_rgb[j] + new_dir * (i + 1) * new_add;
      new_rgb.push(Math.round(new_dim));
    }

    colours.push(rgbToHex(new_rgb));
  } // Apply new colours to selection


  for (var i = 0; i < selectedLayers.layers.length; i++) {
    var random_index = Math.floor(Math.random() * (+colours.length - +0)) + +0;
    var random_col = hex_9(colours[random_index]);

    if (el_has_fillcolor.includes(selectedLayers.layers[i].type)) {
      // Change fill if it's shape layer
      selectedLayers.layers[i].style.fills[0].color = random_col;
    } else if (el_has_textcolor.includes(selectedLayers.layers[i].type)) {
      // Change fill if it's a text layer
      selectedLayers.layers[i].style.textColor = random_col;
    }
  }
});

function hexToRGB(hex) {
  var rgb = [];

  for (var i = 0; i < 3; i++) {
    var sub1 = hex.substring(2 * i, 2 + 2 * i);
    var v = parseInt(sub1, 16);
    rgb.push(v);
  }

  return rgb;
}

function hex_6(hex) {
  // #d8d8d8ff > d8d8d8
  return hex.substr(1, 6);
}

function hex_9(hex_6) {
  // d8d8d8 > #d8d8d8ff
  return "#" + hex_6 + "ff";
}

function rgbToHex(arr) {
  var hex = "";

  for (var i = 0; i < 3; i++) {
    var sub = arr[i].toString(16).toUpperCase();
    var padsub = ('0' + sub).slice(-2);
    hex = hex + padsub;
  }

  return hex;
}

function removeHash(hex) {
  return hex.substr(0, 1) == "#" ? hex.substr(1, 6) : hex;
}

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! exports provided: getSymbolInstances, onlyUnique, iterativeGapFilling, createLabel, createTextField, createDropdown, createCheckbox, getValFromLayerName, renameLayer, isVerticalBarchart, getBarHeight */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSymbolInstances", function() { return getSymbolInstances; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onlyUnique", function() { return onlyUnique; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "iterativeGapFilling", function() { return iterativeGapFilling; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createLabel", function() { return createLabel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTextField", function() { return createTextField; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createDropdown", function() { return createDropdown; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createCheckbox", function() { return createCheckbox; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getValFromLayerName", function() { return getValFromLayerName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renameLayer", function() { return renameLayer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isVerticalBarchart", function() { return isVerticalBarchart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBarHeight", function() { return getBarHeight; });
function getSymbolInstances(source, symbolMaster) {
  // https://github.com/sonburn/
  var symbolInstances = NSMutableArray.array();
  source.sketchObject.pages().forEach(function (page) {
    var predicate = NSPredicate.predicateWithFormat('className == %@ && symbolMaster.objectID == %@', 'MSSymbolInstance', symbolMaster.sketchObject.objectID());
    page.children().filteredArrayUsingPredicate(predicate).forEach(function (instance) {
      return symbolInstances.addObject(instance);
    });
  });
  return symbolInstances;
}
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
function iterativeGapFilling(array, length) {
  var newArray = [];

  for (var i = 0; i < length; i++) {
    var loop = Math.floor(i / array.length);
    var index = i - loop * array.length;
    newArray.push(array[index]);
  }

  return newArray;
}
/**********************/

/*       POPUP        */

/**********************/

/*
	Utils from Marc Bouchenoire
	for easier UI design
	https://github.com/bouchenoiremarc
*/

function createLabel(text, fontSize, bold, frame, opacity) {
  var label = NSTextField.alloc().initWithFrame(frame);
  label.setStringValue(text);
  label.setFont(bold ? NSFont.boldSystemFontOfSize(fontSize) : NSFont.systemFontOfSize(fontSize));
  label.setBezeled(false);
  label.setDrawsBackground(false);
  label.setEditable(false);
  label.setSelectable(false);
  if (opacity) label.setAlphaValue(opacity);
  return label;
}
function createTextField(value, placeholder, frame) {
  var textfield = NSTextField.alloc().initWithFrame(frame);
  textfield.cell().setWraps(false);
  textfield.cell().setScrollable(true);
  textfield.setStringValue(value);
  if (placeholder) textfield.setPlaceholderString(placeholder);
  return textfield;
}
function createDropdown(values, frame) {
  var dropdown = NSPopUpButton.alloc().initWithFrame(frame);
  dropdown.addItemsWithTitles(values);
  return dropdown;
}
function createCheckbox(text, checked, frame) {
  checked = checked == false ? NSOffState : NSOnState;
  var checkbox = NSButton.alloc().initWithFrame(frame);
  checkbox.setButtonType(NSSwitchButton);
  checkbox.setBezelStyle(0);
  checkbox.setTitle(text);
  checkbox.setState(checked);
  return checkbox;
}
/**********************/

/* VAL IN LAYER NAME  */

/**********************/

function getValFromLayerName(name) {
  var a = name.split("{:");

  if (a.length == 1) {
    return false;
  }

  var b = a[1].split(":}");
  var val = parseFloat(b[0]);

  if (isNaN(val)) {
    return false;
  }

  return val;
}
function renameLayer(name, newVal) {
  var a = name.split("{:");
  var newName = name + " {:" + newVal + ":}";

  if (a.length > 1) {
    var b = a[1].split(":}");

    if (b.length == 1) {
      return newName;
    }

    var newName = a[0] + "{:" + newVal + ":}" + b[1];
  }

  return newName;
}
/**********************/

/*     BARCHART       */

/**********************/

function isVerticalBarchart(arr) {
  // arr needs to be doc.selectedLayers
  var isVertical = true;

  if (arr.layers.length >= 2 && arr.layers[0].frame.y != arr.layers[1].frame.y) {
    // It's horizontal if
    // 1. First two bars share same x value (works for positive values)
    if (arr.layers[0].frame.x == arr.layers[1].frame.x) {
      isVertical = false;
    } // 2. Same y-baseline (works if first value is negative) 
    // and they share same height
    // ! Needs check if first / second val is negative
    else if (arr.layers[0].frame.x + arr.layers[0].frame.width == arr.layers[1].frame.x && arr.layers[0].frame.height == arr.layers[1].frame.height) {
        isVertical = false;
      } else if (arr.layers[1].frame.x + arr.layers[1].frame.width == arr.layers[0].frame.x && arr.layers[0].frame.height == arr.layers[1].frame.height) {
        isVertical = false;
      }
  }

  return isVertical;
}
/**********************/

/* NON-RANDO BARCHART */

/**********************/

function getBarHeight(arr, isVertical) {
  // arr needs to be doc.selectedLayers
  var barLength_str = "";

  for (var i = 0; i < arr.layers.length; i++) {
    var thisLength = undefined;

    if (isVertical) {
      thisLength = arr.layers[i].frame.height.toFixed(2); // reduce to 2 decimals
    } else {
      thisLength = arr.layers[i].frame.width.toFixed(2); // reduce to 2 decimals
    }

    thisLength = parseFloat(thisLength); // to remove decimals from integers

    if (i == 0) {
      barLength_str = "" + thisLength;
    } else {
      barLength_str = barLength_str + "," + thisLength;
    }
  }

  return barLength_str;
}

/***/ }),

/***/ "sketch":
/*!*************************!*\
  !*** external "sketch" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch");

/***/ })

/******/ });
  if (key === 'default' && typeof exports === 'function') {
    exports(context);
  } else {
    exports[key](context);
  }
}
that['onRun'] = __skpm_run.bind(this, 'default')

//# sourceMappingURL=randomfill.js.map