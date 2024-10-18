function FractalTreeVisualization(fft) {
  this.fft = fft;

  this.draw = function(amplitude) {
    let spectrum = this.fft.analyze();
    let level = this.fft.getEnergy("lowMid");

    // Background with twinkling stars
    background(0);
    for (let i = 0; i < 100; i++) {
      let x = random(width);
      let y = random(height);
      // Adjust brightness mapping to increase range
      let starBrightness = map(amplitude, 0, 255, 50, 255); // Brightness based on audio amplitude
      fill(255, starBrightness);
      noStroke();
      ellipse(x, y, 2, 2);
    }

    // Mystical tree
    stroke(255, 200);
    push(); // Save the current transformation state
    translate(width / 2, height);
    this.branch(150, level / 255, 5); // Start with a shorter trunk
    pop(); // Restore the previous transformation state
  };

  this.branch = function(len, level, weight) {
    strokeWeight(map(level, 0, 1, weight, weight * 10));
    line(0, 0, 0, -len);
    translate(0, -len);
    if (len > 8) { // Adjusted threshold for finer branches
      push();
      rotate(PI / 5);
      this.branch(len * 0.67, level, weight * 0.8);
      pop();
      push();
      rotate(-PI / 5);
      this.branch(len * 0.67, level, weight * 0.8);
      pop();
    }  
  };

  this.name = "Enchanted Fractal Tree";
}
