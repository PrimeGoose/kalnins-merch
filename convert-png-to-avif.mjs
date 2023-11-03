import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const baseDir = './src/assets/';

// Function to delete all .avif files in a directory
async function deleteAVIFFiles(directory) {
    let deletedCount = 0;
    const entries = await fs.readdir(directory, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(directory, entry.name);
        if (entry.isFile() && path.extname(entry.name).toLowerCase() === '.avif') {
            await fs.unlink(fullPath);
            console.log(`Deleted AVIF file: ${fullPath}`);
            deletedCount++;
        }
    }

    return deletedCount;
}

// Recursive function to process a directory
async function processDirectory(directory) {
    let deletedCount = await deleteAVIFFiles(directory);
    let convertedCount = 0;

    const entries = await fs.readdir(directory, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(directory, entry.name);

        if (entry.isDirectory() && entry.name !== 'icons') {
            const counts = await processDirectory(fullPath);
            deletedCount += counts.deletedCount;
            convertedCount += counts.convertedCount;
        } else if (entry.isFile() && path.extname(entry.name).toLowerCase() === '.png') {
            const outputFile = path.join(directory, path.basename(entry.name, '.png') + '.avif');
            await sharp(fullPath)
                .avif({
                    quality: 60,
                    speed: 0,
                })
                .toFile(outputFile);
            console.log(`Converted to AVIF: ${fullPath}`);
            convertedCount++;
        }
    }

    return { deletedCount, convertedCount };
}

// Start the conversion process
(async () => {
    try {
        const { deletedCount, convertedCount } = await processDirectory(baseDir);
        console.log(`Total AVIF files deleted: ${deletedCount}`);
        console.log(`Total PNG files converted to AVIF: ${convertedCount}`);
        console.log('Conversion process completed.');
    } catch (err) {
        console.error('An error occurred during the conversion process:', err);
    }
})();
