
class CircularSpectrum {
    constructor(fft, amplitude) {
        this.fft = fft;
        this.amplitude = amplitude;
        this.particles = [];
    }

    draw() {
        let spectrum = this.fft.analyze();
        let level = this.amplitude.getLevel();
        let maxRadius = map(level, 0, 1, 100, width / 2);
        
        background(0, 50);
        noFill();
        strokeWeight(2);
        colorMode(HSB, 360, 100, 100);
        translate(width / 2, height / 2);

        // Draw the circular spectrum
        beginShape();
        for (let i = 0; i < spectrum.length; i++) {
            let angle = map(i, 0, spectrum.length, 0, TWO_PI);
            let r = map(spectrum[i], 0, 255, 20, maxRadius);
            let x = r * cos(angle);
            let y = r * sin(angle);
            stroke(map(i, 0, spectrum.length, 0, 360), 100, 100);
            vertex(x, y);
        }
        endShape(CLOSE);

        // Add particles based on the spectrum
        for (let i = 0; i < spectrum.length; i++) {
            if (random() < 0.03) {
                let angle = map(i, 0, spectrum.length, 0, TWO_PI);
                let r = map(spectrum[i], 0, 255, 20, maxRadius);
                let x = r * cos(angle);
                let y = r * sin(angle);
                this.particles.push(new Particle(x, y, angle));
            }
        }

        // Update and display particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            let p = this.particles[i];
            p.update();
            p.show();
            if (p.isDead()) {
                this.particles.splice(i, 1);
            }
        }
    }

    get name() {
        return "Circular Spectrum";
    }
}