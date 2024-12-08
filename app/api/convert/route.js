import { createZipFromConvertedFiles } from '@/app/actions';
import { NextResponse } from 'next/server';
import formidable from 'formidable';

export async function POST(req, res) {
  const formData = await req.formData(); // Native method to handle FormData in Next.js
  const filesArray = [];
  
  formData.forEach((value, key) => {
    if (key.startsWith('file_')) {
      const index = key.split('_')[1];
      const fileObject = value; // Get the file as a Blob
      const toFormat = formData.get(`format_${index}`); // Get the corresponding format

      filesArray.push({ fileObject, toFormat });
    }
  });

      try {
        const response = await createZipFromConvertedFiles(filesArray);
         // Send the response directly as a download link
    return new NextResponse(response.body, {
        headers: {
          'Content-Type': 'application/zip',
          'Content-Disposition': 'attachment; filename=converted_files.zip',
        },
      });
      } catch (error) {
        console.error("Error generating ZIP file:", error);
        return new NextResponse('Failed to create ZIP file', { status: 500 });
      }

}
