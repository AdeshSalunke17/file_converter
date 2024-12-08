'use server'
import sharp from "sharp";
import { PDFDocument, StandardFonts } from "pdf-lib";

export const imageModuleConversion = async (file, targetFormat) => {
    if (!file || !["jpg", "jpeg", "png", "pdf"].includes(targetFormat)) {
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
        const { width, height } = image.scale(0.5);
        page.drawImage(image, {
            x: page.getWidth() / 2 - width / 2,
            y: page.getHeight() / 2 - height / 2,
            width,
            height
        });
        convertedBuffer = await pdfDoc.save();
      } else {
        // Convert to image (jpg, jpeg, png)
        convertedBuffer = await sharp(buffer).toFormat(targetFormat).toBuffer();
      }
    
      return new Blob([convertedBuffer], { type: `application/${targetFormat}` });
    
}