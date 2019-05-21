import sketch from 'sketch'
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


	/* 
		User input
	*/

	var response = myinput(minMax_fromSelection, doc.selectedLayers.layers.length)
	var minMax = [response.min, response.max]
	if (response.code !== 1000) {
			return
		}
	var myRandomSlots = []
	if(response.trendTypeInput == 0){
		// Only for random trend
		// Set 2 random bars to min and max
		myRandomSlots = twoRandomSlots(selectedLayers.layers.length, 'Random')
	}
	 

	/* 
		UI message
	*/

	var trendTypeInput_name = [
		"random data",
		"trend going up ↑ (linear)",
		"trend going up ↑ (natural)",
		"trend going down ↓ (linear)",
		"trend going down ↓ (natural)"
	]

	var isVertical_name = "vertical"
	if(!isVertical){isVertical_name = "horizontal"}
	sketch.UI.message(`${doc.selectedLayers.length} ${isVertical_name} bars with ${trendTypeInput_name[response.trendTypeInput]} (${minMax[0]}px–${minMax[1]}px)`)

	
	/* 
		Changing size
	*/

	const firstBarVal = getValFromLayerName(selectedLayers.layers[0].name);
	var baseLine = 0;

	if(isVertical){
		baseLine = selectedLayers.layers[0].frame.y + selectedLayers.layers[0].frame.height;
		// Adjust when first value of existing bar is negative 
		// Based on layer name
		if(firstBarVal < 0){baseLine = baseLine - Math.abs(firstBarVal)};
	}else{
		if(firstBarVal >= 0){
			baseLine = selectedLayers.layers[0].frame.x	
		}else if(firstBarVal < 0){
			baseLine = selectedLayers.layers[0].frame.x	+ Math.abs(firstBarVal)
		}
	}

	for(var i = 0; i<selectedLayers.layers.length; i++){
		
		var newLength = 1

		if(response.trendTypeInput == 3 || response.trendTypeInput == 4){
			// reverse minMax if trend is going down
			// and after that just use same code as for trend going up
			minMax = [minMax[1], minMax[0]]
			response.trendTypeInput = response.trendTypeInput-2
		}

		// Random
		if(response.trendTypeInput == 0){
			// random values between min and max
			newLength = Math.floor(Math.random() * (minMax[1]-minMax[0]) ) + minMax[0]    
			if(i == myRandomSlots[0]){
				// force a random slot to be min
				newLength = minMax[0]
			}
			if(i == myRandomSlots[1]){
				// force a random slot to be max
				newLength = minMax[1]
			}
		}
		// Trend going up
		if(response.trendTypeInput == 1 || response.trendTypeInput == 2){
			var stepIncrease = (minMax[1] - minMax[0]) / selectedLayers.layers.length
			if(response.trendTypeInput == 1){
				newLength = (stepIncrease * i) + minMax[0]
			}else if(response.trendTypeInput == 2){
				var increase_random = stepIncrease * Math.random()
				var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
				newLength = (stepIncrease * i) + minMax[0] + (increase_random * plusOrMinus)    
			}
			// force first and last to be min and max
			if(i == 0){ newLength = minMax[0] }
			else if(i == selectedLayers.layers.length-1){
					newLength = minMax[1]
				}
			newLength = Math.round(newLength * 10) / 10
		}
		// Change Width / Height
		if(isVertical){
			// Change height
			selectedLayers.layers[i].frame.height = newLength	
			// Move to baseline
			selectedLayers.layers[i].frame.y = baseLine - newLength
		}else{
			// Reset position, just in case
			selectedLayers.layers[i].frame.x = baseLine;

			// Change Width
			selectedLayers.layers[i].frame.width = Math.abs(newLength);

			// Reposition bars with negative values
			if(newLength < 0){
				selectedLayers.layers[i].frame.x = selectedLayers.layers[i].frame.x - Math.abs(newLength)
			}
		}			
			
		// Rename layer	
		// Example: Rectangle ==> Rectangle {:12:}
		selectedLayers.layers[i].name = renameLayer(selectedLayers.layers[i].name, newLength)
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

function twoRandomSlots(length, type){
	var slotOne = 0
	var slotTwo = 0

	if(type=='Random'){
		slotOne = Math.floor( Math.random() * length/2) 
		slotTwo = Math.floor( Math.random() * length/2) + Math.floor(length/2)
	}
	return [slotOne, slotTwo]
}


function myinput(myMinMax=[20,100], numOfBars=""){
	var myresponse = {}

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
	 	var width = 280
	 	var height = 40
	 	var view = NSView.alloc().initWithFrame(NSMakeRect(0, 0, width, height))

	 	// Min Max input
	 	var minInput = NSTextField.alloc().initWithFrame(NSMakeRect(0.0, 15.0, 130, 25.0));
	        minInput.cell().setPlaceholderString(myMinMax[0] + " (min)");
	    view.addSubview(minInput);

	    var maxInput = NSTextField.alloc().initWithFrame(NSMakeRect(150, 15.0, 130, 25.0));
	        maxInput.cell().setPlaceholderString(myMinMax[1] + " (max)");
	    view.addSubview(maxInput);

		// Nature of data
		var trendTypeInput =  NSView.alloc().initWithFrame(NSMakeRect(0, 0, width, 125))
		// Acts like a template (prototype) for our radio buttons
		var buttonFormat;
		  buttonFormat = NSButtonCell.alloc().init();
		  buttonFormat.setButtonType(NSRadioButton);

		// The matrix will contain all the cells (radio buttons)
		var matrixFormat = NSMatrix.alloc().initWithFrame_mode_prototype_numberOfRows_numberOfColumns(
		            NSMakeRect(0, 0, 260, 125), // Horizontal position, vertical position, width, height
		            NSRadioModeMatrix, // This makes the radio buttons work together
		            buttonFormat,
		            5, // 1 row
		            1 // 3 columns (for 3 radio buttons)
		        );

		// Settings the size of the radio buttons
		matrixFormat.setCellSize(CGSizeMake(260, 25));

		// Adding the radio buttons to the form
		var cells = matrixFormat.cells();
		              cells.objectAtIndex(0).setTitle("Random");
		              cells.objectAtIndex(1).setTitle("Trend going up ↑ (linear)");
		              cells.objectAtIndex(2).setTitle("Trend going up ↑ (natural)");
		              cells.objectAtIndex(3).setTitle("Trend going down ↓ (linear)");
		              cells.objectAtIndex(4).setTitle("Trend going down ↓ (natural)");

		// Adding the matrix to the form
		trendTypeInput.addSubview(matrixFormat);

		// Setup the window
		var alert = COSAlertWindow.new()
		if(numOfBars==1){
			alert.setMessageText(`Create your random bar chart \nwith 1 selected layer`)
		}else{
			alert.setMessageText(`Create your random bar chart \nwith ${numOfBars} selected layers`)
		}
		
		alert.addButtonWithTitle("Run")
		alert.addButtonWithTitle("Cancel")
		alert.setInformativeText(`This is for a bar chart where random values are applied \nto the layers of your selection.`)
		
		var extrema_label = createLabel("Define extrema of bars", 12, true, NSMakeRect(0, 0, width, 16));
		alert.addAccessoryView(extrema_label)
				
		//alert.addTextLabelWithValue("Define extrema of bars");
		alert.alert().window().setInitialFirstResponder(minInput)
	 	alert.addAccessoryView(view)
	 	
		var trend_label = createLabel("Specify the desired trend", 12, true, NSMakeRect(0, 0, width, 16));
		alert.addAccessoryView(trend_label)
	 	//alert.addTextLabelWithValue("Specify the desired trend");
	 	alert.addAccessoryView(trendTypeInput)
	 	
	 	/*
			Note
	 	*/
	 	var note_line1 = createLabel("\nPlease make sure proportional scaling is disabled", 11, false, NSMakeRect(0, 0, width, 16*2), 0.3);
	 	alert.addAccessoryView(note_line1);

	 	var responseCode = alert.runModal();

	 	if(responseCode == 1000){
	 		myresponse.code = 1000
	 		// OK
	 		// pass minmax input
	 		if(minInput.stringValue() == ""){
	 			myresponse.min = myMinMax[0]
	 		}else{
	 			myresponse.min = parseInt(minInput.stringValue())
	 		}
	 		if(maxInput.stringValue() == ""){
	 			myresponse.max = myMinMax[1]
	 		}else{
	 			myresponse.max = parseInt(maxInput.stringValue())
	 		}
	 	}else{
	 		// Cancel
	 		myresponse.code = 1001
	 	}
	 	myresponse.trendTypeInput = matrixFormat.cells().indexOfObject(matrixFormat.selectedCell())
	 }
	 return myresponse
}

