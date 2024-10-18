/** @jsx jsx */
import { useContext } from 'react';
import { jsx } from '@emotion/react';
// import CallToActionLink from '../CallToActionLink';
// import InlineLink from '../InlineLink';
import Paragraph from '../Paragraph';
import Text from '../Text';
import { LeftChevron, RightChevron } from '../icons';
import { ServiceContext } from '../../contexts/ServiceContext';
import { RequestContext } from '../../contexts/RequestContext';

// TO DO - see if it's possible to refactor with existing components
const CtaLink = ({
  isRtl,
  href,
  text,
}: {
  isRtl: boolean;
  href: string;
  text: string;
}) => {
  return (
    <a href={href}>
      <Text size="bodyCopy" fontVariant="sansBold">
        {text}
      </Text>
      {isRtl ? <LeftChevron /> : <RightChevron />}
    </a>
  );
};

const LiteSiteCta = () => {
  const { dir, translations } = useContext(ServiceContext);
  // TO DO - this is still taking to lite.
  const { canonicalLink } = useContext(RequestContext);
  const isRtl = dir === 'rtl';
  // TO DO - Add real translations
  const { skipLinkText } = translations;
  const id = 'LiteSiteCta';

  return (
    <section role="region" aria-labelledby={id}>
      <strong aria-hidden="true" id={id}>
        {skipLinkText}
      </strong>
      <Paragraph>{skipLinkText}</Paragraph>
      <Paragraph>
        <CtaLink isRtl={isRtl} href={canonicalLink} text={skipLinkText} />
      </Paragraph>
    </section>
  );
};

export default LiteSiteCta;
