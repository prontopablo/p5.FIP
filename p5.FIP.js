const fip = {
    antiAliasing: `
        precision highp float;
        varying vec2 vTexCoord;
        uniform sampler2D tex0;
        uniform vec2 canvasSize;
        uniform float strength;
        
        void main() { 
            vec2 pixelSize = 1.0 / canvasSize;
        
            // Sample the center pixel
            vec4 centerColor = texture2D(tex0, vTexCoord.st);
        
            // Calculate the dynamic texOffset based on the texture size
            vec2 texOffset = 1.0 / canvasSize;
        
            // Define the offset for super-sampling
            vec2 offset = vec2(strength) * texOffset;
        
            // Accumulate color samples
            vec4 sum = vec4(0.0);
            
            // Sample 1
            sum += texture2D(tex0, vTexCoord.st + offset);
        
            // Sample 2
            sum += texture2D(tex0, vTexCoord.st + vec2(-offset.x, offset.y));
        
            // Sample 3
            sum += texture2D(tex0, vTexCoord.st + vec2(offset.x, -offset.y));
        
            // Sample 4
            sum += texture2D(tex0, vTexCoord.st - offset);
        
            // Average the samples
            vec4 averagedColor = sum / 4.0;
        
            gl_FragColor = averagedColor;
        }
    `,
    bilateral: `
        precision highp float;
        varying vec2 vTexCoord;
        uniform sampler2D tex0;
        uniform float sigmaSpace; // Spatial standard deviation
        uniform float sigmaColor; // Color standard deviation
        
        void main() {
            vec2 tc = vTexCoord.st;
            
            // Sample the original color
            vec4 centerColor = texture2D(tex0, tc);
            
            // Convert to grayscale (luminance)
            float centerLuminance = dot(centerColor.rgb, vec3(0.2126, 0.7152, 0.0722));
            
            // Accumulators for the weighted sum
            vec4 sum = vec4(0.0);
            float weightSum = 0.0;
            
            // Iterate over a 5x5 kernel
            for (float i = -2.0; i <= 2.0; i++) {
                for (float j = -2.0; j <= 2.0; j++) {
                vec2 offset = vec2(i, j) / 512.0; // Adjust the denominator based on your canvas size
            
                // Sample the neighboring pixel
                vec4 neighborColor = texture2D(tex0, tc + offset);
            
                // Convert neighbor color to grayscale (luminance)
                float neighborLuminance = dot(neighborColor.rgb, vec3(0.2126, 0.7152, 0.0722));
            
                // Calculate spatial and intensity weights
                float spatialWeight = exp(-(length(offset) * length(offset)) / (2.0 * sigmaSpace * sigmaSpace));
                float colorWeight = exp(-abs(centerLuminance - neighborLuminance) / (2.0 * sigmaColor * sigmaColor));
                float weight = spatialWeight * colorWeight;
            
                // Accumulate the weighted color
                sum += neighborColor * weight;
            
                // Accumulate the weight sum
                weightSum += weight;
                }
            }
            
            // Normalize the accumulated color by the weight sum
            vec4 resultColor = sum / weightSum;
            
            // Output the final color
            gl_FragColor = resultColor;
        }
    `,
    blend : `
        precision highp float;
        varying vec2 vTexCoord;
        uniform sampler2D texture1;
        uniform sampler2D texture2;
        uniform float mixFactor;
        uniform int blendingMode;
        uniform vec2 uTextureSize;
        
        void main() {
            vec2 tc = vTexCoord.st;
        
            // Sample the original color
            vec4 color1 = texture2D(texture1, tc);
            vec4 color2 = texture2D(texture2, tc);
            vec4 blendedColor;
        
            if (blendingMode == 1) {
                blendedColor = color1 + color2 * mixFactor; // Additive Blending
            } else if (blendingMode == 2) {
                blendedColor = color1 - color2 * mixFactor; // Subtract Blending
            } else if (blendingMode == 3) {
                blendedColor = color1 * color2 * mixFactor; // Multiplicative Blending
            } else if (blendingMode == 4) {
                blendedColor = 1.0 - (1.0 - color1) * (1.0 - color2) * mixFactor; // Screen Blending
            } else if (blendingMode == 5) {
                blendedColor = mix(2.0 * color1 * color2, 1.0 - 2.0 * (1.0 - color1) * (1.0 - color2), step(0.5, color1)); // Overlay Blending
            } else if (blendingMode == 6) {
                blendedColor = min(color1, color2) * mixFactor; // Darken Blending
            } else if (blendingMode == 7) {
                blendedColor = max(color1, color2) * mixFactor; // Lighten Blending
            } else if (blendingMode == 8) {
                blendedColor = abs(color1 - color2) * mixFactor; // Difference Blending
            } else if (blendingMode == 9) {
                blendedColor = color1 + color2 - 2.0 * color1 * color2 * mixFactor; // Exclusion Blending
            } else if (blendingMode == 10) {
                blendedColor = color1 * (1.0 - color2) + color2 * (1.0 - color1) * mixFactor; // Behind Blending
            } else if (blendingMode == 11) {
                blendedColor = mix(color1, color2, mix(color1.a, 1.0 - color2.a, mixFactor)); // Dissolve Blending
            } else if (blendingMode == 12) {
                blendedColor = vec4(abs(color1.rgb - color2.rgb), max(color1.a, color2.a)); // Hue Blending
            } else if (blendingMode == 13) {
                blendedColor = color2; // Normal Blending
            } else {
                blendedColor = mix(color1, color2, mixFactor); // Linear Interpolation
            }
        
            gl_FragColor = blendedColor;
        }
    `,
    bloom: `
        precision highp float;
        varying vec2 vTexCoord;
        uniform sampler2D tex0;
        uniform vec2 canvasSize;
        uniform float intensity;
        uniform float glow;
        
        void main() {
            vec2 tc = vTexCoord.st;
            
            // Sample the original color
            vec4 originalColor = texture2D(tex0, tc);
            
            // Calculate the dynamic texOffset based on the texture size
            vec2 texOffset = 1.0 / canvasSize;
            
            // Blur the image
            vec4 blurredColor = vec4(0.0);
            
            // Adjust glow value within a reasonable range
            float clampedGlow = clamp(glow, 0.0, 8.0);
            
            // Calculate the blur offset
            vec2 blurOffset = vec2(clampedGlow / canvasSize.x, 0.0);
            
            // Accumulate blurred colors
            for (float i = -8.0; i <= 8.0; i += 1.0) {
                vec2 offset = i * blurOffset;
                blurredColor += texture2D(tex0, vTexCoord.st + offset);
            }
            
            blurredColor /= 17.0;
            
            // Apply intensity to the blurred color
            blurredColor *= intensity;
            
            // Combine the original color and the blurred color using the Screen blending mode
            vec4 bloom = 1.0 - (1.0 - originalColor) * (1.0 - blurredColor);
            
            // Set the output color with the original vertex color
            gl_FragColor = bloom;
        }
    `,
    boxBlur: `
        precision highp float;
        varying vec2 vTexCoord;
        uniform sampler2D tex0;
        uniform vec2 canvasSize;
        
        const int blurRadius = 3;
        
        void main() {
            vec2 tc = vTexCoord.st;
            
            // Initialize the accumulated color
            vec4 sumColor = vec4(0.0);
            
            // Calculate the dynamic texOffset based on the texture size
            vec2 texOffset = 1.0 / canvasSize;
            
            // Iterate over the pixels in the blur radius
                for (int i = -blurRadius; i <= blurRadius; i++) {
                    for (int j = -blurRadius; j <= blurRadius; j++) {
                        // Sample the color of the current pixel
                        vec4 currentColor = texture2D(tex0, tc + vec2(float(i), float(j)) * texOffset);
                        
                        // Accumulate the color
                        sumColor += currentColor;
                    }
                }
            
            // Average the accumulated color
                vec4 blurredColor = sumColor / float((2 * blurRadius + 1) * (2 * blurRadius + 1));
                
            // Output the blurred color
            gl_FragColor = blurredColor;
        }
    `,
    brightness: `
        precision highp float;
        varying vec2 vTexCoord;
        uniform sampler2D tex0;
        uniform float brightness;
        
        
        void main() {
            vec2 tc = vTexCoord.st;
            
            // Sample the original color
            vec4 color = texture2D(tex0, tc);
            
            // Adjust brightness
            color.rgb = color.rgb * brightness;
            
            color.rgb = clamp(color.rgb, 0.0, 1.0);
            
            // Output the adjusted color
            gl_FragColor = color;
        }
    `,
    cannyEdgeDetection: `
        precision highp float;
        varying vec2 vTexCoord;
        uniform sampler2D tex0;
        uniform vec2 canvasSize;
        uniform float thresholdLow;
        uniform float thresholdHigh;

        void main() {
            vec2 texOffset = 1.0 / canvasSize;
            
            // Sample surrounding pixels
            float TL = texture2D(tex0, vTexCoord + texOffset * vec2(-1.0, -1.0)).r;
            float TC = texture2D(tex0, vTexCoord + texOffset * vec2( 0.0, -1.0)).r;
            float TR = texture2D(tex0, vTexCoord + texOffset * vec2( 1.0, -1.0)).r;
            float CL = texture2D(tex0, vTexCoord + texOffset * vec2(-1.0,  0.0)).r;
            float CC = texture2D(tex0, vTexCoord).r;
            float CR = texture2D(tex0, vTexCoord + texOffset * vec2( 1.0,  0.0)).r;
            float BL = texture2D(tex0, vTexCoord + texOffset * vec2(-1.0,  1.0)).r;
            float BC = texture2D(tex0, vTexCoord + texOffset * vec2( 0.0,  1.0)).r;
            float BR = texture2D(tex0, vTexCoord + texOffset * vec2( 1.0,  1.0)).r;
            
            // Sobel filter for edge detection
            float Gx = -TL - 2.0 * CL - BL + TR + 2.0 * CR + BR;
            float Gy = -TL - 2.0 * TC - TR + BL + 2.0 * BC + BR;
            
            float edgeMagnitude = length(vec2(Gx, Gy));
            
            // Apply thresholding
            float edge = smoothstep(thresholdLow, thresholdHigh, edgeMagnitude);
            
            gl_FragColor = vec4(vec3(edge), 1.0);
        }
    `,	
    cartoon:
    `
        precision highp float;
        varying vec2 vTexCoord;
        uniform sampler2D tex0;
        uniform float edgeThreshold;

        void main() {
            vec2 tc = vTexCoord.st;
            
            // Sample the center pixel color
            vec4 centerColor = texture2D(tex0, tc);
            
            // Sample the neighbors with slightly different texture coordinates
            vec4 neighborColor1 = texture2D(tex0, tc + vec2(0.01, 0.0));
            vec4 neighborColor2 = texture2D(tex0, tc - vec2(0.01, 0.0));
            vec4 neighborColor3 = texture2D(tex0, tc + vec2(0.0, 0.01));
            vec4 neighborColor4 = texture2D(tex0, tc - vec2(0.0, 0.01));

            // Calculate the average difference
            float delta = length(centerColor.rgb - (neighborColor1.rgb + neighborColor2.rgb + neighborColor3.rgb + neighborColor4.rgb) / 4.0);
            
            // If the difference is above the threshold, it's an edge pixel
            if (delta > edgeThreshold) {
                // Darken the edge pixels
                gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
            } else {
                // Keep non-edge pixels the same
                gl_FragColor = centerColor;
            }
        }
    `,
    contrast:
    `
        precision highp float;
        varying vec2 vTexCoord;
        uniform sampler2D tex0;
        uniform float contrast;
        
        
        void main() {
            vec2 tc = vTexCoord.st;
            
            // Sample the original color
            vec4 color = texture2D(tex0, tc);
            
            // Adjust contrast
            color.rgb = (color.rgb - 0.5) * contrast + 0.5;
            
            color.rgb = clamp(color.rgb, 0.0, 1.0);
            
            // Output the adjusted color
            gl_FragColor = color;
        }
    `,
    crt:
    `
        precision highp float;

        varying vec2 vTexCoord;
        uniform sampler2D tex0;
        uniform float time;
        uniform vec2 canvasSize;

        void main() {
            vec2 uv = vTexCoord;

            // Curvature effect
            vec2 curvedUV = uv;
            curvedUV -= 0.5;
            curvedUV += 0.5;

            // Sample the original texture
            vec3 color = texture2D(tex0, curvedUV).rgb;

            // Scanline effect: creates a striped pattern
            float scanlineFactor = sin(uv.y * canvasSize.y * 3.0 + time * 5.0);
            scanlineFactor = smoothstep(0.4, 0.6, scanlineFactor); // Smoothing out scanlines
            color *= scanlineFactor;  // Apply the scanline effect

            // Apply chromatic aberration (optional)
            float aberrationAmount = 0.008;
            float r = color.r;
            float g = texture2D(tex0, curvedUV + vec2(aberrationAmount, 0.0)).g;
            float b = texture2D(tex0, curvedUV + vec2(aberrationAmount, 0.0)).b;

            gl_FragColor = vec4(r, g, b, 1.0);
        }
    `,
    deform:
    `
        precision highp float;
        varying vec2 vTexCoord;
        uniform sampler2D tex0;
        uniform float deformationAmount;
        
        
        void main() {
            vec2 tc = vTexCoord.st;
            
            // Sample the original color
            vec4 color = texture2D(tex0, tc);
            
            // Calculate deformation
            vec2 deform = vec2(sin(tc.y * 10.0) * deformationAmount, 0.0);
            
            // Apply deformation to texture coordinates
            tc += deform;
            
            // Sample the deformed pixel color
            vec4 deformedColor = texture2D(tex0, tc);
            
            // Output the deformed color
            gl_FragColor = deformedColor;
        }
    `,
    differenceOfGaussian:
    `
        precision highp float;
        varying vec2 vTexCoord;
        uniform vec2 canvasSize;
        uniform sampler2D tex0;
        uniform float radius1;
        uniform float radius2;
        
        void main() {
            vec2 tc = vTexCoord.st;
            
            // Sample the original color
            vec4 centerColor = texture2D(tex0, tc);
            
            // Calculate the DoG filter values
            float sigma1 = radius1 / 3.0;
            float sigma2 = radius2 / 3.0;
            
            vec4 blurred1 = texture2D(tex0, tc - vec2(1.5) / canvasSize.xy);
            vec4 blurred2 = texture2D(tex0, tc + vec2(1.5) / canvasSize.xy);
            
            float intensity1 = dot(blurred1.rgb, vec3(0.2126, 0.7152, 0.0722));
            float intensity2 = dot(blurred2.rgb, vec3(0.2126, 0.7152, 0.0722));
            
            // Calculate the DoG (difference of Gaussian)
            float dog = intensity1 - intensity2;
            
            // Output the final color
            gl_FragColor = vec4(vec3(dog), centerColor.a);
        }
    `,
    dilate:
    `
        precision highp float;
        varying vec2 vTexCoord;
        uniform sampler2D tex0;
        uniform vec2 canvasSize;


        void main() {
            vec2 tc = vTexCoord.st;
            
            // Center pixel
            vec4 centerColor = texture2D(tex0, tc);
            // Neighboring pixels
            vec4 leftColor = texture2D(tex0, tc + vec2(-1.0, 0.0) / canvasSize);
            vec4 rightColor = texture2D(tex0, tc + vec2(1.0, 0.0) / canvasSize);
            vec4 topColor = texture2D(tex0, tc + vec2(0.0, 1.0) / canvasSize);
            vec4 bottomColor = texture2D(tex0, tc + vec2(0.0, -1.0) / canvasSize);
            
            // Combine the neighboring pixels to dilate the image
            vec4 dilatedColor = max(centerColor, max(leftColor, max(rightColor, max(topColor, bottomColor))));
                
            // Output the dilated color
            gl_FragColor = dilatedColor;
        }
    `,
    dithering:
    `
        precision highp float;

        varying vec2 vTexCoord;
        uniform sampler2D tex0;
        uniform float dotSize;
        uniform float threshold;

        vec4 dither(float gray, vec2 coords) {
            // Generate a random value for dithering using coordinates
            float noise = fract(sin(dot(coords.xy, vec2(12.9898, 78.233))) * 43758.5453);

            // Apply dithering noise
            gray += (noise - 0.5) * 0.1;  // Small dithering adjustment
            return vec4(vec3(step(threshold, gray)), 1.0);
        }

        void main() {
            vec2 tc = vTexCoord.st;

            // Sample the original color from the texture
            vec4 originalColor = texture2D(tex0, tc);
            
            // Convert the color to grayscale using the luminosity method
            float gray = dot(originalColor.rgb, vec3(0.299, 0.587, 0.114));

            // Create a grid-like structure based on the dotSize
            vec2 dotCoord = floor(tc / dotSize) * dotSize;  // Grid position for dithering effect
            vec2 dotCenter = dotCoord + dotSize * 0.5;  // Center of the current dot
            
            // Calculate the distance from the current fragment to the dot center
            float distanceToCenter = distance(tc, dotCenter);

            // Create a circular mask for each dot
            float circularPattern = smoothstep(0.0, 0.5, 1.0 - distanceToCenter / (dotSize * 0.5));
            
            // Apply dithering to the grayscale value with a random noise component
            gray = gray * circularPattern;  // Use the circular pattern to mask the gray value
            gl_FragColor = dither(gray, tc);  // Apply dithering based on the gray value
        }
    `,
    dot:
    `
        precision highp float;
        varying vec2 vTexCoord;
        uniform sampler2D tex0;
        uniform float dotSize;


        void main() {
            vec2 tc = vTexCoord.st;
            
            vec4 color = texture2D(tex0, tc);

            // Calculate dot matrix coordinates
            vec2 dotCoord = floor(tc / dotSize) * dotSize;

            // Calculate the center of the dot
            vec2 dotCenter = dotCoord + dotSize * 0.5;

            // Calculate the distance from the current pixel to the dot center
            float distanceToCenter = distance(tc, dotCenter);

            // Use the distance to create a circular pattern
            float circularPattern = smoothstep(0.0, 0.5, 1.0 - distanceToCenter / (dotSize * 0.5));

            // Sample the color at dot matrix position with circular pattern
            vec4 dotColor = texture2D(tex0, dotCoord) * circularPattern;

            // Output the dot matrix color
            gl_FragColor = dotColor;
        }
    `,
    duoTone:
    `
        precision highp float;
        varying vec2 vTexCoord;
        uniform sampler2D tex0;
        uniform vec3 tone1;
        uniform vec3 tone2;


        void main() {
            vec2 uv = vTexCoord.st;

            // Sample the pixel color
            vec4 color = texture2D(tex0, uv);

            // Calculate the luminance of the current pixel color
            float luminance = dot(color.rgb, vec3(0.299, 0.587, 0.114));

            // Choose the tone based on luminance
            vec3 duotoneColor = mix(tone1, tone2, luminance);

            // Output the adjusted color
            gl_FragColor = vec4(duotoneColor, color.a);
        }
    `,
    edgePreservingSmooth:
    `
        precision highp float;
        varying vec2 vTexCoord;
        uniform sampler2D tex0;
        uniform vec2 canvasSize;
        uniform float threshold;

        void main(void) {
            // Calculate the dynamic texOffset based on the texture size
            vec2 texOffset = 1.0 / canvasSize;
            
            vec2 tc0 = vTexCoord.st + vec2(-texOffset.s, -texOffset.t);
            vec2 tc1 = vTexCoord.st + vec2(0.0, -texOffset.t);
            vec2 tc2 = vTexCoord.st + vec2(texOffset.s, -texOffset.t);
            vec2 tc3 = vTexCoord.st + vec2(-texOffset.s, 0.0);
            vec2 tc4 = vTexCoord.st + vec2(0.0, 0.0);
            vec2 tc5 = vTexCoord.st + vec2(texOffset.s, 0.0);
            vec2 tc6 = vTexCoord.st + vec2(-texOffset.s, texOffset.t);
            vec2 tc7 = vTexCoord.st + vec2(0.0, texOffset.t);
            vec2 tc8 = vTexCoord.st + vec2(texOffset.s, texOffset.t);
            
            vec4 col0 = texture2D(tex0, tc0);
            vec4 col1 = texture2D(tex0, tc1);
            vec4 col2 = texture2D(tex0, tc2);
            vec4 col3 = texture2D(tex0, tc3);
            vec4 col4 = texture2D(tex0, tc4);
            vec4 col5 = texture2D(tex0, tc5);
            vec4 col6 = texture2D(tex0, tc6);
            vec4 col7 = texture2D(tex0, tc7);
            vec4 col8 = texture2D(tex0, tc8);

            // Compute the local average of the pixels
            vec4 localAverage = (col0 + col1 + col2 + col3 + col4 + col5 + col6 + col7 + col8) / 9.0;

            // Calculate the difference between the central pixel and the local average
            vec4 difference = col4 - localAverage;

            // If the difference is greater than the threshold, keep the original pixel color; otherwise, use the local average
            gl_FragColor = mix(localAverage, col4, step(threshold, length(difference.rgb)));
        }
    `,
    emboss:
    `
        precision highp float;
        varying vec2 vTexCoord;
        uniform sampler2D tex0;
        uniform vec2 canvasSize;

        void main(void) {
            // Calculate the dynamic texOffset based on the texture size
            vec2 texOffset = 1.0 / canvasSize;
            
            vec2 tc = vTexCoord.st;

            // Sample the current pixel and the neighboring pixels
            vec4 currentColor = texture2D(tex0, tc);
            vec4 leftColor = texture2D(tex0, tc - texOffset);
            vec4 rightColor = texture2D(tex0, tc + texOffset);

            // Calculate the gradient by subtracting leftColor from rightColor
            vec4 gradient = rightColor - leftColor;

            // Normalize the gradient to make it visible
            vec4 embossColor = gradient * 0.5 + 0.5;

            // Set the output color with the original vertex color
            gl_FragColor = embossColor;
        }
    `,
    erosion:
    `
        precision highp float;
        varying vec2 vTexCoord;
        uniform sampler2D tex0;
        uniform vec2 canvasSize;
        const int radius = 3;

        void main(void) {
            vec2 pixelSize = 1.0 / canvasSize;
            vec4 centerColor = texture2D(tex0, vTexCoord.st);
            
            // Calculate the dynamic texOffset based on the texture size
            vec2 texOffset = 1.0 / canvasSize;

            // Define the structuring element (3x3 kernel)
            int kernelSize = radius * 2 + 1;
            float minVal = 1.0; // Initialize minVal to maximum possible value

            for (int i = -radius; i <= radius; i++) {
                for (int j = -radius; j <= radius; j++) {
                vec2 sampleTexCoord = vTexCoord.st + vec2(float(i), float(j)) * texOffset;
                vec4 sampleColor = texture2D(tex0, sampleTexCoord);
                float sampleValue = (sampleColor.r + sampleColor.g + sampleColor.b) / 3.0; // Convert to grayscale

                // Apply erosion using the structuring element
                minVal = min(minVal, sampleValue);
                }
            }

            gl_FragColor = vec4(minVal, minVal, minVal, centerColor.a);
        }
    `,	
    flip:
    `
        precision highp float;
        varying vec2 vTexCoord;
        uniform sampler2D tex0;
        uniform bool flipHorizontal;
        uniform bool flipVertical;
        
        void main() {
            vec2 tc = vec2(flipHorizontal ? 1.0 - vTexCoord.s : vTexCoord.s,
                            flipVertical ? 1.0 - vTexCoord.t : vTexCoord.t);
            vec4 color = texture2D(tex0, tc);
            
            gl_FragColor = color;
        }
    `, 
    gamma:
    `
        precision highp float;
        varying vec2 vTexCoord;
        uniform sampler2D tex0;
        uniform float gamma;
        
        
        void main() {
            vec2 tc = vTexCoord.st;
            
            // Sample the color from the texture
            vec4 color = texture2D(tex0, tc);
            
            // Apply gamma correction
            vec3 gammaCorrected = pow(color.rgb, vec3(1.0 / gamma));
            
            // Output the corrected color
            gl_FragColor = vec4(gammaCorrected, color.a);
        }
    `,
    gaussianBlur:
    `
        precision highp float;
        varying vec2 vTexCoord;
        uniform sampler2D tex0;
        uniform vec2 canvasSize;
        uniform float blurRadius;  // New parameter to control blur size

        void main(void) {
            // Calculate the dynamic texOffset based on the texture size and blurRadius
            vec2 texOffset = blurRadius / canvasSize;
            
            // Sample points based on the blur radius
            vec2 tc0 = vTexCoord.st + vec2(-texOffset.s, -texOffset.t);
            vec2 tc1 = vTexCoord.st + vec2(0.0, -texOffset.t);
            vec2 tc2 = vTexCoord.st + vec2(texOffset.s, -texOffset.t);
            vec2 tc3 = vTexCoord.st + vec2(-texOffset.s, 0.0);
            vec2 tc4 = vTexCoord.st + vec2(0.0, 0.0);
            vec2 tc5 = vTexCoord.st + vec2(texOffset.s, 0.0);
            vec2 tc6 = vTexCoord.st + vec2(-texOffset.s, texOffset.t);
            vec2 tc7 = vTexCoord.st + vec2(0.0, texOffset.t);
            vec2 tc8 = vTexCoord.st + vec2(texOffset.s, texOffset.t);
            
            // Sample the colors at the given offsets
            vec4 col0 = texture2D(tex0, tc0);
            vec4 col1 = texture2D(tex0, tc1);
            vec4 col2 = texture2D(tex0, tc2);
            vec4 col3 = texture2D(tex0, tc3);
            vec4 col4 = texture2D(tex0, tc4);
            vec4 col5 = texture2D(tex0, tc5);
            vec4 col6 = texture2D(tex0, tc6);
            vec4 col7 = texture2D(tex0, tc7);
            vec4 col8 = texture2D(tex0, tc8);
            
            // Weighted sum of all the neighboring pixels for blur
            vec4 sum = (1.0 * col0 + 2.0 * col1 + 1.0 * col2 +  
                        2.0 * col3 + 4.0 * col4 + 2.0 * col5 +
                        1.0 * col6 + 2.0 * col7 + 1.0 * col8) / 16.0;
            
            // Output the blurred color
            gl_FragColor = vec4(sum.rgb, 1.0);
        }
    `,
    glitch:
    `
        precision highp float;
        varying vec2 vTexCoord;
        uniform sampler2D tex0;
        uniform float glitchIntensity;
        
        void main() {
            vec2 tc = vTexCoord.st;
        
            // Sample the original pixel color
            vec4 originalColor = texture2D(tex0, tc);
        
            // Separate RGB channels with glitch displacement
            float redChannel = texture2D(tex0, tc + vec2(glitchIntensity * 0.01, 0.0)).r;
            float greenChannel = texture2D(tex0, tc - vec2(0.0, glitchIntensity * 0.01)).g;
            float blueChannel = texture2D(tex0, tc + vec2(0.0, glitchIntensity * 0.01)).b;
        
            // Combine the glitched channels
            vec4 glitchedColor = vec4(redChannel, greenChannel, blueChannel, 1.0);
        
            // Mix the original and glitched colors
            vec4 finalColor = mix(originalColor, glitchedColor, glitchIntensity);
        
            // Output the final color with the vertex color
            gl_FragColor = finalColor;
        }
    `,
    grayscale:
    `
        precision highp float;
        varying vec2 vTexCoord;
        uniform sampler2D tex0;
        
        
        void main() {
            vec2 tc = vTexCoord.st;
            vec4 color = texture2D(tex0, tc);
            
            // Calculate the grayscale value for each pixel
            float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
            
            // Create a grayscale color by using the grayscale value for all color channels
            gl_FragColor = vec4(vec3(gray), color.a);
        }
    `,
    halftone:
    `
        precision highp float;
        varying vec2 vTexCoord;
        uniform sampler2D tex0;
        uniform vec2 canvasSize;
        uniform float cellSize;
        uniform float threshold;
        
        void main() {
            vec2 tc = vTexCoord.st;
        
            // Convert the texture coordinates to screen space
            vec2 screenCoord = tc * canvasSize;
        
            // Calculate the position of the current cell
            vec2 cellPos = floor(screenCoord / cellSize) * cellSize;
            
            // Calculate the center of the cell
            vec2 cellCenter = cellPos + 0.5 * cellSize;
            
            // Calculate the vector from the current pixel to the center of the cell
            vec2 diff = screenCoord - cellCenter;
            
            // Calculate the distance from the current pixel to the center of the cell
            float distanceToCenter = length(diff);
            
            // Calculate the radius of the dot (based on intensity)
            float radius = 0.5 * cellSize * (1.0 - texture2D(tex0, tc).r);
            
            if (distanceToCenter <= radius - threshold) {
                // Inside the dot, set the color to black
                gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
            } else {
                // Outside the dot, set the color to white
                gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
            }
        }
    `,
    invertColors:
    `
       precision highp float;
        varying vec2 vTexCoord;
        uniform sampler2D tex0;

        void main() {
            vec2 tc = vTexCoord.st;
            
            // Sample the color from the texture
            vec4 color = texture2D(tex0, tc);

            // Invert the color by subtracting it from 1.0
            vec3 invertedColor = 1.0 - color.rgb;

            // Set the output color with the inverted color and the original vertex color
            gl_FragColor = vec4(invertedColor, color.a);
        }
    `,
    kuwahara:
    `
        precision highp float;
        varying vec2 vTexCoord;
        uniform sampler2D tex0;
        uniform vec2 canvasSize;
        
        const int kernelSize = 7;
        
        void main() {
            vec2 tc = vTexCoord.st;
                
            // Calculate the dynamic texOffset based on the texture size
            vec2 texOffset = 1.0 / canvasSize;
            
            // Initialize variables for the four quadrants
            vec4 q1 = vec4(0.0);
            vec4 q2 = vec4(0.0);
            vec4 q3 = vec4(0.0);
            vec4 q4 = vec4(0.0);
            
            // Sample pixels for each quadrant
                for (int i = 0; i < kernelSize; i++) {
                    for (int j = 0; j < kernelSize; j++) {
                        vec4 color = texture2D(tex0, tc + vec2(i, j) * texOffset);
                        
                        if (i < kernelSize / 2) {
                            if (j < kernelSize / 2) {
                                q1 += color;
                            } else {
                                q2 += color;
                            }
                        } else {
                            if (j < kernelSize / 2) {
                                q3 += color;
                            } else {
                                q4 += color;
                            }
                        }
                    }
                }
                
                // Average colors in each quadrant
                q1 /= float(kernelSize * kernelSize / 4);
                q2 /= float(kernelSize * kernelSize / 4);
                q3 /= float(kernelSize * kernelSize / 4);
                q4 /= float(kernelSize * kernelSize / 4);
                
                // Find the standard deviation of colors in each quadrant
                vec4 meanColor = (q1 + q2 + q3 + q4) / 4.0;
                float varianceQ1 = dot(q1 - meanColor, q1 - meanColor);
                float varianceQ2 = dot(q2 - meanColor, q2 - meanColor);
                float varianceQ3 = dot(q3 - meanColor, q3 - meanColor);
                float varianceQ4 = dot(q4 - meanColor, q4 - meanColor);
                
                float minVariance = min(min(varianceQ1, varianceQ2), min(varianceQ3, varianceQ4));
                
                // Output the color with minimum variance
                vec4 resultColor;
                if (minVariance == varianceQ1) {
                    resultColor = q1;
                } else if (minVariance == varianceQ2) {
                    resultColor = q2;
                } else if (minVariance == varianceQ3) {
                    resultColor = q3;
                } else {
                    resultColor = q4;
                }
                
                // Output the smoothed color
                gl_FragColor = resultColor;
        }
    `,
    laplacianEdgeEnhancement:
    `
        precision highp float;
        varying vec2 vTexCoord;
        uniform sampler2D tex0;
        uniform vec2 canvasSize;
        uniform float amount;
        
        void main() {
            vec2 tc = vTexCoord.st;
            
            // Calculate the dynamic texOffset based on the texture size
            vec2 texOffset = 1.0 / canvasSize;
        
            // Sample the center pixel
            vec4 centerColor = texture2D(tex0, tc);
            
            // Sample the surrounding pixels
            vec4 leftColor = texture2D(tex0, tc - texOffset);
            vec4 rightColor = texture2D(tex0, tc + texOffset);
            vec4 topColor = texture2D(tex0, tc - vec2(0.0, texOffset.t));
            vec4 bottomColor = texture2D(tex0, tc + vec2(0.0, texOffset.t));
            
            // Calculate the enhanced color
            vec4 enhancedColor = centerColor + (centerColor - (leftColor + rightColor + topColor + bottomColor) / 4.0) * amount;
            
            // Output the enhanced color
            gl_FragColor = enhancedColor;
        }
    `,
    linocut:
    `
        precision highp float;
        varying vec2 vTexCoord;
        uniform sampler2D tex0;
        uniform float threshold;
        uniform vec3 inkColor;
        uniform vec3 paperColor;
        
        
        void main() {
            vec2 uv = vTexCoord.st;
        
            // Sample the pixel color
            vec4 color = texture2D(tex0, uv);
        
            // Convert to grayscale
            float grayscale = dot(color.rgb, vec3(0.299, 0.587, 0.114));
        
            // Apply a simple threshold
            float linocut = step(threshold, grayscale);
        
            // Mix ink color and paper color based on the linocut effect
            color.rgb = mix(paperColor, inkColor, linocut);  
        
            // Output the adjusted color
            gl_FragColor = color;
        }
    `,
    mosaic:
    `
        precision highp float;
        varying vec2 vTexCoord;
        uniform sampler2D tex0;
        uniform float mosaicSize;
        
        
        void main() {
            vec2 tc = vTexCoord.st;
                
            // Calculate the position of the mosaic cell
            vec2 mosaicCell = floor(tc * mosaicSize) / mosaicSize;
                
            // Sample the color from the mosaic cell
            vec4 mosaicColor = texture2D(tex0, mosaicCell);
                
            // Output the color of the mosaic cell
            gl_FragColor = mosaicColor;
        }
    `,
    motionBlur:
    `
        precision highp float;
        varying vec2 vTexCoord;
        uniform sampler2D tex0;
        uniform vec2 canvasSize;
            
        void main(){
            const float blurAmount = 10.0;
            
            // Calculate the dynamic texOffset based on the texture size
            vec2 texOffset = 1.0 / canvasSize;
            
            // Calculate the texture coordinates for sampling
            vec2 tc = vTexCoord.st - texOffset * blurAmount;
            // Initialize the color accumulator
            vec4 sum = texture2D(tex0, tc);
            
            // Sample multiple times along the motion direction and accumulate colors
            for (float i = 1.0; i < blurAmount; i += 1.0) {
                tc -= texOffset;
                sum += texture2D(tex0, tc);
            }
            
            // Calculate the final blurred color by averaging the samples
            vec4 blurredColor = sum / blurAmount;
            
            // Set the output color with the original vertex color
            gl_FragColor = blurredColor;
        }
    `,
    pixelate:
    `
        precision highp float;
        varying vec2 vTexCoord;
        uniform sampler2D tex0;
        uniform float pixelSize;
        
        void main() {
            vec2 tc = vTexCoord.st;
            
            // Calculate the position in the pixel grid
            vec2 pixelPos = vec2(floor(tc.x / pixelSize) * pixelSize, floor(tc.y / pixelSize) * pixelSize);
            
            // Sample the color at the pixel position
            vec4 pixelColor = texture2D(tex0, pixelPos);
            // Output the pixelated color
            gl_FragColor = pixelColor;
        }
    `,
    quantization:
    `
        precision highp float;
        varying vec2 vTexCoord;
        uniform sampler2D tex0;
        uniform float shades;
        
        
        void main() {
            vec2 tc = vTexCoord.st;
            
            // Sample the original color
            vec4 color = texture2D(tex0, tc);
            
            // Quantize the color values
            color.rgb = floor(color.rgb * shades) / (shades - 1.0);
            
            // Output the adjusted color
            gl_FragColor = color;
        }
    `,
    ripple:
    `
        precision highp float;
        varying vec2 vTexCoord;
        uniform vec2 canvasSize;
        uniform sampler2D tex0;
        uniform float rippleFrequency;
        uniform float rippleAmplitude;
        
        void main() {
            vec2 uv = vTexCoord.st;
            
            // Center coordinates of the screen with offset
            vec2 center = canvasSize / 2.0;
                
            // Calculate the distance from the current pixel to the center
            float distance = length(uv - center);
                
            // Calculate the ripple effect using sine function with parameters
            float ripple = sin(distance * rippleFrequency) * rippleAmplitude;
                
            // Offset the texture coordinate based on the ripple effect
            vec2 tc = uv + ripple;
                
            // Sample the pixel color
            vec4 color = texture2D(tex0, tc);
                
            // Output the adjusted color
            gl_FragColor = color;
        }
    `,
    rotate:
    `
        precision highp float;
        varying vec2 vTexCoord;
        uniform sampler2D tex0;
        uniform float rotationAngle; // Rotation angle in degrees
        
        void main() {
            // Convert rotation angle to radians
            float angleRad = radians(rotationAngle);
            
            // Calculate rotated texture coordinates
            vec2 rotatedTexCoord = vec2(
                cos(angleRad) * (vTexCoord.s - 0.5) + sin(angleRad) * (vTexCoord.t - 0.5) + 0.5,
                -sin(angleRad) * (vTexCoord.s - 0.5) + cos(angleRad) * (vTexCoord.t - 0.5) + 0.5
            );
            
            if (rotatedTexCoord.x < 0.0 || rotatedTexCoord.x > 1.0 || rotatedTexCoord.y < 0.0 || rotatedTexCoord.y > 1.0) {
                // If outside the texture bounds, make the pixel transparent
                gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
            } else {
                // Sample the color from the original texture at the rotated coordinates
                gl_FragColor = texture2D(tex0, rotatedTexCoord);
            }
        }
    `,
    saturation:
    `
        precision highp float;
        varying vec2 vTexCoord;
        uniform sampler2D tex0;
        uniform float saturation;
        
        
        void main() {
            vec2 tc = vTexCoord.st;
            
            // Sample the original color
            vec4 originalColor = texture2D(tex0, tc);
            
            // Convert to grayscale (luminance)
            float luminance = dot(originalColor.rgb, vec3(0.2126, 0.7152, 0.0722));
            
            // Interpolate between the original color and grayscale based on saturation
            vec4 saturatedColor = mix(vec4(luminance), originalColor, saturation);
            
            // Output the final color
            gl_FragColor = saturatedColor;
        }
    `,
    sepia:
    `
        precision highp float;

        /*
            Followed: https://stackoverflow.com/questions/36434905/processing-an-image-to-sepia-tone-in-python
        */
        
        varying vec2 vTexCoord;
        uniform sampler2D tex0;
        
        void main() {
            vec2 tc = vTexCoord.st;
            
            // Sample the texture color
            vec4 color = texture2D(tex0, tc);
            
            // Convert to grayscale
            float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
            
            // Sepia tone transformation
            vec3 sepiaColor = vec3(gray * 1.2, gray * 0.9, gray * 0.7);
            
            // Output the sepia-toned color
            gl_FragColor = vec4(vec3(sepiaColor), color.a);
        }
    `,
    sharpen:
    `
        precision highp float;
        varying vec2 vTexCoord;
        uniform sampler2D tex0;
        uniform vec2 canvasSize;
        uniform float sharpness;
        
        void main() {
            // Center pixel
            vec4 centerColor = texture2D(tex0, vTexCoord);
        
            // Neighboring pixels
            vec4 topColor = texture2D(tex0, vTexCoord + vec2(0.0, 1.0) / canvasSize);
            vec4 bottomColor = texture2D(tex0, vTexCoord + vec2(0.0, -1.0) / canvasSize);
            vec4 leftColor = texture2D(tex0, vTexCoord + vec2(-1.0, 0.0) / canvasSize);
            vec4 rightColor = texture2D(tex0, vTexCoord + vec2(1.0, 0.0) / canvasSize);
        
            // Calculate the sharpened color
            vec4 sharpenedColor = centerColor * (1.0 + 4.0 * sharpness) - sharpness * (topColor + bottomColor + leftColor + rightColor);
        
            gl_FragColor = sharpenedColor;
        }
    `,
    sketch:
    `
        precision highp float;
        varying vec2 vTexCoord;
        uniform sampler2D tex0;
        uniform vec2 canvasSize;
        uniform float threshold;
        
        void main() {
            vec2 tc = vTexCoord.st;
            
            // Calculate the dynamic texOffset based on the texture size
            vec2 texOffset = 1.0 / canvasSize;
            
            // Sample the surrounding pixels
            vec4 centerColor = texture2D(tex0, tc);
            vec4 leftColor = texture2D(tex0, tc - texOffset);
            vec4 rightColor = texture2D(tex0, tc + texOffset);
            vec4 topColor = texture2D(tex0, tc - vec2(0.0, texOffset.t));
            vec4 bottomColor = texture2D(tex0, tc + vec2(0.0, texOffset.t));
            
            // Apply the Sobel operator for edge detection
            float horizontalGradient = -leftColor.r + rightColor.r - topColor.r + bottomColor.r;
            float verticalGradient = -leftColor.r - rightColor.r + topColor.r + bottomColor.r;
            
            // Combine gradients to detect edges
            float edgeIntensity = sqrt(horizontalGradient * horizontalGradient + verticalGradient * verticalGradient);
            
            // Apply the threshold to create ink-like effect
            vec4 inkColor = edgeIntensity > threshold ? vec4(0.0, 0.0, 0.0, 1.0) : vec4(1.0, 1.0, 1.0, 1.0);
            
            // Output the ink drawing color
            gl_FragColor = inkColor;
        }
    `,
    sobelEdgeDetection:
    `
        precision highp float;
        varying vec2 vTexCoord;
        uniform sampler2D tex0;
        uniform vec2 canvasSize;
        uniform float threshold;
        
        void main() {
            vec2 tc = vTexCoord.st;
        
            // Calculate the dynamic texOffset based on the texture size
            vec2 texOffset = 1.0 / canvasSize;
            
            // Sample the surrounding pixels
            vec4 centerColor = texture2D(tex0, tc);
            vec4 leftColor = texture2D(tex0, tc - texOffset);
            vec4 rightColor = texture2D(tex0, tc + texOffset);
            vec4 topColor = texture2D(tex0, tc - vec2(0.0, texOffset.t));
            vec4 bottomColor = texture2D(tex0, tc + vec2(0.0, texOffset.t));
            
            // Calculate the intensity gradients
            float horizontalGradient = length(leftColor - rightColor);
            float verticalGradient = length(topColor - bottomColor);
            
            // Combine gradients to detect edges
            float edgeIntensity = sqrt(horizontalGradient * horizontalGradient + verticalGradient * verticalGradient);
            
            // Apply the threshold to highlight edges
            vec4 edgeColor = edgeIntensity > threshold ? vec4(1.0, 1.0, 1.0, 1.0) : vec4(0.0, 0.0, 0.0, 1.0);
            
            // Output the edge-detected color
            gl_FragColor = edgeColor;
        }
    `,
    solarize:
    `
        precision highp float;
        varying vec2 vTexCoord;
        uniform sampler2D tex0;
        uniform float threshold;
        
        
        void main() {
            vec2 tc = vTexCoord.st;
            
            // Sample the original color
            vec4 color = texture2D(tex0, tc);
            
            // Calculate the average intensity of the pixel color
            float intensity = (color.r + color.g + color.b) / 3.0;
            
            // Invert colors if intensity is above a threshold
                if (intensity > threshold) {
                    color.rgb = 1.0 - color.rgb;
                }
            
            // Output the adjusted color
            gl_FragColor = color;
        }
    `,
    static:
    `
        precision highp float;
        varying vec2 vTexCoord;
        uniform sampler2D tex0;
        uniform vec2 canvasSize;
        uniform float threshold;
        uniform float stippleDensity;
        
        // Function to generate a random number between 0 and 1
        float rand(vec2 co) {
        return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
        }
        
        void main() {
            vec2 tc = vTexCoord.st;
            
            // Calculate the dynamic texOffset based on the texture size
            vec2 texOffset = 1.0 / canvasSize;
                
            // Sample the surrounding pixels
            vec4 centerColor = texture2D(tex0, tc);
            vec4 leftColor = texture2D(tex0, tc - texOffset);
            vec4 rightColor = texture2D(tex0, tc + texOffset);
            vec4 topColor = texture2D(tex0, tc - vec2(0.0, texOffset.t));
            vec4 bottomColor = texture2D(tex0, tc + vec2(0.0, texOffset.t));
                
            // Calculate the intensity gradients
            float horizontalGradient = length(leftColor - rightColor);
            float verticalGradient = length(topColor - bottomColor);
                
            // Combine gradients to detect edges
            float edgeIntensity = sqrt(horizontalGradient * horizontalGradient + verticalGradient * verticalGradient);
            
            // Apply the threshold to create ink-like effect
            vec4 inkColor = edgeIntensity > threshold ? vec4(0.0, 0.0, 0.0, 1.0) : vec4(1.0, 1.0, 1.0, 1.0);
            
            // Stippling: Add random dots to the ink color
            float stipple = rand(tc);
            inkColor.rgb *= smoothstep(1.0 - stippleDensity, 1.0, stipple);
            
            // Output the stippled ink drawing color
            gl_FragColor = inkColor;
        }
    `,
    threshold:
    `
        precision highp float;
        varying vec2 vTexCoord;
        uniform sampler2D tex0;
        uniform float threshold;
        
        void main() {
            vec2 tc = vTexCoord.st;
            
            // Sample the original color
            vec4 originalColor = texture2D(tex0, tc);
            
            // Convert to grayscale (luminance)
            float luminance = dot(originalColor.rgb, vec3(0.2126, 0.7152, 0.0722));
            
            // Apply threshold
            vec4 thresholdedColor = vec4(vec3(step(threshold, luminance)), originalColor.a);
            
            // Output the final color
            gl_FragColor = thresholdedColor;
        }
    `,
    unsharpMasking:
    `
        precision highp float;
        varying vec2 vTexCoord;
        uniform sampler2D tex0;
        uniform float strength;
        uniform vec2 canvasSize;
        
        void main() {
            vec2 tc = vTexCoord.st;
            
            // Sample the original color
            vec4 originalColor = texture2D(tex0, tc);
            
            // Calculate the dynamic texOffset based on the texture size
            vec2 texOffset = 1.0 / canvasSize;
            
            // Sample a blurred version of the image
                vec4 blurredColor = texture2D(tex0, vTexCoord.st + vec2(-texOffset.s, -texOffset.t));
            
            // Calculate the difference between the original and blurred image
            vec4 difference = originalColor - blurredColor;
                
            // Enhance the difference to sharpen the image (unsharp masking)
            vec4 sharpenedColor = originalColor + difference * strength;
                
            gl_FragColor = sharpenedColor;
        }
    `,
    vignette:
    `
        precision highp float;
        varying vec2 vTexCoord;
        uniform sampler2D tex0;
        
        uniform vec2 canvasSize;
        uniform float vignetteStrength; // 0.0 (none) to 1.0 (maximum)
        uniform float vignetteFalloff; // Rate at which the vignette diminishes
        uniform float vignetteSign;    // -1.0 (inward) or 1.0 (outward)
        uniform float vignetteSize;     // Overall size of the vignette
        
        
        void main() {
            vec2 texSize = canvasSize;
            
            // Calculate the center position of the image
            vec2 center = vec2(texSize.x * 0.5, texSize.y * 0.5);
            
            // Calculate the current pixel's position
            vec2 position = vTexCoord.st * texSize;
            
            // Calculate the distance from the center
            float distance = distance(center, position) / length(center);
            
            // Apply the vignette effect based on the distance from the center
            float vignette = 1.0 - pow(distance * vignetteSign, vignetteFalloff) * vignetteStrength;
            
            // Clamp the vignette value to ensure it doesn't go below 0
            vignette = max(vignette, 0.0);
            
            // Apply size to the vignette
            vignette *= smoothstep(0.0, 1.0, 1.0 - distance / vignetteSize);
            
            vec4 color = texture2D(tex0, vTexCoord.st);
            gl_FragColor = vec4(color.rgb * vignette, color.a);
        }
    `
};