function isVerticalBarchart(arr){
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

/*
	Utils from Marc Bouchenoire
	for easier UI design
	https://github.com/bouchenoiremarc
*/

function createLabel(text, fontSize, bold, frame, opacity) {
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
function createTextField(value, placeholder, frame) {
  var textfield = NSTextField.alloc().initWithFrame(frame)
  textfield.cell().setWraps(false);
  textfield.cell().setScrollable(true);
  textfield.setStringValue(value);
  if (placeholder) textfield.setPlaceholderString(placeholder);

  return textfield
}

function createDropdown(values, frame){
  var dropdown = NSPopUpButton.alloc().initWithFrame(frame)
  dropdown.addItemsWithTitles(values)

  return dropdown
}

function renameLayer(name, newVal){
	
	var a = name.split("{:")
	var newName = name + " {:" + newVal + ":}";

	if(a.length > 1){
		var b = a[1].split(":}");
		if(b.length == 1){return newName;}
		var newName = a[0] + "{:" + newVal + ":}" + b[1];
	}

	return newName
}

function getValFromLayerName(name){
	
	var a = name.split("{:")
	if(a.length == 1){return false;}
	var b = a[1].split(":}");

	var val = parseFloat(b[0])
	if(isNaN(val)){return false;}
	
	return  val;
}