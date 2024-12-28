# Send It In Any Format

A **Next.js** application that allows users to upload files and convert them into various formats (PDF, DOCX, TXT, etc.).

## Features
- **File Upload and Conversion:** Convert files to PDF, DOCX, TXT, and more.
- **Real-time Image Processing:** Uses `sharp` and `pdf-lib` for image and PDF manipulation.
- **Front-end UI:** Built with **React 18** and styled using **Tailwind CSS**.
- **Redux Toolkit:** State management with `@reduxjs/toolkit`.
- **Animation Support:** Smooth animations with `GSAP`.
- **File Handling:** Uses `multer` for file uploads and `formidable` for parsing.

## Tech Stack
- **Framework:** Next.js 15.0.3
- **Frontend:** React 18, Tailwind CSS
- **Backend:** Next.js API routes
- **File Handling:** Multer, Sharp, Formidable
- **PDF Generation:** pdf-lib, jsPDF
- **Document Conversion:** Mammoth, docx
- **Compression:** JSZip

## Installation

### 1. Clone the repository:
```bash
https://github.com/username/send-it-in-any-format.git
```

### 2. Navigate to the project directory:
```bash
cd send-it-in-any-format
```

### 3. Install dependencies:
```bash
npm install
```

### 4. Run the development server:
```bash
npm run dev
```
- Application will be available at `http://localhost:3000`

### 5. Build for production:
```bash
npm run build
```

### 6. Start the production server:
```bash
npm run start
```

## Dependencies Breakdown
| Dependency            | Description                                 |
|-----------------------|---------------------------------------------|
| next                  | React framework for SSR and static sites    |
| react                 | UI library                                  |
| react-dom             | DOM bindings for React                      |
| @reduxjs/toolkit      | State management                            |
| pdf-lib               | PDF generation and manipulation             |
| jspdf                 | PDF document creation                       |
| jszip                 | Zip file compression                        |
| sharp                 | Image processing library                    |
| docx                  | Generate DOCX files                         |
| mammoth               | Convert DOCX to HTML/TXT                    |
| xml-js                | XML to JSON and vice versa                  |
| gsap                  | Animation library                           |
| formidable            | File parsing                                |

## License
MIT License. Feel free to use and contribute.

