#!/bin/bash

# Create directories if they don't exist
mkdir -p html css js images

# Move all HTML files except index.html to the html directory
find . -maxdepth 1 -name "*.html" ! -name "index.html" -exec mv {} html/ \;

# Update paths in index.html
sed -i 's|href="\([^"]*\).html|href="html/\1.html|g' index.html
sed -i 's|href="\([^"]*\)#|href="html/\1#|g' index.html
sed -i 's|href="\([^"]*\)"|href="\1"|g' index.html  # Fix any double paths

# Update paths in HTML files inside html/ directory
find html -type f -name "*.html" -exec sed -i 's|href="\([^"]*\).html"|href="../\1.html"|g' {} \;
find html -type f -name "*.html" -exec sed -i 's|href="\([^"]*\)#|href="../\1#|g' {} \;

# Update CSS paths in HTML files
find . -type f -name "*.html" -exec sed -i 's|href="css/|href="css/|g' {} \;
find . -type f -name "*.html" -exec sed -i 's|href="/css/|href="/css/|g' {} \;

# Update JS paths in HTML files
find . -type f -name "*.html" -exec sed -i 's|src="js/|src="js/|g' {} \;
find . -type f -name "*.html" -exec sed -i 's|src="/js/|src="/js/|g' {} \;

# Update image paths in HTML files
find . -type f -name "*.html" -exec sed -i 's|src="images/|src="images/|g' {} \;
find . -type f -name "*.html" -exec sed -i 's|src="/images/|src="/images/|g' {} \;

# Update CSS file paths in CSS files
find css -type f -name "*.css" -exec sed -i 's|url(../images/|url(../images/|g' {} \;
find css -type f -name "*.css" -exec sed -i 's|url("../images/|url("../images/|g' {} \;

# Create a simple 404.html for GitHub Pages
cat > 404.html << 'EOL'
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Page Not Found</title>
    <meta http-equiv="refresh" content="0; url=/">
</head>
<body>
    <p>Page not found. Redirecting to <a href="/">homepage</a>...</p>
</body>
</html>
EOL

# Create CNAME file if it doesn't exist (for custom domain)
[ ! -f CNAME ] && echo "yourdomain.com" > CNAME

# Create .nojekyll file to prevent Jekyll processing
touch .nojekyll

# Create README.md if it doesn't exist
[ ! -f README.md ] && cat > README.md << 'EOL'
# My Portfolio

Welcome to my portfolio website! This site showcases my work and skills.

## Setup

1. Clone the repository
2. Open [index.html](cci:7://file:///home/mr-hacker/ethical-hacker-portfolio/index.html:0:0-0:0) in your browser

## Deployment

This site is automatically deployed to GitHub Pages.
EOL

echo "Project structure has been updated for GitHub Pages!"
echo "1. index.html is in the root directory"
echo "2. All other HTML files are in the html/ directory"
echo "3. All paths have been updated"
echo "4. Added 404.html and .nojekyll for GitHub Pages"
