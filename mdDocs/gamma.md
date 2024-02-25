Applies gamma correction to the input texture color.

## Parameters
`texture` **Texture**: The input texture to be filtered. Default: **`The entire canvas`**
<br>
`texOffset` **Vec2:** The offset used for sampling neighboring pixels. Default: **`(1.0 / width, 1.0 / height)`**
<br>
`gamma` **Float:**  Gamma value for correction. Default: **`2.2`**


## Example
```java
import fip.*;

PShader gamma;

PImage ireland;

void setup() {
  size(1000, 1000, P3D);

  gamma = loadShader("gamma.glsl");

  ireland = loadImage("ireland.jpg");

  gamma.set("gamma", 2.2);
}

void draw() {
  image(ireland, 0, 0, width, height);

  filter(gamma);
}

```