/** @jsx jsx */
/* @jsxFrag React.Fragment */
import { jsx } from '@emotion/react';
import styled from '@emotion/styled';
import { arrayOf, shape, string, node, bool } from 'prop-types';
import {
  getSansBold,
  getSansRegular,
} from '#psammead/psammead-styles/src/font-styles';
import { getBrevier } from '#psammead/gel-foundations/src/typography';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_MARGIN_BELOW_400PX,
  GEL_MARGIN_ABOVE_400PX,
} from '#psammead/gel-foundations/src/spacings';
import {
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '#psammead/gel-foundations/src/breakpoints';

import { AmpCookieSettingsButton } from '#containers/ConsentBanner/Banner/cookie.amp';
import Link from './Link';
import List from './List';
import styles from './index.styles';


const ConstrainedWrapper = styled.div`
  max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN};
  margin: 0 auto;
  ${({ trustProjectLink }) =>
    trustProjectLink && `padding-top: ${GEL_SPACING};`}
`;


const openPrivacyManagerModal = e => {
  e.preventDefault();
  if (window.dotcom && window.dotcom.openPrivacyManagerModal) {
    window.dotcom.openPrivacyManagerModal();
  }
};

const SitewideLinks = ({
  links,
  trustProjectLink,
  copyrightText,
  externalLink,
  isAmp,
  showAdsBasedOnLocation,
  script,
  service,
}) => {
  const elements = links.map(({ id, text, href, lang }) => {
    if (id === 'COOKIE_SETTINGS') {
      if (isAmp) {
        return (
          // @ts-expect-error we do not have a className
          <AmpCookieSettingsButton lang={lang} css={styles.ampCookieSettingButton}>
            {text}
          </AmpCookieSettingsButton>
        );
      }

      if (showAdsBasedOnLocation) {
        return (
          <Link
            service={service}
            text={text}
            href={href}
            lang={lang}
            onClick={openPrivacyManagerModal}
            onlyShowIfJSenabled
          />
        );
      }
    } else {
      return <Link service={service} text={text} href={href} lang={lang} />;
    }
    return null;
  });

  return (
    <div css={styles.siteWideLinksWrapper}>
      <ConstrainedWrapper trustProjectLink={trustProjectLink}>
        <List
          service={service}
          elements={elements}
          trustProjectLink={trustProjectLink}
        />
        <p css={styles.paragraph}>
          {copyrightText}{' '}
          <Link
            service={service}
            text={externalLink.text}
            href={externalLink.href}
            inline
          />
        </p>
      </ConstrainedWrapper>
    </div>
  );
};

const linkPropTypes = shape({
  href: string.isRequired,
  text: string.isRequired,
});

SitewideLinks.propTypes = {
  links: arrayOf(linkPropTypes.isRequired).isRequired,
  copyrightText: node.isRequired,
  trustProjectLink: linkPropTypes,
  externalLink: linkPropTypes.isRequired,
  isAmp: bool,
  showAdsBasedOnLocation: bool,
  script: shape({}),
  service: string,
};

SitewideLinks.defaultProps = {
  script: null,
  service: null,
  isAmp: false,
  trustProjectLink: null,
  showAdsBasedOnLocation: false,
};

export default SitewideLinks;
