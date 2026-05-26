import { OK } from '#app/lib/statusCodes.const';
import { Services } from '#app/models/types/global';

const retrieveDownloads = async (service: Services) => {
  const fetchURl = `https://ws-downloads.files.bbci.co.uk/downloads-data-${service}.json`;
  try {
    const retrieveDownloads = async () => {
      const response = await fetch(fetchURl);

      if (response.status !== OK) return null;

      const downloads = await response.json();
      return downloads;
    };
    return retrieveDownloads().then(data => data);
  } catch (_e) {
    return false;
  }
};
export default retrieveDownloads;
