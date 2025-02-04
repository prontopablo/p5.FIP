## p5.FIP (Fast Image Processing)
> Real-time image processing library for [p5.js](https://p5js.org/).

> [日本語チュートリアル。](https://qiita.com/youtoy/items/2b670ea176d9b126ae0d)

## What is it?
p5.FIP is a library that allows you to add image processing/post-processing effects to your p5.js sketch. In 5 lines of code you can add effects like bloom, glitching, cartoon shading and many more.

<iframe width="610" height="650" src="https://editor.p5js.org/prontopablo/full/2-UYUk2qP"></iframe>
_Left and right arrow keys cycle filters, up and down arrow keys cycle images._

## Features
- 44 Effects
- Hardware Accelerated
- Documented

## Getting Started

To use p5.FIP you can include it in your index.html file:
```html hl_lines="3"
    <head>
    <!-- ...-->
    <script src="https://prontopablo.github.io/p5.FIP/assets/javascripts/p5.FIP.js"></script>
    <!-- ...-->
    </head>
```
Alternatively you can download the p5.FIP.js file from [releases](https://github.com/prontopablo/p5.FIP/releases) and bring it into your project files:
``` html hl_lines="3"
    <head>
    <!-- ...-->
    <script src="p5.FIP.js"></script>
    <!-- ...-->
    </head>
```

The reference for each shader can be found in the sidebar of this website.

## Examples
Example sketches can be found in this collection [here](https://editor.p5js.org/prontopablo/collections/MA4R8jvck) and they are also included in the [examples folder](https://github.com/prontopablo/p5.FIP/tree/main/examples) on GitHub. 

## p5.js Library Guidelines
In accordance with the [p5.js library guidelines](https://github.com/processing/p5.js/blob/main/contributor_docs/creating_libraries.md):

1. p5.FIP has no dependencies.
3. [Examples](https://github.com/prontopablo/p5.FIP/tree/main/examples) are included.
4. p5.FIP is open source. [Source Code](https://github.com/prontopablo/p5.FIP/).
5. Keywords: _image-processing, post-processing, filters_.
6. Last update: 03/02/25.

## Contributing
I welcome contributions from the community to make p5.FIP better. If you have any suggestions, bug fixes, or new features to add, feel free to create a [pull request](https://github.com/prontopablo/p5.FIP/pulls).

## Acknowledgments
Many of these shaders were adapted from existing solutions in other programming languages, in these cases, the links to the original shaders or tutorials followed can be found at the top of each shader.

A list of existing Processing image processing libraries can be found [here](./resources.md).
