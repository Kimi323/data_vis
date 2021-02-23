function MuseumVisitors() {    
    // Name for the visualisation to appear in the menu bar.
    this.name = 'Museum visitors: 2014-2019';

    // Each visualisation must have a unique ID with no special
    // characters.
    this.id = 'museum-visitors';

    // Title to display above the plot.
    this.title = 'Monthly visitors for major museums in Los Angeles, USA.';

    // Names for each axis.
    this.xAxisLabel = 'month';
    this.yAxisLabel = 'visitors';
    
    // Make x axis start with 0.
    this.startMonth = 0;
    this.endMonth = 13;

    var marginSize = 50;
    
    // Width of vertical bar.
    var barWidth = 10;
    
    // Colors for vertical bar
    var colorList = ['red', 'orange','green','blue', 'gray'];
    // List of museum names
    var museumNameList = ['Tropical Interpretive Center', 'Avila Adobe', 'Chinese American Museum', 'Firehouse Museum', 'Pico House'];
    
    // labels
    this.labelSpace = 45;
    
    // Layout object to store all common plot layout parameters and
    // methods.
    this.layout = {
        marginSize: marginSize,

        // Locations of margin positions. Left and bottom have double margin
        // size due to axis and tick labels.
        leftMargin: marginSize * 2,
        rightMargin: width - marginSize/2,
        topMargin: marginSize,
        bottomMargin: height - marginSize*2,
        pad: 5,

        plotWidth: function() {
          return this.rightMargin - this.leftMargin;
        },

        plotHeight: function() {
          return this.bottomMargin - this.topMargin;
        },

        // Boolean to enable/disable background grid.
        grid: true,

        // Number of axis tick labels to draw so that they are not drawn on
        // top of one another.
        numXTickLabels: 13,
        numYTickLabels: 10,
    };
    
    // Property to represent whether data has been loaded.
    this.loaded = false;

    // Preload the data. This function is called automatically by the
    // gallery when a visualisation is added.
    this.preload = function() {
        var self = this;
        this.data = loadTable(
            './data/museum-visitors/museum-visitors.csv', 'csv', 'header',
        // Callback function to set the value this.loaded to true.
        function(table) {
            self.loaded = true;
        });
    };
    
    
    this.setup = function() {
        // Font defaults.
        textSize(16);

        // Set min and max years: assumes data is sorted by date.
        this.startYear = min(this.data.getColumn('Year'));
        this.endYear = max(this.data.getColumn('Year'));
        
        // Get data of year 2014 for default display.
        

        // Min and max visitors for mapping to canvas height.
        this.minVisitors = 0;    
        this.maxVisitors = 42000;
        
        // Create a select DOM element.
        this.select = createSelect();
        this.select.position(410, 20);
        // Fill the options with years.
        var years = ["2014", "2015", "2016", "2017", "2018", "2019"];
        for (let i = 0; i < years.length; i++) {
          this.select.option(years[i]);
        }
    };
    
    // Remove the dropdown list when other menu-item is clicked.
    this.destroy = function() {
        this.select.remove();
    };
    
    this.draw = function() {
        if (!this.loaded) {
          console.log('Data not yet loaded');
          return;
        }
        
        this.drawTitle();
        
        // Draw x and y axis.
        drawAxis(this.layout);

        // Draw x and y axis labels.
        drawAxisLabels(this.xAxisLabel,
                   this.yAxisLabel,
                   this.layout);
        
        // Draw all x-axis labels.
        for (var i = 1; i < 13; i++) {
            drawXAxisTickLabel(this.startMonth + i,
                               this.layout,
                               this.mapMonthToWidth.bind(this));    
        }
     
        // Draw all y-axis labels.
        drawYAxisTickLabels(this.minVisitors,
                            this.maxVisitors,
                            this.layout,
                            this.mapVisitorsToHeight.bind(this),
                            0);
        
        // get selected value
        var year_selected = this.select.value();
        
        // Draw bars and group data in the same month.
        // loop through all data in specific year (2014 by default).
        for (var i = 0; i < this.data.getRowCount(); i++ ) {
            // if the year equals selected year, 
            // get visitors for each museum in that row
            if (this.data.getRow(i).arr[0] == year_selected) {
                // Loop through all museums.
                // j starts at 2 because visitors data starts from the third column
                for (var j = 2; j < this.data.getRow(i).arr.length; j++) {
                    var visitors = this.data.getRow(i).arr[j];
                    // calculate x posiiton for current bar to draw
                    // use i mod 12 to map to the right place if i >= 12
                    var x_position = this.mapMonthToWidth(i%12 + 1) + barWidth * (j - 2);
                    // draw the bar onto canvas
                    this.drawVerticalBar(colorList[j - 2], x_position, visitors);
                }               
            }
        }
        
        // Make legend item
        for (var i = 0; i < museumNameList.length; i++) {
            this.makeLegendItem(museumNameList[i], colorList[i], i);  
        }   
    }
    
    this.mapMonthToWidth = function(value) {
        return map(value,
                   this.startMonth,
                   this.endMonth,
                   this.layout.leftMargin,
                   this.layout.rightMargin);
    }
    
    // Smaller number at bottom, bigger number at top.
    this.mapVisitorsToHeight = function(value) {
        return map(value,
                   this.minVisitors,
                   this.maxVisitors,
                   this.layout.bottomMargin, 
                   this.layout.topMargin);
    };
    
    this.drawTitle = function() {
        fill(0);
        noStroke();
        textAlign('center', 'center');
        // Start a new drawing state
        push();
        textSize(16);
        text(this.title,
            (this.layout.plotWidth() / 2) + this.layout.leftMargin,
            this.layout.topMargin - (this.layout.marginSize / 2));
        // Restore previous state
        pop();
    };
    
    this.drawVerticalBar = function(color, x, visitors) {
        fill(color);
        noStroke();
        rect(x, 
             this.mapVisitorsToHeight(visitors), 
             barWidth, 
             this.layout.plotHeight() + this.layout.topMargin - this.mapVisitorsToHeight(visitors));
    }
    
    this.makeLegendItem = function(label, colour, n) {
        var boxWidth = this.labelSpace / 2;
        var boxHeight = this.labelSpace / 2;
        // Adjust the space between specific legend items
        if (label == "Avila Adobe" || label == "Firehouse Museum") {
            var x = this.layout.leftMargin + n * 200 + 35;
        } else {
            var x = this.layout.leftMargin + n * 200;
        }

        var y = this.layout.bottomMargin + boxHeight * 3;

        fill(colour);
        rect(x, y, boxWidth, boxHeight);

        fill('black');
        noStroke();
        textAlign('left', 'center');
        textSize(12);
        text(label, x + boxWidth + 5, y + boxWidth / 2);
    };
}