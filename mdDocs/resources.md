As I've developed p5.FIP I've realised there is a lack of documentation for p5.js and Processing shaders. Below is a list of useful resources grouped by category.

## Learning about p5.js / Processing shaders
- If you're writing shaders for Processing, I would highly recommend [this archived tutorial](https://web.archive.org/web/20210117181532/https://processing.org/tutorials/pshader/). 

- Learn about [createFilterShader](https://p5js.org/reference/p5/createFilterShader/).

- The replies to [this Reddit post](https://www.reddit.com/r/processing/comments/ritpd8/shaders_in_processing/) list various resources and examples.

- [This Stack Overflow thread](https://stackoverflow.com/questions/38384768/processing-fragment-shader-not-displaying-anything) goes over some troubleshooting.

- What's the [difference between shader() and filter()](https://forum.processing.org/one/topic/filer-vs-shader.html )?

## Processing vs. p5.js shaders
- Processing uses "full OpenGL" but uses the specifications of OpenGL ES. 

- [p5.js](https://p5js.org/) uses WebGL which is a JavaScript API based on GL_ES. WebGL is specifically designed to work within web browsers and is a subset of the full OpenGL specification.
The GL_ES (OpenGL ES) variant is suitable for embedded systems, such as mobile devices, and is commonly used in web development.

## Other Processing shader projects
- [Processing Shader Examples](https://github.com/genekogan/Processing-Shader-Examples/?tab=readme-ov-file)
- [PixelFlow](https://github.com/diwi/PixelFlow)
- [Compute Shader](https://github.com/ElementMo/ComputeShader)
- [Processing Image Processing](https://github.com/Milchreis/processing-imageprocessing)
- [Filters4Processing](https://github.com/SableRaf/Filters4Processing)
- [Lygia](https://lygia.xyz/)