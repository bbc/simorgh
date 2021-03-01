import React, { useContext } from 'react';
import { string } from 'prop-types';
import pathOr from 'ramda/src/pathOr';
import styled from '@emotion/styled';
import { C_CLOUD_LIGHT, C_EBON } from '@bbc/psammead-styles/colours';
import { getSansRegular } from '@bbc/psammead-styles/font-styles';
import { getGreatPrimer } from '@bbc/gel-foundations/typography';

import { ServiceContext } from '#contexts/ServiceContext';
import { PodcastContext } from '#contexts/PodcastContext';
import Link from './PodcastLink';

const Wrapper = styled.div`
  border-top: 1px ${C_CLOUD_LIGHT} solid;
  border-bottom: 1px ${C_CLOUD_LIGHT} solid;
  margin: 0;
  padding: 0 0 1rem 0;
`;

const Title = styled.h2`
  ${({ service }) => getSansRegular(service)}
  ${({ script }) => getGreatPrimer(script)};
  color: ${C_EBON};
`;

const PodcastExternalLinks = ({ brandPid }) => {
  const { translations, service, script, dir } = useContext(ServiceContext);
  const defaultTranslation = 'This podcast is also available on';
  const title = pathOr(
    defaultTranslation,
    ['media', 'podcastExternalLinks'],
    translations,
  );

  const externalLinkData = useContext(PodcastContext);
  const externalLinks = pathOr([], [brandPid], externalLinkData);

  if (!externalLinks.length) return null;

  return (
    <Wrapper>
      <Title script={script} service={service}>
        {title}
      </Title>
      <div>
        {externalLinks.map(({ linkText, linkUrl }) => (
          <Link
            href={linkUrl}
            key={linkText}
            service={service}
            script={script}
            dir={dir}
          >
            {linkText}
          </Link>
        ))}
      </div>
    </Wrapper>
  );
};

PodcastExternalLinks.propTypes = {
  brandPid: string.isRequired,
};

export default PodcastExternalLinks;
