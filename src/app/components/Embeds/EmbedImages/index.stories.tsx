import React from 'react';
import EmbedImages from '.';
import { chartEmbedImages, mapEmbedImages, tableEmbedImages } from './fixtures';

export default {
  title: 'Components/Embeds/Embed Images',
  component: EmbedImages,
};

export const IDT2Chart = () => <EmbedImages blocks={chartEmbedImages.blocks} />;

export const IDT2Map = () => <EmbedImages blocks={mapEmbedImages.blocks} />;

export const IDT2Table = () => <EmbedImages blocks={tableEmbedImages.blocks} />;
