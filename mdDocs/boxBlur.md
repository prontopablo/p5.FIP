Blurs using a simple box blur algorithm.

## Parameters
`texture` **Texture**: The input texture to be filtered. Default: **`The entire canvas`**
<br>
`texOffset` **Vec2:** The offset used for sampling neighboring pixels. Default: **`(1.0 / width, 1.0 / height)`**
<br>
`blurRadius` **Int:** The radius of the box blur. Controls the extent of blurring. Default: **`3`**

## Example
```java
import fip.*;

PShader boxBlur;
PImage ireland;

void setup() {
  size(1000, 1000, P3D);

  boxBlur = loadShader("boxBlur.glsl");

  ireland = loadImage("ireland.jpg");

  boxBlur.set("blurRadius", 5);
}

void draw() {
  image(ireland, 0, 0, width, height);

  filter(boxBlur);
}
```