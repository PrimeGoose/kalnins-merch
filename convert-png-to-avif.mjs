import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const baseDir = './src/assets/';

// Function to delete all .avif files in a directory
function deleteAVIFFiles(directory) {
    fs.readdir(directory, { withFileTypes: true }, (err, entries) => {
        if (err) {
            console.error('Error reading the directory for AVIF deletion', err);
            return;
        }

        entries.forEach(entry => {
            const fullPath = path.join(directory, entry.name);
            if (entry.isFile() && path.extname(entry.name).toLowerCase() === '.avif') {
                fs.unlink(fullPath, err => {
                    if (err) {
                        console.error(`Error deleting ${fullPath}:`, err);
                    } else {
                        console.log(`Deleted AVIF file: ${fullPath}`);
                    }
                });
            }
        });
    });
}

// Recursive function to process a directory
function processDirectory(directory) {
    // Delete all .avif files before starting conversion
    deleteAVIFFiles(directory);

    fs.readdir(directory, { withFileTypes: true }, (err, entries) => {
        if (err) {
            console.error('Error reading the directory for conversion', err);
            return;
        }

        entries.forEach(entry => {
            const fullPath = path.join(directory, entry.name);

            if (entry.isDirectory() && entry.name !== 'icons') {
                // Recursively process subdirectories, skipping 'icons'
                processDirectory(fullPath);
            } else if (entry.isFile() && path.extname(entry.name).toLowerCase() === '.png') {
                // Convert PNG files to AVIF
                const outputFile = path.join(directory, path.basename(entry.name, '.png') + '.avif');

                sharp(fullPath)
                    .avif({
                        quality: 70, // AVIF quality ranges from 0-100
                        speed: 8, // Speed can range from 0 (slowest) to 8 (fastest)
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
