Detects edges using the Canny edge detection algorithm.

## Parameters
`texture` **Texture**: The input texture to be filtered. Default: **`The entire canvas`**
<br>
`texOffset` **Vec2:** The offset used for sampling neighboring pixels. Default: **`(1.0 / width, 1.0 / height)`**
<br>
`thresholdLow` **Float:** The lower threshold for edge detection. Pixels with intensity gradients below this threshold will be suppressed. Default: **`0.1`**
<br>
`thresholdHigh` **Float:** The higher threshold for edge detection. Pixels with intensity gradients above this threshold will be considered strong edges. Default: **`0.3`**

## Example
```java
import fip.*;

PShader cannyEdgeDetection;
PImage ireland;

void setup() {
  size(1000, 1000, P3D);

  cannyEdgeDetection = loadShader("cannyEdgeDetection.glsl");

  ireland = loadImage("ireland.jpg");

  cannyEdgeDetection.set("thresholdLow", 0.1);
  cannyEdgeDetection.set("thresholdHigh", 0.3);
}

void draw() {
  image(ireland, 0, 0, width, height);

  filter(cannyEdgeDetection);
}
```