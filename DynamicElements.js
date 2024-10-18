function DynamicElements(fourier) {
    this.name = "Enchanted Forest"; // Name of the visualization

    // Arrays to hold different fantasy elements
    let trees = [];
    let flowers = [];
    let fairies = [];
    let butterflies = [];

    // Initialize fantasy elements
    for (let i = 0; i < 5; i++) {
        trees.push(createFantasyTree());
    }

    for (let i = 0; i < 15; i++) {
        flowers.push(createMagicFlower());
    }

    for (let i = 0; i < 5; i++) {
        fairies.push(createFairy());
    }

    for (let i = 0; i < 10; i++) {
        butterflies.push(createButterfly());
    }

    // Function to create a fantasy tree with random properties
    function createFantasyTree() {
        return {
            x: random(width),
            y: random(height / 2, height),
            height: random(50, 150), 
            color: color(random(100, 200), random(150, 255), random(100, 150)) 
        };
    }

    // Function to create a magic flower with random properties
    function createMagicFlower() {
        return {
            x: random(width),
            y: random(height / 2, height),
            size: random(20, 40), 
            color: color(random(150, 255), random(100, 200), random(150, 255)) 
        };
    }

    // Function to create a fairy with random properties
    function createFairy() {
        return {
            x: random(width),
            y: random(height / 2),
            size: random(30, 50), 
            velocityX: random(-0.5, 0.5), 
            velocityY: random(-0.5, 0.5), 
            color: color(255, random(150, 255), random(150, 255)) 
        };
    }

    // Function to create a butterfly with random properties
    function createButterfly() {
        return {
            x: random(width),
            y: random(height / 2),
            size: random(20, 30), 
            velocityX: random(-1, 1), 
            velocityY: random(-1, 1), 
            color: color(random(150, 255), random(150, 200), random(50, 150)) 
        };
    }

    // Function to draw the visualization on the canvas
    this.draw = function() {
        let spectrum = fourier.analyze(); // Get the audio spectrum data

        background(0); // Clear the canvas

        // Draw and animate fairies
        for (let i = 0; i < fairies.length; i++) {
            let fairy = fairies[i];
            fairy.x += fairy.velocityX;
            fairy.y += fairy.velocityY;
            if (fairy.x < 0 || fairy.x > width) fairy.velocityX *= -1;
            if (fairy.y < 0 || fairy.y > height / 2) fairy.velocityY *= -1;
            drawFairy(fairy.x, fairy.y, fairy.size, fairy.color);
        }

        // Draw and animate butterflies
        for (let i = 0; i < butterflies.length; i++) {
            let butterfly = butterflies[i];
            butterfly.x += butterfly.velocityX;
            butterfly.y += butterfly.velocityY;
            if (butterfly.x < 0 || butterfly.x > width) butterfly.velocityX *= -1;
            if (butterfly.y < 0 || butterfly.y > height / 2) butterfly.velocityY *= -1;
            drawButterfly(butterfly.x, butterfly.y, butterfly.size, butterfly.color);
        }

        // Update and draw trees
        for (let i = 0; i < trees.length; i++) {
            let tree = trees[i];
            tree.height = map(spectrum[100], 0, 255, 50, 150); // Map spectrum value to tree height
            drawFantasyTree(tree.x, tree.y, tree.height, tree.color);
        }

        // Update and draw flowers
        for (let i = 0; i < flowers.length; i++) {
            let flower = flowers[i];
            flower.size = map(spectrum[200], 0, 255, 20, 40); // Map spectrum value to flower size
            drawMagicFlower(flower.x, flower.y, flower.size, flower.color);
        }
    };

    // Function to draw a fantasy tree on the canvas
    function drawFantasyTree(x, y, height, color) {
        fill(color);
        rect(x - 5, y, 10, -height); // Draw tree trunk

        fill(0, 128, 0); // Set color for leaves
        ellipse(x, y - height, 50, 50); // Draw tree leaves
    }

    // Function to draw a magic flower on the canvas
    function drawMagicFlower(x, y, size, color) {
        stroke(0);
        strokeWeight(2);
        line(x, y, x, y - size); // Draw flower stem

        noStroke();
        fill(color); 
        ellipse(x, y - size, size * 2, size * 2); // Draw petals
        ellipse(x - size, y - size, size * 2, size * 2);
        ellipse(x + size, y - size, size * 2, size * 2);

        fill(255, 255, 0); // Set color for flower center
        ellipse(x, y - size, size / 2, size / 2); // Draw flower center
    }

    // Function to draw a fairy on the canvas
    function drawFairy(x, y, size, color) {
        // Draw fairy body
        fill(color);
        ellipse(x, y, size * 0.8, size);

        // Draw fairy wings
        let wingSize = size * 1.5;
        let wingOffset = size * 0.2;

        // Left wing
        fill(255, 200);
        ellipse(x - wingOffset, y, wingSize, size * 1.2);

        // Right wing
        ellipse(x + wingOffset, y, wingSize, size * 1.2);

        // Draw fairy sparkles
        let numSparkles = 5;
        let sparkleSize = size * 0.1;

        for (let i = 0; i < numSparkles; i++) {
            let sparkleX = random(x - size / 2, x + size / 2);
            let sparkleY = random(y - size / 2, y + size / 2);
            fill(255, random(150, 255));
            ellipse(sparkleX, sparkleY, sparkleSize, sparkleSize);
        }
    }

    // Function to draw a butterfly on the canvas
    function drawButterfly(x, y, size, color) {
        fill(color);

        // Draw butterfly body
        ellipse(x, y, size * 0.3, size * 1.5);

        // Draw butterfly wings
        let wingSize = size * 1.2;
        let wingAngle = PI / 6; // Angle of butterfly wings
        let wingOffset = size * 0.3; // Offset from the body

        // Left wing
        push();
        translate(x - wingOffset, y);
        rotate(-wingAngle);
        ellipse(0, 0, wingSize, size * 0.8);
        pop();

        // Right wing
        push();
        translate(x + wingOffset, y);
        rotate(wingAngle);
        ellipse(0, 0, wingSize, size * 0.8);
        pop();

        // Draw butterfly antennae
        let antennaLength = size * 0.8;
        let antennaAngle = PI / 4; // Angle of antennae
        let antennaOffset = size * 0.5; // Offset from the body

        // Left antenna
        push();
        stroke(color);
        strokeWeight(size * 0.05);
        line(x - antennaOffset, y - size * 0.6, x - antennaOffset - cos(antennaAngle) * antennaLength, y - size * 0.6 - sin(antennaAngle) * antennaLength);
        pop();

        // Right antenna
        push();
        stroke(color);
        strokeWeight(size * 0.05);
        line(x + antennaOffset, y - size * 0.6, x + antennaOffset + cos(antennaAngle) * antennaLength, y - size * 0.6 - sin(antennaAngle) * antennaLength);
        pop();
    }
}
