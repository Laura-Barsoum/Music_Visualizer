function WavePattern() {
    this.name = "wavepattern";

    // Introduce variables for interactivity and animation
    var colorOffset = 0;
    var distortionOffset = 0;

    this.draw = function() {
        push();
        noFill();
        stroke(255, 0, 0);
        strokeWeight(2);

        beginShape();
        var wave = fourier.waveform();
        for (var i = 0; i < wave.length; i++) {
            var x = map(i, 0, wave.length, 0, width);
            var y = map(wave[i], -1, 1, 0, height);

            // Add color variation based on amplitude
            var hue = map(wave[i], -1, 1, 0, 360);
            stroke((hue + colorOffset) % 360, 100, 100);

            // Add distortion effect to waveform
            y += sin(distortionOffset + i * 0.1) * 20; // Adjust distortion intensity and frequency

            vertex(x, y);
        }

        endShape();
        pop();

        // Update color and distortion offsets for animation
        colorOffset += 1; // Adjust color animation speed
        distortionOffset += 0.05; // Adjust distortion animation speed
    };
}
