Adds a vignette effect to the texture.

## Parameters
`texture` **Texture**: The input texture to be filtered. Default: **`The entire canvas`**
<br>
`texOffset` **Vec2:** The offset used for sampling neighboring pixels. Default: **`(1.0 / width, 1.0 / height)`**
<br>
`vignetteStrength` **Float:** Strength of the vignette effect. Range: 0.0 (none) to 1.0 (maximum). Default: **`0.8`**
<br>
`vignetteFalloff` **Float:** Rate at which the vignette diminishes. Default: **`1.0`**
<br>
`vignetteSign` **Float:** Direction of the vignette effect. -1.0 (inward) or 1.0 (outward). Default: **`1.0`**
<br>
`vignetteSize` **Float:** Overall size of the vignette effect. Default: **`1.0`**

## Example
```java
import fip.*;

PShader vignette;

PImage ireland;

void setup() {
  size(1000, 1000, P3D);

  vignette = loadShader("vignette.glsl");

  ireland = loadImage("ireland.jpg");

  vignette.set("vignetteStrength", 0.8);
  vignette.set("vignetteFalloff", 1.0);
  vignette.set("vignetteSign", 1.0);
  vignette.set("vignetteSize", 1.0);
}

void draw() {
  image(ireland, 0, 0, width, height);

  filter(vignette);
}

```