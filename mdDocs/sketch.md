Applies the Sobel operator for edge detection, creating an ink-like effect on an input texture.

## Parameters
`texture` **Texture**: The input texture to be filtered. Default: **`The entire canvas`**
<br>
`texOffset` **Vec2:** The offset used for sampling neighboring pixels. Default: **`(1.0 / width, 1.0 / height)`**
<br>
`threshold` **Float:** The threshold for edge intensity. Values above this threshold will be considered edges, creating the ink-like effect. Default: **`0.15`**

## Example
```java
import fip.*;

PShader sketch;

PImage ireland;

void setup() {
  size(1000, 1000, P3D);

  sketch = loadShader("sketch.glsl");

  ireland = loadImage("ireland.jpg");

  sketch.set("threshold", 0.15);
}

void draw() {
  image(ireland, 0, 0, width, height);

  filter(sketch);
}

```