<h1 align="center">Chippen charts</h1>

<img width="888" height="118" src="https://raw.githubusercontent.com/smallmultiples/sketch-chippencharts/master/images/header-original.gif" title="chippen charts">


<div align="center">
  <strong>Random bar charts for your data driven mockups</strong>
</div>
<br/>

This is a Sketch plugin for creating charts with random or user defined data for use in mockups. Change the size of selected rectangles. Chose between random and linear. Works for both horizontal and vertical bar charts.
Furthermore, the latest feature allows you to paste text from the clipboard straight into symbol overrides. How good is that, heh?

Made with love by [Small Multiples](https://smallmultiples.com.au/) in Chippendale, Sydney.



## Features

### 1. Random bar chart from selected layers

If you don't have data yet but still want to design a bar chart for your mockup, you can use the option to apply random values. You can also apply not-so-random values when choosing trend up or trend down.

<img width="888" src="https://raw.githubusercontent.com/smallmultiples/sketch-chippencharts/master/images/showcase1-o.gif" title="Chippencharts sketch plugin: Random bar chart from selected layers">

---

### 2. Defined bar chart from selected layers

If you have data that you want to apply to your chart this option is for you. You can even copy / paste from Excel columns or rows. How cool is that, right? In case your number values don't exactly match your desired pixel values, you have the option to apply a multiplier or set a maximum height. By default values don't get scaled.

<img width="888" src="https://raw.githubusercontent.com/smallmultiples/sketch-chippencharts/master/images/showcase2-definedValues.gif" title="Chippencharts sketch plugin: Defined bar chart from selected layers">

---

### 3. Paste clipboard text into symbols

Get your clipboard loaded with amazing text content, fire up the plugin, and let the magic of the plugin paste everything into your symbol override of choice. It's as simple as that.

You might wonder why you wouldn't wanna use the Sketch Data feature for that. The thing is, the Sketch Data feature does not preserve the order of elements, which this plugin does.

<img width="888" src="https://raw.githubusercontent.com/smallmultiples/sketch-chippencharts/master/images/showcase-paste-clipboard-into-symbols.gif" title="Chippencharts sketch plugin: Paste clipboard text into symbol overrides">

---


## How the plugin works

### Dialog boxes for random and user defined action

Those dialog boxes give you a good summary of what the plugin is capable of. Just have a look at the various input options.

<img width="888" src="https://raw.githubusercontent.com/smallmultiples/sketch-chippencharts/master/images/dialogs.png" title="How Chippen charts works">

### Workflow
1. **Create** desired amount of rectangles
2. Layers must be in the correct **order**
3. Make sure layers are either bottom or left **aligned**
4. **Run the plugin** and adjust _settings_ in dialog window if necessary
5. The size of you bars will be adjusted

### Settings
#### Horizontal or vertical bar chart
Chippen Chart detects wheter you are about to create a vertical or horizontal bar chart using the x and y-position of your selected layers. If there is no common x or y-value it will by default apply the logic for vertical bars.

#### Min and max size (pixel)
Chippen chart detects minimum and maximum pixel height of selected layers and apply those to the new bar chart. You can also adjust your desired extrema in the dialog window. If all selected layers share the same height the plugin will apply a default value for either min or max.

#### Trend type
You can choose between 5 trend types. All of them will use the min and max value you define. _Random_ will apply completely random integer numbers. Linear_ will interpolate values between min and max. _Natural_ will do the same while adding a notion of randomness.

- [x] Random
- [ ] Trend going up ↑ (linear)
- [ ] Trend going up ↑ (natural)
- [ ] Trend going down ↓ (linear)
- [ ] Trend going down ↓ (natural)

### Examples

#### Defining a chart with trend going up
Besindes random numbers you can choose between linear trends and natural trends. Natural trends are like linear ones, but they have a little bit of randomeness aplpied to them.
<img width="880" height="495" src="https://raw.githubusercontent.com/smallmultiples/sketch-chippencharts/master/images/4_trendUp2.png" title="Trend up">

#### This is how a trend up (natural) chart looks like
<img width="855" height="566" src="https://raw.githubusercontent.com/smallmultiples/sketch-chippencharts/master/images/5_trendUpResult.png" title="Result trend up">

#### Showcase of different types
<img width="855" height="566" src="https://raw.githubusercontent.com/smallmultiples/sketch-chippencharts/master/images/6_showcase.png" title="Showcase">

## Version history

##### 3.5.1

- Bug fix for "Defined bar chart from selected layers" where the scale values from the input fields would not be used properly to calculate heights of bars

##### 3.5

- Introducing new feature: Paste clipboard text into symbol overrides

##### 3.4 

- Introducing new feature: Create bar charts using user defined values
- Enhancements to dialog design

##### 3.3.3 

- Fixing update issues

## Troubleshooting
Unintended results will appear when the proportional resizing is set between a layer's width and height. **Proportional resizing must be disabled** 🔓

## Love it or hate it?
Let us know. info@small.mu | @smallmultiples





