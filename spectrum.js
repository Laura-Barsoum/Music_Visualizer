function Spectrum() {
    this.name = "spectrum";

    // Introduce variables for interactivity and animation
    var rotationAngle = 0;
    var colorOffset = 0;

    this.draw = function () {
        push();
        var spectrum = fourier.analyze();
        noStroke();

        for (var i = 0; i < spectrum.length; i++) {
            // Introduce color variation based on frequency
            var hue = map(i, 0, spectrum.length, 0, 360);
            var saturation = map(spectrum[i], 0, 255, 50, 100);
            var brightness = map(spectrum[i], 0, 255, 50, 100);
            fill((hue + colorOffset) % 360, saturation, brightness);

            // Draw each bin as a rectangle from the left of the screen across
            var y = map(i, 0, spectrum.length, 0, height);
            var w = map(spectrum[i], 0, 255, 0, width);
            rect(0, y, w, height / spectrum.length);
        }

        // Add animation - rotate spectrum bars
        rotate(rotationAngle);
        rotationAngle += 0.01; // Adjust rotation speed

        pop();

        // Update color offset for color variation animation
        colorOffset += 1; // Adjust color animation speed
    };
}
