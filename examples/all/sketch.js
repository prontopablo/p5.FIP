/* 
   Example sketch to show how the all of the filters works in FIP. 
   Left and right arrow keys cycle filters, up and down arrow keys cycle images.
*/

let layer, layer1, layer2,
  ireland,
  bird,
  currentShaderIndex = 24,
  currentImageIndex = 0,
  images = [],
  customShaders = [];

let shaderNames = ["Anti-Aliasing", "Bilateral Filter", "Blend", "Bloom", "Box Blur", "Brightness", "Canny Edge Detection", "Cartoon", "Contrast", "CRT", "Deform", "Difference of Gaussian", "Dilate", "Dithering", "Dot", "Duo-tone", "Edge-Preserving Smooth", "Emboss", "Erosion", "Flip", "Gamma", "Gaussian Blur", "Glitch", "Grayscale", "Halftone", "Invert Colors", "Kuwahara", "Laplacian Edge Enhancement", "Linocut", "Mosaic", "Motion Blur", "Pixelate", "Quantization", "Ripple", "Rotate", "Saturation", "Sepia", "Sharpen", "Sketch",  "Sobel Edge Detection", "Solarize", "Static", "Threshold", "Unsharp Masking", "Vignette"];

function preload() {
    // Load the shaders during preload
    customShaders.push(createShader(fip.defaultVert, fip.antiAliasing));
    customShaders.push(createShader(fip.defaultVert, fip.bilateral));
    customShaders.push(createShader(fip.defaultVert, fip.blend));
    customShaders.push(createShader(fip.defaultVert, fip.bloom));
    customShaders.push(createShader(fip.defaultVert, fip.boxBlur));
    customShaders.push(createShader(fip.defaultVert, fip.brightness));
    customShaders.push(createShader(fip.defaultVert, fip.cannyEdgeDetection));
    customShaders.push(createShader(fip.defaultVert, fip.cartoon));
    customShaders.push(createShader(fip.defaultVert, fip.contrast));
    customShaders.push(createShader(fip.defaultVert, fip.crt));
    customShaders.push(createShader(fip.defaultVert, fip.deform));
    customShaders.push(createShader(fip.defaultVert, fip.differenceOfGaussian));
    customShaders.push(createShader(fip.defaultVert, fip.dilate));
    customShaders.push(createShader(fip.defaultVert, fip.dithering));
    customShaders.push(createShader(fip.defaultVert, fip.dot));
    customShaders.push(createShader(fip.defaultVert, fip.duoTone));
    customShaders.push(createShader(fip.defaultVert, fip.edgePreservingSmooth));
    customShaders.push(createShader(fip.defaultVert, fip.emboss));
    customShaders.push(createShader(fip.defaultVert, fip.erosion));
    customShaders.push(createShader(fip.defaultVert, fip.flip));
    customShaders.push(createShader(fip.defaultVert, fip.gamma));
    customShaders.push(createShader(fip.defaultVert, fip.gaussianBlur));
    customShaders.push(createShader(fip.defaultVert, fip.glitch));
    customShaders.push(createShader(fip.defaultVert, fip.grayscale));
    customShaders.push(createShader(fip.defaultVert, fip.halftone));
    customShaders.push(createShader(fip.defaultVert, fip.invertColors));
    customShaders.push(createShader(fip.defaultVert, fip.kuwahara));
    customShaders.push(createShader(fip.defaultVert, fip.laplacianEdgeEnhancement));
    customShaders.push(createShader(fip.defaultVert, fip.linocut));
    customShaders.push(createShader(fip.defaultVert, fip.moasic));
    customShaders.push(createShader(fip.defaultVert, fip.motionBlur));
    customShaders.push(createShader(fip.defaultVert, fip.pixelate));
    customShaders.push(createShader(fip.defaultVert, fip.quantization));
    customShaders.push(createShader(fip.defaultVert, fip.ripple));
    customShaders.push(createShader(fip.defaultVert, fip.rotate));
    customShaders.push(createShader(fip.defaultVert, fip.saturation));
    customShaders.push(createShader(fip.defaultVert, fip.sepia));
    customShaders.push(createShader(fip.defaultVert, fip.sharpen));
    customShaders.push(createShader(fip.defaultVert, fip.sketch));
    customShaders.push(createShader(fip.defaultVert, fip.sobelEdgeDetection));
    customShaders.push(createShader(fip.defaultVert, fip.solarize));
    customShaders.push(createShader(fip.defaultVert, fip.static));
    customShaders.push(createShader(fip.defaultVert, fip.threshold));
    customShaders.push(createShader(fip.defaultVert, fip.unsharpMasking));
    customShaders.push(createShader(fip.defaultVert, fip.vignette));
    
    // Load the images during preload
    images[0] = loadImage("../images/ireland.jpg");
    images[1] = loadImage("../images/bird.jpg");
}

