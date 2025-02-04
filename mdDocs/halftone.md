Applies a halftone effect by converting texture coordinates to screen space, defining cells based on the specified size, and calculating dots within each cell.

## Parameters
`tex0` **Texture**: The input texture to be filtered. Default: **`The entire canvas`**
<br>
`canvasSize` **Vec2:** The size of the texture used for sampling neighboring pixels. Default: **`The entire canvas`**
<br>
`cellSize` **Float:** The size of each halftone cell. Default: **`0.0`**
<br>
`threshold` Float: The threshold value for dot creation. A higher value results in fewer dots. Default: **`0.0`**

## Example Parameters
```javascript hl_lines="1 2"
halftone.setUniform('cellSize', 4.0);
halftone.setUniform('threshold', 0.2);
```