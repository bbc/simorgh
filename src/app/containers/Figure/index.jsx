import React from 'react';
import { string } from 'prop-types';
import Figure from '../../components/Figure';
import Caption from '../../components/Figure/Caption';
import VisuallyHiddenText from '../../components/VisuallyHiddenText';

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
    <Figure src={src} alt={alt}>
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
