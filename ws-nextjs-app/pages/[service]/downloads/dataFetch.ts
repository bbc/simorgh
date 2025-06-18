import { Services } from '#app/models/types/global';
import { OK } from '#app/lib/statusCodes.const';

const retrieveDownloads = async (service: Services) => {
  const fetchURl = `https://ws-downloads.files.bbci.co.uk/downloads-data-${service}.json`;
  try {
    const retrieveDownloads = async () => {
      const response = await fetch(fetchURl);

      if (response.status !== OK) return null;

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
