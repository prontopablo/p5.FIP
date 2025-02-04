Applies an edge-preserving filter to the input texture, emphasizing edges while smoothing other areas.

## Parameters
`tex0` **Texture**: The input texture to be filtered. Default: **`The entire canvas`**
<br>
`canvasSize` **Vec2:** The size of the texture used for sampling neighboring pixels. Default: **`The entire canvas`**
<br>
`threshold` **Float**: The threshold value that determines whether to preserve the original pixel color or use the local average. Default: **`0.0`**

## Example Parameters
```javascript hl_lines="1"
edgePreservingSmooth.setUniform('threshold', 0.2);
```