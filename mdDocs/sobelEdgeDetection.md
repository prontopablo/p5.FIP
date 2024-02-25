Performs edge detection on the input texture using the Sobel operator. It calculates the intensity gradients in the horizontal and vertical directions and combines them to detect edges. 

## Parameters
`texture` **Texture**: The input texture to be filtered. Default: **`The entire canvas`**
<br>
`texOffset` **Vec2:** The offset used for sampling neighboring pixels. Default: **`(1.0 / width, 1.0 / height)`**
<br>
`threshold` **Float:** The threshold value to determine the intensity at which edges are detected. Default: **`0.2`**

## Example
```java
import fip.*;

PShader sobelEdgeDetection;

PImage ireland;

void setup() {
  size(1000, 1000, P3D);

  sobelEdgeDetection = loadShader("sobelEdgeDetection.glsl");

  ireland = loadImage("ireland.jpg");

  sobelEdgeDetection.set("threshold", 0.2);
}

void draw() {
  image(ireland, 0, 0, width, height);

  filter(sobelEdgeDetection);
}

```