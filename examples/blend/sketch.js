/* 
   Example sketch demonstrating the blend filter in FIP. 
   Press any key to cycle through blending modes.
*/

let layer1, layer2,
  ireland,
  bird,
  blend,
  blendingModeIndex = 0;

  function preload(){
    ireland = loadImage("ireland.jpg");
    bird = loadImage("bird.jpg");
  }
  
  function setup() {
      createCanvas(600, 600, WEBGL); // Enable WEBGL mode for shaders
  
      blend = createFilterShader(fip.blend); // Load the blend shader
  
      // Create 2 framebuffers so we can control which textures are sent to the shaders
      layer1 = createFramebuffer();
      layer2 = createFramebuffer();
  
      console.log("Press any key to cycle through blending modes.");
  }
  
  function draw() {
      background(0);
      imageMode(CENTER);
    
      layer1.begin();
      image(ireland, 0, 0, width, height);
      layer1.end();
  
      layer2.begin();
      image(bird, 0, 0, width, height);
      layer2.end();
    
      // Send our two textures to the shader
      blend.setUniform('texture1', layer1.color);
      blend.setUniform('texture2', layer2.color);
      blend.setUniform("uTextureSize", [width, height]);
      blend.setUniform('mixFactor', 0.5);
      blend.setUniform('blendingMode', blendingModeIndex);
    
      // Apply the blend shader
      filter(blend);
    
      noLoop();
  }
  
  function keyPressed() {
      // Cycle through blending modes when a key is pressed
      blendingModeIndex = (blendingModeIndex + 1) % 14; // 14 types of blending
      console.log("Blending Mode: " + blendingModeIndex);
      loop();
  }