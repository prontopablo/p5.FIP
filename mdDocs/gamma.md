Applies gamma correction to the input texture color.

## Parameters
`tex0` **Texture**: The input texture to be filtered. Default: **`The entire canvas`**
<br>
`gamma` **Float:**  Gamma value for correction. Default: **`0.0`**

## Example Parameters
```javascript hl_lines="1"
gamma.setUniform('gamma', 2.2);
```