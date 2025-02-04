Reduces the number of colors in an image through quantization.

## Parameters
`tex0` **Texture**: The input texture to be filtered. Default: **`The entire canvas`**
<br>
`shades` **Int:** Number of shades to quantize the colors to. Default: **`0.0`**

## Example Parameters
```javascript hl_lines="1"
quantization.setUniform('shades', 4.0);
```