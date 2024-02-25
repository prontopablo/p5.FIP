Applies a Gaussian blur to the input texture.

## Parameters
`texture` **Texture**: The input texture to be filtered. Default: **`The entire canvas`**
<br>
`texOffset` **Vec2:** The offset used for sampling neighboring pixels. Default: **`(1.0 / width, 1.0 / height)`**


## Example
```java
import fip.*;

PShader gaussianBlur;

PImage ireland;

void setup() {
  size(1000, 1000, P3D);

  gaussianBlur = loadShader("gaussianBlur.glsl");

  ireland = loadImage("ireland.jpg");
}

void draw() {
  image(ireland, 0, 0, width, height);

  filter(gaussianBlur);
}

```