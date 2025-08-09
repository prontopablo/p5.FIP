## p5.FIP (Fast Image Processing)
> Real-time image processing library for [p5.js](https://p5js.org/).

> [日本語チュートリアル。](https://qiita.com/youtoy/items/2b670ea176d9b126ae0d)

## What is it?
p5.FIP is a library that allows you to add image processing/post-processing effects to your p5.js sketch. In 5 lines of code you can add effects like bloom, glitching, cartoon shading and many more.

<div style="display: flex; justify-content: center">
        <div>
        <img width="400" height="400" src="./examples/images/p5.FIPLogo.jpg">
        </div>
</div>

## Features
- 44 Effects
- Hardware Accelerated
- Documented

## Getting Started

> [!IMPORTANT]
> This library is for **p5.js**. If you are using _Processing_ instead, head [here](https://github.com/prontopablo/FIP).

To use p5.FIP you can include it in your index.html file:
```html
    <head>
    <!-- ...-->
    <script src="https://prontopablo.github.io/p5.FIP/assets/javascripts/p5.FIP.js"></script>
    <!-- ...-->
    </head>
```
Alternatively you can download the p5.FIP.js file from [releases](https://github.com/prontopablo/p5.FIP/releases) and bring it into your project files:
``` html
    <head>
    <!-- ...-->
    <script src="p5.FIP.js"></script>
    <!-- ...-->
    </head>
```
The reference website can be found [here](https://prontopablo.github.io/p5.FIP/).

> [!WARNING]
> If you are using noLoop(), images should be loaded in preload() instead. Also, the shader parameters should be set before calling filter(). These two issues will only rear their head if you are using noLoop(). 

## Examples
Example sketches can be found in this collection [here](https://editor.p5js.org/prontopablo/collections/MA4R8jvck) and they are also included in the [examples folder](https://github.com/prontopablo/p5.FIP/tree/main/examples) on GitHub.
kfahn22 made an [abstract art example](https://openprocessing.org/sketch/2615936) by combining the pixelate and ripple filters.
<h3> Here's an example showing how to apply motion blur to an image: </h3>

```js
let ireland, motionBlur;

function setup() {
  createCanvas(600, 600, WEBGL); // Use WEBGL mode to use shaders
  motionBlur = createFilterShader(fip.motionBlur); // Load the motion blur shader
  ireland = loadImage("ireland.jpg");
}
  
function draw() {
  background(255);
  imageMode(CENTER);
  image(ireland, 0, 0, width, height);
    
  // Apply the shader
  filter(motionBlur);
}  
```
> [!IMPORTANT]  
> The most recent release of p5.FIP changed how textures work. Now the entire canvas is the default texture. However, if we wanted to only pass a specific texture to our shader, we could use a _framebuffer_ - see the [blend example](https://editor.p5js.org/prontopablo/sketches/AoeQAXAap) for details.

## Repository Structure
- _p5.FIP.js:_ Shader code itself. This is where the actual functionality of the library is.
- _docs:_ Reference website code that has been generated using [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/) from MarkDown files.
- _mdDocs:_ Markdown files for the reference website. Much more human-readable than the files found in the _docs_ folder, should the reference website no longer be live.
- _examples:_ Examples showing how to use p5.FIP, just in case the p5.js collection examples no longer work.

## p5.js Library Guidelines
In accordance with the [p5.js library guidelines](https://github.com/processing/p5.js/blob/main/contributor_docs/creating_libraries.md):

1. p5.FIP has no dependencies.
3. [Examples](https://github.com/prontopablo/p5.FIP/tree/main/examples) are included.
4. p5.FIP is open source.
5. Keywords: _image-processing, post-processing, filters_.
6. Last update: 28/04/25.

## Contributing
I welcome contributions from the community to make p5.FIP better. If you have any suggestions, bug fixes, or new features to add, feel free to create a [pull request](https://github.com/prontopablo/p5.FIP/pulls).

## Acknowledgments
♥️ Thank you to [epibyte](https://github.com/epibyte) and [SableRaf](https://github.com/SableRaf) for spotting the first frame issue with the example sketches.

Many of these shaders were adapted from existing solutions in other programming languages, in these cases, the links to the original shaders or tutorials followed can be found at the top of each shader.

A list of existing Processing image processing libraries can be found [here](https://prontopablo.github.io/p5.FIP/resources).
