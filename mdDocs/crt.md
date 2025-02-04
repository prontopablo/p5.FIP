Recreates the effects of an old CRT television with visible scanlines, spherical warping, and vignette.

## Parameters
`tex0` **Texture**: The input texture to be filtered. Default: **`The entire canvas`**
<br>
`time` **Float:** Time used to animate the scanlines. Default: **`0.0`**

## Example Parameters
```javascript hl_lines="1"
crt.setUniform('time', millis() * 0.001);
```