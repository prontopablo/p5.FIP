Simulates a linocut effect by converting the input image to grayscale and applying a threshold to distinguish between ink and paper regions.  

## Parameters
`texture` **Texture**: The input texture to be filtered. Default: **`The entire canvas`**
<br>
`resolution` **Vec2**: The resolution of the input texture. Default: **`vec2(1.0)`**
<br>
`threshold` **Float:** The threshold value to determine the cutoff between ink and paper colors. Values above the threshold represent ink, while values below represent paper. Default: **`0.4`**
<br>
`inkColor` **Vec3**: The color of the ink. This is a RGB vector, where each component is in the range [0, 1]. Default: **`(0.4, 0.4, 1.0)`**
<br>
`paperColor` **Vec3**: The color of the paper. This is a RGB vector, where each component is in the range [0, 1]. Default: **`(1.0, 1.0, 1.0)`**

## Example
```java
import fip.*;

PShader linocut;

PImage ireland;

void setup() {
  size(1000, 1000, P3D);

  linocut = loadShader("linocut.glsl");

  ireland = loadImage("ireland.jpg");

  linocut.set("threshold", 0.4);
  linocut.set("inkColor", 0.4, 0.4, 1.0);
  linocut.set("paperColor", 1.0, 1.0, 1.0);
}

void draw() {
  image(ireland, 0, 0, width, height);

  filter(linocut);
}

```