function Visualisations() {
  this.visuals = [];
  this.selectedVisual = null;

  this.add = function(visual) {
    this.visuals.push(visual);
    if (!this.selectedVisual) {
      this.selectedVisual = visual;
    }
  };

  this.selectVisual = function(name) {
    for (var i = 0; i < this.visuals.length; i++) {
      if (this.visuals[i].name === name) {
        this.selectedVisual = this.visuals[i];
        break;
      }
    }
  };
}