Adjusts the brightness.

## Parameters
`texture` **Texture**: The input texture to be filtered. Default: **`The entire canvas`**
<br>
`brightness` **Float:** The factor by which to adjust the brightness. A value less than 1.0 darkens the image, while a value greater than 1.0 brightens it. Default: **`0.7`**

## Example
```java
import fip.*;

PShader brightness;
PImage ireland;

void setup() {
  size(1000, 1000, P3D);

  brightness = loadShader("brightness.glsl");

  ireland = loadImage("ireland.jpg");

  brightness.set("brightness", 0.7);
}

void draw() {
  image(ireland, 0, 0, width, height);

  filter(brightness);
}
```