import axios from 'axios';
import {writeFile, DocumentDirectoryPath} from 'react-native-fs';
import Share from 'react-native-share';

export const downloadFile = async (url: string) => {
  try {
    const fileName = getFilenameFromUrl(url);
    console.log('File downloading:', url);

    const response = await axios({
      url,
      method: 'GET',
      responseType: 'arraybuffer', // Important to handle binary data
    });

    const filePath = `${DocumentDirectoryPath}/${fileName}`;
    console.log('File saving to:', filePath);
    await writeFile(filePath, response.request._response, 'base64');
    console.log('File downloaded to:', filePath);
    return filePath;
  } catch (error) {
    console.error('Error downloading file:', error);
    return '';
  }
};

const shareFile = async (fileUri: string) => {
  try {
    await Share.open({
      url: `file://${fileUri}`,
      title: 'Share File',
    });
  } catch (error) {
    console.log('Error sharing file:', error);
  }
};

export const downloadFileAndShare = async (url: string) => {
  const filePath = await downloadFile(url);
  if (filePath.length) {
    await shareFile(filePath);
    return true;
  }
  return false;
};

function getFilenameFromUrl(url: string) {
  return url.replace(/^.*[\\\/]/, '');
}
