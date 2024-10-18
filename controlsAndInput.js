function ControlsAndInput() {
  this.menuDisplayed = false;
  this.playbackButton = new PlaybackButton(); // Playback button in the top left

  this.mousePressed = function() {
    if (!this.playbackButton.hitCheck()) {
      var fs = fullscreen();
      fullscreen(!fs);
    }
  };

  this.keyPressed = function(keycode) {
    console.log(keycode);
    if (keycode === 32) { // Spacebar toggles menu
      this.menuDisplayed = !this.menuDisplayed;
      dancingCharacter.visible = this.menuDisplayed; // Toggle visibility
    } else if (this.menuDisplayed) {
      var letter = String.fromCharCode(keycode).toUpperCase();
      var soundIndex = playlist.findIndex(item => item.letter === letter);
      if (soundIndex !== -1) {
        if (sound && sound.isPlaying()) {
          sound.stop();
        }
        currentSoundIndex = soundIndex;
        sound = playlist[currentSoundIndex].sound;
        sound.loop();

        // Update the character's appearance based on the new song
        dancingCharacter.updateAppearance(currentSoundIndex);
      } else if (keycode >= 49 && keycode <= 57) { // Keys 1-9 for visualizations
        var visNumber = keycode - 49;
        if (visNumber < vis.visuals.length) {
          vis.selectVisual(vis.visuals[visNumber].name);
        }
      }
    }
  };

 this.draw = function() {
  push();
  fill("white");
  stroke("black");
  strokeWeight(2);
  textSize(34);

  // Playback button
  this.playbackButton.draw();

  if (this.menuDisplayed) {
    text("Select a visualisation:", 100, 30);
    this.menu();
    this.drawPlaylist();
  }
  pop();

  // Calculate the Y position for the dancing character to align with the selected sound
  let selectedY = 100 + 40 * currentSoundIndex; // Y position of the selected sound

  // Move the dancing character to the right of the playlist
  dancingCharacter.x = windowWidth - 250; // Adjust x position (right of the playlist)
  dancingCharacter.y = selectedY; // Align with the Y position of the selected sound
  dancingCharacter.draw();
};

this.menu = function() {
  for (var i = 0; i < vis.visuals.length; i++) {
    text(i + 1 + ": " + vis.visuals[i].name, 90, 60 * i + 60);
  }
};

this.drawPlaylist = function() {
  textSize(24);
  textAlign(CENTER, CENTER);
  fill("white");
  text("Playlist", windowWidth - 400, 50);

  for (var i = 0; i < playlist.length; i++) {
    var y = 100 + 40 * i;
    var fileName = playlist[i].file.replace('assets/', '');
    var isSelected = (i === currentSoundIndex);

    fill(isSelected ? '#ffcc00' : '#333333');
    rect(windowWidth - 550, y - 20, 300, 30, 10);

    fill(isSelected ? 'black' : 'white');
    textSize(18);
    textAlign(CENTER, CENTER);
    text(playlist[i].letter + ": " + fileName, windowWidth - 400, y);
  }
};

}
