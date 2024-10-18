function ParticlesVisualization(fft, amplitude) {
    // Class representing individual particles
    class Particle {
        constructor(x, y, level) {
            // Initialize particle properties based on position and audio level
            this.x = x;
            this.y = y;
            this.size = map(level, 0, 1, 10, 50);  // Particle size proportional to audio level
            this.speed = map(level, 0, 1, 1, 5);  // Particle speed proportional to audio level
            this.vx = random(-this.speed, this.speed);  // Random horizontal velocity
            this.vy = random(-this.speed, this.speed);  // Random vertical velocity
            this.lifespan = 255;  // Lifespan of the particle (transparency)
            this.hue = random(360);  // Random color for the particle
        }

        // Update particle properties
        update() {
            this.x += this.vx;  // Update position based on velocity
            this.y += this.vy;
            this.lifespan -= 2;  // Decrease lifespan
            this.size *= 0.99;  // Gradually decrease size

            // Bounce off the edges of the canvas
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }

        // Display the particle on the canvas
        show() {
            fill(this.hue, 100, 100, this.lifespan);  // Set fill color with transparency
            noStroke();  // No border for the particles
            ellipse(this.x, this.y, this.size * 2);  // Draw the particle as an ellipse
        }

        // Check if the particle is dead (lifespan or size too small)
        isDead() {
            return this.lifespan <= 0 || this.size < 1;
        }
    }

    let particles = [];  // Array to store particles

    // Function to reset the canvas
    this.resetCanvas = function() {
        background(0);  // Clear the canvas with black color
        particles = [];  // Reset the particles array
    };

    this.name = "Particles Visualization";  // Name of the visualization

    // Function to draw the visualization
    this.draw = function() {
        background(0);  // Clear the canvas
        let spectrum = fft.analyze();  // Get frequency spectrum data
        let barWidth = width / spectrum.length;  // Width of each bar in the spectrum
        let rectHeight = height / 3;  // Height of the rectangle for drawing spectrum

        colorMode(HSB, 360, 100, 100);  // Set color mode to HSB

        // Draw spectrum bars
        for (let i = 0; i < spectrum.length; i++) {
            let x = i * barWidth;  // X position of the bar
            let hue = map(i, 0, spectrum.length, 0, 360);  // Map bar index to hue
            fill(hue, 100, 100);  // Set fill color
            noStroke();  // No border
            rect(x, height / 2 - rectHeight / 2, barWidth, rectHeight);  // Draw the bar
        }

        // Draw spectrum triangles
        for (let i = 0; i < spectrum.length; i++) {
            let x = i * barWidth;  // X position of the triangle
            let hue = map(i, 0, spectrum.length, 0, 360);  // Map bar index to hue
            let h = map(spectrum[i], 0, 255, rectHeight / 2, 0);  // Map spectrum value to triangle height
            fill(hue, 100, 100);  // Set fill color
            noStroke();  // No border
            // Draw top triangle
            triangle(x, height / 2 - rectHeight / 2, x + barWidth / 2, height / 2 - rectHeight / 2 - h, x + barWidth, height / 2 - rectHeight / 2);
            // Draw bottom triangle
            triangle(x, height / 2 + rectHeight / 2, x + barWidth / 2, height / 2 + rectHeight / 2 + h, x + barWidth, height / 2 + rectHeight / 2);
        }

        // Generate new particles based on audio level
        let level = amplitude.getLevel();
        if (random() < map(level, 0, 1, 0.05, 0.2)) {
            particles.push(new Particle(random(width), random(height), level));  // Create a new particle
        }

        // Update and display particles
        for (let i = particles.length - 1; i >= 0; i--) {
            let p = particles[i];
            p.update();  // Update particle properties
            p.show();  // Display particle
            if (p.isDead()) {
                particles.splice(i, 1);  // Remove dead particles
            }
        }
    };

    // Function to handle canvas resize
    this.onResize = function() {
        this.resetCanvas();  // Reset the canvas when resized
    };
}
