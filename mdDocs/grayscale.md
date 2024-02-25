Converts the input texture to grayscale using the luminance method, which is a weighted sum of the color channels.

## Parameters
`texture` **Texture**: The input texture to be filtered. Default: **`The entire canvas`**
<br>
`texOffset` **Vec2:** The offset used for sampling neighboring pixels. Default: **`(1.0 / width, 1.0 / height)`**

## Example
```java
import fip.*;

PShader grayscale;

PImage ireland;

void setup() {
  size(1000, 1000, P3D);

  grayscale = loadShader("grayscale.glsl");

  ireland = loadImage("ireland.jpg");
}

void draw() {
  image(ireland, 0, 0, width, height);

  filter(grayscale);
}

```