import React from 'react';

const TopicImage = ({ image }) => {
  const imageUrl = image.replace('/480/', '/128/');

  return (
    <div className="pb-full group-4:pb-0">
      <div className="w-sextuple h-sextuple group-2:w-16 group-2:h-16 flex justify-center mr-double">
        <img 
          src={imageUrl} 
          alt="" 
          className="max-w-full max-h-full object-cover rounded-full" 
          data-testid="topic-badge" 
        />
      </div>
    </div>
  );
};

export default TopicImage;
