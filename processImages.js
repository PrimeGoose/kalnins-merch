// processImages.js

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const rootDir = './src/assets';  // Starting directory

// Ensure directory exists or create it
const ensureDir = (dirPath) => {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
};

// Process image with different qualities and save in respective directories
const processImage = (imgPath) => {
    const imgName = path.basename(imgPath, path.extname(imgPath));
    const imgDir = path.dirname(imgPath);

    ensureDir(path.join(imgDir, 'best'));
    ensureDir(path.join(imgDir, 'medium'));
    ensureDir(path.join(imgDir, 'low'));

    sharp(imgPath)
        .jpeg({ quality: 20 })
        .toFile(path.join(imgDir, 'low', `${imgName}.jpg`));

    sharp(imgPath)
        .jpeg({ quality: 50 })
        .toFile(path.join(imgDir, 'medium', `${imgName}.jpg`));

    fs.copyFileSync(imgPath, path.join(imgDir, 'best', `${imgName}.jpg`));
};

// Recursively traverse directories and process images
const traverseDir = (dir) => {
    fs.readdirSync(dir).forEach((file) => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            traverseDir(fullPath);
        } else if (path.extname(fullPath) === '.png') {
            processImage(fullPath);
        }
    });
};

traverseDir(rootDir);
