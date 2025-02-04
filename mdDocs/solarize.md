Inverts colors based on the intensity of pixel colors. If the average intensity of a pixel's color is above a specified threshold, the colors are inverted, creating a solarization effect.

## Parameters
`tex0` **Texture**: The input texture to be filtered. Default: **`The entire canvas`**
<br>
`threshold` **Float:** The intensity threshold above which colors will be inverted. Ranges from 0.0 to 1.0. Default: **`0.0`**

## Example Parameters
```javascript hl_lines="1"
solarize.setUniform('threshold', 0.5);
```