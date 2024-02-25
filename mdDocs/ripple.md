Creates a ripple effect using sine function.

## Parameters
`texture` **Texture**: The input texture to be filtered. Default: **`The entire canvas`**
<br>
`resolution` **Vec2**: The resolution of the input texture. Default: **`vec2(1.0)`**
<br>
`rippleFrequency` **Float:** The frequency of the ripples. Default: **`50.0`**
<br>
`rippleAmplitude` **Float:** The amplitude or strength of the ripples. Default: **`0.01`**
<br>
`rippleCenterOffset` **Vec2**: The offset of the ripple center from the center of the screen. Default: **`vec2(0.0)`**


## Example
```java
import fip.*;

PShader ripple;

PImage ireland;

void setup() {
  size(1000, 1000, P3D);

  ripple = loadShader("ripple.glsl");

  ireland = loadImage("ireland.jpg");

  ripple.set("resolution", width, height);
  ripple.set("rippleFrequency", 50.0);
  ripple.set("rippleAmplitude", 0.01);
  ripple.set("rippleCenterOffset", 0.0, 0.0);

}

void draw() {
  image(ireland, 0, 0, width, height);

  filter(ripple);
}

```