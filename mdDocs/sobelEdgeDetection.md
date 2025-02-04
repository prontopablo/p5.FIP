Performs edge detection on the input texture using the Sobel operator. It calculates the intensity gradients in the horizontal and vertical directions and combines them to detect edges. 

## Parameters
`tex0` **Texture**: The input texture to be filtered. Default: **`The entire canvas`**
<br>
`canvasSize` **Vec2:** The size of the texture used for sampling neighboring pixels. Default: **`The entire canvas`**
<br>
`threshold` **Float:** The threshold value to determine the intensity at which edges are detected. Default: **`0.0`**

## Example Parameters
```javascript hl_lines="1"
sobelEdgeDetection.setUniform('threshold', 0.2);
```