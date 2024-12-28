'use server'
import sharp from "sharp";
import { PDFDocument, StandardFonts } from "pdf-lib";
import moduleData from '../utility/data.json'

export const imageModuleConversion = async (file, targetFormat) => {
  const imageModuleData = moduleData.filter(data => data.moduleName === 'Image')[0];
    if (!file || !imageModuleData.convertTo.includes(targetFormat)) {
        throw new Error("Invalid file or format");
      }
    
      const buffer = Buffer.from(await file.arrayBuffer());
    
      let convertedBuffer;
    
      if (targetFormat === "pdf") {
        // Convert to PDF
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage();
        let image;
        if (file.type === "image/png") {
            image = await pdfDoc.embedPng(buffer);
        } else if (file.type === "image/jpeg" || file.type === "image/jpg") {
            image = await pdfDoc.embedJpg(buffer);
        } else {
            throw new Error("Unsupported image format for PDF conversion.");
        }
        // Get image and page dimensions
    const imgDims = image.scale(1);  // Use full scale initially
    const pageWidth = page.getWidth();
    const pageHeight = page.getHeight();
    
    // Calculate the aspect ratio and fit the image inside the page
    const scale = Math.min(pageWidth / imgDims.width, pageHeight / imgDims.height);
    const imgWidth = imgDims.width * scale;
    const imgHeight = imgDims.height * scale;

    // Center the image on the page
    page.drawImage(image, {
      x: (pageWidth - imgWidth) / 2,
      y: (pageHeight - imgHeight) / 2,
      width: imgWidth,
      height: imgHeight
    });
        convertedBuffer = await pdfDoc.save();
      } else {
        // Convert to image (jpg, jpeg, png)
        convertedBuffer = await sharp(buffer).toFormat(targetFormat).toBuffer();
      }
    
      return new Blob([convertedBuffer], { type: `application/${targetFormat}` });
    
}