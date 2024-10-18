function KaleidoscopeVisualization(fft) {
    this.fft = fft; // Store the FFT object for audio analysis

    // Function to draw the kaleidoscope visualization
    this.draw = function() {
        let spectrum = this.fft.analyze(); // Analyze the audio spectrum

        push(); // Save current transformation state
        translate(width / 2, height / 2); // Move origin to the center of the canvas
        rotate(frameCount * 0.01); // Rotate the canvas over time

        for (let i = 0; i < 6; i++) {
            beginShape();
            noFill();
            stroke(map(i, 0, 6, 0, 255), 255, 255); // Color spectrum for each section

            // Draw shape based on spectrum data
            for (let j = 0; j < spectrum.length; j++) {
                let angle = map(j, 0, spectrum.length, 0, TWO_PI / 6); // Calculate angle for each vertex
                let radius = map(spectrum[j], 0, 255, 50, 300); // Map spectrum amplitude to radius
                let x = radius * cos(angle); // Calculate x-coordinate
                let y = radius * sin(angle); // Calculate y-coordinate
                vertex(x, y); // Add vertex to the shape
            }

            endShape(CLOSE); // Close the shape
            rotate(PI / 3); // Rotate for the next section
        }

        pop(); // Restore original transformation state
    };

    this.name = "Kaleidoscope Visualization"; // Name of the visualization
}
