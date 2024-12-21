import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { getBlockConversionType } from '../utility/getBlockConversionType';

const CustomSelect = ({options, index, handleDropdownSelect}) => {
    const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Select');
  const toggleDropdown = () => setIsOpen(!isOpen);
  const filesArray = useSelector(state => state.file.filesArray);
  const { fileObject : { type } } = filesArray[index];
  const blockConversionType = getBlockConversionType(type);
  const filterOptions = options.filter(option => option !== blockConversionType);

  const handleSelect = (option) => {
    setSelectedOption(option);
    handleDropdownSelect(index, option);
    setIsOpen(false);
  };
  return (
    <div className="relative bg-transparent">
      {/* Dropdown Button */}
      <button
        onClick={toggleDropdown}
        className="w-full text-white py-2 px-4 rounded-md flex justify-between items-center"
      >
        <span>{selectedOption}</span>
        <svg
          className={`w-4 h-4 transform transition-transform ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 w-full bg-gray-900 text-white rounded-md mt-2 shadow-lg">
          <ul className="py-2">
            {filterOptions.map((option) => (
              <li
                key={option}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-700 ${
                  selectedOption === option ? 'bg-gray-700' : ''
                }`}
                onClick={() => handleSelect(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default CustomSelect