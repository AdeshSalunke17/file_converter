import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setFile } from '../features/fileSlice';

const ChooseFile = () => {
    const filesArray = useSelector((state) => state.file.filesArray);
    const selectedOption = useSelector(state => state.selectedOption.selectedOption);
    const {moduleName, acceptedFileTypes, convertTo} = useSelector((state) => state.selectedOption.module) || {};
      const t = useSelector(state => state.translation.t);
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
    <button className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 shadow-lg mt-4 sm:text-lg text-[0.675rem]"
          onClick={() => document.getElementById('image-input').click()}
          >
          <i className="fa fa-paperclip" aria-hidden="true"></i> {t.Choose.text} {selectedOption}
          </button>
          <input
        id="image-input"
        type="file"
        accept={acceptedFileTypes.join(',')}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </>
    :
    <></>
  )
}

export default ChooseFile