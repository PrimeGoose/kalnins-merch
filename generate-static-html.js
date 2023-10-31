// File: generate-static-html.js

import puppeteer from 'puppeteer';
import fs from 'fs/promises';
import path from 'path';
import products from './src/assets/products.json' assert { type: 'json' };

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    for (const product of products) {
        const route = `/product/${product.id}`;
        await page.goto(`http://localhost:4200${route}`, {
            waitUntil: 'networkidle2',
        });

        await page.evaluate((product) => {
            const head = document.head;

            // Check and add meta description
            if (product.description) {
                const metaDesc = document.createElement('meta');
                metaDesc.name = 'description';
                metaDesc.content = product.description;
                head.appendChild(metaDesc);
            }

            // Check and add OG title
            if (product.color_name && product.category && product.name) {
                const ogTitle = document.createElement('meta');
                ogTitle.setAttribute('property', 'og:title');
                ogTitle.content = `${product.color_name} ${product.category} ${product.name} tikai 8.99 EUR`;
                head.appendChild(ogTitle);
            }

            // Check and add OG image
            if (product.images && product.images.length > 0) {
                const ogImage = document.createElement('meta');
                ogImage.setAttribute('property', 'og:image');
                ogImage.content = product.images[0];
                head.appendChild(ogImage);
            }

            // ... add more tags as needed

            // File: generate-static-html.js

            // ... (code above)

        }, product);

        // ... (more code, if any)

        const content = await page.content();

        // Define the base directory for static HTML files
        const outputDir = path.join(process.cwd(), 'static-html');

        // Make sure the base directory exists
        await fs.mkdir(outputDir, { recursive: true });

        // Define the product-specific directory (it may include slashes as part of the route)
        const productDirPath = path.join(outputDir, 'product');

        // Make sure the product-specific directory exists
        await fs.mkdir(productDirPath, { recursive: true });

        // Write the HTML file
        await fs.writeFile(path.join(productDirPath, `${product.id}.html`), content);

        console.log(`Generated static HTML for ${route}`);
    }

    await browser.close();
})();

