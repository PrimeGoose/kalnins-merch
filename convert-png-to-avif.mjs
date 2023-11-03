// convert-png-to-avif.mjs
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const inputDir = './src/assets/dod-naudu-dauni/';
const outputDir = './src/assets/dod-naudu-dauni/'; // Adjust this to your desired output directory

// Ensure the output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Read the directory contents
fs.readdir(inputDir, (err, files) => {
    if (err) {
        console.error('Error reading the directory', err);
        return;
    }

    files.forEach(file => {
        if (path.extname(file).toLowerCase() === '.png' && !file.includes('-low.png')) {
            const inputFile = path.join(inputDir, file);
            const outputFile = path.join(outputDir, path.basename(file, '.png') + '.avif');

            sharp(inputFile)
                .avif({
                    quality: 50, // AVIF quality ranges from 0-100, you might need to experiment with this value
                    speed: 5, // Speed can range from 0 (slowest) to 8 (fastest). Speed 5 is the default
                })
                .toFile(outputFile)
                .then(() => {
                    console.log(`Converted to AVIF: ${file}`);
                })
                .catch(err => {
                    console.error(`Error processing ${file}:`, err);
                });
        }
    });
});
