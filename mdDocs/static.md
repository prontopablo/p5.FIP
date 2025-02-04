Combines Sobel operator for edge detection and stippling. The Sobel operator calculates the intensity gradient of the image, and the stippling effect adds random dots to the edges, creating an TV static appearance.

## Parameters
`tex0` **Texture**: The input texture to be filtered. Default: **`The entire canvas`**
<br>
`canvasSize` **Vec2:** The size of the texture used for sampling neighboring pixels. Default: **`The entire canvas`**
<br>
`threshold` **Float:** The threshold for edge detection. Pixels with intensity above this threshold will be treated as edges. Default: **`0.0`**
<br>
`stippleDensity` **Float:** The density of stippling dots to be added to the ink effect. A lower value results in more dots. Default: **`0.0`**

## Example Parameters
```javascript hl_lines="1 2"
static.setUniform('threshold', 0.2);
static.setUniform('stippleDensity', 0.99);
```