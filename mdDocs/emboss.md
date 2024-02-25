Applies an emboss effect to the input texture, creating a 3D appearance. This is achieved by calculating the gradient of the pixel values and normalizing the result.

## Parameters
`texture` **Texture**: The input texture to be filtered. Default: **`The entire canvas`**
<br>
`texOffset` **Vec2:** The offset used for sampling neighboring pixels. Default: **`(1.0 / width, 1.0 / height)`**
<br>


## Example
```java
import fip.*;

PShader emboss;

PImage ireland;

void setup() {
  size(1000, 1000, P3D);

  emboss = loadShader("emboss.glsl");

  ireland = loadImage("ireland.jpg");
}

void draw() {
  image(ireland, 0, 0, width, height);

  filter(emboss);
}

```