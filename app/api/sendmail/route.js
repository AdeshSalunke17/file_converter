import { sendEmailWithAttachment } from "@/app/utility/sendMail";


export async function POST(request) {
  try {
    // Get the JSON body from the request
    const { to, base64Pdf } = await request.json();
    const pdfBuffer = Buffer.from(base64Pdf, 'base64');


    // Call the email helper function
    await sendEmailWithAttachment(to, pdfBuffer);

    // Return success response
    return new Response(JSON.stringify({ message: 'Email sent successfully!' }), { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ error: 'Failed to send email' }), { status: 500 });
  }
}