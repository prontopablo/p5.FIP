Enhances image details by emphasizing edges through Laplacian filtering.

## Parameters
`tex0` **Texture**: The input texture to be filtered. Default: **`The entire canvas`**
<br>
`canvasSize` **Vec2:** The size of the texture used for sampling neighboring pixels. Default: **`The entire canvas`**
<br>
`amount` **Float:** Controls the strength of the enhancement. Higher values result in more pronounced edges. Default: **`0.0`**

## Example Parameters
```javascript hl_lines="1"
laplacianEdgeEnhancement.setUniform('amount', 5.5);
```