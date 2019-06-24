import sketch from 'sketch'
import { getBarHeight, getValFromLayerName, renameLayer, isVerticalBarchart, createLabel, createTextField, createDropdown } from "./utils.js";
// documentation: https://developer.sketchapp.com/reference/api/

export default function() {
	log('~~ Run Chippen charts ~~')
	const doc = sketch.getSelectedDocument()
	const selectedLayers = doc.selectedLayers

	/* 
		Analyse selected layers
	*/
	
	var isVertical = isVerticalBarchart(doc.selectedLayers)

	var minMax_fromSelection = getMinMax(doc.selectedLayers, isVertical)
	var barHeight_fromSelection = getBarHeight(doc.selectedLayers, isVertical)


	/* 
		User input
	*/

	var response = myinput(minMax_fromSelection, doc.selectedLayers.layers.length, barHeight_fromSelection, isVertical)

	var scaleType_names = ["", "Multiplied by", "Set to max pixel height"]

	var minMax = [response.min, response.max]
	if (response.code !== 1000) {
			return
		}
	var myRandomSlots = []
 
	// Force other type than detected if user has selected force type
 	if(response.forcetype){isVertical = !isVertical}

	/* 
		UI message
	*/

	var isVertical_name = "vertical"
	if(!isVertical){isVertical_name = "horizontal"}
	var alert_diff = selectedLayers.layers.length - response.numbers.length
	var message_options = "";
	if(response.scaleType != 0){
		message_options = `(${scaleType_names[response.scaleType]} ${response.scaleValue})`
	}
	if(alert_diff <= 0){
		sketch.UI.message(`🤙 ${doc.selectedLayers.length} ${isVertical_name} bars were adjusted ${message_options}`)	
	}else{
		sketch.UI.message(`🤙 ${response.numbers.length} ${isVertical_name} bars were adjusted ${message_options}`)	
	}
	

	/* 
		Changing size
	*/
	
	var baseLine = 0;
	const firstBarVal = getValFromLayerName(selectedLayers.layers[0].name);

	if(isVertical){
		baseLine = selectedLayers.layers[0].frame.y + selectedLayers.layers[0].frame.height
		// Adjust when first value of existing bar is negative 
		// Based on layer name
		if(firstBarVal < 0){baseLine = baseLine - Math.abs(firstBarVal)}
	}else{
		if(firstBarVal >= 0){
			baseLine = selectedLayers.layers[0].frame.x	
		}else if(firstBarVal < 0){
			baseLine = selectedLayers.layers[0].frame.x	+ Math.abs(firstBarVal)
		}
	}
	
	for(var i = 0; i<selectedLayers.layers.length; i++){

		var newLength = 1
		
		if(response.numbers[i] == undefined){
			newLength = undefined // no bar will be changed and no error will be thrown (it's undefined by default anyway)
		}else{
			if(response.scaleType == 1){
				// Multiplier
				newLength = response.numbers[i] * response.scaleValue
			}else if(response.scaleType == 2){
				// Set max height
				newLength = (response.numbers[i] * response.scaleValue) / response.max
			}else{
				// none
				newLength = response.numbers[i]
			}				
		}

		// Length can't be zero
		if(newLength == 0){ 
			newLength = 0.5;
			response.numbers[i] = 0.5;
		}

		// Change Width / Height
		if(isVertical){
			// Change height
			selectedLayers.layers[i].frame.height = Math.abs(newLength);
			// Move to baseline
			if(newLength > 0){
				// Reposition bars with positive values
				selectedLayers.layers[i].frame.y = baseLine - Math.abs(newLength);
			}else{
				// Reposition bars with negative values
				selectedLayers.layers[i].frame.y = baseLine;
			}		
		}else{
			// Reset position, just in case
			selectedLayers.layers[i].frame.x = baseLine;

			// Change width
			selectedLayers.layers[i].frame.width = Math.abs(newLength);
			
			// Reposition bars with negative values
			if(newLength < 0){
				selectedLayers.layers[i].frame.x = selectedLayers.layers[i].frame.x - Math.abs(newLength)
			}
		}	

		// Rename layer	
		// Data value will be added to layer name
		// Example: Rectangle ==> Rectangle {:12:}
		selectedLayers.layers[i].name = renameLayer(selectedLayers.layers[i].name, response.numbers[i])
	}
		
	// Notification
	// Alert in case number of selected layers 
	// does not match amount of numbers
	if(alert_diff != 0){
		if(alert_diff > 0){
			sketch.UI.alert(`😇 Just letting you know`, `Only the first ${response.numbers.length} of your selected layer(s) have been adjusted. There weren't enough number values to adjust the last ${Math.abs(alert_diff)} layer(s). Maybe check the separator options (comma, etc).`);
		}else if(alert_diff < 0){
			sketch.UI.alert(`😇 Just letting you know`, `The last ${Math.abs(alert_diff)} values weren't used as there weren't enough layer(s) selected.`)
		}
	}
}

