import sketch from 'sketch'
import { onlyUnique, iterativeGapFilling, createLabel, createDropdown, createCheckbox } from "./utils.js";
// documentation: https://developer.sketchapp.com/reference/api/
// https://github.com/sonburn/symbol-instance-locator/blob/master/Symbol%20Instance%20Locator.sketchplugin/Contents/Sketch/script.js

var symbolOverrideLayers;

export default function() {
	log('~~ Run Chippen charts ~~')

	const doc = sketch.getSelectedDocument()
	const selectedLayers = doc.selectedLayers

	var pluginName = __command.pluginBundle().name();

	if(selectedLayers.layers.length == 0) {
		sketch.UI.alert(pluginName,'Please select at least 1 layer that contains a symbol override.');

		return false;
	}
		
	
	/*
		CLIPBOARD
	*/

	var newLineSeparator = "\n";
	var sep = newLineSeparator;

	var pasteBoard = NSPasteboard.generalPasteboard();
    // Turn a data in the string type
    var stringFromPasteBoard = pasteBoard.stringForType(NSPasteboardTypeString);

    if(stringFromPasteBoard == null){
    	sketch.UI.alert(pluginName,'Your clipboard does not seem to be just text. Try again with only lines of text.');
    	return false;
    }

    var pasteboardLines = stringFromPasteBoard.split(newLineSeparator)
    

	/*
		SELECTED SYMBOLS
	*/

	const selectedSymbols = selectedLayers.layers.filter(layer => layer.type == "SymbolInstance" || layer.type == "SymbolMaster")
	if (selectedSymbols.length == 0) {
		sketch.UI.alert(pluginName,'Please select at least 1 layer that contains a symbol.');
		return false;
	}
	
	const symbolsWithOverrides = selectedSymbols.filter(symbol => symbol.overrides.length != 0)
	if (symbolsWithOverrides.length == 0) {
		sketch.UI.alert(pluginName,'Please select at least 1 symbol that contains a text override.');
		return false;
	}

	const symbolsIDs = symbolsWithOverrides.map(symbol => {
		return symbol.symbolId
	})

	const uniqueSymbolIDs = symbolsIDs.filter( onlyUnique ); 
	
	if(uniqueSymbolIDs.length > 1){
		sketch.UI.alert(pluginName,`Please use only symbols of the same kind. Maybe you want to try to use only symbols like "${symbolsWithOverrides[0].name}".`);
		return false;
	}


	/*
		Informative Text
	*/

	var warningMsg = ""
	if(pasteboardLines.length > symbolsWithOverrides.length){
		warningMsg = `There are more lines of text in the clipboard (${pasteboardLines.length}) than there are symbols in the selection (${symbolsWithOverrides.length}). That means not all content from clipboard will be used.`
	}else if(symbolsWithOverrides.length > pasteboardLines.length){
		warningMsg = `There are more symbols selected (${symbolsWithOverrides.length}) than there are lines of text in the clipboard (${pasteboardLines.length}). Clipboard text will be repeated in the overflow symbols.`
	}

	var informativeText = ""
	if(warningMsg != ""){
		informativeText = "⚠️ Watch out! - " + warningMsg + " \n\nYou can go ahead but outcomes might not be as expected."
	}else{
		informativeText = `You are about to alter ${symbolsWithOverrides.length} symbol overrides using text from the clipboard.`
	}


	/*
		Dropdown options
	*/

	const stringvalueOverrides = symbolsWithOverrides[0].overrides.filter(override => override.property == 'stringValue')
	
	const overrideOptions = stringvalueOverrides.map((override, index) => {
		return "Override " + (parseInt(index)+1) + " (" + override.value + ")"
	})
	

	/*
		Setup the window
 	*/
	
	var alert = COSAlertWindow.new()
	alert.setMessageText("Paste clipboard text into symbol overrides")
	alert.addButtonWithTitle("Run")
	alert.addButtonWithTitle("Cancel")
	alert.setInformativeText(informativeText)
	

	/*
		Input
 	*/

 	// OVERRIDE DROPDOWN
 	var alert_width = 280;
	var overrideOptions_label = createLabel("What override shall it be? ", 12, true, NSMakeRect(0, 0, alert_width, 16));
 	var overrideOptions_dropdown = createDropdown(overrideOptions, NSMakeRect(-2, -1, 280, 24));

 	if(overrideOptions.length>1){
 		alert.addAccessoryView(overrideOptions_label);
 		alert.addAccessoryView(overrideOptions_dropdown);	
 	}

 	// REVERSE CHECKBOX
 	var reverse_checkbox = createCheckbox("Reverse order of clipboard text", false, NSMakeRect(-2, -1, 280, 24));
 	
 	if(pasteboardLines.length>1){
 		alert.addAccessoryView(reverse_checkbox);
 	}
 

 	/*
		Response
	*/

	var overrideIndex;
	var responseCode = alert.runModal();
	
	if(responseCode == 1000){
		// Dropdown input
		var dropddownIndex = overrideOptions_dropdown.indexOfSelectedItem();
		var overrideID = stringvalueOverrides[dropddownIndex].id;

		// Mapping index of dropdown to index of overrides.
		// Dropdown does only include stringValue overrides
		// and no symbolID overrides (top level of nested symbol).
		// That's why the length can differ.
		for(var i=0; i<symbolsWithOverrides[0].overrides.length; i++){
			if(symbolsWithOverrides[0].overrides[i].id == overrideID){
				overrideIndex = i;
			}
		}
		// Checkbox input
		var reverse = false;
		if( Number(reverse_checkbox.state()) == 1 ){
			reverse = true;
		}
	}else{
		// 1001
		return false;
	}


	/*
		OVERRIDE
	*/

	var clip = pasteboardLines;

	if(reverse){
		clip.reverse();
	}

	if(symbolsWithOverrides.length > clip.length){
		var clip_filled = iterativeGapFilling(clip, symbolsWithOverrides.length)
		clip = clip_filled;
	}

	for(var i=0; i<symbolsWithOverrides.length; i++){
			symbolsWithOverrides[i].overrides[overrideIndex].value = clip[i]
		}
	sketch.UI.message(`Text from clipboard was pasted into ${symbolsWithOverrides.length} symbols`)

}