Applies a Gaussian blur to the input texture.

## Parameters
`tex0` **Texture**: The input texture to be filtered. Default: **`The entire canvas`**
<br>
`uTextureSize` **Vec2:** The size of the texture used for sampling neighboring pixels. Default: **`(0.0, 0.0)`**
<br>
`blurRadius` **Float**: The size of the blur. Default: **`0.0`**

## Example Parameters
```javascript hl_lines="1"
gaussianBlur.setUniform('blurRadius', 5.0);
```