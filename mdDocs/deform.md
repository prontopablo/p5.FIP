Uses sine waves to deform.

## Parameters
`tex0` **Texture**: The input texture to be filtered. Default: **`The entire canvas`**
<br>
`deformationAmount` **Float:** The amount of deformation to apply based on a sine wave. Default: **`0.0`**

## Example Parameters
```javascript hl_lines="1"
deform.setUniform('deformationAmount', 0.1);
```