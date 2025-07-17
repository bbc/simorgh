import React from 'react';
import InlineLink from '../../InlineLink';
import Text from '../../Text';

type Props = {
  message: string;
  link: {
    text: string;
    href: string;
  };
};

const EmbedError = ({ message, link }: Props) => {
  return (
    <div 
      className="bg-white max-w-full mx-full mb-triple p-double group-2:mx-double group-4:mx-0 forced-colours:border-3 forced-colours:border-transparent"
      data-e2e="embed-error"
    >
      <Text as="strong" fontVariant="sansRegular" size="longPrimer">
        {message}
      </Text>
      <div className="pt-full">
        {link?.text && link.href && (
          <InlineLink 
            to={link.href} 
            text={link.text} 
            className="text-black border-b border-black font-sans-regular text-bodyCopy"
          />
        )}
      </div>
    </div>
  );
};

export default EmbedError;
