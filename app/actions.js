'use server'

import JSZip from "jszip";
const { imageModuleConversion } = require("./utility/imageModuleConversion");

export const callConversionMethod = async (moduleName, file, formatTo) => {
    switch (moduleName) {
        case "Image": return imageModuleConversion(file, formatTo);
        default: break;
    }

}

export const createZipFromConvertedFiles = async filesArray => {
    try {
        const zip = new JSZip();
        for (const file of filesArray) {
            const convertedBlobData = await callConversionMethod(
              "Image",
              file.fileObject,
              file.toFormat
            );
    
            // Add the converted blob to the ZIP with an appropriate filename
            if (convertedBlobData instanceof Blob) {
              zip.file(
                `${file.fileObject.name.split(".")[0]}_converted.${file.toFormat}`,
                convertedBlobData
              );
          } else {
              console.error('Converted data is not a Blob:', convertedBlobData);
              throw new Error("Invalid data type for converted file");
          }
          }
     // Generate the ZIP file as a Blob
     const zipBlob = await zip.generateAsync({ type: "blob" });
    // Create and return a new Response object with the ZIP Blob
    return new Response(zipBlob, {
        headers: {
          "Content-Type": "application/zip",
          "Content-Disposition": "attachment; filename=converted_files.zip",
        },
      });
        
    } catch (error) {
        console.log(error);
        
    }

}