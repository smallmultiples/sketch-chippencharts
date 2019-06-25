import sketch from 'sketch'
import { createLabel, createTextField, onlyUnique } from "./utils.js";

export default function() {
	log('~~ Run Chippen charts ~~')
	const doc = sketch.getSelectedDocument()
	const selectedLayers = doc.selectedLayers;

	// Elements with these types will get fill colour applied
	const el_has_fillcolor = ["Rectangle", "ShapePath"]
	const el_has_textcolor = ["Text"]

	// Default values for popup
	const defaultCol1 =  "#eeeeee";
	const defaultCol2 = "#891c55";
	const defaultCategories = 5;
	

	/*
		CHECK SELECTION
	*/
	
	if (selectedLayers.length == 0) {
		sketch.UI.alert("Chippencharts",'Please select at least 1 shape or text layers to apply the random fill colours to.');
		return false;
	}


	/*
		Setup the popup window
	*/

	var popup = COSAlertWindow.new()
	popup.setMessageText("Random fill")
	popup.addButtonWithTitle("Run");
	popup.addButtonWithTitle("Cancel");
	popup.setInformativeText(`Get as many colours as you want between two colours and randomly apply as fill to selected layers.`);


	/*
		Input
 	*/

 	const popup_width = 280;

	var colInput_label = createLabel("Paste in your two colour values", 12, true, NSMakeRect(0, 0, popup_width, 16));
 	
	var col_view = NSView.alloc().initWithFrame(NSMakeRect(0, 0, popup_width, 25));
 	var col1Input = createTextField(defaultCol1, null, NSMakeRect(0, 0, 130, 25));
 	var col2Input = createTextField(defaultCol2, null, NSMakeRect(150, 0, 130, 25));
 	
 	var categories_label = createLabel("How many random colours do you want?", 12, true, NSMakeRect(0, 0, popup_width, 16));
 	var categoriesInput = createTextField(defaultCategories, null, NSMakeRect(0, 0, 130, 25));

	popup.addAccessoryView(colInput_label)
	col_view.addSubview(col1Input)
	col_view.addSubview(col2Input)
 	popup.addAccessoryView(col_view);

 	popup.addAccessoryView(categories_label);
 	popup.addAccessoryView(categoriesInput);

 	popup.alert().window().setInitialFirstResponder(col1Input);
	col1Input.setNextKeyView(col2Input)
	col2Input.setNextKeyView(categoriesInput)
	categoriesInput.setNextKeyView(col1Input)


 	/*
		RESPONSE
	*/

	var responseCode = popup.runModal();
	
	if(responseCode != 1000){

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

	var colours = [col1, col2]

	for(var i=0; i<(num_of_colours-2); i++){

		var new_rgb = []

		for(var j=0; j<3; j++){
			

			var new_diff = col1_rgb[j] - col2_rgb[j];
			var new_dir = new_diff >=0 ? -1 : 1;

			var new_add = Math.abs(new_diff) / (num_of_colours-1);
			var new_dim = col1_rgb[j] + new_dir*(i+1)*new_add;

			new_rgb.push(Math.round(new_dim))
		}
		colours.push(rgbToHex(new_rgb))
	}

	// Apply new colours to selection
	for(var i = 0; i<selectedLayers.layers.length; i++){
		var random_index = Math.floor(Math.random() * (+ (colours.length) - +0)) + +0;
		var random_col = hex_9(colours[random_index]);

		if(el_has_fillcolor.includes(selectedLayers.layers[i].type)){
	
			// Change fill if it's shape layer
			selectedLayers.layers[i].style.fills[0].color = random_col;	
		}else if(el_has_textcolor.includes(selectedLayers.layers[i].type)){
	
			// Change fill if it's a text layer
			selectedLayers.layers[i].style.textColor = random_col;
		}
	}
}

function hexToRGB(hex){
	var rgb = [];
	for(var i = 0; i<3; i++) {
	  var sub1 = hex.substring(2*i, 2+2*i);
	  var v = parseInt(sub1, 16);
	  rgb.push(v);
	}	
	return rgb;
}

function hex_6 (hex){
	// #d8d8d8ff > d8d8d8
	return hex.substr(1,6);
}

function hex_9 (hex_6){
	// d8d8d8 > #d8d8d8ff
	return "#" + hex_6 + "ff";
}

function rgbToHex(arr){
	var hex = "";
	for(var i=0; i<3; i++){
		var sub = arr[i].toString(16).toUpperCase();
		var padsub = ('0'+sub).slice(-2);
		hex = hex + padsub
	}
	return hex;
}

function removeHash(hex){
	return hex.substr(0,1)=="#" ? hex.substr(1,6) : hex;

}