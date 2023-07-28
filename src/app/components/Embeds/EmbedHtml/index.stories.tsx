import React from 'react';
import EmbedHtml from '.';
import { dataPicEmbedHtml, quotePicEmbedHtml } from './fixtures';

export default {
  title: 'Components/Embed HTML',
  component: EmbedHtml,
};

export const DataPic = () => <EmbedHtml embeddableContent={dataPicEmbedHtml} />;

export const QuotePic = () => (
  <EmbedHtml embeddableContent={quotePicEmbedHtml} />
);
