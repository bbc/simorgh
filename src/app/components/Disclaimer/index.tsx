/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { useContext } from 'react';
import { bool } from 'prop-types';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import isEmpty from 'ramda/src/isEmpty';
import { GridItemLarge } from '#components/Grid';

import useToggle from '#hooks/useToggle';
import { ServiceContext } from '#contexts/ServiceContext';
import InlineLink from '../InlineLink';
import styles from './index.styles';

const DisclaimerComponent = ({ increasePaddingOnDesktop }) => {
  const { service, script, disclaimer, translations } =
    useContext(ServiceContext);
  const { enabled } = useToggle('disclaimer');

  const shouldShow = enabled && disclaimer && !isEmpty(disclaimer);

  if (!shouldShow) return null;

  const infoBannerLabelTranslation = pathOr(
    'Information',
    ['infoBannerLabel'],
    translations,
  );

  return (
    <GridItemLarge>
      <section
        css={styles.infoBanner}
        service={service}
        script={script}
        increasePaddingOnDesktop={increasePaddingOnDesktop}
        role="region"
        aria-label={infoBannerLabelTranslation}
      >
        <p css={styles.infoBanner}>
          {disclaimer &&
            Object.values(disclaimer).map((para, index) => {
              const linkText = path(['text'], para);
              const linkUrl = path(['url'], para);
              const isExternalLink = path(['isExternal'], para);
              return linkUrl ? (
                <InlineLink
                  key={linkText}
                  locator={linkUrl}
                  blocks={[
                    {
                      id: `infoBannerLink-${index}`,
                      type: 'fragment',
                      model: { text: linkText, attributes: [] },
                    },
                  ]}
                  isExternal={isExternalLink}
                />
              ) : (
                para
              );
            })}
        </p>
      </section>
    </GridItemLarge>
  );
};

DisclaimerComponent.propTypes = {
  increasePaddingOnDesktop: bool,
};

DisclaimerComponent.defaultProps = {
  increasePaddingOnDesktop: true,
};

export default DisclaimerComponent;
