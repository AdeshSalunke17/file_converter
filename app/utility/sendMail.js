// utils/emailHelpers.js
import nodemailer from 'nodemailer';

export const sendEmailWithAttachment = async (to, pdfBuffer) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        secure : true,
        port : 456,
        auth: {
            user: 'adeshsalunke2@gmail.com',
            pass: '1722001shruti',
        },
    });

    await transporter.sendMail({
        from: 'adeshsalunke2@gmail.com',
        to,
        subject: 'Your PDF',
        text: 'Please find your converted PDF attached.',
        attachments: [
            {
                filename: 'converted.pdf',
                content: pdfBuffer,
            },
        ],
    });
};
