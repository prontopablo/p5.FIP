# Issues
Below are some common issues people have when using p5.FIP and how to resolve them. If your issue is not listed below, please report it [here](https://github.com/prontopablo/p5.FIP/issues) and I'll try to help you or fix it.

## Out of date graphics drivers
As p5.FIP runs GLSL shaders on the GPU, make sure you update to the latest graphics drivers for your GPU ([how?](https://www.youtube.com/watch?v=NBiJSPd_K4g)), otherwise you may see some visual glitches.

## Not passing textures
Some shaders have required parameters and will not work if these parameters are not passed into them. Below we use the _blend_ shader but fail to pass it the textures we want to blend, so it does nothing.

```javascript hl_lines="36 37"
let layer1, layer2,
  ireland,
  bird,
  blend;

function preload() {
    blend = createShader(fip.defaultVert, fip.blend);
    ireland = loadImage("ireland.jpg");
    bird = loadImage("bird.jpg");
}

function setup() {
    createCanvas(600, 600, WEBGL);
    layer1 = createFramebuffer();
    layer2 = createFramebuffer();
}
  
function draw() {
    background(0);

    layer1.begin();
    clear();
    scale(1, -1); 
    image(ireland, -width / 2, -height / 2, width, height);
    layer1.end();

    layer2.begin();
    clear();
    scale(1, -1);
    image(bird, -width / 2, -height / 2, width, height);
    layer2.end();
    
    shader(blend);

    blend.setUniform('blendingMode', 0);
    // blend.setUniform("texture1", layer1.color); - Blend requires 2 textures to be passed into it.
    // blend.setUniform("texture2", layer2.color); 
    blend.setUniform("mixFactor", 0.5);

    rect(0, 0, width, height);
    resetShader(); 
}
```

<div style="display: flex;">
    <div style="margin-right: 5px;">
        <img width="400" height="400" src="./images/blackScreen.jpg">
        <figcaption>Required parameters not set, shader does nothing </figcaption>
    </div>
    <div>
        <img width="400" height="400" src="./images/irelandBlend.jpg">
        <figcaption>Image when textures are passed</figcaption>
    </div>
</div>
