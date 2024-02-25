The RGB channels are separated and displaced, then original and glitched colors are mixed.

## Parameters
`texture` **Texture**: The input texture to be filtered. Default: **`The entire canvas`**
<br>
`texOffset` **Vec2:** The offset used for sampling neighboring pixels. Default: **`(1.0 / width, 1.0 / height)`**
<br>
`resolution` **Vec2**: The resolution of the input texture. Default: **`vec2(1.0)`**
<br>
`mouse` **Vec2**: The position of the mouse pointer. Default: **`vec2(0.0)`**

## Example
```java
import fip.*;

PShader glitch;

PImage ireland;

void setup() {
  size(1000, 1000, P3D);

  glitch = loadShader("glitch.glsl");

  ireland = loadImage("ireland.jpg");

  glitch.set("resolution", width, height);
}

void draw() {
  image(ireland, 0, 0, width, height);

  glitch.set("mouse", float(mouseX), float(mouseY));
  filter(glitch);
}

```