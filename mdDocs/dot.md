Emulates a seven-segment display by grouping pixels into dots.

## Parameters
`tex0` **Texture**: The input texture to be filtered. Default: **`The entire canvas`**
<br>
`dotSize` **Float:** The size of each dot in the display. Default: **`0.0`**

## Example Parameters
```javascript hl_lines="1"
dot.setUniform('dotSize', 0.008);
```