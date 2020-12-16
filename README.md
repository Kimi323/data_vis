## Case study 3: Data visualisation

### Tasks

Download the data vis project template from the bottom of this page
and look over the code, starting with `stekch.js` to get an overview
of how the programme works. Try running the code.

All visualisations are stored in the `gallery` global variable. This
variable can be used for debugging in the console to access properties
and methods defined within each visualisation.

Lines you need to complete in this case study are marked **???**.

#### Tech diversity: Gender [2 marks]

![tech-diversity-gender](https://www.doc.gold.ac.uk/~jfort010/ip/case-studies/data-vis/figures/tech-diversity-gender.png)

Complete the visualisation defined in `tech-diversity-gender.js` to
create a stacked bar chart by adding the proportion of men employed at
each company.

1. Look up the documentation for [Table](https://p5js.org/reference/#/p5.Table).

2. Look at the raw data: `./data/tech-diversity/gender-2018.csv`. Use
   a spreadsheet program or text editor, and make sure you understand
   the data format (this first line is special). This data will be
   automatically loaded and stored in the `data` property (see the
   `preload()` method).

3. In the `for` loop in the `draw()` method extract the relevant data
   from each table row and store it in the `company` object.
   - Hint: Look up the `getString()` and `getNum()` table methods, and
     use the appropriate method to ensure the data is parsed
     correctly.
   - Check that bars representing the proportion of female employees
     is correctly drawn on the plot.

4. Look at how the rectangle representing the proportion of female
   employees is defined. Draw a rectangle representing the male
   proportion using the parameters and methods defined in this
   object.
   - The ratio of female:male staff at Indiegogo is 50:50. Make sure
     that this is correctly visualised on the plot.

#### Pay gap 1997–2017 [2 marks]

![paygap1997-2017](https://www.doc.gold.ac.uk/~jfort010/ip/case-studies/data-vis/figures/pay-gap-1997-2017.png)

Complete the visualisation defined in `pay-gap-1997-2017.js` to create
a line graph representing the pay gap between female and male
employees over time.

1. Look at the raw data:
   `./data/pay-gap/all-employees-hourly-pay-by-gender-1997-2017.csv`.

2. In the `for` loop in the `draw()` method extract the relevant data
   from each table row and store it in the `current` object.

3. Complete the `mapPayGapToHeight()` method. Look at how `mapYearToWidth()`
   works.
   - Check that the y-axis tick labels are drawn correctly.

4. Complete the `line()` function in the `draw()` method to plot the
   pay gap over time. You will need to use both `mapYearToWidth()` and
   `mapPayGapToHeight()` methods.

#### Climate change [2 marks]

![climateChange](https://www.doc.gold.ac.uk/~jfort010/ip/case-studies/data-vis/figures/climate-change.png)

Complete the visualisation defined in `climate-change.js` to create a
line graph with gradient fill background representing the change in
the Earth’s surface temperature.

1. Using the `mapTemperatureToColour()` method set the `fill()` in the
   `draw()` method. You need to pass the current temperature to this
   method to get the correct colour.

2. Complete the `rect()` function below the `fill()` to create a
   gradient effect background (rectangles spaced evenly across the
   x-axis – one rectangle per year). All of the values you need are
   already accessible within this visualisation object – you need to
   find them!
   - Hint: Look at the `mapYearToWidth()` method, the `layout` object,
     and the `segmentWidth` variable.

#### Tech diversity: Race [2 marks]

![tech-diversity-race](https://www.doc.gold.ac.uk/~jfort010/ip/case-studies/data-vis/figures/tech-diversity-race.png)

Complete the visualisation defined in `tech-diversity-race.js` to
create a pie chart to represent the racial diversity of prominent tech
companies.

1. Look at the raw data: `./data/tech-diversity/race-2018.csv`.

2. Create a select DOM element using p5.dom.js (see
   [`createSelect`](https://p5js.org/reference/#/p5/createSelect)) and
   populate the options *programmatically* using the company names
   obtained from the columns of `this.data`.
   - Hint: you need to write a `for` loop.

3. Change the hard-coded company name to instead get the value from
   the select.

4. Test that when selecting a company name from the list the correct
   data is visualised on the canvas and the correct title is
   generated.

#### Pay gap by job 2017 [2 marks]

![paygapByJob2017](https://www.doc.gold.ac.uk/~jfort010/ip/case-studies/data-vis/figures/pay-gap-by-job.png)

Complete the visualisation defined in `pay-gap-by-job-2017.js` to
create a scatter plot representing the difference in pay for men and
women across different jobs.

In the `draw()` method complete the `for` loop that draws all of the
data points on the canvas as ellipses with the following properties.

    - x = proportion of female employees
    - y = pay gap
    - size = number of jobs

Hint: You will need to use `map()`.
