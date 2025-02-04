Adjusts the saturation of an input texture. It operates by converting the original color to grayscale (luminance) and then interpolating between the grayscale version and the original color based on the saturation parameter.

## Parameters
`tex0` **Texture**: The input texture to be filtered. Default: **`The entire canvas`**
<br>
`saturation` **Float:** Controls the saturation of the image. A value of 0.0 results in a grayscale image, while higher values increase saturation. Default: **`0.0`**

## Example Parameters
```javascript hl_lines="1"
saturation.setUniform('saturation', 5.5);
```