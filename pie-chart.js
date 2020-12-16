function PieChart(x, y, diameter) {

  this.x = x;
  this.y = y;
  this.diameter = diameter;
  this.labelSpace = 30;
  this.isAngleCompared = false;
  this.areaDetail = '';

  this.get_radians = function(data) {
    var total = sum(data);
    var radians = [];

    for (let i = 0; i < data.length; i++) {
      radians.push((data[i] / total) * TWO_PI);
    }

    return radians;
  };

  this.draw = function(data, labels, colours, title) {

    // Test that data is not empty and that each input array is the
    // same length.
    if (data.length == 0) {
      alert('Data has length zero!');
    } else if (![labels, colours].every((array) => {
      return array.length == data.length;
    })) {
      alert(`Data (length: ${data.length})
Labels (length: ${labels.length})
Colours (length: ${colours.length})
Arrays must be the same length!`);
    }

    // form pie chart
    // https://p5js.org/examples/form-pie-chart.html
    var angles = this.get_radians(data);
    var lastAngle = 0;
    var colour;

    for (var i = 0; i < data.length; i++) {
      if (colours) {
        colour = colours[i];
      } else {
        colour = map(i, 0, data.length, 0, 255);
      }

      fill(colour);
      stroke(0);
      strokeWeight(1);

      arc(this.x, this.y,
          this.diameter, this.diameter,
          lastAngle, lastAngle + angles[i] + 0.001); // Hack for 0!

      if (labels) {
        this.makeLegendItem(labels[i], data[i], i, colour);
      }

      lastAngle += angles[i];
        
      // Extension 01
      // Click on pie chart to see details for each part
      if (dist(mouseX, mouseY, this.x, this.y) <= this.diameter/2 
          && this.isAngleCompared == false 
          && mouseIsPressed) {
        push();
        // translate (0, 0) to the center of circle
        translate(this.x, this.y);
        // horizontal vector from the center of circle
        var vHorizon = createVector(this.diameter/2, 0);
        // vector from the center of circle to current mouse position
        var vCurrent = createVector(mouseX - this.x, mouseY - this.y);
        // calculate angle between two vectors 
        // angle greater than PI is represented as a minus number
        var currentAngle = vHorizon.angleBetween(vCurrent) *
            Math.sign(vHorizon.cross(vCurrent).z || 1);
        if (currentAngle < 0) {
          currentAngle = 2*PI + currentAngle;
        }
        if (currentAngle < lastAngle) {
          this.isAngleCompared = true;
          this.areaDetail = labels[i] + ': ' + data[i].toFixed(2) + '%'; 
        }
        pop();
      } 
        
      // when mouse released after clicking pie chart
      if (!mouseIsPressed && this.isAngleCompared == true) {
        // reset
        this.isAngleCompared = false;
      }
        
      // Show details on which mouse is pressing
      if (this.isAngleCompared) {
        textSize(32);
        fill(0, 102, 153);
        text(this.areaDetail, 50, 100);
      }
        
    }

    if (title) {
      fill('black');
      noStroke();
      textAlign('center', 'center');
      textSize(24);
      text(title, this.x, this.y - this.diameter * 0.6);
    }
  };

  this.makeLegendItem = function(label, data, i, colour) {
    var x = this.x + 50 + this.diameter / 2;
    var y = this.y + (this.labelSpace * i) - this.diameter / 3;
    var boxWidth = this.labelSpace / 2;
    var boxHeight = this.labelSpace / 2;

    fill(colour);
    rect(x, y, boxWidth, boxHeight);

    fill('black');
    noStroke();
    textAlign('left', 'center');
    textSize(12);
    // Extend 01
    // show label and percentage beside colour box
    text(label, x + boxWidth + 10, y + boxWidth / 2);
  };
    
}
