import React from 'react';
import EmbedImages from '.';
import { chartEmbedImages, mapEmbedImages, tableEmbedImages } from './fixtures';

export default {
  title: 'Components/Embed Images',
  component: EmbedImages,
};

export const Chart = () => <EmbedImages blocks={chartEmbedImages.blocks} />;

export const Map = () => <EmbedImages blocks={mapEmbedImages.blocks} />;

export const Table = () => <EmbedImages blocks={tableEmbedImages.blocks} />;
