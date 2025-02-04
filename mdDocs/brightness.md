Adjusts the brightness.

## Parameters
`tex0` **Texture**: The input texture to be filtered. Default: **`The entire canvas`**
<br>
`brightness` **Float:** The factor by which to adjust the brightness. A value less than 1.0 darkens the image, while a value greater than 1.0 brightens it. Default: **`0.0`**

## Example Parameters
```javascript hl_lines="1"
brightness.setUniform('brightness', 2.1);
```