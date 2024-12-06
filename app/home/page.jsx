'use client'
import React, { useState } from 'react'
import './style.css'
const page = () => {
    const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
  
    if (file) {
      // Validate file type
      if (file.type !== 'image/jpeg') {
        alert('Only JPG images are allowed. Please select a valid file.');
        return;
      }
  
      setSelectedImage(file);
      // Create an image preview URL
      setImagePreview(URL.createObjectURL(file));
    }
  };
  // Convert Image to PDF
  const convertToPDF = async () => {
    if (!selectedImage) {
      alert("Please select an image first.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      // Send the image to the server for PDF conversion
      const response = await fetch('/api/convert', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to convert image to PDF');
      }

      // Download the PDF file
      // console.log(response);
      const base64Pdf = await response.text();
const mailResponse = await fetch('/api/sendmail',{
  method : 'POST',
  headers: {
    'Content-Type': 'application/json', // Specify JSON payload
  },
  body : JSON.stringify({
    to : 'bhavesh17salunke@gmail.com',
    base64Pdf
  })
})
      // const link = document.createElement('a');
      // link.href = URL.createObjectURL(blob);
      // link.download = 'converted-image.pdf';
      // link.click();
    } catch (error) {
      console.error('Error converting image:', error);
      alert('Error converting image. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="image-uploader">
<button
        className="choose-image-button"
        onClick={() => document.getElementById('image-input').click()}
      >
        Choose Image
      </button>
      <input
        id="image-input"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      
      {imagePreview && (
        <>
        <div className="image-preview">
          <img src={imagePreview} alt="Selected" style={{ maxWidth: '100%', maxHeight: '300px' }} />
        </div>
        <button
        className="convert-button"
        onClick={convertToPDF}
        style={{ marginTop: '20px' }}
      >
        {loading ? 'Converting...' : 'Convert to PDF'}
      </button>
        </>
      )}
    </div>
  )
}

export default page