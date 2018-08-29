import React from 'react';
import { string } from 'prop-types';
import Figure from '../../components/Figure';
import Image from '../../components/Figure/Image';
import VisuallyHiddenText from '../../components/VisuallyHiddenText';
import Caption from '../../components/Figure/Caption';

const FigureContainer = ({ src, alt, copyrightHolder, caption }) => {
  const copyrightOffscreenText = 'Copyright';

  const renderCopyright = copyright => {
    const copyrightText = `${copyrightOffscreenText} ${copyright}`;
    return copyright !== 'BBC' ? (
      <VisuallyHiddenText>{copyrightText}</VisuallyHiddenText>
    ) : null;
  };

  const renderCaption = captionValue =>
    captionValue ? <Caption>{captionValue}</Caption> : null;

  return (
    <Figure>
      <Image alt={alt} src={src} />
      {renderCopyright(copyrightHolder)}
      {renderCaption(caption)}
    </Figure>
  );
};

FigureContainer.propTypes = {
  alt: string.isRequired,
  src: string.isRequired,
  copyrightHolder: string.isRequired,
  caption: string,
};

FigureContainer.defaultProps = {
  caption: null,
};

export default FigureContainer;
