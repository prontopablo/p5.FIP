Applies a threshold to a texture, converting it to a binary black and white image based on a specified threshold value.

## Parameters
`texture` **Texture**: The input texture to be filtered. Default: **`The entire canvas`**
<br>
`threshold` **Float:** The threshold value that determines the cutoff point. Pixels with grayscale values above this threshold will be set to white, and those below will be set to black. Default: **`0.5`**

## Example
```java
import fip.*;

PShader threshold;

PImage ireland;

void setup() {
  size(1000, 1000, P3D);

  threshold = loadShader("threshold.glsl");

  ireland = loadImage("ireland.jpg");

  threshold.set("threshold", 0.5);
}

void draw() {
  image(ireland, 0, 0, width, height);

  filter(threshold);
}

```