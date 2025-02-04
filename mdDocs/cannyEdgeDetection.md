Detects edges using the Canny edge detection algorithm.

## Parameters
`tex0` **Texture**: The input texture to be filtered. Default: **`The entire canvas`**
<br>
`canvasSize` **Vec2:** The size of the texture used for sampling neighboring pixels. Default: **`The entire canvas`**
<br>
`thresholdLow` **Float:** The lower threshold for edge detection. Pixels with intensity gradients below this threshold will be suppressed. Default: **`0.0`**
<br>
`thresholdHigh` **Float:** The higher threshold for edge detection. Pixels with intensity gradients above this threshold will be considered strong edges. Default: **`0.0`**

## Example Parameters
```javascript hl_lines="1 2"
cannyEdgeDetection.setUniform('thresholdLow', 0.1);
cannyEdgeDetection.setUniform('thresholdHigh', 0.3);
```