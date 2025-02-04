Applies the Sobel operator for edge detection, creating an ink-like effect on an input texture.

## Parameters
`tex0` **Texture**: The input texture to be filtered. Default: **`The entire canvas`**
<br>
`canvasSize` **Vec2:** The size of the texture used for sampling neighboring pixels. Default: **`The entire canvas`**
<br>
`threshold` **Float:** The threshold for edge intensity. Values above this threshold will be considered edges, creating the ink-like effect. Default: **`0.0`**

## Example Parameters
```javascript hl_lines="1"
sketch.setUniform('threshold', 0.2);
```