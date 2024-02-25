Recreates the effects of an old CRT television with visible scanlines, spherical warping, and vignette.

## Parameters
`texture` **Texture**: The input texture to be filtered. Default: **`The entire canvas`**
<br>
`texOffset` **Vec2:** The offset used for sampling neighboring pixels. Default: **`(1.0 / width, 1.0 / height)`**
<br>
`thresholdLow` **Float:** Threshold to highlight edges. Pixels with intensity gradients below this threshold are considered non-edges. Default: **`0.1`**
<br>
`thresholdHigh` **Float:** Threshold to perform hysteresis and link edges. Pixels with intensity gradients above this threshold are fully considered as edges. Default: **`0.3`**
<br>
`scanlineWeight` **Float:** Weight of the scanlines effect. Default: **`0.1`**
<br>
`brightness` **Float:** Adjusts the overall brightness of the image. Default: **`2.5`**
<br>
`distortion` **Float:** Controls the amount of spherical warping. Default: **`0.02`**

## Example
```java
import fip.*;

PShader crt;
PImage ireland;

void setup() {
  size(1000, 1000, P3D);

  crt = loadShader("crt.glsl");

  ireland = loadImage("ireland.jpg");

  crt.set("thresholdLow", 0.1);
  crt.set("thresholdHigh", 0.3);
  crt.set("scanlineWeight", 0.1);
  crt.set("brightness", 2.5);
  crt.set("distortion", 0.02);
}

void draw() {
  image(ireland, 0, 0, width, height);

  filter(crt);
}
```