const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const { PDFDocument } = require('pdf-lib');

async function generatePDF() {
    console.log('🚀 Starting PDF generation...');

    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    // Set viewport to standard presentation size (16:9)
    await page.setViewport({
        width: 1920,
        height: 1080,
        deviceScaleFactor: 2
    });

    // Emulate print media for PDF layout
    await page.emulateMediaType('print');

    // Load the HTML file
    const htmlPath = 'file://' + path.resolve(__dirname, 'index_slide.html');
    console.log('📄 Loading:', htmlPath);

    await page.goto(htmlPath, {
        waitUntil: 'networkidle0',
        timeout: 30000
    });

    // Wait for React to render
    await new Promise(resolve => setTimeout(resolve, 2000));

    const totalSlides = 10; // Update if you add more slides
    const screenshots = [];

    console.log(`📊 Generating ${totalSlides} slides...`);

    for (let i = 0; i < totalSlides; i++) {
        console.log(`  ✓ Slide ${i + 1}/${totalSlides}`);

        // Navigate to slide by simulating arrow down
        if (i > 0) {
            await page.keyboard.press('ArrowDown');
            await new Promise(resolve => setTimeout(resolve, 800)); // Wait for transition
        }

        // Take screenshot of current slide
        const screenshot = await page.screenshot({
            type: 'png',
            fullPage: false,
            omitBackground: false
        });

        screenshots.push(screenshot);
    }

    await browser.close();

    console.log('📝 Combining slides into PDF...');

    // Create PDF with all slides using pdf-lib
    const pdfDoc = await PDFDocument.create();

    for (let i = 0; i < screenshots.length; i++) {
        console.log(`  Adding slide ${i + 1}/${screenshots.length} to PDF...`);
        const pngImage = await pdfDoc.embedPng(screenshots[i]);
        const page = pdfDoc.addPage([1920, 1080]);

        page.drawImage(pngImage, {
            x: 0,
            y: 0,
            width: 1920,
            height: 1080,
        });
    }

    const pdfBytes = await pdfDoc.save();

    // Save PDF
    const outputPath = path.resolve(__dirname, 'MIG-Company-Overview-v2.pdf');
    fs.writeFileSync(outputPath, pdfBytes);

    console.log('✅ PDF generated successfully!');
    console.log(`📍 Location: ${outputPath}`);
    console.log(`📦 Size: ${(fs.statSync(outputPath).size / 1024 / 1024).toFixed(2)} MB`);
}

// Alternative: Generate individual slide PNGs
async function generateSlideImages() {
    console.log('🚀 Starting slide image generation...');

    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    await page.setViewport({
        width: 1920,
        height: 1080,
        deviceScaleFactor: 2
    });

    const htmlPath = 'file://' + path.resolve(__dirname, 'index_slide.html');
    await page.goto(htmlPath, {
        waitUntil: 'networkidle0',
        timeout: 30000
    });

    await new Promise(resolve => setTimeout(resolve, 2000));

    const outputDir = path.resolve(__dirname, 'slides');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    const totalSlides = 10;

    console.log(`📊 Generating ${totalSlides} slide images...`);

    for (let i = 0; i < totalSlides; i++) {
        if (i > 0) {
            await page.keyboard.press('ArrowDown');
            await new Promise(resolve => setTimeout(resolve, 800));
        }

        const outputPath = path.join(outputDir, `slide-${String(i + 1).padStart(2, '0')}.png`);

        await page.screenshot({
            path: outputPath,
            type: 'png',
            fullPage: false,
            omitBackground: false
        });

        console.log(`  ✓ Slide ${i + 1}/${totalSlides} -> ${path.basename(outputPath)}`);
    }

    await browser.close();

    console.log('✅ Slide images generated successfully!');
    console.log(`📍 Location: ${outputDir}`);
}

// Run based on command line argument
const args = process.argv.slice(2);

if (args.includes('--images')) {
    generateSlideImages().catch(console.error);
} else {
    generatePDF().catch(console.error);
}
