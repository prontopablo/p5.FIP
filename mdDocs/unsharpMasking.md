Performs unsharp masking to enhance image sharpness. Unsharp masking involves subtracting a blurred version of the image from the original and then adding the result back to the original image. 

## Parameters
`texture` **Texture**: The input texture to be filtered. Default: **`The entire canvas`**
<br>
`texOffset` **Vec2:** The offset used for sampling neighboring pixels. Default: **`(1.0 / width, 1.0 / height)`**
<br>
`strength` **Float:** The strength of the unsharp masking effect. A higher value increases the sharpening effect. Default: **`2.0`**

## Example
```java
import fip.*;

PShader unsharpMasking;

PImage ireland;

void setup() {
  size(1000, 1000, P3D);

  unsharpMasking = loadShader("unsharpMasking.glsl");

  ireland = loadImage("ireland.jpg");

  unsharpMasking.set("strength", 2.0);
}

void draw() {
  image(ireland, 0, 0, width, height);

  filter(unsharpMasking);
}

```