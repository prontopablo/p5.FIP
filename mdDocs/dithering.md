Applies dithering to an image, a technique commonly used to simulate additional colors and reduce banding in lower bit-depth images.

## Parameters
`tex0` **Texture**: The input texture to be filtered. Default: **`The entire canvas`**
<br>
`threshold` **Float:** Threshold to determine if pixel will be set to white or black. Default: **`0.0`**
<br>
`dotSize` **Float:** The size of each dot in the display. Default: **`0.0`**

## Example Parameters
```javascript hl_lines="1 2"
dithering.setUniform('threshold', 0.3);
dithering.setUniform('dotSize', 0.00001);
```