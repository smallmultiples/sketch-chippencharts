<img width="888" height="118" src="https://raw.githubusercontent.com/smallmultiples/sketch-chippencharts/master/images/header-original.gif" title="chippen charts">

<h1 align="center">Chippen charts</h1>
This is a Sketch plugin for creating charts with random data for use in mockups. Change the size of selected rectangles. Chose between random and linear. Works for both horizontal and vertical bar charts. Made with love by [Small Multiples](https://smallmultiples.com.au/) in Chippendale.

## How it works
1. **Create** desired amount of rectangles
2. Layers must be in the correct **order**
3. Make sure layers are either bottom or left **aligned**
4. **Run the plugin** and adjust settings if necessary
5. The size of you bars will be adjusted

### Settings
#### Horizontal and vertical bar chart
Chippen Chart detects wheter you are about to create a vertical or horizontal bar chart using the x and y-position of your selected layers. If there is no common x or y-value it will by default apply the logic for vertical bars.

#### Min and max
Chippen chart detects minimum and maximum pixel height of selected layers and apply those to the new bar chart. You can also adjust your desired extrema in the dialog window. If all selected layers share the same height the plugin will apply a default value for either min or max.

#### Data type
You can choose between 5 data types. All of them will use the min and max value you define. _Random_ will apply completely random integer numbers. Linear_ will interpolate values between min and max. _Natural_ will do the same while adding a notion of randomness.

- [x] Random
- [ ] Trend going up ↑ (linear)
- [ ] Trend going up ↑ (natural)
- [ ] Trend going down ↓ (linear)
- [ ] Trend going down ↓ (natural)

### Examples

#### Create and select rectangles
<img width="855" height="566" src="https://raw.githubusercontent.com/smallmultiples/sketch-chippencharts/master/images/1_selectLayers.png" title="Select layers">

#### Define chart setting
You can define the height / width of the smallest and largest bar. The plugin will automatically trey to use the extrema of your current selection.
<img width="880" height="495" src="https://raw.githubusercontent.com/smallmultiples/sketch-chippencharts/master/images/2_random2.png" title="Random">

#### This is how a random chart looks like
<img width="855" height="566" src="https://raw.githubusercontent.com/smallmultiples/sketch-chippencharts/master/images/3_randomResult.png" title="Result random">

#### Defining a chart with trend going up
Besindes random numbers you can choose between linear trends and natural trends. Natural trends are like linear ones, but they have a little bit of randomeness aplpied to them.
<img width="880" height="495" src="https://raw.githubusercontent.com/smallmultiples/sketch-chippencharts/master/images/4_trendUp2.png" title="Trend up">

#### This is how a trend up (natural) chart looks like
<img width="855" height="566" src="https://raw.githubusercontent.com/smallmultiples/sketch-chippencharts/master/images/5_trendUpResult.png" title="Result trend up">

#### Showcase of different types
<img width="855" height="566" src="https://raw.githubusercontent.com/smallmultiples/sketch-chippencharts/master/images/6_showcase.png" title="Showcase">

## Troubleshooting
Unintended results will appear when the proportional resizing is set between a layers with and height. **Proportional resizing must be disabled!**

## Love it or hate it?
Let us know. info@small.mu | @smallmultiples





