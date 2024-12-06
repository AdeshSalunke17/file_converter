import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFile } from '../redux/fileSlice';
const FileConvertCard = () => {
    const filesArray = useSelector((state) => state.file.filesArray);
    const dispatch = useDispatch();
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      
      if (file) {
        // Validate file type
        if (file.type !== 'image/jpeg') {
          alert('Only JPG images are allowed. Please select a valid file.');
          return;
        }
        dispatch(setFile(file));
      }
    };
    const convert = async () => {
      const formData = new FormData();
      formData.append('image', filesArray[0]);
      try {
        // Send the image to the server for PDF conversion
      const response = await fetch('/api/convert', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to convert image to PDF');
      }
      } catch (error) {
        
      }
    }
  return (
    filesArray.length > 0 && 
    
      <>
      <div className='flex justify-center'>
        <h4 className='mt-2'>Add More Files</h4>
        <button className="ml-4 glass-bg text-white rounded-sm px-5 py-2 mb-6 font-extralight"
        onClick={() => document.getElementById('image-input-multi').click()}
        >
        <i className="fa fa-paperclip" aria-hidden="true"></i> Choose file 
        </button>
        <input
        id="image-input-multi"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      </div>

      {
        filesArray.map((file, index) => {
          return (
<div className='w-full px-16 flex justify-between py-5' key={index}>
        <div className='rounded-lg glass-bg w-5/12 flex py-3'>
        <div className='w-8/12 border border-l-transparent border-t-transparent border-b-transparent'>
        <i className="fa fa-paperclip" aria-hidden="true"></i>
        <span className="truncate pl-2">{file.name}</span>
        </div>
        <div className='w-4/12'>
        <span className="truncate pl-2">1.02 MB</span>
        </div>
        </div>
        <div className='w-2/12'>
        <button className=" text-white px-2 py-1 rounded-full bg-blue-600 mt-2">
        <i className="fa fa-arrow-right" aria-hidden="true"></i>
        </button>
        </div>
        <div className='rounded-lg glass-bg w-5/12 flex py-3'>
        <div className='w-8/12 border border-l-transparent border-t-transparent border-b-transparent text-left pl-10'>
        <span className="truncate">Output</span>
        </div>
        <div className='w-4/12'>
        <select className="bg-transparent text-stone-100 rounded px-2 py-1">
                <option>Select</option>
        </select>
        </div>
        </div>
      </div>
          );
        })
      }
        <button className=" text-white rounded-sm py-4 mt-6 glass-bg px-7"
        onClick={convert}
        >
          Convert <i className="fa fa-arrow-right" aria-hidden="true"></i>
        </button>

        {/* <div className="mt-6">
          <div className="bg-gray-700 h-2 rounded-full">
            <div
              className="bg-blue-600 h-full rounded-full"
              style={{ width: "49%" }}
            ></div>
          </div>
          <p className="text-sm text-center mt-2">49%</p>
        </div> */}
        </>
  )
}

export default FileConvertCard