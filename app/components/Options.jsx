import React from 'react'

const Options = () => {
  return (
    <div className="rounded-lg w-2/3 p-10 flex flex-wrap">
        <div className='w-4/12 p-4'>
            <div className='w-full h-full bg-black bg-opacity-70 p-3 text-green-400 items-center cursor-pointer rounded-lg'>
                <span className="truncate text-lg">Document</span>
                <p className='block text-xs text-white text-start'>Eg. DOC,PDF...</p>
            </div>
        </div>
        <div className='w-4/12 p-4'>
            <div className='w-full h-full bg-black bg-opacity-70 p-3 text-green-400 items-center cursor-pointer rounded-lg'>
                <span className="truncate text-lg">Image</span>
                <p className='block text-xs text-white text-start'>Eg. DOC,PDF...</p>
            </div>
        </div>
        <div className='w-4/12 p-4'>
            <div className='w-full h-full bg-black bg-opacity-70 p-3 text-green-400 items-center cursor-pointer rounded-lg'>
                <span className="truncate text-lg">Code/Markup</span>
                <p className='block text-xs text-white text-start'>Eg. DOC,PDF...</p>
            </div>
        </div>
        <div className='w-4/12 p-4'>
            <div className='w-full h-full bg-black bg-opacity-70 p-3 text-green-400 items-center cursor-pointer rounded-lg'>
                <span className="truncate text-lg">Spreadsheet</span>
                <p className='block text-xs text-white text-start'>Eg. DOC,PDF...</p>
            </div>
        </div>
        <div className='w-4/12 p-4'>
            <div className='w-full h-full bg-black bg-opacity-70 p-3 text-green-400 items-center cursor-pointer rounded-lg'>
                <span className="truncate text-lg">Compressed Files</span>
                <p className='block text-xs text-white text-start'>Eg. DOC,PDF...</p>
            </div>
        </div>
    </div>
  )
}

export default Options