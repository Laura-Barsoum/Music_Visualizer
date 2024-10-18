//global for the controls and input 
var controls = null;
//store visualisations in a container
var vis = null;
//variable for the p5 sound object
var sound = null;
//variable for p5 fast fourier transform
var fourier;
var playlist = [
  { file: 'assets/stomper_reggae_bit.mp3', letter: 'A' },
  { file: 'assets/lotus-sky-dreams-216049.mp3', letter: 'B' },
  { file: 'assets/sunlit-whistle-200168.mp3', letter: 'C' },
];
var currentSoundIndex = 0; // Index of the current sound in the playlist

function preload(){
  // Load all sound files into the playlist array
  playlist.forEach(function(soundFile) {
    soundFile.sound = loadSound(soundFile.file);
  });
}

function setup(){
   createCanvas(windowWidth, windowHeight);
   background(0);
   controls = new ControlsAndInput();
 dancingCharacter = new DancingCharacter(); // Initialize the character
   // instantiate the fft object
   fourier = new p5.FFT();

   // create a new visualisation container and add visualisations
   vis = new Visualisations();
   vis.add(new Spectrum());
   vis.add(new WavePattern());
   vis.add(new Needles());
   vis.add(new DJHeadphones(fourier)); 
   vis.add(new DynamicElements(fourier));
   vis.add(new RadialVisualization(fourier, new p5.Amplitude()));
   vis.add(new KaleidoscopeVisualization(fourier));
   vis.add(new FractalTreeVisualization(fourier));
   vis.add(new ParticlesVisualization(fourier, new p5.Amplitude()));
    
   // Start with the sound paused
   sound = playlist[currentSoundIndex].sound;
   sound.pause();
}

function draw(){
  background(0);
  //draw the selected visualisation
  vis.selectedVisual.draw();
    // Update and draw the dancing character
  dancingCharacter.update(); // Ensure update is called
  dancingCharacter.draw(); 
    //draw the controls on top.
  controls.draw();
   
}

function mouseClicked(){
  controls.mousePressed();
}

function keyPressed() {
  controls.keyPressed(keyCode); // Call the keyPressed function in your ControlsAndInput object
}

//when the window has been resized. Resize canvas to fit 
//if the visualisation needs to be resized call its onResize method
function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
  if(vis.selectedVisual.hasOwnProperty('onResize')){
    vis.selectedVisual.onResize();
  }
}