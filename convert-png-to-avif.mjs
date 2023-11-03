// convert-png-to-avif.mjs
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const baseDir = './src/assets/';

// Recursive function to process a directory
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
                // Convert PNG files to AVIF
                const outputFile = path.join(directory, path.basename(entry.name, '.png') + '.avif');

                sharp(fullPath)
                    .avif({
                        quality: 50, // AVIF quality ranges from 0-100, you might need to experiment with this value
                        speed: 5, // Speed can range from 0 (slowest) to 8 (fastest). Speed 5 is the default
                    })
                    .toFile(outputFile)
                    .then(() => {
                        console.log(`Converted to AVIF: ${fullPath}`);
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
