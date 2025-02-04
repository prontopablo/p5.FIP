Local image processing technique used for noise reduction and edge preservation. It divides the image into quadrants, calculates the mean and variance of color values in each quadrant, and selects the quadrant with the minimum color variance. This results in a smoothed version of the original image.

## Parameters
`tex0` **Texture**: The input texture to be filtered. Default: **`The entire canvas`**
<br>
`canvasSize` **Vec2:** The size of the texture used for sampling neighboring pixels. Default: **`The entire canvas`**

## Example Parameters
```javascript hl_lines="1"
// None required
```