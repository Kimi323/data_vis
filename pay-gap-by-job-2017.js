function PayGapByJob2017() {

  // Name for the visualisation to appear in the menu bar.
  this.name = 'Pay gap by job: 2017';

  // Each visualisation must have a unique ID with no special
  // characters.
  this.id = 'pay-gap-by-job-2017';

  // Property to represent whether data has been loaded.
  this.loaded = false;

  // Graph properties.
  this.pad = 20;
  this.dotSizeMin = 15;
  this.dotSizeMax = 40;
    
  // Create user information text and make it not displayed when gallery is loaded.
//  this.usageText = createElement('div', 'Hover your mouse over the dot to see details');
//  this.usageText.style('display', 'none');

  // Preload the data. This function is called automatically by the
  // gallery when a visualisation is added.
  this.preload = function() {
    var self = this;
    this.data = loadTable(
      './data/pay-gap/occupation-hourly-pay-by-gender-2017.csv', 'csv', 'header',
      // Callback function to set the value
      // this.loaded to true.
      function(table) {
        self.loaded = true;
      });

  };

  this.setup = function() {
      this.addLengend();
  };

  this.destroy = function() {
//      this.usageText.remove();
  };

  this.draw = function() {
    if (!this.loaded) {
      console.log('Data not yet loaded');
      return;
    }

    // Draw the axes.
    this.addAxes();
      
    // draw legend to show what the color means.
    // Blue means men are paid more, green means women are paid more.
    this.addLengend();            


      
    // Draw the lables for x axes.
    text('more female', width - this.pad * 5, height / 2 + 15);
    text('more male', this.pad, height / 2 + 15);

    // Get data from the table object.
    var jobs = this.data.getColumn('job_subtype');
    var propFemale = this.data.getColumn('proportion_female');
    var payGap = this.data.getColumn('pay_gap');
    var numJobs = this.data.getColumn('num_jobs');

    // Convert numerical data from strings to numbers.
    propFemale = stringsToNumbers(propFemale);
    payGap = stringsToNumbers(payGap);
    numJobs = stringsToNumbers(numJobs);

    // Set ranges for axes.
    // Use full 100% for x-axis (proportion of women in roles).
    var propFemaleMin = 0;
    var propFemaleMax = 100;

    // For y-axis (pay gap) use a symmetrical axis equal to the
    // largest gap direction so that equal pay (0% pay gap) is in the
    // centre of the canvas. Above the line means men are paid
    // more. Below the line means women are paid more.
    var payGapMin = -20;
    var payGapMax = 20;

    // Find smallest and largest numbers of people across all
    // categories to scale the size of the dots.
    var numJobsMin = min(numJobs);
    var numJobsMax = max(numJobs);
      
    // Set range for text inside the dots.
    var textSizeMin = 8;
    var textSizeMax = 20;

    fill(255);
    stroke(0);
    strokeWeight(1);

    for (i = 0; i < this.data.getRowCount(); i++) {
        // Map Female proportion to x position on the canvas.
        var x_mapped = map(propFemale[i], propFemaleMin, propFemaleMax, 
                           this.pad, width - this.pad);
        // Map paygap to y position on the canvas.
        var y_mapped = map(payGap[i], payGapMin, payGapMax, 
                           height - this.pad, this.pad);
        // Map number of jobs to dot size.
        var dotSize = map(numJobs[i], numJobsMin, numJobsMax, 
                          this.dotSizeMin, this.dotSizeMax);
        // Map number of jobs to the size of the text which appears when mouse hovers.
        var textSizeInsideDot = map(numJobs[i], numJobsMin, numJobsMax, 
                          textSizeMin, textSizeMax);
        
        // Map paygap to colour. Blue means men paid more, green means women.
        var colour = map(payGap[i], payGapMin, payGapMax, 0, 255);
        fill(173, 216, colour);
        // Draw an ellipse for each point.
        // x = propFemale
        // y = payGap
        // size = numJobs
        ellipse(x_mapped, y_mapped, dotSize);
        
        // If mouse is inside the dot, then show number of jobs.
        if (dist(mouseX, mouseY, x_mapped, y_mapped) < dotSize / 2 ) {
            // Start a new drawing state.
            push();
            fill('black');
            noStroke();
            textSize(16);
            text('Job type: ' + jobs[i], this.pad, height - this.pad);
            text('Number of job: ' + numJobs[i], this.pad, height - this.pad * 2);
            // Back to previous state.
            pop();
        } 
    }
  };

  this.addAxes = function () {
    stroke(200);

    // Add vertical line.
    line(width / 2,
         0 + this.pad,
         width / 2,
         height - this.pad);

    // Add horizontal line.
    line(0 + this.pad,
         height / 2,
         width - this.pad,
         height / 2);
  };
    
    this.addLengend = function () {
        push();
        // Add text labels.
        textSize(14);
        fill('black');
        text('Paygap: Who are paid more?', width / 2, height - this.pad * 5.5);
        text('men', width / 2, height - this.pad * 4.5);
        text('women', width / 2, height - this.pad * 4.5);
        // Set colour mode to RGB.
        colorMode(RGB);
        noStroke();
        // Specify start and end colour.
        let from = color(173, 216, 253);
        let to = color(73, 216, 79);
        // Blend two colors to find a third color somewhere between them.
        // 0.0 equal to the first color, 0.1 is very near the first color,
        // 0.9 is very near the second color.
        for (var i = 0; i <= 1; i = i + 0.1 ) {
            fill(lerpColor(from, to, i));
            // fill each rectangle by gradation.
            rect(width / 2 + i * 10 * 20, height - this.pad * 4, 20, 20);  
        }
        pop();
    }
}
