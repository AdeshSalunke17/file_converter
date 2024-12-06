import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setFile } from '../redux/fileSlice';
const DragAndDrop = () => {
    const [file, setLocalFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const filesArray = useSelector((state) => state.file.filesArray)
    
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
      if (droppedFile.type === "image/jpeg") {
        setLocalFile(droppedFile);
        dispatch(setFile(droppedFile));
        setErrorMessage("");
      } else {
        setErrorMessage("Please drop a valid PDF file.");
      }
    }
  };

  return (
    !filesArray.length > 0 ?
    <div className="cursor-pointer"
    onDragEnter={handleDragEnter}
    onDragLeave={handleDragLeave}
    onDragOver={handleDragOver}
    onDrop={handleDrop}
    >
            <i className="fa fa-download text-green-500 text-3xl"></i>
            <p className="text-2xl text-gray-400 my-4">Drag&Drop file here</p>
            </div>
    :
    <></>
  )
}

export default DragAndDrop