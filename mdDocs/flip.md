Flips the input texture horizontally and/or vertically based on specified parameters.

## Parameters
`tex0` **Texture**: The input texture to be filtered. Default: **`The entire canvas`**
<br>
`flipHorizontal` **Boolean:**  If `true`, flips the texture horizontally. Default: **`false`**
<br>
`flipVertical` **Boolean:**  If `true`, flips the texture vertically. Default: **`false`**

## Example Parameters
```javascript hl_lines="1 2"
flip.setUniform("flipHorizontal", true);
flip.setUniform("flipVertical", false);
```