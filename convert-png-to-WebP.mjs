import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const baseDir = './src/assets/';

async function deleteWebPFiles(directory) {
  let deletedCount = 0;
  const entries = await fs.readdir(directory, {withFileTypes: true});

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      // Recursively delete .webp files in subdirectories
      const count = await deleteWebPFiles(fullPath);
      deletedCount += count;
    } else if (entry.isFile() && path.extname(entry.name).toLowerCase() === '.webp') {
      // Delete the .webp file
      await fs.unlink(fullPath);
      console.log(`Deleted WebP file: ${fullPath}`);
      deletedCount++;
    }
  }

  return deletedCount;
}

async function processDirectory(directory) {
  let deletedCount = await deleteWebPFiles(directory);
  let convertedCount = 0;

  const entries = await fs.readdir(directory, {withFileTypes: true});

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory() && entry.name !== 'icons') {
      // Recursively process subdirectories, skipping 'icons'
      const counts = await processDirectory(fullPath);
      deletedCount += counts.deletedCount;
      convertedCount += counts.convertedCount;
    } else if (entry.isFile() && path.extname(entry.name).toLowerCase() === '.png') {
      // Convert PNG files to WebP
      const outputFile = path.join(directory, path.basename(entry.name, '.png') + '.webp');
      await sharp(fullPath).webp({quality: 80}).toFile(outputFile);
      console.log(`Converted to WebP: ${fullPath}`);
      convertedCount++;
    }
  }

  return {deletedCount, convertedCount};
}

// Start the conversion process
(async () => {
  try {
    const {deletedCount, convertedCount} = await processDirectory(baseDir);
    console.log(`Total WebP files deleted: ${deletedCount}`);
    console.log(`Total PNG files converted to WebP: ${convertedCount}`);
    console.log('Conversion process completed.');
  } catch (err) {
    console.error('An error occurred during the conversion process:', err);
  }
})();
