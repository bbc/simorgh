/* eslint-disable camelcase */
import React, { useContext } from 'react';
import EmbedError from '#app/legacy/psammead/psammead-embed-error/src';
import { ServiceContext } from '#app/contexts/ServiceContext';
import pathOr from 'ramda/src/pathOr';
import { GridItemMedium } from '../../../legacy/components/Grid';
import EmbedHtml from '../EmbedHtml';

type OEmbedBlock = {
  id: string;
  type: string;
  link: string;
  isAmp: boolean;
  oembed: {
    version: string;
    provider_name: string;
    provider_url: string;
    html: string;
    url?: string;
    width?: number;
    height?: number;
    type: string;
  };
};

const OEmbedLoader = ({ oembed, isAmp, link }: OEmbedBlock) => {
  const { html } = oembed;
  const { translations } = useContext(ServiceContext);

  if (isAmp) {
    const errorMessage = pathOr(
      'Sorry, we can’t display this part of the story on this lightweight mobile page.',
      ['include', 'errorMessage'],
      translations,
    );

    const linkText = pathOr(
      'View the full version of the page to see all the content.',
      ['include', 'linkText'],
      translations,
    );

    return (
      <GridItemMedium gridColumnStart={0} gridSpan={5}>
        <EmbedError
          message={errorMessage}
          link={{
            text: linkText,
            href: link,
          }}
        />
      </GridItemMedium>
    );
  }

  return <EmbedHtml embeddableContent={html} />;
};

export default OEmbedLoader;
