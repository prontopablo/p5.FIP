Adds a glow effect using a combination of blurring and blending techniques.

## Parameters
`texture` **Texture**: The input texture to be filtered. Default: **`The entire canvas`**
<br>
`intensity` **Float:** The strength of the glow effect. A higher value intensifies the glow. Default: **`0.5`**
<br>
`glow` **Float:** The extent of the glow, controlled by the blur radius. Should be within the range [0.0, 8.0]. Default: **`0.0`**

## Example
```java
import fip.*;

PShader bloom;
PImage ireland;

void setup() {
  size(1000, 1000, P3D);

  bloom = loadShader("bloom.glsl");

  ireland = loadImage("ireland.jpg");

  bloom.set("intensity", 0.5);
  bloom.set("glow", 2.0);
}

void draw() {
  image(ireland, 0, 0, width, height);

  filter(bloom);
}
```