function setup() {
    createCanvas(600, 600, WEBGL);
    layer = createFramebuffer();
    layer1 = createFramebuffer();
    layer2 = createFramebuffer();
    noStroke();

    console.log("Press the left and right arrow keys to change the shader.");
    console.log("Press the up and down arrow keys to change the image.");
    console.log("Current shader: " + shaderNames[currentShaderIndex]);
}
  
function draw() {
    background(0);
    
    // Draw a scene to a framebuffer
    layer.begin();
    clear();
    lights();
    scale(1, -1);
    image(images[currentImageIndex], -width / 2, -height / 2, width, height);
    layer.end();
    
    // Create a second framebuffer for blending
    layer1.begin();
    clear();
    lights();
    scale(1, -1);
    image(images[0], -width / 2, -height / 2, width, height);
    layer1.end();
    
    // Create a third framebuffer for blending
    layer2.begin();
    clear();
    lights();
    scale(1, -1);
    image(images[1], -width / 2, -height / 2, width, height);
    layer2.end();
    
    // Apply the shader
    shader(customShaders[currentShaderIndex]);

    // Set the uniforms for the shaders
    switch (currentShaderIndex) {
        case 0:
            customShaders[currentShaderIndex].setUniform('strength', 0.9); // Anti-Aliasing
            break;
        case 1:
            customShaders[currentShaderIndex].setUniform('sigmaSpace', 1.0); // Bilateral
            customShaders[currentShaderIndex].setUniform('sigmaColor', 0.8);
            break;
        case 2:
            customShaders[currentShaderIndex].setUniform('texture1', layer1.color); // Blend
            customShaders[currentShaderIndex].setUniform('texture2', layer2.color);
            customShaders[currentShaderIndex].setUniform('mixFactor', 0.5);
            customShaders[currentShaderIndex].setUniform('blendingMode', 0);
            break;
        case 3:
            customShaders[currentShaderIndex].setUniform('intensity', 0.8); // Bloom
            customShaders[currentShaderIndex].setUniform('glow', 1.0);
            break;
        case 4:
            customShaders[currentShaderIndex].setUniform('blurRadius', 3); // Box Blur
            break;
        case 5:
            customShaders[currentShaderIndex].setUniform('brightness', 2.1); // Brightness
            break;
        case 6:
            customShaders[currentShaderIndex].setUniform('thresholdLow', 0.1);  // Canny Edge Detection
            customShaders[currentShaderIndex].setUniform('thresholdHigh', 0.3);
            break;
        case 7:
            customShaders[currentShaderIndex].setUniform('edgeThreshold', 0.1); // Cartoon
            break;
        case 8:
            customShaders[currentShaderIndex].setUniform('contrast', 2.0); // Contrast
            break;
        case 9:
            customShaders[currentShaderIndex].setUniform('thresholdLow', 0.1); // CRT
            customShaders[currentShaderIndex].setUniform('thresholdHigh', 0.3);
            customShaders[currentShaderIndex].setUniform('scanlineWeight', 0.1);
            customShaders[currentShaderIndex].setUniform('brightness', 2.5);
            customShaders[currentShaderIndex].setUniform('distortion', 0.02);
            break;
        case 10:
            customShaders[currentShaderIndex].setUniform('deformationAmount', 0.1); // Deform
            break;
        case 11:
            customShaders[currentShaderIndex].setUniform('radius1', 1.0); // Difference of Gaussian
            customShaders[currentShaderIndex].setUniform('radius2', 2.0);
            break;
        case 13:
            customShaders[currentShaderIndex].setUniform('threshold', 1.0); // Dithering 
            break;
        case 14:
            customShaders[currentShaderIndex].setUniform('dotSize', 0.008); // Dot
            break;
        case 15:
            customShaders[currentShaderIndex].setUniform('tone1', [0.8627, 0.6275, 0.0]); // Duo-tone
            customShaders[currentShaderIndex].setUniform('tone2', [0.4157, 0.0118, 0.5647]);
            break;
        case 16:
            customShaders[currentShaderIndex].setUniform('threshold', 0.2); // Edge-Preserving Smooth
            break;
        case 19:
            customShaders[currentShaderIndex].setUniform("flipHorizontal", true); // Flip
            customShaders[currentShaderIndex].setUniform("flipVertical", true);
            break;
        case 20:
            customShaders[currentShaderIndex].setUniform('gamma', 2.2); // Gamma
            break;
        case 22:
            customShaders[currentShaderIndex].setUniform('glitchIntensity', 0.8); // Glitch
            break;
        case 24:
            customShaders[currentShaderIndex].setUniform('cellSize', 4.0); // Halftone
            customShaders[currentShaderIndex].setUniform('threshold', 0.2);
            break;
        case 27:
            customShaders[currentShaderIndex].setUniform('amount', 5.5); // Laplacian Edge Enhancement
            break;
        case 28:
            customShaders[currentShaderIndex].setUniform('threshold', 0.4); // Linocut
            customShaders[currentShaderIndex].setUniform('inkColor', [0.4, 0.4, 1.0]);
            customShaders[currentShaderIndex].setUniform('paperColor', [1.0, 1.0, 1.0]);
            break;
        case 29:
            customShaders[currentShaderIndex].setUniform('mosaicSize', 12.0); // Mosaic
            break;
        case 31:
            customShaders[currentShaderIndex].setUniform('pixelSize', 0.01); // Pixelate
            break;
        case 32:
            customShaders[currentShaderIndex].setUniform('shades', 4.0); // Quantization
            break;
        case 33:
            customShaders[currentShaderIndex].setUniform('rippleFrequency', 50.0); // Ripple
            customShaders[currentShaderIndex].setUniform('rippleAmplitude', 0.01);
            break;
        case 34:
            customShaders[currentShaderIndex].setUniform("rotationAngle", -45); // Rotate
            break;
        case 35:
            customShaders[currentShaderIndex].setUniform('saturation', 5.5);  // Saturation
            break;
        case 37:
            customShaders[currentShaderIndex].setUniform('sharpness', 1.5); // Sharpen
            break;
        case 38:
            customShaders[currentShaderIndex].setUniform('threshold', 0.2); // Sketch
            customShaders[currentShaderIndex].setUniform('stippleDensity', 0.99);
            break;
        case 39:
            customShaders[currentShaderIndex].setUniform('threshold', 0.2); // Sobel Edge Detection
            break;
        case 40:
            customShaders[currentShaderIndex].setUniform('threshold', 0.5); // Solarize
            break;
        case 41:
            customShaders[currentShaderIndex].setUniform('threshold', 0.2); // Static
            customShaders[currentShaderIndex].setUniform('stippleDensity', 0.99);
            break;
        case 42:
            customShaders[currentShaderIndex].setUniform('threshold', 0.5);  // Threshold
            break;
        case 43:
            customShaders[currentShaderIndex].setUniform('strength', 2.0); // Unsharp Masking
            break;
        case 44:
            customShaders[currentShaderIndex].setUniform('vignetteStrength', 0.3); // Vignette      
            customShaders[currentShaderIndex].setUniform('vignetteFalloff', 1.0);
            customShaders[currentShaderIndex].setUniform('vignetteSign', 1.0);
            customShaders[currentShaderIndex].setUniform('vignetteSize', 1.0);
            break;
        default:
            break;
    }
    
    // Uniforms that most shaders need
    customShaders[currentShaderIndex].setUniform("texture", layer.color);
    customShaders[currentShaderIndex].setUniform('resolution', [width, height]);
    customShaders[currentShaderIndex].setUniform('uTextureSize', [width, height]);

    rect(0, 0, width, height);
    resetShader();
}

function keyPressed(){
    if (keyCode == RIGHT_ARROW){
        currentShaderIndex ++;
        if (currentShaderIndex >= customShaders.length){
            currentShaderIndex = 0;
        }
        console.log("Current shader: " + shaderNames[currentShaderIndex]);
    } else if (keyCode == LEFT_ARROW){
        currentShaderIndex --;
        if (currentShaderIndex < 0){
            currentShaderIndex = customShaders.length - 1;
        }
        console.log("Current shader: " + shaderNames[currentShaderIndex]);
    } else if (keyCode == UP_ARROW){
      currentImageIndex ++;
      if (currentImageIndex >= images.length){
        currentImageIndex = 0;
      }
    } else if (keyCode == DOWN_ARROW){
        currentImageIndex --;
        if (currentImageIndex < 0){
            currentImageIndex = images.length - 1;
        }
    }
}
  
