import React, { useContext } from 'react';
import { bool, string, number, oneOfType } from 'prop-types';
import VisuallyHiddenText from '#psammead/psammead-visually-hidden-text/src';
import path from 'ramda/src/path';
import Promo from '#components/Promo';
import { ServiceContext } from '../../../../contexts/ServiceContext';

const CurationPromo = ({
  title,
  firstPublished,
  imageUrl,
  imageAlt,
  lazy,
  link,
  type,
  duration: mediaDuration,
  headingLevel,
}) => {
  const { translations } = useContext(ServiceContext);

  const audioTranslation = path(['media', 'audio'], translations);
  const videoTranslation = path(['media', 'video'], translations);
  const durationTranslation = path(['media', 'duration'], translations);

  console.log('___________media duration', mediaDuration);
  return (
    <Promo>
      <Promo.Image src={imageUrl} alt={imageAlt} lazyLoad={lazy}>
        <Promo.MediaIcon type={type}>{mediaDuration}</Promo.MediaIcon>
      </Promo.Image>
      <Promo.Heading as={`h${headingLevel}`}>
        <Promo.A href={link}>
          <span>
            <VisuallyHiddenText>
              {(type === 'audio' && `${audioTranslation},`) ||
                (type === 'video' && `${videoTranslation},`)}
            </VisuallyHiddenText>
            {title}
            <VisuallyHiddenText>{`, ${durationTranslation}`}</VisuallyHiddenText>
          </span>
        </Promo.A>
      </Promo.Heading>
      <Promo.Timestamp>{firstPublished}</Promo.Timestamp>
    </Promo>
  );
};

CurationPromo.propTypes = {
  title: string.isRequired,
  // epoch time or ISO8601 timestamp
  firstPublished: oneOfType([number, string]).isRequired,
  imageUrl: string.isRequired,
  imageAlt: string.isRequired,
  lazy: bool,
  link: string.isRequired,
  type: string,
  duration: number,
  headingLevel: number,
};

CurationPromo.defaultProps = {
  lazy: false,
  type: null,
  duration: null,
  headingLevel: 2,
};

export default CurationPromo;
