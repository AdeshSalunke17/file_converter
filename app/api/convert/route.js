import { PDFDocument } from 'pdf-lib';

export async function POST(req) {
    try {
        // Parse FormData
        const formData = await req.formData();
        const file = formData.get('image'); // Extract the file as a Blob

        // If no file is uploaded
        if (!file) {
            return new Response(JSON.stringify({ error: 'No image uploaded' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Convert Blob to Uint8Array
        const arrayBuffer = await file.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);

        // Create a new PDF document using pdf-lib
        const pdfDoc = await PDFDocument.create();

        // Embed the uploaded image (assuming it's a JPEG)
        const image = await pdfDoc.embedJpg(uint8Array);

        // Add a page to the PDF document
        const page = pdfDoc.addPage([595, 842]); // A4 size
        const { width, height } = image.scale(0.5); // Scale the image to fit within the page

        // Draw the image on the PDF page
        page.drawImage(image, {
            x: page.getWidth() / 2 - width / 2,
            y: page.getHeight() / 2 - height / 2,
            width,
            height,
        });

        // Save the PDF document
        const pdfBytes = await pdfDoc.save();
        // Convert Uint8Array to Buffer
  const pdfBuffer = Buffer.from(pdfBytes);
  const base64Pdf = pdfBuffer.toString('base64');


        // Send the generated PDF back to the client
        // return new Response(pdfBuffer, {
        //     status: 200,
        //     headers: {
        //         'Content-Type': 'application/pdf',
        //         'Content-Disposition': 'attachment; filename=converted-image.pdf',
        //     },
        // });
        return new Response(base64Pdf, {
            status: 200,
            headers: {
              'Content-Type': 'text/plain',
            },
          });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Failed to convert image to PDF' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
