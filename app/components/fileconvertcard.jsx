import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFile, setToFormat } from '../redux/fileSlice';
import CustomSelect from './CustomSelect';
import { convertBytesToMb } from '../utility/convertBytestoMb';
import { callConversionMethod, createZipFromConvertedFiles } from '../actions';
import { validate } from '../utility/validate';
import Modal from './Modal';
const FileConvertCard = () => {
    const filesArray = useSelector((state) => state.file.filesArray);
    const dispatch = useDispatch();
    const {moduleName, acceptedFileTypes, convertTo} = useSelector((state) => state.selectedOption.module) || {};
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      
      if (file) {
        // Validate file type
        if (acceptedFileTypes.indexOf(file.type) === -1) {
          alert('Please select a valid file.');
          return;
        }
        dispatch(setFile(file));
      }
    };
   const handleDropdownSelect = (index, formatTo) => {
      dispatch(setToFormat({
        toFormat : formatTo,
        fileIndex : index
      }));
    }
    const [isValidate, setIsValidate] = useState(true);
    const convert = async () => {
//       const formData = new FormData();
// filesArray.forEach((file, index) => {
//   // Append the file as a Blob with a unique name for each file
//   formData.append(`file_${index}`, file.fileObject);
//   // Append the toFormat string
//   formData.append(`format_${index}`, file.toFormat);
// });
      
//       try {
//         const response = await fetch("/api/convert", {
//           method: "POST",
//           body: formData,
//         });
    
//         if (!response.ok) {
//           throw new Error("Failed to generate ZIP file.");
//         }
    
//         // Get the ZIP Blob from the response
//         const zipBlob = await response.blob();
    
//         // Trigger file download
//         const url = URL.createObjectURL(zipBlob);
//         const a = document.createElement("a");
//         a.href = url;
//         a.download = "converted_files.zip";
//         a.click();
//         URL.revokeObjectURL(url);
//       } catch (error) {
//         alert("Conversion failed: " + error.message);
//       }
      // try {
      //   const zipResponse = await createZipFromConvertedFiles(filesArray);
      //   console.log(zipResponse);
        
      //   const zipBlob = await zipResponse.blob();

      // // Trigger file download
      // const url = URL.createObjectURL(zipBlob);
      // const a = document.createElement("a");
      // a.href = url;
      // a.download = "converted_files.zip";
      // a.click();
      // URL.revokeObjectURL(url);
      // //   filesArray.map( async (file, index) => {
      // //     const convertedBlobData = await callConversionMethod(moduleName, file.fileObject, file.toFormat);
      // //     const url = URL.createObjectURL(convertedBlobData);
  
      // // // Automatically download the file
      // // const a = document.createElement("a");
      // // a.href = url;
      // // // a.download = `converted.${targetFormat}`;
      // // a.download = 'converted.jpeg'
      // // a.style.display = "none";
      // // document.body.appendChild(a);
      // // a.click();
      // // document.body.removeChild(a);
      // //   });
      // } catch (error) {
      //   alert("Conversion failed: " + error.message);
      // }
    if(validate(filesArray)) {
      try {
        filesArray.map(async file => {
          const convertedBlobData = await callConversionMethod(moduleName, file.fileObject, file.toFormat);
          // Create a temporary URL for the Blob
        const downloadUrl = URL.createObjectURL(convertedBlobData);

        // Create an <a> element for downloading the file
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = `${file.fileObject.name.split('.')[0]}_converted.${file.toFormat}`;

        // Append the element to the body and trigger a click event
        document.body.appendChild(a);
        a.click();

        // Clean up by removing the element and revoking the object URL
        document.body.removeChild(a);
        URL.revokeObjectURL(downloadUrl);
        })
        
      } catch (error) {
        alert("Conversion failed: " + error.message);
      }
    } else {
      setIsValidate(false);
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
        accept={acceptedFileTypes.join(',')}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      </div>

      {
        filesArray.map((file, index) => {
          const fileObject = file.fileObject;
          return (
<div className='w-full md:px-16 px-5 flex justify-between py-5' key={index}>
        <div className='rounded-lg glass-bg w-5/12 flex py-3 border border-green-400'>
        <div className='md:w-8/12 w-full border border-l-transparent border-t-transparent border-b-transparent border-r-transparent md:border-r-white'>
        <i className="fa fa-paperclip" aria-hidden="true"></i>
        <span className="truncate pl-2">{fileObject.name.slice(0,10)}...</span>
        </div>
        <div className='w-4/12 md:block hidden'>
        <span className="truncate pl-2">{convertBytesToMb(fileObject.size)} MB</span>
        </div>
        </div>
        <div className='w-2/12'>
        <button className=" text-white px-2 py-1 rounded-full bg-blue-600 mt-2">
        <i className="fa fa-arrow-right" aria-hidden="true"></i>
        </button>
        </div>
        <div className={`rounded-lg glass-bg w-5/12 flex py-3 ${file.toFormat && 'border border-green-400'}`}>
        <div className='w-8/12 border border-l-transparent border-t-transparent border-b-transparent text-left pl-10 hidden md:block'>
        <span className="truncate">Output</span>
        </div>
        <div className='md:w-4/12 w-full'>
        <CustomSelect options={convertTo} index={index} handleDropdownSelect= {handleDropdownSelect}/>
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
        <Modal isOpen={!isValidate} onClose={() => setIsValidate(true)}>
          <h3 className='text-white'>Please select option from dropdown to convert files</h3>
        </Modal>
        </>
  )
}

export default FileConvertCard