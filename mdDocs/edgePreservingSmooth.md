Applies an edge-preserving filter to the input texture, emphasizing edges while smoothing other areas.

## Parameters
`texture` **Texture**: The input texture to be filtered. Default: **`The entire canvas`**
<br>
`texOffset` **Vec2:** The offset used for sampling neighboring pixels. Default: **`(1.0 / width, 1.0 / height)`**
<br>
`threshold` **Float**: The threshold value that determines whether to preserve the original pixel color or use the local average. Default: **`0.2`**


## Example
```java
import fip.*;

PShader edgePreservingFilter;

PImage ireland;

void setup() {
  size(1000, 1000, P3D);

  edgePreservingFilter = loadShader("edgePreservingFilter.glsl");

  ireland = loadImage("ireland.jpg");

  edgePreservingFilter.set("threshold", 0.2);
}

void draw() {
  image(ireland, 0, 0, width, height);

  filter(edgePreservingFilter);
}

```