Adds a vignette effect to the texture.

## Parameters
`tex0` **Texture**: The input texture to be filtered. Default: **`The entire canvas`**
<br>
`canvasSize` **Vec2:** The size of the texture used for sampling neighboring pixels. Default: **`The entire canvas`**
<br>
`vignetteStrength` **Float:** Strength of the vignette effect. Range: 0.0 (none) to 1.0 (maximum). Default: **`0.0`**
<br>
`vignetteFalloff` **Float:** Rate at which the vignette diminishes. Default: **`0.0`**
<br>
`vignetteSign` **Float:** Direction of the vignette effect. -1.0 (inward) or 1.0 (outward). Default: **`0.0`**
<br>
`vignetteSize` **Float:** Overall size of the vignette effect. Default: **`0.0`**

## Example Parameters
```javascript hl_lines="1 2 3 4"
vignette.setUniform('vignetteStrength', 0.3);    
vignette.setUniform('vignetteFalloff', 1.0);
vignette.setUniform('vignetteSign', 1.0);
vignette.setUniform('vignetteSize', 1.0);
```