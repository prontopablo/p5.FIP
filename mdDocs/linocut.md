Simulates a linocut effect by converting the input image to grayscale and applying a threshold to distinguish between ink and paper regions.  

## Parameters
`tex0` **Texture**: The input texture to be filtered. Default: **`The entire canvas`**
<br>
`threshold` **Float:** The threshold value to determine the cutoff between ink and paper colors. Values above the threshold represent ink, while values below represent paper. Default: **`0.0`**
<br>
`inkColor` **Vec3**: The color of the ink. This is a RGB vector, where each component is in the range [0, 1]. Default: **`(0.0, 0.0, 0.0)`**
<br>
`paperColor` **Vec3**: The color of the paper. This is a RGB vector, where each component is in the range [0, 1]. Default: **`(0.0, 0.0, 0.0)`**

## Example Parameters
```javascript hl_lines="1 2 3"
linocut.setUniform('threshold', 0.4);
linocut.setUniform('inkColor', [0.4, 0.4, 1.0]);
linocut.setUniform('paperColor', [1.0, 1.0, 1.0]);
```