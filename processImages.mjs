// processImages.mjs

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const rootDir = './src/assets';

const processImages = async () => {

    const subDirs = fs.readdirSync(rootDir);
    for (const subDir of subDirs) {
        if (subDir === 'icons') {
            continue;
        }
        const deleteIFimageSufix = "-low.png"
    
        const dirPath = path.join(rootDir, subDir);
        if (fs.statSync(dirPath).isDirectory()) {
            const files = fs.readdirSync(dirPath);


            // delete all files with -lowQ.png
            for (const file of files) {
                if (deleteIFimageSufix === file.slice(-deleteIFimageSufix.length)) {
                    fs.unlinkSync(path.join(dirPath, file));
                }
            }
            


            for (const file of files) {
             
                if (path.extname(file) === '.png') {
                    const filePath = path.join(dirPath, file);
                    const newFilePath = path.join(dirPath, file.replace('.png', '-low.png'));

                    try {
                        if (subDir === 'dod-naudu-dauni') {
                            continue
                        }
                        await sharp(filePath)
                            .png({ quality: 1 })
                            // make it black and white
                            .modulate({ saturation: 0 })
                           

                            
                            .toFile(newFilePath);
                    } catch (err) {
                        console.error(`Error processing ${filePath}: ${err.message}`);
                    }
                }
            }
        }
    }
};

processImages().catch(err => console.error(`Error in processImages: ${err.message}`));
