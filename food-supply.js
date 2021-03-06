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
    
    // Property to represent whether data has been loaded.
    this.loaded = false;

    // Preload the data. This function is called automatically by the
    // gallery when a visualisation is added.
    this.preload = function() {
        var self = this;
        this.data = loadTable(
            './data/food-supply/food-supply.csv', 'csv', 'header',
        // Callback function to set the value this.loaded to true.
        function(table) {
            self.loaded = true;
        });
    };
    
    
    this.setup = function() {

    };
    
    // Remove the dropdown list when other menu-item is clicked.
    this.destroy = function() {

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
        this.drawLabels(width / 2, height / 2, this.radiusLarge + 20, 6, foodList);
        pop();
        
        // 
        
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