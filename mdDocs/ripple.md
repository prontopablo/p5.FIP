Creates a ripple effect using sine function.

## Parameters
`tex0` **Texture**: The input texture to be filtered. Default: **`The entire canvas`**
<br>
`canvasSize` **Vec2:** The size of the texture used for sampling neighboring pixels. Default: **`The entire canvas`**
<br>
`rippleFrequency` **Float:** The frequency of the ripples. Default: **`0.0`**
<br>
`rippleAmplitude` **Float:** The amplitude or strength of the ripples. Default: **`0.0`**


## Example Parameters
```javascript hl_lines="1 2"
ripple.setUniform('rippleFrequency', 50.0);
ripple.setUniform('rippleAmplitude', 0.01);
```