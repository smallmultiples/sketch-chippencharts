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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/barchart.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/barchart.js":
/*!*************************!*\
  !*** ./src/barchart.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ "./src/utils.js");

 // documentation: https://developer.sketchapp.com/reference/api/

/* harmony default export */ __webpack_exports__["default"] = (function () {
  log('~~ Run Chippen charts ~~');
  var doc = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.getSelectedDocument();
  var selectedLayers = doc.selectedLayers;
  /* 
  	Analyse selected layers
  */

  var isVertical = Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["isVerticalBarchart"])(doc.selectedLayers);
  var minMax_fromSelection = getMinMax(doc.selectedLayers, isVertical);
  /* 
  	User input
  */

  var response = myinput(minMax_fromSelection, doc.selectedLayers.layers.length);
  var minMax = [response.min, response.max];

  if (response.code !== 1000) {
    return;
  }

  var myRandomSlots = [];

  if (response.trendTypeInput == 0) {
    // Only for random trend
    // Set 2 random bars to min and max
    myRandomSlots = twoRandomSlots(selectedLayers.layers.length, 'Random');
  }
  /* 
  	UI message
  */


  var trendTypeInput_name = ["random data", "trend going up ↑ (linear)", "trend going up ↑ (natural)", "trend going down ↓ (linear)", "trend going down ↓ (natural)"];
  var isVertical_name = "vertical";

  if (!isVertical) {
    isVertical_name = "horizontal";
  }

  sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("".concat(doc.selectedLayers.length, " ").concat(isVertical_name, " bars with ").concat(trendTypeInput_name[response.trendTypeInput], " (").concat(minMax[0], "px\u2013").concat(minMax[1], "px)"));
  /* 
  	Changing size
  */

  var firstBarVal = Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["getValFromLayerName"])(selectedLayers.layers[0].name);
  var baseLine = 0;

  if (isVertical) {
    baseLine = selectedLayers.layers[0].frame.y + selectedLayers.layers[0].frame.height; // Adjust when first value of existing bar is negative 
    // Based on layer name

    if (firstBarVal < 0) {
      baseLine = baseLine - Math.abs(firstBarVal);
    }

    ;
  } else {
    if (firstBarVal >= 0) {
      baseLine = selectedLayers.layers[0].frame.x;
    } else if (firstBarVal < 0) {
      baseLine = selectedLayers.layers[0].frame.x + Math.abs(firstBarVal);
    }
  }

  for (var i = 0; i < selectedLayers.layers.length; i++) {
    var newLength = 1;

    if (response.trendTypeInput == 3 || response.trendTypeInput == 4) {
      // reverse minMax if trend is going down
      // and after that just use same code as for trend going up
      minMax = [minMax[1], minMax[0]];
      response.trendTypeInput = response.trendTypeInput - 2;
    } // Random


    if (response.trendTypeInput == 0) {
      // random values between min and max
      newLength = Math.floor(Math.random() * (minMax[1] - minMax[0])) + minMax[0];

      if (i == myRandomSlots[0]) {
        // force a random slot to be min
        newLength = minMax[0];
      }

      if (i == myRandomSlots[1]) {
        // force a random slot to be max
        newLength = minMax[1];
      }
    } // Trend going up


    if (response.trendTypeInput == 1 || response.trendTypeInput == 2) {
      var stepIncrease = (minMax[1] - minMax[0]) / selectedLayers.layers.length;

      if (response.trendTypeInput == 1) {
        newLength = stepIncrease * i + minMax[0];
      } else if (response.trendTypeInput == 2) {
        var increase_random = stepIncrease * Math.random();
        var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
        newLength = stepIncrease * i + minMax[0] + increase_random * plusOrMinus;
      } // force first and last to be min and max


      if (i == 0) {
        newLength = minMax[0];
      } else if (i == selectedLayers.layers.length - 1) {
        newLength = minMax[1];
      }

      newLength = Math.round(newLength * 10) / 10;
    } // Length can't be zero


    if (newLength == 0) {
      newLength = 1;
    } // Change Width / Height


    if (isVertical) {
      // Change height
      selectedLayers.layers[i].frame.height = Math.abs(newLength); // Move to baseline

      if (newLength > 0) {
        // Reposition bars with positive values
        selectedLayers.layers[i].frame.y = baseLine - Math.abs(newLength);
      } else {
        // Reposition bars with negative values
        selectedLayers.layers[i].frame.y = baseLine;
      }
    } else {
      // Reset position, just in case
      selectedLayers.layers[i].frame.x = baseLine; // Change Width

      selectedLayers.layers[i].frame.width = Math.abs(newLength); // Reposition bars with negative values

      if (newLength < 0) {
        selectedLayers.layers[i].frame.x = selectedLayers.layers[i].frame.x - Math.abs(newLength);
      }
    } // Rename layer	
    // Example: Rectangle ==> Rectangle {:12:}


    selectedLayers.layers[i].name = Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["renameLayer"])(selectedLayers.layers[i].name, newLength);
  }
});

function getMinMax(arr, isVertical) {
  // arr needs to be doc.selectedLayers
  var min = 0;
  var max = 0;

  if (isVertical) {
    // Vertical bar chart (get minMax height)
    for (var i = 0; i < arr.layers.length; i++) {
      var thisHeight = arr.layers[i].frame.height; // Max

      if (thisHeight > max) {
        max = thisHeight;
      } // Min


      if (min == 0) {
        // set min at first runfirst
        min = max;
      }

      if (thisHeight < min) {
        min = thisHeight;
      }
    }
  } else {
    // Horizontal bar chart (get minMax width)
    for (var i = 0; i < arr.layers.length; i++) {
      var thisWidth = arr.layers[i].frame.width; // Max

      if (thisWidth > max) {
        max = thisWidth;
      } // Min


      if (min == 0) {
        // set min at first run
        min = max;
      }

      if (thisWidth < min) {
        min = thisWidth;
      }
    }
  }

  return [Math.ceil(min), Math.ceil(max)];
}

