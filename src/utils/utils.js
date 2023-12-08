const marginMultiplier = 8;

export const margin = (m = 1) => marginMultiplier * m;

export function isURL(str) {
  // Regular expression for a simple URL pattern
  var urlPattern =
    /^(https?|http):\/\/([a-zA-Z0-9.-]+(\.[a-zA-Z]{2,})+)(\/[^\s]*)?$/;

  // Test the input string against the pattern
  return urlPattern.test(str);
}

export function isPDF(filePathOrURL) {
  // Get the file extension from the path or URL
  const fileExtension = filePathOrURL.split('.').pop().toLowerCase();

  // Check if the extension indicates a PDF file
  return fileExtension === 'pdf';
}