function getMinMax(arr, isVertical){
	// arr needs to be doc.selectedLayers
	var min = 0;
	var max = 0;

	if(isVertical){
		// Vertical bar chart (get minMax height)
		for(var i = 0; i<arr.layers.length; i++){
			var thisHeight = arr.layers[i].frame.height
			// Max
			if(thisHeight >max){
				max = thisHeight
			}
			// Min
			if(min == 0){
				// set min at first runfirst
				min = max   
			}
			if(thisHeight < min){
				min = thisHeight
			}
		}
	}else{
		// Horizontal bar chart (get minMax width)
		for(var i = 0; i<arr.layers.length; i++){
			var thisWidth = arr.layers[i].frame.width
			// Max
			if(thisWidth > max){
				max = thisWidth
			}
			// Min
			if(min == 0){
				// set min at first run
				min = max   
			}
			if(thisWidth < min){
				min = thisWidth
			}
		}
	}

	return [Math.ceil(min), Math.ceil(max)]
}

function myinput(myMinMax=[20,100], numOfBars="", myBarHeightFromSelection, my_isVertical){
	var myresponse = {
		code: null,
		max: null,
		forcetype : false,
		numbers: [],
		trendTypeInput: null
	}

	if(myMinMax.length != 2 || myMinMax[0]==myMinMax[1]){
		if(myMinMax[0] > 100){
			myMinMax = [20,myMinMax[1]]
		}else{
			myMinMax = [myMinMax[0],100]
		}
		
	}

	if(numOfBars==0){
		myresponse.code == 1001
		sketch.UI.alert("Sorry buddy", "You need to select multiple rectangles (bars) for this plugin to work.")
	}
	if(numOfBars!=0){

		if(numOfBars==1){
			sketch.UI.alert("Hey, just letting you know", "Most awesome results come when selecting more than 1 bar.")
		}

		// Create initial view panel
	 	var width = 260
	 	var height = 40

	 	// Number input
	 	var sampleNumbers = myBarHeightFromSelection;

		/*
			Setup the window
	 	*/

		var alert = COSAlertWindow.new()
		if(numOfBars==1){
			alert.setMessageText("1 layer selected to create bar chart")
		}else{
			alert.setMessageText(`${numOfBars} layers selected to create bar chart`)
		}
		alert.addButtonWithTitle("Run")
		alert.addButtonWithTitle("Cancel")
		alert.setInformativeText(`This is for a bar chart with specific values, rather than random numbers.`)

		/*
			Input
	 	*/
	 	var alert_width = 280;
	 	var numInput_separatorOptions = [
	 		"Comma separated",
	 		"Space separated",
	 		"Tab separated (Excel row)",
	 		"Line break separated (Excel column)",
	 	]

		var numInput_label = createLabel("Paste in your number values", 12, true, NSMakeRect(0, 0, alert_width, 16));
	 	var numInput = createTextField(sampleNumbers, null, NSMakeRect(0, 0, alert_width, 25));
	 	var numInput_separator = createDropdown([
	 		numInput_separatorOptions[0],
	 		numInput_separatorOptions[1],
	 		numInput_separatorOptions[2],
	 		numInput_separatorOptions[3]
	 		], NSMakeRect(-2, -1, 170, 30));
	 	alert.addAccessoryView(numInput_label);
	 	alert.addAccessoryView(numInput);
	 	alert.addAccessoryView(numInput_separator);


	 	/*
			Bar type: Vertical or horizontal
	 	*/

	 	var bartype_label = createLabel("Vertical or horizontal?", 12, true, NSMakeRect(0, 0, alert_width, 16));
	 	alert.addAccessoryView(bartype_label);


		var bartype_radio =  NSView.alloc().initWithFrame(NSMakeRect(0, 0, width, 48))
		var buttonFormat;
		  buttonFormat = NSButtonCell.alloc().init();
		  buttonFormat.setButtonType(NSRadioButton);

		var matrixFormat = NSMatrix.alloc().initWithFrame_mode_prototype_numberOfRows_numberOfColumns(
		            NSMakeRect(0, 0, 260, 48),
		            NSRadioModeMatrix,
		            buttonFormat, 2, 1
		        );

		matrixFormat.setCellSize(CGSizeMake(260, 25));

		var bartype_radio1_label = my_isVertical ? "Automatic (vertical detected)" : "Automatic (horizontal detected)"
		var bartype_radio2_label = my_isVertical ? "Force horizontal" : "Force vertical"
		var cells = matrixFormat.cells();
		              cells.objectAtIndex(0).setTitle(bartype_radio1_label);
		              cells.objectAtIndex(1).setTitle(bartype_radio2_label);

		bartype_radio.addSubview(matrixFormat);
		alert.addAccessoryView(bartype_radio)


	 	/*
			Options
	 	*/
	 	var optionsView_height = 85;

	 	var optionsView = NSView.alloc().initWithFrame(NSMakeRect(0, 0, alert_width, optionsView_height));
	 	var optionsLabel = createLabel("Do you want to scale the values?", 12, true, NSMakeRect(0, optionsView_height - 26, alert_width, 16));
	 	//var optionsLabel_inlineNote = createLabel("(optional)", 12, false, NSMakeRect(215, optionsView_height - 26, alert_width, 16), 0.3);

	 	var option1_label = createLabel("Multiply by", 12, false, NSMakeRect(0, optionsView_height-48, 130, 16));
	 	var option1_textField = createTextField("", "e.g. 1.5", NSMakeRect(0, optionsView_height-81, 120, 25));

	 	var option2_label = createLabel("or set max height (px)", 12, false, NSMakeRect(140, optionsView_height-48, 130, 16));
	 	var option2_textField = createTextField("", "e.g. " + 100, NSMakeRect(140, optionsView_height-81, 120, 25)); // prev version showed myMinMax[1] as option
		
		//var options_info = createLabel("You have the option to define the scaling in case the supplied values don't match your desired pixel values. You can either define a multiplier or set a maximum bar height in pixel.", 11, false, NSMakeRect(0, 0, 260, 16*4))
		var options_info = createLabel("Scale data values in case the supplied numbers don't match the desired pixel values.", 11, false, NSMakeRect(0, 0, 260, 16*2))

	 	optionsView.addSubview(optionsLabel);
	 	//optionsView.addSubview(optionsLabel_inlineNote);
	 	
	 	optionsView.addSubview(option1_label);
	 	optionsView.addSubview(option1_textField);
	 	
	 	optionsView.addSubview(option2_label);
	 	optionsView.addSubview(option2_textField);

	 	alert.addAccessoryView(optionsView); 
	 	// alert.addAccessoryView(options_info)


	 	/*
			Key navigation (popup)
	 	*/

	 	alert.alert().window().setInitialFirstResponder(numInput);
	 	numInput.setNextKeyView(option1_textField)
	 	option1_textField.setNextKeyView(option2_textField)
	 	option2_textField.setNextKeyView(numInput)


	 	/*
			Note
	 	*/

	 	var note_line1 = createLabel("Please make sure proportional scaling is disabled", 11, false, NSMakeRect(0, 0, alert_width+10, 16), 0.3);
	 	alert.addAccessoryView(note_line1);


	 	/*
			RESPONSE
	 	*/

	 	var responseCode = alert.runModal();

	 	if(responseCode == 1000){
	 		myresponse.code = 1000
	 		// OK

	 		// Separator
	 		var sep = ","
	 		var sep_input = numInput_separator.titleOfSelectedItem()
	 		if(sep_input == numInput_separatorOptions[1]){
				sep = " "	 			
	 		}if(sep_input == numInput_separatorOptions[2]){
				sep = "\t"	 			
	 		}else if(sep_input == numInput_separatorOptions[3]){
	 			sep = "\n"
	 		}

	 		// Numbers
	 		var numbers_str = "";
	 		if(numInput.stringValue() == ""){
	 			numbers_str = sampleNumbers
	 		}else{
	 			numbers_str = numInput.stringValue();
	 		}
	 		var numbers_arr = numbers_str.split(sep)
	 		for(var i=0; i<numbers_arr.length; i++){
	 			myresponse.numbers.push(
	 				parseFloat(numbers_arr[i])
	 				);
	 		}

	 		// Force bar chart type
	 		var forcetype_index = matrixFormat.cells().indexOfObject(matrixFormat.selectedCell());
	 		myresponse.forcetype = forcetype_index == 0 ? false : true;

	 		// Options
	 		if(option2_textField.stringValue() != ""){
	 			// Option 2: Set max height
	 			myresponse.scaleType = 2;
	 			myresponse.scaleValue = parseFloat(option2_textField.stringValue())
	 		}else if(option1_textField.stringValue() != ""){
	 			// Option 1: Multiplier
	 			myresponse.scaleType = 1;
	 			myresponse.scaleValue = parseFloat(option1_textField.stringValue())
	 		}else{
	 			myresponse.scaleType = 0;
	 		}	
	 	}else{
	 		// Cancel
	 		myresponse.code = 1001
	 	}
	 	
	 	myresponse.max = myresponse.numbers.reduce(function(a, b) {
    		return Math.max(a, b);
		});
	 }
	 return myresponse
}
