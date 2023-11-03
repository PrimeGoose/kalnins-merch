// convert-png-to-jpg.mjs
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const inputDir = './src/assets/dod-naudu-dauni/';
const outputDir = './src/assets/dod-naudu-dauni/'; // or any directory you wish to output

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
            const outputFile = path.join(outputDir, path.basename(file, '.png') + '.jpg');

            sharp(inputFile)
                .jpeg({
                    quality: 80, // You can adjust the quality for a balance of quality and file size
                    progressive: true,
                    chromaSubsampling: '4:4:4'
                })
                .toFile(outputFile)
                .then(() => {
                    console.log(`Converted and compressed: ${file}`);
                })
                .catch(err => {
                    console.error(`Error processing ${file}:`, err);
                });
        }
    });
});
