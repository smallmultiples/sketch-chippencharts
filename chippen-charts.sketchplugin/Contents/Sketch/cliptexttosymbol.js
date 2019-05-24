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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/cliptexttosymbol.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/cliptexttosymbol.js":
/*!*********************************!*\
  !*** ./src/cliptexttosymbol.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ "./src/utils.js");

 // documentation: https://developer.sketchapp.com/reference/api/
// https://github.com/sonburn/symbol-instance-locator/blob/master/Symbol%20Instance%20Locator.sketchplugin/Contents/Sketch/script.js

var symbolOverrideLayers;
/* harmony default export */ __webpack_exports__["default"] = (function () {
  log('~~ Run Chippen charts ~~');
  var doc = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.getSelectedDocument();
  var selectedLayers = doc.selectedLayers;

  var pluginName = __command.pluginBundle().name();

  if (selectedLayers.layers.length == 0) {
    sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.alert(pluginName, 'Please select at least 1 layer that contains a symbol override.');
    return false;
  }
  /*
  	CLIPBOARD
  */


  var newLineSeparator = "\n";
  var sep = newLineSeparator;
  var pasteBoard = NSPasteboard.generalPasteboard(); // Turn a data in the string type

  var stringFromPasteBoard = pasteBoard.stringForType(NSPasteboardTypeString);

  if (stringFromPasteBoard == null) {
    sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.alert(pluginName, 'Your clipboard does not seem to be just text. Try again with only lines of text.');
    return false;
  }

  var pasteboardLines = stringFromPasteBoard.split(newLineSeparator);
  /*
  	SELECTED SYMBOLS
  */

  var selectedSymbols = selectedLayers.layers.filter(function (layer) {
    return layer.type == "SymbolInstance" || layer.type == "SymbolMaster";
  });

  if (selectedSymbols.length == 0) {
    sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.alert(pluginName, 'Please select at least 1 layer that contains a symbol.');
    return false;
  }

  var symbolsWithOverrides = selectedSymbols.filter(function (symbol) {
    return symbol.overrides.length != 0;
  });

  if (symbolsWithOverrides.length == 0) {
    sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.alert(pluginName, 'Please select at least 1 symbol that contains a text override.');
    return false;
  }

  var symbolsIDs = symbolsWithOverrides.map(function (symbol) {
    return symbol.symbolId;
  });
  var uniqueSymbolIDs = symbolsIDs.filter(_utils_js__WEBPACK_IMPORTED_MODULE_1__["onlyUnique"]);

  if (uniqueSymbolIDs.length > 1) {
    sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.alert(pluginName, "Please use only symbols of the same kind. Maybe you want to try to use only symbols like \"".concat(symbolsWithOverrides[0].name, "\"."));
    return false;
  }
  /*
  	Informative Text
  */


  var warningMsg = "";

  if (pasteboardLines.length > symbolsWithOverrides.length) {
    warningMsg = "There are more lines of text in the clipboard (".concat(pasteboardLines.length, ") than there are symbols in the selection (").concat(symbolsWithOverrides.length, "). That means not all content from clipboard will be used.");
  } else if (symbolsWithOverrides.length > pasteboardLines.length) {
    warningMsg = "There are more symbols selected (".concat(symbolsWithOverrides.length, ") than there are lines of text in the clipboard (").concat(pasteboardLines.length, "). Clipboard text will be repeated in the overflow symbols.");
  }

  var informativeText = "";

  if (warningMsg != "") {
    informativeText = "⚠️ Watch out! - " + warningMsg + " \n\nYou can go ahead but outcomes might not be as expected.";
  } else {
    informativeText = "You are about to alter ".concat(symbolsWithOverrides.length, " symbol overrides using text from the clipboard.");
  }
  /*
  	Dropdown options
  */


  var stringvalueOverrides = symbolsWithOverrides[0].overrides.filter(function (override) {
    return override.property == 'stringValue';
  });
  var overrideOptions = stringvalueOverrides.map(function (override, index) {
    return "Override " + (parseInt(index) + 1) + " (" + override.value + ")";
  });
  /*
  	Setup the window
  	*/

  var alert = COSAlertWindow.new();
  alert.setMessageText("Paste clipboard text into symbol overrides");
  alert.addButtonWithTitle("Run");
  alert.addButtonWithTitle("Cancel");
  alert.setInformativeText(informativeText);
  /*
  	Input
  	*/
  // OVERRIDE DROPDOWN

  var alert_width = 280;
  var overrideOptions_label = Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["createLabel"])("What override shall it be? ", 12, true, NSMakeRect(0, 0, alert_width, 16));
  var overrideOptions_dropdown = Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["createDropdown"])(overrideOptions, NSMakeRect(-2, -1, 280, 24));

  if (overrideOptions.length > 1) {
    alert.addAccessoryView(overrideOptions_label);
    alert.addAccessoryView(overrideOptions_dropdown);
  } // REVERSE CHECKBOX


  var reverse_checkbox = Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["createCheckbox"])("Reverse order of clipboard text", false, NSMakeRect(-2, -1, 280, 24));

  if (pasteboardLines.length > 1) {
    alert.addAccessoryView(reverse_checkbox);
  }
  /*
  Response
  */


  var overrideIndex;
  var responseCode = alert.runModal();

  if (responseCode == 1000) {
    // Dropdown input
    var dropddownIndex = overrideOptions_dropdown.indexOfSelectedItem();
    var overrideID = stringvalueOverrides[dropddownIndex].id; // Mapping index of dropdown to index of overrides.
    // Dropdown does only include stringValue overrides
    // and no symbolID overrides (top level of nested symbol).
    // That's why the length can differ.

    for (var i = 0; i < symbolsWithOverrides[0].overrides.length; i++) {
      if (symbolsWithOverrides[0].overrides[i].id == overrideID) {
        overrideIndex = i;
      }
    } // Checkbox input


    var reverse = false;

    if (Number(reverse_checkbox.state()) == 1) {
      reverse = true;
    }
  } else {
    // 1001
    return false;
  }
  /*
  	OVERRIDE
  */


  var clip = pasteboardLines;

  if (reverse) {
    clip.reverse();
  }

  if (symbolsWithOverrides.length > clip.length) {
    var clip_filled = Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["iterativeGapFilling"])(clip, symbolsWithOverrides.length);
    clip = clip_filled;
  }

  for (var i = 0; i < symbolsWithOverrides.length; i++) {
    symbolsWithOverrides[i].overrides[overrideIndex].value = clip[i];
  }

  sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("Text from clipboard was pasted into ".concat(symbolsWithOverrides.length, " symbols"));
});

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

//# sourceMappingURL=cliptexttosymbol.js.map