function RadialVisualization(fft, amplitude) {
    // Class representing a single radial bar
    function RadialBar(angle, radius, color) {
        this.angle = angle; // Angle at which the bar is placed
        this.radius = radius; // Distance from the center
        this.height = 0; // Initial height of the bar
        this.color = color; // Color of the bar
    }

    // Update the height of the bar based on audio level
    RadialBar.prototype.update = function(level) {
        this.height = map(level, 0, 1, 0, height / 3);
    };

    // Draw the bar on the canvas
    RadialBar.prototype.show = function() {
        push(); // Save the current drawing state
        translate(width / 2, height / 2); // Move origin to the center of the canvas
        rotate(this.angle); // Rotate to the bar's angle
        fill(this.color); // Set the fill color
        noStroke(); // Disable the stroke
        rect(this.radius, -5, this.height, 10); // Draw the bar
        pop(); // Restore the previous drawing state
    };

    let radialBars = []; // Array to hold all radial bars
    let numBars = 60; // Number of radial bars

    // Initialize radial bars with their angles and colors
    for (let i = 0; i < numBars; i++) {
        let angle = map(i, 0, numBars, 0, TWO_PI); // Calculate angle for each bar
        let color = map(i, 0, numBars, 0, 360); // Calculate color for each bar
        radialBars.push(new RadialBar(angle, 100, color)); // Create and add a new RadialBar
    }

    // Function to reset the canvas and recreate radial bars
    this.resetCanvas = function() {
        background(0); // Clear the canvas
        radialBars = []; // Reset the radialBars array
        for (let i = 0; i < numBars; i++) {
            let angle = map(i, 0, numBars, 0, TWO_PI); // Recalculate angle for each bar
            let color = map(i, 0, numBars, 0, 360); // Recalculate color for each bar
            radialBars.push(new RadialBar(angle, 100, color)); // Create and add a new RadialBar
        }
    };

    this.name = "Radial Visualization"; // Name of the visualization

    // Function to draw the visualization on the canvas
    this.draw = function() {
        background(0); // Clear the canvas
        let spectrum = fft.analyze(); // Get the audio spectrum data
        let level = amplitude.getLevel(); // Get the amplitude level

        // Update and draw each radial bar based on the audio spectrum
        for (let i = 0; i < radialBars.length; i++) {
            radialBars[i].update(spectrum[i % spectrum.length] / 255); // Update bar height
            radialBars[i].show(); // Draw the bar
        }
    };

    // Function to handle canvas resizing
    this.onResize = function() {
        this.resetCanvas(); // Reset the canvas and bars
    };
}

