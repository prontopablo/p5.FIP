/* 
   Example sketch to show all filters/effects in FIP. 
   Use LEFT/RIGHT arrow keys to cycle filters.
   Use UP/DOWN arrow keys to cycle images.
   For a simpler tutorial, check out the "glitch" or "motionBlur" examples.
*/

let layer, layer1, layer2;
let currentShaderIndex = 38;
let currentImageIndex = 0;
let images = [];
let customShaders = [];

// Shader names for reference in console logs
const shaderNames = [
  "Anti-Aliasing", "Bilateral Filter", "Blend", "Bloom", "Box Blur", 
  "Brightness", "Canny Edge Detection", "Cartoon", "Contrast", "CRT", 
  "Deform", "Difference of Gaussian", "Dilate", "Dithering", "Dot", 
  "Duo-tone", "Edge-Preserving Smooth", "Emboss", "Erosion", "Flip", 
  "Gamma", "Gaussian Blur", "Glitch", "Grayscale", "Halftone", 
  "Invert Colors", "Kuwahara", "Laplacian Edge Enhancement", "Linocut", 
  "Mosaic", "Motion Blur", "Pixelate", "Quantization", "Ripple", 
  "Rotate", "Saturation", "Sepia", "Sharpen", "Sketch", "Sobel Edge Detection", 
  "Solarize", "Static", "Threshold", "Unsharp Masking", "Vignette"
];

function preload() {
  // Load shaders from fip object (excluding default vertex shader)
  customShaders = Object.keys(fip)
    .map(key => createFilterShader(fip[key]));

  // Load sample images
  images = [
    loadImage("ireland.jpg"), 
    loadImage("bird.jpg")
  ];
}

function setup() {
  createCanvas(600, 600, WEBGL);
  layer = createFramebuffer();
  layer1 = createFramebuffer();
  layer2 = createFramebuffer();

  console.log("Use arrow keys: Left/Right for shaders, Up/Down for images.");
  console.log(`Current shader: ${shaderNames[currentShaderIndex]}`);
}
  
