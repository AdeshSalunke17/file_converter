export const getBlockConversionType = fileType => {
    switch (fileType) {
        case 'image/jpg': return 'jpg';
        case 'image/jpeg': return 'jpeg';
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': return 'docs';
        case 'text/plain': return 'txt';
        case 'application/json': return 'json';
        case 'application/xml'  || 'text/xml': return 'xml';
        default: return ''
    }
}