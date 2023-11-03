// convert-png-to-webp.mjs
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const baseDir = './src/assets/';

function processDirectory(directory) {
    fs.readdir(directory, { withFileTypes: true }, (err, entries) => {
        if (err) {
            console.error('Error reading the directory', err);
            return;
        }

        entries.forEach(entry => {
            const fullPath = path.join(directory, entry.name);
            if (entry.isDirectory() && entry.name !== 'icons') {
                // Recursively process subdirectories, skipping 'icons'
                processDirectory(fullPath);
            } else if (entry.isFile() && path.extname(entry.name).toLowerCase() === '.png' && !entry.name.includes('-low.png')) {
                // Convert PNG files to WebP
                const outputFile = path.join(directory, path.basename(entry.name, '.png') + '.webp');

                sharp(fullPath)
                    .webp({
                        quality: 80, // Adjust the quality for a balance of quality and file size
                        lossless: true, // Set to true for lossless conversion
                    })
                    .toFile(outputFile)
                    .then(() => {
                        console.log(`Converted to WebP: ${fullPath}`);
                    })
                    .catch(err => {
                        console.error(`Error processing ${fullPath}:`, err);
                    });
            }
        });
    });
}

// Start the conversion process
processDirectory(baseDir);
