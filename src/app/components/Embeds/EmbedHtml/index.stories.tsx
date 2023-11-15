import React from 'react';
import EmbedHtml from '.';
import {
  dataPicEmbedHtml,
  quotePicEmbedHtml,
  riddleHTML,
  vjHTML,
} from './fixtures';

export default {
  title: 'Components/Embeds/Embed HTML',
  component: EmbedHtml,
  parameters: { chromatic: { disable: true } },
};

export const IDT2DataPic = () => (
  <EmbedHtml embeddableContent={dataPicEmbedHtml} />
);

export const IDT2QuotePic = () => (
  <EmbedHtml embeddableContent={quotePicEmbedHtml} />
);

export const Riddle = () => <EmbedHtml embeddableContent={riddleHTML} />;

export const VJCanonical = () => <EmbedHtml embeddableContent={vjHTML} />;
