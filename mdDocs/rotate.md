Rotates an input texture based on a specified rotation angle in degrees. It ensures that the resulting rotated coordinates are within the texture bounds. If the rotated coordinates fall outside the bounds, the pixel becomes transparent. 

## Parameters
`tex0` **Texture**: The input texture to be filtered. Default: **`The entire canvas`**
<br>
`rotationAngle` **Float:** Rotation angle in degrees. Default: **`0.0`**

## Example Parameters
```javascript hl_lines="1"
rotate.setUniform("rotationAngle", -95);
```