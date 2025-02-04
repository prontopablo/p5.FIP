Applies a mosaic effect to an input texture.

## Parameters
`tex0` **Texture**: The input texture to be filtered. Default: **`The entire canvas`**
<br>
`mosaicSize` **Float:** Size of the mosaic cells. A higher value results in larger mosaic cells. Default: **`0.0`**

## Example Parameters
```javascript hl_lines="1"
mosaic.setUniform('mosaicSize', 12.0);
```