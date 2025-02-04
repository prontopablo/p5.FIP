Applies a sharpening effect to the input texture using a convolution kernel. It calculates the sharpened color of each pixel by enhancing the details in the center pixel and subtracting a fraction of the neighboring pixels.

## Parameters
`tex0` **Texture**: The input texture to be filtered. Default: **`The entire canvas`**
<br>
`canvasSize` **Vec2:** The size of the texture used for sampling neighboring pixels. Default: **`The entire canvas`**
<br>
`sharpness` **Float:** The intensity of the sharpening effect.  Default: **`0.0`**

## Example Parameters
```javascript hl_lines="1"
sharpen.setUniform('sharpness', 1.5);
```