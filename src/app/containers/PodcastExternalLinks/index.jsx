import React, { useContext } from 'react';
import { arrayOf, shape, string } from 'prop-types';
import pathOr from 'ramda/src/pathOr';
import styled from '@emotion/styled';
import { C_CLOUD_LIGHT, C_EBON } from '@bbc/psammead-styles/colours';
import { getSansRegular } from '@bbc/psammead-styles/font-styles';
import { getGreatPrimer } from '@bbc/gel-foundations/typography';

import { ServiceContext } from '#contexts/ServiceContext';
import Link from './Link';

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

const PodcastExternalLinks = ({ links }) => {
  const { translations, service, script, dir } = useContext(ServiceContext);
  const defaultTranslation = 'This podcast is also available on';
  const title = pathOr(
    defaultTranslation,
    ['media', 'podcastExternalLinks'],
    translations,
  );

  if (!links.length) return null;

  return (
    <Wrapper>
      <Title script={script} service={service}>
        {title}
      </Title>
      <div>
        {links.map(({ linkText, linkUrl }) => (
          <Link
            href={linkUrl}
            key={linkText}
            service={service}
            script={script}
            dir={dir}
          >
            <span>{linkText}</span>
          </Link>
        ))}
      </div>
    </Wrapper>
  );
};

PodcastExternalLinks.propTypes = {
  links: arrayOf(
    shape({
      linkText: string.isRequired,
      linkUrl: string.isRequired,
    }),
  ).isRequired,
};

export default PodcastExternalLinks;
