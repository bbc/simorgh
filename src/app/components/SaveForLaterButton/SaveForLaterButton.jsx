import React from 'react';

const SaveButton = () => {
  const handleSave = () => {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: 'SAVE_ARTICLE',
        url: window.location.href,
      });
    } else {
      console.warn('No active service worker found');
    }
  };

  return (
    <button type="button" onClick={handleSave}>
      Save for later
    </button>
  );
};

export default SaveButton;
