from PIL import Image

# Open the image
img = Image.open('public/logo.png')

# Convert to grayscale (black and white)
img_bw = img.convert('L')

# Convert back to RGBA to satisfy Next.js .ico requirements
img_rgba = img_bw.convert('RGBA')

# Resize to standard favicon sizes
img_resized = img_rgba.resize((64, 64), Image.Resampling.LANCZOS)

# Save as .ico
img_resized.save('src/app/favicon.ico', format='ICO', sizes=[(64, 64)])

print("Successfully converted logo.png to an RGBA black and white favicon.ico")
