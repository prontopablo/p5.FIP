Applies a mosaic effect to an input texture.

## Parameters
`texture` **Texture**: The input texture to be filtered. Default: **`The entire canvas`**
<br>
`texOffset` **Vec2:** The offset used for sampling neighboring pixels. Default: **`(1.0 / width, 1.0 / height)`**
<br>
`mosaicSize` **Float:** Size of the mosaic cells. A higher value results in larger mosaic cells. Default: **`40.0`**

## Example
```java
import fip.*;

PShader mosaic;

PImage ireland;

void setup() {
  size(1000, 1000, P3D);

  mosaic = loadShader("mosaic.glsl");

  ireland = loadImage("ireland.jpg");

  mosaic.set("mosaicSize", 20.0);
}

void draw() {
  image(ireland, 0, 0, width, height);

  filter(mosaic);
}

```