Enhances image details by emphasizing edges through Laplacian filtering.

## Parameters
`texture` **Texture**: The input texture to be filtered. Default: **`The entire canvas`**
<br>
`texOffset` **Vec2:** The offset used for sampling neighboring pixels. Default: **`(1.0 / width, 1.0 / height)`**
<br>
`amount` **Float:** Controls the strength of the enhancement. Higher values result in more pronounced edges. Default: **`1.5`**

## Example
```java
import fip.*;

PShader laplacianEdgeEnhancement;

PImage ireland;

void setup() {
  size(1000, 1000, P3D);

  laplacianEdgeEnhancement = loadShader("laplacianEdgeEnhancement.glsl");

  ireland = loadImage("ireland.jpg");

  laplacianEdgeEnhancement.set("amount", 1.5);
}

void draw() {
  image(ireland, 0, 0, width, height);

  filter(laplacianEdgeEnhancement);
}

```