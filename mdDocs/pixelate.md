Pixelates an image by rounding each pixel to a fixed grid based on the specified pixel size.

## Parameters
`tex0` **Texture**: The input texture to be filtered. Default: **`The entire canvas`**
<br>
`pixelSize` **Float:** The size of each pixel in the pixel grid. Default: **`0.0`**

## Example Parameters
```javascript hl_lines="1"
pixelate.setUniform('pixelSize', 0.01);
```