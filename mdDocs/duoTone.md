Applies a two-tone color effect.

## Parameters
`tex0` **Texture**: The input texture to be filtered. Default: **`The entire canvas`**
<br>
`tone1` **Vec2**: The RGB values of the first tone. Default: **`(0.0, 0.0, 0.0)`**
<br>
`tone2` **Vec2**: The RGB values of the second tone. Default: **`(0.0, 0.0, 0.0)`**

## Example Parameters
```javascript hl_lines="1 2"
duoTone.setUniform('tone1', [0.8627, 0.6275, 0.0]);
duoTone.setUniform('tone2', [0.4157, 0.0118, 0.5647]);
```