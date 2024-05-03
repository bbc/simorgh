import 'isomorphic-fetch';

const retrieveDownloads = async service => {
  const fetchURl = `https://ws-downloads.files.bbci.co.uk/downloads-data-${service}.json`;
  try {
    const retrieveDownloads = async () => {
      const response = await fetch(fetchURl);
      const downloads = await response.json();
      return downloads;
    };
    return retrieveDownloads().then(data => {
      return data;
    });
  } catch (e) {
    console.error(e);
    return false;
  }
};
export default retrieveDownloads;
