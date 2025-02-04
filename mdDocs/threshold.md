Applies a threshold to a texture, converting it to a binary black and white image based on a specified threshold value.

## Parameters
`tex0` **Texture**: The input texture to be filtered. Default: **`The entire canvas`**
<br>
`threshold` **Float:** The threshold value that determines the cutoff point. Pixels with grayscale values above this threshold will be set to white, and those below will be set to black. Default: **`0.0`**

## Example Parameters
```javascript hl_lines="1"
threshold.setUniform('threshold', 0.5);
```