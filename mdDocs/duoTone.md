Applies a two-tone color effect.

## Parameters
`texture` **Texture**: The input texture to be filtered. Default: **`The entire canvas`**
<br>
`tone1` **Vec2**: The RGB values of the first tone. Default: **`(0.8627, 0.6275, 0.0)`**
<br>
`tone2` **Vec2**: The RGB values of the second tone. Default: **`(0.4157, 0.0118, 0.5647)`**

## Example
```java
import fip.*;

PShader duoTone;

PImage ireland;

void setup() {
  size(1000, 1000, P3D);

  duoTone = loadShader("duoTone.glsl");

  ireland = loadImage("ireland.jpg");

  duoTone.set("tone1", 0.8627, 0.6275, 0.0);
  duoTone.set("tone2", 0.4157, 0.0118, 0.5647);
}

void draw() {
  image(ireland, 0, 0, width, height);

  filter(duoTone);
}

```