/* eslint-disable jsx-a11y/aria-role */
import React, { PropsWithChildren, use } from 'react';
import { ServiceContext } from '../../contexts/ServiceContext';
import VisuallyHiddenText from '../VisuallyHiddenText';
import Text from '../Text';

const CopyrightContainer = ({ children }: PropsWithChildren) => {
  const { imageCopyrightOffscreenText, lang } = use(ServiceContext);

  return (
    <Text
      as="p"
      role="text"
      fontVariant="sansRegular"
      size="minion"
      className="absolute bottom-0 left-0 m-0 overflow-hidden bg-black/75 px-full py-half text-white uppercase font-sans"
    >
      <span className="text-minion">
        {imageCopyrightOffscreenText ? (
          <VisuallyHiddenText>{imageCopyrightOffscreenText}</VisuallyHiddenText>
        ) : null}
        {lang === 'en-GB' ? children : <span lang="en-GB">{children}</span>}
      </span>
    </Text>
  );
};

export default CopyrightContainer;
