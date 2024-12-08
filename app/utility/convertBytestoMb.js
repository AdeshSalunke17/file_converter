export const convertBytesToMb = bytes => {
    if (typeof bytes !== "number" || bytes < 0) {
        throw new Error("Invalid input: Size must be a non-negative number.");
    }
    const sizeInMB = bytes / (1024 * 1024); // Convert bytes to MB
    return parseFloat(sizeInMB.toFixed(2)); // Round to 2 decimal places
} 