function draw() {
    background(0);
    
    // Render the current image to the main framebuffer. What you want to draw goes between begin and end)
    layer.begin();
    scale(1, -1);
    image(images[currentImageIndex], -width / 2, -height / 2, width, height);
    layer.end();
    
    // Handle special case for blend effects
    if (currentShaderIndex === 2) {
        layer1.begin();
        scale(1, -1);
        image(images[0], -width / 2, -height / 2, width, height);
        layer1.end();

        layer2.begin();
        scale(1, -1);
        image(images[1], -width / 2, -height / 2, width, height);
        layer2.end();
    }

    // Apply the selected shader
    let currentShader = customShaders[currentShaderIndex];  
    filter(currentShader);
  
    // Apply specific shader uniforms (play around with values here!)
    switch (currentShaderIndex) {
        case 0:
            currentShader.setUniform('strength', 0.9); // Anti-Aliasing
            break;
        case 1:
            currentShader.setUniform('sigmaSpace', 1.0); // Bilateral
            currentShader.setUniform('sigmaColor', 0.8);
            break;
        case 2:
            currentShader.setUniform('texture1', layer1.color); // Blend
            currentShader.setUniform('texture2', layer2.color);
            currentShader.setUniform('mixFactor', 0.5);
            currentShader.setUniform('blendingMode', 0);
            break;
        case 3:
            currentShader.setUniform('intensity', 0.8); // Bloom
            currentShader.setUniform('glow', 1.0);
            break;
        case 4:
            currentShader.setUniform('blurRadius', 3); // Box Blur
            break;
        case 5:
            currentShader.setUniform('brightness', 2.1); // Brightness
            break;
        case 6:
            currentShader.setUniform('thresholdLow', 0.1);  // Canny Edge Detection
            currentShader.setUniform('thresholdHigh', 0.3);
            break;
        case 7:
            currentShader.setUniform('edgeThreshold', 0.1); // Cartoon
            break;
        case 8:
            currentShader.setUniform('contrast', 2.0); // Contrast
            break;
        case 9:
            currentShader.setUniform('thresholdLow', 0.1); // CRT
            currentShader.setUniform('thresholdHigh', 0.3);
            currentShader.setUniform('scanlineWeight', 0.1);
            currentShader.setUniform('brightness', 2.5);
            currentShader.setUniform('distortion', 0.02);
            break;
        case 10:
            currentShader.setUniform('deformationAmount', 0.1); // Deform
            break;
        case 11:
            currentShader.setUniform('radius1', 1.0); // Difference of Gaussian
            currentShader.setUniform('radius2', 2.0);
            break;
        case 13:
            currentShader.setUniform('threshold', 1.0); // Dithering 
            break;
        case 14:
            currentShader.setUniform('dotSize', 0.008); // Dot
            break;
        case 15:
            currentShader.setUniform('tone1', [0.8627, 0.6275, 0.0]); // Duo-tone
            currentShader.setUniform('tone2', [0.4157, 0.0118, 0.5647]);
            break;
        case 16:
            currentShader.setUniform('threshold', 0.2); // Edge-Preserving Smooth
            break;
        case 19:
            currentShader.setUniform("flipHorizontal", true); // Flip
            currentShader.setUniform("flipVertical", true);
            break;
        case 20:
            currentShader.setUniform('gamma', 2.2); // Gamma
            break;
        case 22:
            currentShader.setUniform('glitchIntensity', 0.8); // Glitch
            break;
        case 24:
            currentShader.setUniform('cellSize', 4.0); // Halftone
            currentShader.setUniform('threshold', 0.2);
            break;
        case 27:
            currentShader.setUniform('amount', 5.5); // Laplacian Edge Enhancement
            break;
        case 28:
            currentShader.setUniform('threshold', 0.4); // Linocut
            currentShader.setUniform('inkColor', [0.4, 0.4, 1.0]);
            currentShader.setUniform('paperColor', [1.0, 1.0, 1.0]);
            break;
        case 29:
            currentShader.setUniform('mosaicSize', 12.0); // Mosaic
            break;
        case 31:
            currentShader.setUniform('pixelSize', 0.01); // Pixelate
            break;
        case 32:
            currentShader.setUniform('shades', 4.0); // Quantization
            break;
        case 33:
            currentShader.setUniform('rippleFrequency', 50.0); // Ripple
            currentShader.setUniform('rippleAmplitude', 0.01);
            break;
        case 34:
            currentShader.setUniform("rotationAngle", -45); // Rotate
            break;
        case 35:
            currentShader.setUniform('saturation', 5.5);  // Saturation
            break;
        case 37:
            currentShader.setUniform('sharpness', 1.5); // Sharpen
            break;
        case 38:
            currentShader.setUniform('threshold', 0.2); // Sketch
            currentShader.setUniform('stippleDensity', 0.99);
            break;
        case 39:
            currentShader.setUniform('threshold', 0.2); // Sobel Edge Detection
            break;
        case 40:
            currentShader.setUniform('threshold', 0.5); // Solarize
            break;
        case 41:
            currentShader.setUniform('threshold', 0.2); // Static
            currentShader.setUniform('stippleDensity', 0.99);
            break;
        case 42:
            currentShader.setUniform('threshold', 0.5);  // Threshold
            break;
        case 43:
            currentShader.setUniform('strength', 2.0); // Unsharp Masking
            break;
        case 44:
            currentShader.setUniform('vignetteStrength', 0.3); // Vignette      
            currentShader.setUniform('vignetteFalloff', 1.0);
            currentShader.setUniform('vignetteSign', 1.0);
            currentShader.setUniform('vignetteSize', 1.0);
            break;
        default:
            break;
    }
  
    // Rectangle to cover the screen so we can apply our framebuffer
    rect(0, 0, width, height);
    resetShader(); // Reset the shader each frame
}

// Handle keyboard input to cycle shaders and images
function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    currentShaderIndex = (currentShaderIndex + 1) % customShaders.length;
  } else if (keyCode === LEFT_ARROW) {
    currentShaderIndex = (currentShaderIndex - 1 + customShaders.length) % customShaders.length;
  } else if (keyCode === UP_ARROW) {
    currentImageIndex = (currentImageIndex + 1) % images.length;
  } else if (keyCode === DOWN_ARROW) {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
  }
  console.log(`Current shader: ${shaderNames[currentShaderIndex]}`);
}
  