## p5.FIP (Fast Image Processing)
> Real-time image processing library for [p5.js](https://p5js.org/).

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
> This library is for **p5.js**. If you are using _Processing_ instead, head [here](https://github.com/prontopablo/FIP).

## Examples
Example sketches can be found in this collection [here](https://editor.p5js.org/prontopablo/collections/MA4R8jvck) and they are also included in the [examples folder](https://github.com/prontopablo/p5.FIP/tree/main/examples) on GitHub.

<h3> Here's an example showing how to apply motion blur to an image: </h3>

```js
let ireland, motionBlur;

function preload() {
    motionBlur = createShader(fip.defaultVert, fip.motionBlur); // Load the  motion blur shader
    ireland = loadImage("ireland.jpg");
}

function setup() {
    createCanvas(600, 600, WEBGL); // Use WEBGL mode to use the shader
}
  
function draw() {
    background(0);

    motionBlur.setUniform("texture", ireland); // Set the texture to apply the shader to
    motionBlur.setUniform('uTextureSize', [width, height]); // Set the size of the texture

    filter(motionBlur); // Apply the shader
}  
```
> [!IMPORTANT]  
> We need to pass a texture to our shader. In the above example we can just pass the image as a texture. However, if we wanted to draw anything else, such as an ellipse, we would need to put it inside a _PGraphics_ - see the [blur example](https://editor.p5js.org/prontopablo/sketches/AoeQAXAap) for details.

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
6. Last update: 20/11/24.

## Contributing
I welcome contributions from the community to make p5.FIP better. If you have any suggestions, bug fixes, or new features to add, feel free to create a [pull request](https://github.com/prontopablo/p5.FIP/pulls).

## Acknowledgments
Many of these shaders were adapted from existing solutions in other programming languages, in these cases, the links to the original shaders or tutorials followed can be found at the top of each shader.

A list of existing Processing image processing libraries can be found [here](https://prontopablo.github.io/p5.FIP/resources).
