Adds a cartoon effect by emphasizing edges and darkening them.

## Parameters
`tex0` **Texture**: The input texture to be filtered. Default: **`The entire canvas`**
<br>
`edgeThreshold` **Float:** The threshold value that determines whether a pixel is considered an edge pixel based on the difference between the center pixel and its neighbors. Default: **`0.0`**

## Example Parameters
```javascript hl_lines="1"
cartoon.setUniform('edgeThreshold', 0.1);
```