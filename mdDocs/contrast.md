Adjusts the contrast.

## Parameters
`tex0` **Texture**: The input texture to be filtered. Default: **`The entire canvas`**
<br>
`contrast` **Float:** The contrast adjustment factor. A value of 1.0 leaves the contrast unchanged, while higher values increase contrast, and lower values decrease contrast. Default: **`0.0`**

## Example Parameters
```javascript hl_lines="1"
contrast.setUniform('contrast', 2.0);
```