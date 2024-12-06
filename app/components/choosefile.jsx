import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setFile } from '../redux/fileSlice';

const ChooseFile = () => {
    const filesArray = useSelector((state) => state.file.filesArray);
    const selectedOption = useSelector(state => state.selectedOption.selectedOption);
    const {moduleName, acceptedFileTypes, convertTo} = useSelector((state) => state.selectedOption.module) || {};
  const dispatch = useDispatch();
        // Handle file selection
        const handleFileChange = (event) => {
            const file = event.target.files[0];
            
            if (file) {
              // Validate file type
              if (acceptedFileTypes.indexOf(file.type) === -1) {
                alert('Please select a valid file.');
                return;
              }
              dispatch(setFile(file));
              // Create an image preview URL
              // setImagePreview(URL.createObjectURL(file));
            }
          };
  return (
    !filesArray.length > 0  && selectedOption ? 
    <>
    <p>Or</p>
    <button className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 shadow-lg mt-4"
          onClick={() => document.getElementById('image-input').click()}
          >
          <i className="fa fa-paperclip" aria-hidden="true"></i> Choose {selectedOption}
          </button>
          <input
        id="image-input"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </>
    :
    <></>
  )
}

export default ChooseFile