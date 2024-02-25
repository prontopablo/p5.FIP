Blurs an image by simulating motion in a specified direction.

## Parameters
`texture` **Texture**: The input texture to be filtered. Default: **`The entire canvas`**
<br>
`texOffset` **Vec2:** The offset used for sampling neighboring pixels. Default: **`(1.0 / width, 1.0 / height)`**
<br>
`blurAmount` **Float:** The amount of blur to apply. Higher values result in more significant blur. Default: **`10.0`**

## Example
```java
import fip.*;

PShader motionBlur;

PImage ireland;

void setup() {
  size(1000, 1000, P3D);

  motionBlur = loadShader("motionBlur.glsl");

  ireland = loadImage("ireland.jpg");

  motionBlur.set("texOffset", 1.0, 0.0); // Horizontal motion blur
  motionBlur.set("blurAmount", 20.0);
}

void draw() {
  image(ireland, 0, 0, width, height);

  filter(motionBlur);
}

```