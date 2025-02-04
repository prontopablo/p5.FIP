Blurs using a simple box blur algorithm.

## Parameters
`tex0` **Texture**: The input texture to be filtered. Default: **`The entire canvas`**
<br>
`canvasSize` **Vec2:** The size of the texture used for sampling neighboring pixels. Default: **`The entire canvas`**
<br>
`blurRadius` **Int:** The radius of the box blur. Controls the extent of blurring. Default: **`0`**

## Example Parameters
```javascript hl_lines="1"
boxBlur.setUniform('blurRadius', 3);
```