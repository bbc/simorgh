// Same as above but we will need React
import React from 'react';
import EmbedHtml from '.';
import { dataPicEmbedHtml, quotePicEmbedHtml } from './fixtures';

export default {
  title: 'Components/Embed HTML',
  component: EmbedHtml,
};

export const DataPic = () => <EmbedHtml embedHtml={dataPicEmbedHtml} />;

export const QuotePic = () => <EmbedHtml embedHtml={quotePicEmbedHtml} />;
