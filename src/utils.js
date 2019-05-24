export function getSymbolInstances(source,symbolMaster) {
	// https://github.com/sonburn/
	var symbolInstances = NSMutableArray.array();

	source.sketchObject.pages().forEach(function(page){
		var predicate = NSPredicate.predicateWithFormat('className == %@ && symbolMaster.objectID == %@','MSSymbolInstance',symbolMaster.sketchObject.objectID());

		page.children().filteredArrayUsingPredicate(predicate).forEach(instance => symbolInstances.addObject(instance));
	});

	return symbolInstances;
}

export function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

export function iterativeGapFilling(array, length){
	var newArray = [];
	for(var i=0; i<length; i++){
    	var loop = Math.floor(i/array.length);
 		var index = i-(loop*array.length);
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

export function createLabel(text, fontSize, bold, frame, opacity) {
  var label = NSTextField.alloc().initWithFrame(frame)
  label.setStringValue(text)
  label.setFont((bold) ? NSFont.boldSystemFontOfSize(fontSize) : NSFont.systemFontOfSize(fontSize))
  label.setBezeled(false)
  label.setDrawsBackground(false)
  label.setEditable(false)
  label.setSelectable(false)
  if (opacity) label.setAlphaValue(opacity)

  return label
}
export function createTextField(value, placeholder, frame) {
  var textfield = NSTextField.alloc().initWithFrame(frame)
  textfield.cell().setWraps(false);
  textfield.cell().setScrollable(true);
  textfield.setStringValue(value);
  if (placeholder) textfield.setPlaceholderString(placeholder);

  return textfield
}

export function createDropdown(values, frame){
  var dropdown = NSPopUpButton.alloc().initWithFrame(frame)
  dropdown.addItemsWithTitles(values)

  return dropdown
}

export function createCheckbox(text, checked, frame) {
    checked = (checked == false) ? NSOffState : NSOnState
    var checkbox = NSButton.alloc().initWithFrame(frame)
    checkbox.setButtonType(NSSwitchButton)
    checkbox.setBezelStyle(0)
    checkbox.setTitle(text)
    checkbox.setState(checked)

    return checkbox
}


/**********************/
/* VAL IN LAYER NAME  */
/**********************/

export function getValFromLayerName(name){
	
	var a = name.split("{:")
	if(a.length == 1){return false;}
	var b = a[1].split(":}");

	var val = parseFloat(b[0])
	if(isNaN(val)){return false;}
	
	return  val;
}

export function renameLayer(name, newVal){
	
	var a = name.split("{:")
	var newName = name + " {:" + newVal + ":}";

	if(a.length > 1){
		var b = a[1].split(":}");
		if(b.length == 1){return newName;}
		var newName = a[0] + "{:" + newVal + ":}" + b[1];
	}

	return newName
}


/**********************/
/*     BARCHART       */
/**********************/

export function isVerticalBarchart(arr){
	// arr needs to be doc.selectedLayers
	var isVertical = true
	if(arr.layers.length >= 2 && arr.layers[0].frame.y != arr.layers[1].frame.y){
		// It's horizontal if
		// 1. First two bars share same x value (works for positive values)
		if(arr.layers[0].frame.x == arr.layers[1].frame.x){
			isVertical = false;
		}
		// 2. Same y-baseline (works if first value is negative) 
		// and they share same height
		// ! Needs check if first / second val is negative
		else if(arr.layers[0].frame.x + arr.layers[0].frame.width == arr.layers[1].frame.x && arr.layers[0].frame.height == arr.layers[1].frame.height){
			isVertical = false;	
		}
		else if(arr.layers[1].frame.x + arr.layers[1].frame.width == arr.layers[0].frame.x && arr.layers[0].frame.height == arr.layers[1].frame.height){
			isVertical = false;	
		}
	}
	return isVertical
}


/**********************/
/* NON-RANDO BARCHART */
/**********************/

export function getBarHeight(arr, isVertical){
	// arr needs to be doc.selectedLayers
	var barLength_str = ""
	
	for(var i=0; i<arr.layers.length; i++){
		var thisLength = undefined;
		if(isVertical){
			thisLength = arr.layers[i].frame.height.toFixed(2); // reduce to 2 decimals
		}else{
			thisLength = arr.layers[i].frame.width.toFixed(2); // reduce to 2 decimals
		}
		thisLength = parseFloat(thisLength) // to remove decimals from integers
		if(i==0){
			barLength_str = "" + thisLength	
		}else{
			barLength_str = barLength_str + "," + thisLength
		}
		
	}
	return barLength_str
}