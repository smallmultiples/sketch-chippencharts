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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/nonrandom-barchart.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/nonrandom-barchart.js":
/*!***********************************!*\
  !*** ./src/nonrandom-barchart.js ***!
  \***********************************/
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
  var barHeight_fromSelection = Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["getBarHeight"])(doc.selectedLayers, isVertical);
  /* 
  	User input
  */

  var response = myinput(minMax_fromSelection, doc.selectedLayers.layers.length, barHeight_fromSelection, isVertical);
  var scaleType_names = ["", "Multiplied by", "Set to max pixel height"];
  var minMax = [response.min, response.max];

  if (response.code !== 1000) {
    return;
  }

  var myRandomSlots = []; // Force other type than detected if user has selected force type

  if (response.forcetype) {
    isVertical = !isVertical;
  }
  /* 
  	UI message
  */


  var isVertical_name = "vertical";

  if (!isVertical) {
    isVertical_name = "horizontal";
  }

  var alert_diff = selectedLayers.layers.length - response.numbers.length;
  var message_options = "";

  if (response.scaleType != 0) {
    message_options = "(".concat(scaleType_names[response.scaleType], " ").concat(response.scaleValue, ")");
  }

  if (alert_diff <= 0) {
    sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("\uD83E\uDD19 ".concat(doc.selectedLayers.length, " ").concat(isVertical_name, " bars were adjusted ").concat(message_options));
  } else {
    sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("\uD83E\uDD19 ".concat(response.numbers.length, " ").concat(isVertical_name, " bars were adjusted ").concat(message_options));
  }
  /* 
  	Changing size
  */


  var baseLine = 0;
  var firstBarVal = Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["getValFromLayerName"])(selectedLayers.layers[0].name);

  if (isVertical) {
    baseLine = selectedLayers.layers[0].frame.y + selectedLayers.layers[0].frame.height; // Adjust when first value of existing bar is negative 
    // Based on layer name

    if (firstBarVal < 0) {
      baseLine = baseLine - Math.abs(firstBarVal);
    }
  } else {
    if (firstBarVal >= 0) {
      baseLine = selectedLayers.layers[0].frame.x;
    } else if (firstBarVal < 0) {
      baseLine = selectedLayers.layers[0].frame.x + Math.abs(firstBarVal);
    }
  }

  for (var i = 0; i < selectedLayers.layers.length; i++) {
    var newLength = 1;

    if (response.numbers[i] == undefined) {
      newLength = undefined; // no bar will be changed and no error will be thrown (it's undefined by default anyway)
    } else {
      if (response.scaleType == 1) {
        // Multiplier
        newLength = response.numbers[i] * response.scaleValue;
      } else if (response.scaleType == 2) {
        // Set max height
        newLength = response.numbers[i] * response.scaleValue / response.max;
      } else {
        // none
        newLength = response.numbers[i];
      }
    } // Length can't be zero


    if (newLength == 0) {
      newLength = 0.5;
      response.numbers[i] = 0.5;
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
      selectedLayers.layers[i].frame.x = baseLine; // Change width

      selectedLayers.layers[i].frame.width = Math.abs(newLength); // Reposition bars with negative values

      if (newLength < 0) {
        selectedLayers.layers[i].frame.x = selectedLayers.layers[i].frame.x - Math.abs(newLength);
      }
    } // Rename layer	
    // Data value will be added to layer name
    // Example: Rectangle ==> Rectangle {:12:}


    selectedLayers.layers[i].name = Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["renameLayer"])(selectedLayers.layers[i].name, response.numbers[i]);
  } // Notification
  // Alert in case number of selected layers 
  // does not match amount of numbers


  if (alert_diff != 0) {
    if (alert_diff > 0) {
      sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.alert("\uD83D\uDE07 Just letting you know", "Only the first ".concat(response.numbers.length, " of your selected layer(s) have been adjusted. There weren't enough number values to adjust the last ").concat(Math.abs(alert_diff), " layer(s). Maybe check the separator options (comma, etc)."));
    } else if (alert_diff < 0) {
      sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.alert("\uD83D\uDE07 Just letting you know", "The last ".concat(Math.abs(alert_diff), " values weren't used as there weren't enough layer(s) selected."));
    }
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

function myinput() {
  var myMinMax = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [20, 100];
  var numOfBars = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  var myBarHeightFromSelection = arguments.length > 2 ? arguments[2] : undefined;
  var my_isVertical = arguments.length > 3 ? arguments[3] : undefined;
  var myresponse = {
    code: null,
    max: null,
    forcetype: false,
    numbers: [],
    trendTypeInput: null
  };

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


    var width = 260;
    var height = 40; // Number input

    var sampleNumbers = myBarHeightFromSelection;
    /*
    	Setup the window
    	*/

    var alert = COSAlertWindow.new();

    if (numOfBars == 1) {
      alert.setMessageText("1 layer selected to create bar chart");
    } else {
      alert.setMessageText("".concat(numOfBars, " layers selected to create bar chart"));
    }

    alert.addButtonWithTitle("Run");
    alert.addButtonWithTitle("Cancel");
    alert.setInformativeText("This is for a bar chart with specific values, rather than random numbers.");
    /*
    	Input
    	*/

    var alert_width = 280;
    var numInput_separatorOptions = ["Comma separated", "Space separated", "Tab separated (Excel row)", "Line break separated (Excel column)"];
    var numInput_label = Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["createLabel"])("Paste in your number values", 12, true, NSMakeRect(0, 0, alert_width, 16));
    var numInput = Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["createTextField"])(sampleNumbers, null, NSMakeRect(0, 0, alert_width, 25));
    var numInput_separator = Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["createDropdown"])([numInput_separatorOptions[0], numInput_separatorOptions[1], numInput_separatorOptions[2], numInput_separatorOptions[3]], NSMakeRect(-2, -1, 170, 30));
    alert.addAccessoryView(numInput_label);
    alert.addAccessoryView(numInput);
    alert.addAccessoryView(numInput_separator);
    /*
    Bar type: Vertical or horizontal
    */

    var bartype_label = Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["createLabel"])("Vertical or horizontal?", 12, true, NSMakeRect(0, 0, alert_width, 16));
    alert.addAccessoryView(bartype_label);
    var bartype_radio = NSView.alloc().initWithFrame(NSMakeRect(0, 0, width, 48));
    var buttonFormat;
    buttonFormat = NSButtonCell.alloc().init();
    buttonFormat.setButtonType(NSRadioButton);
    var matrixFormat = NSMatrix.alloc().initWithFrame_mode_prototype_numberOfRows_numberOfColumns(NSMakeRect(0, 0, 260, 48), NSRadioModeMatrix, buttonFormat, 2, 1);
    matrixFormat.setCellSize(CGSizeMake(260, 25));
    var bartype_radio1_label = my_isVertical ? "Automatic (vertical detected)" : "Automatic (horizontal detected)";
    var bartype_radio2_label = my_isVertical ? "Force horizontal" : "Force vertical";
    var cells = matrixFormat.cells();
    cells.objectAtIndex(0).setTitle(bartype_radio1_label);
    cells.objectAtIndex(1).setTitle(bartype_radio2_label);
    bartype_radio.addSubview(matrixFormat);
    alert.addAccessoryView(bartype_radio);
    /*
    Options
    */

    var optionsView_height = 85;
    var optionsView = NSView.alloc().initWithFrame(NSMakeRect(0, 0, alert_width, optionsView_height));
    var optionsLabel = Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["createLabel"])("Do you want to scale the values?", 12, true, NSMakeRect(0, optionsView_height - 26, alert_width, 16)); //var optionsLabel_inlineNote = createLabel("(optional)", 12, false, NSMakeRect(215, optionsView_height - 26, alert_width, 16), 0.3);

    var option1_label = Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["createLabel"])("Multiply by", 12, false, NSMakeRect(0, optionsView_height - 48, 130, 16));
    var option1_textField = Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["createTextField"])("", "e.g. 1.5", NSMakeRect(0, optionsView_height - 81, 120, 25));
    var option2_label = Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["createLabel"])("or set max height (px)", 12, false, NSMakeRect(140, optionsView_height - 48, 130, 16));
    var option2_textField = Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["createTextField"])("", "e.g. " + 100, NSMakeRect(140, optionsView_height - 81, 120, 25)); // prev version showed myMinMax[1] as option
    //var options_info = createLabel("You have the option to define the scaling in case the supplied values don't match your desired pixel values. You can either define a multiplier or set a maximum bar height in pixel.", 11, false, NSMakeRect(0, 0, 260, 16*4))

    var options_info = Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["createLabel"])("Scale data values in case the supplied numbers don't match the desired pixel values.", 11, false, NSMakeRect(0, 0, 260, 16 * 2));
    optionsView.addSubview(optionsLabel); //optionsView.addSubview(optionsLabel_inlineNote);

    optionsView.addSubview(option1_label);
    optionsView.addSubview(option1_textField);
    optionsView.addSubview(option2_label);
    optionsView.addSubview(option2_textField);
    alert.addAccessoryView(optionsView); // alert.addAccessoryView(options_info)

    /*
    Key navigation (popup)
    */

    alert.alert().window().setInitialFirstResponder(numInput);
    numInput.setNextKeyView(option1_textField);
    option1_textField.setNextKeyView(option2_textField);
    option2_textField.setNextKeyView(numInput);
    /*
    Note
    */

    var note_line1 = Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["createLabel"])("Please make sure proportional scaling is disabled", 11, false, NSMakeRect(0, 0, alert_width + 10, 16), 0.3);
    alert.addAccessoryView(note_line1);
    /*
    RESPONSE
    */

    var responseCode = alert.runModal();

    if (responseCode == 1000) {
      myresponse.code = 1000; // OK
      // Separator

      var sep = ",";
      var sep_input = numInput_separator.titleOfSelectedItem();

      if (sep_input == numInput_separatorOptions[1]) {
        sep = " ";
      }

      if (sep_input == numInput_separatorOptions[2]) {
        sep = "\t";
      } else if (sep_input == numInput_separatorOptions[3]) {
        sep = "\n";
      } // Numbers


      var numbers_str = "";

      if (numInput.stringValue() == "") {
        numbers_str = sampleNumbers;
      } else {
        numbers_str = numInput.stringValue();
      }

      var numbers_arr = numbers_str.split(sep);

      for (var i = 0; i < numbers_arr.length; i++) {
        myresponse.numbers.push(parseFloat(numbers_arr[i]));
      } // Force bar chart type


      var forcetype_index = matrixFormat.cells().indexOfObject(matrixFormat.selectedCell());
      myresponse.forcetype = forcetype_index == 0 ? false : true; // Options

      if (option2_textField.stringValue() != "") {
        // Option 2: Set max height
        myresponse.scaleType = 2;
        myresponse.scaleValue = parseFloat(option2_textField.stringValue());
      } else if (option1_textField.stringValue() != "") {
        // Option 1: Multiplier
        myresponse.scaleType = 1;
        myresponse.scaleValue = parseFloat(option1_textField.stringValue());
      } else {
        myresponse.scaleType = 0;
      }
    } else {
      // Cancel
      myresponse.code = 1001;
    }

    myresponse.max = myresponse.numbers.reduce(function (a, b) {
      return Math.max(a, b);
    });
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

//# sourceMappingURL=nonrandom-barchart.js.map