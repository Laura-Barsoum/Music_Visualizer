function DJHeadphones(fft) {
    this.name = "DJ Headphones"; // Name of the visualization

    // Method to draw the character and headphones
    this.draw = function() {
        // Analyze the audio spectrum on each frame
        fft.analyze();

        // Get the bass and treble energy levels
        let bass = fft.getEnergy("bass");
        let treble = fft.getEnergy("treble");

        // Center of the canvas
        let centerX = width / 2;
        
        // Map bass to head bobbing movement
        let headBob = map(bass, 0, 255, -10, 10);  // Make the head move up and down slightly
        let centerY = height / 2 + headBob;        // Add the bobbing effect to the Y position

        // Hair background
        fill("#10104c");
        quad(centerX - 83, centerY + 40, centerX + 82, centerY + 40, centerX + 150, centerY + 150, centerX - 150, centerY + 150);
        
        // Head
        noStroke();
        fill("#E4B1AB");
        ellipse(centerX, centerY, 180);  // Centered at (centerX, centerY)
        
        // Hair
        noFill();
        stroke("#000032");
        strokeWeight(2);
        
        // Left hair
        fill("#000032");
        bezier(centerX, centerY - 90, centerX - 200, centerY - 70, centerX - 20, centerY + 90, centerX - 150, centerY + 150);
        
        // Right hair
        fill("#000032");
        bezier(centerX, centerY - 90, centerX + 200, centerY - 70, centerX + 20, centerY + 90, centerX + 150, centerY + 150);
        
        // Neck
        noStroke();
        fill("#E4B1AB");
        quad(centerX - 20, centerY + 60, centerX + 20, centerY + 60, centerX + 30, centerY + 120, centerX - 30, centerY + 120);
        
        // Body
        fill("#E4B1AB");
        quad(centerX - 30, centerY + 120, centerX + 30, centerY + 120, centerX + 130, centerY + 180, centerX - 130, centerY + 180);
        rect(centerX - 130, centerY + 180, 260, 70);

        // Earrings
        fill("#00FA9A");
        stroke("#DB7093");
        strokeWeight(4);
        // Left earring
        quad(centerX - 83, centerY + 40, centerX - 63, centerY + 90, centerX - 83, centerY + 110, centerX - 103, centerY + 90);
        // Right earring
        quad(centerX + 82, centerY + 40, centerX + 102, centerY + 90, centerX + 82, centerY + 110, centerX + 62, centerY + 90);
        noStroke();

        // Glasses
        fill(0, 0, 50);
        stroke("#DB7093");
        strokeWeight(6);
        line(centerX - 20, centerY, centerX + 20, centerY);  // Nose bridge
        rect(centerX - 65, centerY - 25, 55, 55, 10);  // Left lens
        rect(centerX + 10, centerY - 25, 55, 55, 10);  // Right lens
        
        // Lips
        fill("#e38fab");
        noStroke();
        arc(centerX - 10, centerY + 40, 20, 10, PI, 0, OPEN);  // Top lip
        arc(centerX + 10, centerY + 40, 20, 10, PI, 0, OPEN);
        fill("#DB7093");
        arc(centerX, centerY + 40, 40, 20, 0, PI);  // Bottom lip

        // Headphones that react to music
        let headphoneColorBass = color(255, 102, 102); // Color that reacts to bass
        let headphoneColorTreble = color(0, 153, 255); // Color that reacts to treble

        // Headphone band (moves with bass)
        stroke(50);
        strokeWeight(10);
        let bandOffset = map(bass, 0, 255, 0, 20);  // Map bass energy to the offset of the headphone band
        noFill();
        arc(centerX, centerY - 80, 200 + bandOffset, 100, PI, TWO_PI);

        // Left headphone (size based on bass)
        noStroke();
        fill(headphoneColorBass);
        let leftSize = map(bass, 0, 255, 40, 100);  // Map bass energy to headphone size
        ellipse(centerX - 100, centerY, leftSize);

        // Right headphone (size based on treble)
        fill(headphoneColorTreble);
        let rightSize = map(treble, 0, 255, 40, 100);  // Map treble energy to headphone size
        ellipse(centerX + 100, centerY, rightSize);

        // Glowing effect (responds to treble)
        let glowSize = map(treble, 0, 255, 100, 200);  // Map treble energy to glow size
        noFill();
        stroke(0, 153, 255, 150);  // Treble color with transparency
        strokeWeight(3);
        ellipse(centerX + 100, centerY, glowSize);  // Glow around the right headphone
    }
}
