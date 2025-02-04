Applies two Gaussian blurs to the input texture and calculates the Difference of Gaussian.

## Parameters
`tex0` **Texture**: The input texture to be filtered. Default: **`The entire canvas`**
<br>
`canvasSize` **Vec2:** The size of the texture used for sampling neighboring pixels. Default: **`The entire canvas`**
<br>
`radius1` **Float:** The radius of the first Gaussian blur. Default: **`0.0`**
<br>
`radius2` **Float:** The radius of the second Gaussian blur. Default: **`0.0`**

## Example Parameters
```javascript hl_lines="1 2"
differenceOfGaussian.setUniform('radius1', 1.0);
differenceOfGaussian.setUniform('radius1', 2.0);
```