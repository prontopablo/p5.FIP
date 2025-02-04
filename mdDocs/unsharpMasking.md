Performs unsharp masking to enhance image sharpness. Unsharp masking involves subtracting a blurred version of the image from the original and then adding the result back to the original image. 

## Parameters
`tex0` **Texture**: The input texture to be filtered. Default: **`The entire canvas`**
<br>
`canvasSize` **Vec2:** The size of the texture used for sampling neighboring pixels. Default: **`The entire canvas`**
<br>
`strength` **Float:** The strength of the unsharp masking effect. A higher value increases the sharpening effect. Default: **`0.0`**

## Example Parameters
```javascript hl_lines="1"
unsharpMasking.setUniform('strength', 2.0);
```