function FoodSupply() {    
    // Name for the visualisation to appear in the menu bar.
    this.name = 'Food Supply in 1999';

    // Each visualisation must have a unique ID with no special
    // characters.
    this.id = 'food-supply';

    // Title to display above the plot.
    this.title = 'Food supply per day per person in different countries over the world';
    
    // radius of two polygons.
    this.radiusLarge = 200;
    this.radiusSmall = 100;
    
    // List of labels.
    var foodList = ['Grains', 'Potatoes','Vegetables','Meat', 'Dairy Foods', 'Seafood'];
    
    // A map to put country as key and row number as value.
    var countryMap = new Map();
    
    // Property to represent whether data has been loaded.
    this.loaded = false;

    // Preload the data. This function is called automatically by the
    // gallery when a visualisation is added.
    this.preload = function() {
        var self = this;
        
        this.data = loadTable('./data/food-supply/food-supply.csv', 'csv', 'header',
        // Callback function to set the value this.loaded to true.
        function(table) {
            self.loaded = true;
        });
    };
    

    this.setup = function() {
        // Get the list of all countries after data loaded.
        var countryList = this.data.getColumn('Country');
        
        // Create a select DOM element.
        this.select = createSelect();
        this.select.position(410, 50);
        
        for (var i = 0; i < countryList.length; i++) {
            // Put country and row number into a map for later use.
            countryMap.set(countryList[i], i);
            // Create select list.
            this.select.option(countryList[i]);
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
        
        // Draw two polygons to create radar chart.      
        this.drawPolygon(width / 2, height / 2, this.radiusLarge, 6);
        this.drawPolygon(width / 2, height / 2, this.radiusSmall, 6);
        
        // Draw axis labels
        push();
        textSize(16);
        fill('black');
        text('400', 
             width / 2 - this.radiusSmall * cos(TWO_PI / 6), 
             height / 2 - this.radiusSmall * sin(TWO_PI / 6));
        text('800', 
             width / 2 - this.radiusLarge * cos(TWO_PI / 6), 
             height / 2 - this.radiusLarge * sin(TWO_PI / 6));
        //this.drawLabels(width / 2, height / 2, this.radiusLarge + 20, 6, foodList);
        pop();
        
        // Plot data of user selected country on the chart.
        // Default is Israel.
        var selectedCountry = this.select.value();
        // Get row number of selected country.
        var rowNum = countryMap.get(selectedCountry); 
        
        

            
        // Get supply amount of different food type.
        var grains = this.data.getColumn('Grains')[rowNum];
        var potatoes = this.data.getColumn('Potatoes')[rowNum];
        var vegetables = this.data.getColumn('Vegetables')[rowNum];
        var meat = this.data.getColumn('Meat')[rowNum];
        var dairy = this.data.getColumn('Dairy Foods')[rowNum];
        var seafood = this.data.getColumn('Seafood')[rowNum];

        // Plot data on the chart.
        push();
        stroke('red');
        strokeWeight(5);
        // Calculate xy position of all the points and connect them.
        beginShape();
        // Grains.
        vertex(width / 2 + this.radiusLarge * (grains / 800), height / 2);
        // Potatoes.
        vertex(width / 2 + this.radiusLarge * (potatoes / 800) * cos(TWO_PI / 6),
              height / 2 + this.radiusLarge * (potatoes / 800) * sin(TWO_PI / 6));
        // Vegetables.
        vertex(width / 2 - this.radiusLarge * (vegetables / 800) * cos(TWO_PI / 6),
              height / 2 + this.radiusLarge * (vegetables / 800) * sin(TWO_PI / 6));
        // Meat.
        vertex(width / 2 - this.radiusLarge * (meat / 800), height / 2);
        // Dairy foods.
        vertex(width / 2 - this.radiusLarge * (dairy / 800) * cos(TWO_PI / 6),
              height / 2 - this.radiusLarge * (dairy / 800) * sin(TWO_PI / 6));
        // Seafood.
        vertex(width / 2 + this.radiusLarge * (seafood / 800) * cos(TWO_PI / 6),
              height / 2 - this.radiusLarge * (seafood / 800) * sin(TWO_PI / 6));
        // Connect the last point with the first.
        vertex(width / 2 + this.radiusLarge * (grains / 800), height / 2);
        endShape();
        pop();
            

    }
    
    this.drawTitle = function() {
        fill(0);
        noStroke();
        textAlign('center', 'center');
        // Start a new drawing state
        push();
        textSize(20);
        text(this.title, width / 2, 20);
        // Restore previous state
        pop();
    };
    
    // X, y is the center position of the polygon.
    // Radius indicates the size of polygon.
    // Npoint means number of points the polygon has.
    this.drawPolygon = function(x, y, radius, npoints) {
        stroke('purple');
        noFill();
        let angle = TWO_PI / npoints;
        let i = 0;
        beginShape();
        // Increase the angle each time by value of 2 pi / number of points.
        for (let a = 0; a < TWO_PI; a += angle) {
            // Calculate the x y position of each vertex and connect them.
            let sx = x + cos(a) * radius;
            let sy = y + sin(a) * radius;
            vertex(sx, sy);
            
            // Draw a line between center and each vertex.
            line(x, y, sx, sy);
        }
        endShape(CLOSE);
    }
    
    this.drawLabels = function(x, y, radius, npoints, labelList) {
        let angle = TWO_PI / npoints;
        let i = 0;
        beginShape();
        // Increase the angle each time by value of 2 pi / number of points.
        for (let a = 0; a < TWO_PI; a += angle) {
            // Calculate the x y position of each vertex and connect them.
            let sx = x + cos(a) * radius;
            let sy = y + sin(a) * radius;
            // Draw the label.
            text(labelList[i], sx, sy);
            i++;
        }
        endShape(CLOSE);
    }
    
}