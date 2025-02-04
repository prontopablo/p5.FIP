Adds a glow effect using a combination of blurring and blending techniques.

## Parameters
`tex0` **Texture**: The input texture to be filtered. Default: **`The entire canvas`**
<br>
`canvasSize` **Vec2:** The size of the texture used for sampling neighboring pixels. Default: **`The entire canvas`**
<br>
`intensity` **Float:** The strength of the glow effect. A higher value intensifies the glow. Default: **`0.0`**
<br>
`glow` **Float:** The extent of the glow, controlled by the blur radius. Should be within the range [0.0, 8.0]. Default: **`0.0`**

## Example Parameters
```javascript hl_lines="1 2"
bloom.setUniform('intensity', 0.8);
bloom.setUniform('glow', 1.0);
```