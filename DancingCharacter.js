class DancingCharacter {
  constructor() {
    this.defaultSize = 50; // Adjusted size
    this.size = this.defaultSize;
    this.x = 200; // Initial position
    this.y = windowHeight / 2;
    this.visible = false; // Visibility

    this.angle = 0;
    this.bodyColor = color(200, 200, 200); // Grey for body like Bugs Bunny
    this.earColor = color(255, 255, 255); // White for inner ears
    this.headColor = color(255, 255, 255); // White for head and face

    this.animationSpeed = 0.05; // Animation speed for smoother movement
  }

  updateAppearance(trackIndex) {
    switch (trackIndex) {
      case 0:
        this.bodyColor = color(200, 200, 200); // Grey like Bugs Bunny
        this.earColor = color(255, 255, 255); // Inner white ear color
        this.defaultSize = 50; // Medium size
        break;
      case 1:
        this.bodyColor = color(180, 180, 220); // Different color variation
        this.earColor = color(255, 240, 240);
        this.defaultSize = 50; // Medium size
        break;
      case 2:
        this.bodyColor = color(150, 220, 180);
        this.earColor = color(255, 250, 240);
        this.defaultSize = 40; // Smaller size
        break;
    }
    this.size = this.defaultSize;
  }

  update() {
    if (!this.visible) return;

    // Update animation angles and movement
    this.angle += this.animationSpeed;
    this.armSwing = sin(this.angle) * PI / 8; // More pronounced arm swinging
    this.legKick = sin(this.angle * 0.8) * PI / 8; // More pronounced leg kicking
    this.bodyTilt = sin(this.angle) * PI / 16; // Subtle body tilting
    this.headBobbing = cos(this.angle) * this.size * 0.04; // More noticeable head bobbing
    this.earFlop = sin(this.angle * 1.5) * PI / 12; // Noticeable ear flopping
  }

  draw() {
    if (!this.visible) return;
    push();
    translate(this.x, this.y);
    rotate(this.bodyTilt);

    // Draw head with bobbing and ears
    this.drawHead();

    // Draw body
    fill(this.bodyColor);
    rect(-this.size * 0.35, -this.size * 0.4, this.size * 0.7, this.size * 1.0); // Adjust body size for Bugs' slim appearance

    // Draw arms
    this.drawArm(-this.size * 0.35, -this.size * 0.2, this.armSwing);
    this.drawArm(this.size * 0.35, -this.size * 0.2, -this.armSwing);

    // Draw legs
    this.drawLeg(-this.size * 0.2, this.size * 0.5, this.legKick);
    this.drawLeg(this.size * 0.2, this.size * 0.5, -this.legKick);

    pop();
  }

  drawHead() {
    push();
    translate(0, -this.size * 0.5 + this.headBobbing); // Adjust Y-offset for Bugs' head position

    // Draw bunny ears
    this.drawEar(-this.size * 0.2, -this.size * 0.7, this.earFlop); // Longer ears
    this.drawEar(this.size * 0.2, -this.size * 0.7, -this.earFlop);

    // Draw face
    fill(this.headColor);
    ellipse(0, 0, this.size * 0.8); // Larger head for Bugs' proportions

    // Draw eyes
    fill(0);
    ellipse(-this.size * 0.2, -this.size * 0.15, this.size * 0.1); // Adjust eye size and position
    ellipse(this.size * 0.2, -this.size * 0.15, this.size * 0.1);  // Adjust eye size and position

    // Draw nose
    fill(255, 100, 100);
    ellipse(0, this.size * 0.1, this.size * 0.1, this.size * 0.07); // Larger bunny nose

    // Draw mouth
    stroke(0);
    strokeWeight(2);
    noFill();
    arc(0, this.size * 0.2, this.size * 0.3, this.size * 0.2, 0, PI); // Smile
    pop();
  }

  drawEar(x, y, flopAngle) {
    push();
    translate(x, y);
    rotate(flopAngle);
    fill(this.bodyColor); // Outer ear
    ellipse(0, 0, this.size * 0.2, this.size * 0.8); // Longer ears

    fill(this.earColor); // Inner ear
    ellipse(0, 0, this.size * 0.14, this.size * 0.6); // Inner ear
    pop();
  }

  drawArm(x, y, angle) {
    push();
    translate(x, y);
    rotate(angle);
    fill(this.bodyColor);
    rect(0, 0, this.size * 0.25, this.size * 0.1); // Adjust arm size
    pop();
  }

  drawLeg(x, y, angle) {
    push();
    translate(x, y);
    rotate(angle);
    fill(this.bodyColor);
    rect(0, 0, this.size * 0.3, this.size * 0.15); // Adjust leg size
    pop();
  }
}
