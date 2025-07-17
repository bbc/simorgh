import { updateBytes } from '../byteStore';

const patchFetch = () => {
  const originalFetch = window.fetch;
  window.fetch = async (...args) => {
    const response = await originalFetch(...args);
    const clone = response.clone();

    try {
      const reader = clone.body?.getReader();
      if (reader) {
        let bytesRead = 0;

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          bytesRead += value.length;
          console.log(bytesRead, 'bytes read so far');
        }
        updateBytes(bytesRead);
      }
    } catch (err) {
      console.error('Failed to read response body:', err);
    }

    return response;
  };
};

export default patchFetch;
