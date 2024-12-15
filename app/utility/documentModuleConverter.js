"use server"

import mammoth from "mammoth";
import { jsPDF } from "jspdf";
import { Document, Packer, Paragraph } from "docx";
import { PDFDocument } from "pdf-lib";
import { readFileAsArrayBuffer } from "./readFileAsArrayBuffer";
import moduleData from '../utility/data.json'
import { getDocument } from "pdfjs-dist/legacy/build/pdf";
import "pdfjs-dist/legacy/build/pdf.worker.entry";

export const documentModuleConversion = async (file, targetFormat) => {
    const documentModuleData = moduleData.filter(data => data.moduleName === 'Document')[0];
    if (!file || !documentModuleData.convertTo.includes(targetFormat)) {
        throw new Error("Invalid file or format");
      }
    if(file.type.includes('.document')) {
        if(targetFormat === 'pdf') {
            return convertDocxToPdf(file);
        } else if(targetFormat === 'txt') {
            return convertDocxToTxt(file);
        }
    } else if(file.type.includes('application/pdf')) {
      if(targetFormat === 'docs') {
        return convertPdfToDocx(file);
    } else if(targetFormat === 'txt') {
        return convertPdfToTxt(file);
    }
    } else if(file.type.includes('text/plain')) {
      if(targetFormat === 'docs') {
        return convertTxtToDocx(file);
    } else if(targetFormat === 'pdf') {
        return convertTxtToPdf(file);
    }
    }
}

export async function convertDocxToTxt(docxFile) {
    try {
        // const arrayBuffer = await readFileAsArrayBuffer(docxFile);
        const buffer = Buffer.from(await docxFile.arrayBuffer());
        const { value: text } = await mammoth.extractRawText({ buffer });
       // Create a Blob from the extracted text
      const blob = new Blob([text], { type: "text/plain" });
      return blob; // Return the Blob
    } catch (error) {
        console.error("Error converting DOCX to TXT:", error);
        throw new Error("Failed to convert DOCX to TXT.");
    }
  }
  
  export async function convertDocxToPdf(docxFile) {
    try {
        // const arrayBuffer = await readFileAsArrayBuffer(docxFile);
        const buffer = Buffer.from(await docxFile.arrayBuffer());
        const { value: text } = await mammoth.extractRawText({ buffer });
        const pdf = new jsPDF();
        // PDF page settings
    const marginLeft = 10; // Left margin
    const marginTop = 10; // Top margin
    const pageHeight = pdf.internal.pageSize.height; // Page height
    const pageWidth = pdf.internal.pageSize.width; // Page width
    const lineHeight = 10; // Line height for text
    const maxLinesPerPage = Math.floor((pageHeight - marginTop * 2) / lineHeight); // Maximum lines per page
    const maxLineWidth = pageWidth - marginLeft * 2; // Usable width of the page
    // Split text into lines that fit within the page width
    const words = text.split(" ");
    let lines = [];
    let currentLine = "";

    words.forEach((word) => {
      const testLine = currentLine + word + " ";
      const testLineWidth = pdf.getTextWidth(testLine);
      if (testLineWidth > maxLineWidth) {
        // Push the current line to lines and start a new one
        lines.push(currentLine.trim());
        currentLine = word + " ";
      } else {
        currentLine = testLine;
      }
    });
    if (currentLine) {
      lines.push(currentLine.trim());
    }

    // Add lines to the PDF, managing pagination
    let currentLineCount = 0;
    lines.forEach((line) => {
      if (currentLineCount >= maxLinesPerPage) {
        pdf.addPage(); // Add a new page when the current page is full
        currentLineCount = 0;
      }
      pdf.text(line, marginLeft, marginTop + currentLineCount * lineHeight);
      currentLineCount++;
    });
        // const lines = text.split("\n"); // Split text by lines for better formatting
        // lines.forEach((line, index) => {
        //   pdf.text(line, 10, 10 + index * 10); // Adjust line spacing
        // });
        return pdf.output("blob"); // Return as Blob for download.
    } catch (error) {
        console.error("Error converting DOCX to PDF:", error);
        throw new Error("Failed to convert DOCX to PDF.");
    }
  }

  export async function convertTxtToPdf(txtFile) {
    try {
      // Read the content of the file as text
      const txtContent = await txtFile.text();
      const pdf = new jsPDF();
      // Split the content into lines, ensuring it fits the page width
    const pageWidth = 180; // Adjust to your layout
    const lines = pdf.splitTextToSize(txtContent, pageWidth);

    // Page configuration
    const lineHeight = 10; // Space between lines
    const pageHeight = pdf.internal.pageSize.height;
    const marginTop = 10;
    const marginBottom = 10;
    const usableHeight = pageHeight - marginTop - marginBottom;

    let currentHeight = marginTop;
    // Add lines to the PDF, handling page breaks
    lines.forEach((line) => {
      if (currentHeight + lineHeight > usableHeight) {
        pdf.addPage(); // Add a new page
        currentHeight = marginTop; // Reset height for the new page
      }
      pdf.text(line, 10, currentHeight);
      currentHeight += lineHeight; // Move down by the line height
    });
    return pdf.output("blob");
    } catch (error) {
      console.error("Error converting TXT to DOCX:", error);
      throw new Error("Failed to convert TXT to DOCX.");
    }
  }
  
  export async function convertTxtToDocx(txtFile) {
    try {
      // Read the content of the file as text
      const txtContent = await txtFile.text();
      const lines = txtContent.split("\n");
      // Create a Word document with each line as a separate paragraph
    const paragraphs = lines.map((line) => new Paragraph(line));
     // Define the document with the paragraphs
    const doc = new Document({
      sections: [{ children: paragraphs }],
    });
  
      // Convert the document to a Blob and return it
      return await Packer.toBlob(doc);
    } catch (error) {
      console.error("Error converting TXT to DOCX:", error);
      throw new Error("Failed to convert TXT to DOCX.");
    }
  }

  export async function convertPdfToTxt(pdfFile) {
    try {
      const arrayBuffer = await pdfFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
    const pages = pdfDoc.getPages();
    let text = "";
    pages.forEach((page) => {
      text += page.getTextContent();
    });
     // Create a Blob from the extracted text
     const blob = new Blob([text], { type: "text/plain" });
     return blob; // Return the Blob
    } catch (error) {
      console.error("Error converting PDF to TXT:", error);
        throw new Error("Failed to convert PDF to TXT.");
    }
  }
  
  export async function convertPdfToDocx(pdfFile) {
    try {
      const arrayBuffer = await pdfFile.arrayBuffer();
       // Load the PDF document using pdf.js
    const pdfDoc = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let text = "";
    // Loop through all pages to extract text
    for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
      const page = await pdfDoc.getPage(pageNum);
      const textContent = await page.getTextContent();

      // Extract and concatenate text
      text += textContent.items.map((item) => item.str).join(" ") + "\n";
    }
      const doc = new Document({
      sections: [{ children: [new Paragraph(text)] }],
    });
  
    return Packer.toBlob(doc);
    } catch (error) {
      console.error("Error converting PDF to DOCS:", error);
        throw new Error("Failed to convert PDF to DOCS.");
    }
  }