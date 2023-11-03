import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const baseDir = './src/assets/';

function deleteWebPFiles(directory) {
    fs.readdirSync(directory, { withFileTypes: true }).forEach(entry => {
        const fullPath = path.join(directory, entry.name);
        if (entry.isDirectory()) {
            // Recursively delete .webp files in subdirectories
            deleteWebPFiles(fullPath);
        } else if (entry.isFile() && path.extname(entry.name).toLowerCase() === '.webp') {
            // Delete the .webp file
            fs.unlinkSync(fullPath);
            console.log(`Deleted WebP file: ${fullPath}`);
        }
    });
}

function processDirectory(directory) {
    deleteWebPFiles(directory); // Delete all .webp files before starting the conversion

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
            } else if (entry.isFile() && path.extname(entry.name).toLowerCase() === '.png') {
                // Convert PNG files to WebP
                const outputFile = path.join(directory, path.basename(entry.name, '.png') + '.webp');

                sharp(fullPath)
                    .webp({
                        quality: 80,  // Good for high-quality images without making the file size too large
                       
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
