import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setFile } from '../features/fileSlice';
const DragAndDrop = () => {
    const [file, setLocalFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const filesArray = useSelector((state) => state.file.filesArray)
  const selectedOption = useSelector(state => state.selectedOption.selectedOption);
  const {moduleName, acceptedFileTypes, convertTo} = useSelector((state) => state.selectedOption.module) || {};
  const t = useSelector(state => state.translation.t);
  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    
    if (droppedFile) {
      // You can add more validation like file type or size here
      if (acceptedFileTypes.indexOf(droppedFile.type) !== -1) {
        setLocalFile(droppedFile);
        dispatch(setFile(droppedFile));
        setErrorMessage("");
      } else {
        setErrorMessage("Please drop a valid PDF file.");
        alert('Please select a valid file.');
      }
    }
  };

  return (
    !filesArray.length > 0 && selectedOption ?
    <div className="cursor-pointer"
    onDragEnter={handleDragEnter}
    onDragLeave={handleDragLeave}
    onDragOver={handleDragOver}
    onDrop={handleDrop}
    >
            <i className="fa fa-download text-green-500 text-3xl"></i>
            <p className="sm:text-2xl text-lg text-gray-400 my-4">{t.dragAndDrop.text1} {selectedOption} {t.dragAndDrop.text2}</p>
            </div>
    :
    <></>
  )
}

export default DragAndDrop