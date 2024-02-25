Uses sine waves to deform.

## Parameters
`texture` **Texture**: The input texture to be filtered. Default: **`The entire canvas`**
<br>
`deformationAmount` **Float:** The amount of deformation to apply based on a sine wave. Default: **`0.1`**

## Example
```java
import fip.*;

PShader deform;
PImage ireland;

void setup() {
  size(1000, 1000, P3D);

  deform = loadShader("deform.glsl");

  ireland = loadImage("ireland.jpg");

  deform.set("deformationAmount", 0.1);
}

void draw() {
  image(ireland, 0, 0, width, height);

  filter(deform);
}
```