/** @jsx jsx */
import { useContext } from 'react';
import { jsx } from '@emotion/react';
import CallToActionLink from '../CallToActionLink';
import InlineLink from '../InlineLink';
import Paragraph from '../Paragraph';
import { LeftChevron, RightChevron } from '../icons';
import { ServiceContext } from '../../contexts/ServiceContext';
import { RequestContext } from '../../contexts/RequestContext';

const LiteSiteCta = () => {
  // thinking it is better to do this here than in Header and pass in?
  const { dir, translations } = useContext(ServiceContext);
  // this is still taking to lite.
  const { canonicalLink } = useContext(RequestContext);
  const isRtl = dir === 'rtl';
  const { skipLinkText } = translations;

  return (
    <div>
      <Paragraph>{skipLinkText}</Paragraph>
      <CallToActionLink href={canonicalLink} className="focusIndicatorInvert">
        Go to main page
        {isRtl ? <LeftChevron /> : <RightChevron />}
      </CallToActionLink>
      <InlineLink text="Go to info page" to={canonicalLink} />
    </div>
  );
};

export default LiteSiteCta;
