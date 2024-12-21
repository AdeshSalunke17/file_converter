import { js2xml, xml2js } from 'xml-js';
import moduleData from '../utility/data.json'

export const codemarkUpModuleConversion = async (file, targetFormat) => {
    const documentModuleData = moduleData.filter(data => data.moduleName === 'Code/Markup')[0];
        if (!file || !documentModuleData.convertTo.includes(targetFormat)) {
            throw new Error("Invalid file or format");
        }
        if(targetFormat === 'json') {
            return convertXmlToJson(file);
        } else if(targetFormat === 'xml') {
            return convertJsonToXml(file);
        }
}

const convertJsonToXml = async (jsonFile) => {
    try {
        const jsonText = await jsonFile.text();  // Read file as text
        const jsonData = JSON.parse(jsonText);   // Parse JSON
        const wrappedJson = {root : jsonData};
        const xml = js2xml(wrappedJson, { compact: true, spaces: 2 });
        
        // Create Blob from XML string
        const blob = new Blob([xml], { type: 'application/xml' });
        return blob;  // Return Blob for download
    } catch (error) {
        console.error("Error converting JSON to XML:", error);
        throw new Error("Failed to convert JSON to XML.");
    }
};

const convertXmlToJson = async (xmlFile) => {
    try {
        const xmlText = await xmlFile.text();  // Read file as text
        const jsonData = xml2js(xmlText, { compact: true, spaces: 2 });
        const jsonString = JSON.stringify(jsonData, null, 2);  // Format JSON nicely
        
        // Create Blob from JSON string
        const blob = new Blob([jsonString], { type: 'application/json' });
        return blob;  // Return Blob for download
    } catch (error) {
        console.error("Error converting XML to JSON:", error);
        throw new Error("Failed to convert XML to JSON.");
    }
};