function twoRandomSlots(length, type) {
  var slotOne = 0;
  var slotTwo = 0;

  if (type == 'Random') {
    slotOne = Math.floor(Math.random() * length / 2);
    slotTwo = Math.floor(Math.random() * length / 2) + Math.floor(length / 2);
  }

  return [slotOne, slotTwo];
}

function myinput() {
  var myMinMax = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [20, 100];
  var numOfBars = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  var myresponse = {};

  if (myMinMax.length != 2 || myMinMax[0] == myMinMax[1]) {
    if (myMinMax[0] > 100) {
      myMinMax = [20, myMinMax[1]];
    } else {
      myMinMax = [myMinMax[0], 100];
    }
  }

  if (numOfBars == 0) {
    myresponse.code == 1001;
    sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.alert("Sorry buddy", "You need to select multiple rectangles (bars) for this plugin to work.");
  }

  if (numOfBars != 0) {
    if (numOfBars == 1) {
      sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.alert("Hey, just letting you know", "Most awesome results come when selecting more than 1 bar.");
    } // Create initial view panel


    var width = 280;
    var height = 40;
    var view = NSView.alloc().initWithFrame(NSMakeRect(0, 0, width, height)); // Min Max input

    var minInput = NSTextField.alloc().initWithFrame(NSMakeRect(0.0, 15.0, 130, 25.0));
    minInput.cell().setPlaceholderString(myMinMax[0] + " (min)");
    view.addSubview(minInput);
    var maxInput = NSTextField.alloc().initWithFrame(NSMakeRect(150, 15.0, 130, 25.0));
    maxInput.cell().setPlaceholderString(myMinMax[1] + " (max)");
    view.addSubview(maxInput); // Nature of data

    var trendTypeInput = NSView.alloc().initWithFrame(NSMakeRect(0, 0, width, 125)); // Acts like a template (prototype) for our radio buttons

    var buttonFormat;
    buttonFormat = NSButtonCell.alloc().init();
    buttonFormat.setButtonType(NSRadioButton); // The matrix will contain all the cells (radio buttons)

    var matrixFormat = NSMatrix.alloc().initWithFrame_mode_prototype_numberOfRows_numberOfColumns(NSMakeRect(0, 0, 260, 125), // Horizontal position, vertical position, width, height
    NSRadioModeMatrix, // This makes the radio buttons work together
    buttonFormat, 5, // 1 row
    1 // 3 columns (for 3 radio buttons)
    ); // Settings the size of the radio buttons

    matrixFormat.setCellSize(CGSizeMake(260, 25)); // Adding the radio buttons to the form

    var cells = matrixFormat.cells();
    cells.objectAtIndex(0).setTitle("Random");
    cells.objectAtIndex(1).setTitle("Trend going up ↑ (linear)");
    cells.objectAtIndex(2).setTitle("Trend going up ↑ (natural)");
    cells.objectAtIndex(3).setTitle("Trend going down ↓ (linear)");
    cells.objectAtIndex(4).setTitle("Trend going down ↓ (natural)"); // Adding the matrix to the form

    trendTypeInput.addSubview(matrixFormat); // Setup the window

    var alert = COSAlertWindow.new();

    if (numOfBars == 1) {
      alert.setMessageText("Create your random bar chart \nwith 1 selected layer");
    } else {
      alert.setMessageText("Create your random bar chart \nwith ".concat(numOfBars, " selected layers"));
    }

    alert.addButtonWithTitle("Run");
    alert.addButtonWithTitle("Cancel");
    alert.setInformativeText("This is for a bar chart where random values are applied \nto the layers of your selection.");
    var extrema_label = Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["createLabel"])("Define extrema of bars", 12, true, NSMakeRect(0, 0, width, 16));
    alert.addAccessoryView(extrema_label); //alert.addTextLabelWithValue("Define extrema of bars");

    alert.alert().window().setInitialFirstResponder(minInput);
    alert.addAccessoryView(view);
    var trend_label = Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["createLabel"])("Specify the desired trend", 12, true, NSMakeRect(0, 0, width, 16));
    alert.addAccessoryView(trend_label); //alert.addTextLabelWithValue("Specify the desired trend");

    alert.addAccessoryView(trendTypeInput);
    /*
    Note
    */

    var note_line1 = Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["createLabel"])("\nPlease make sure proportional scaling is disabled", 11, false, NSMakeRect(0, 0, width, 16 * 2), 0.3);
    alert.addAccessoryView(note_line1);
    var responseCode = alert.runModal();

    if (responseCode == 1000) {
      myresponse.code = 1000; // OK
      // pass minmax input

      if (minInput.stringValue() == "") {
        myresponse.min = myMinMax[0];
      } else {
        myresponse.min = parseInt(minInput.stringValue());
      }

      if (maxInput.stringValue() == "") {
        myresponse.max = myMinMax[1];
      } else {
        myresponse.max = parseInt(maxInput.stringValue());
      }
    } else {
      // Cancel
      myresponse.code = 1001;
    }

    myresponse.trendTypeInput = matrixFormat.cells().indexOfObject(matrixFormat.selectedCell());
  }

  return myresponse;
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

//# sourceMappingURL=barchart.js.map