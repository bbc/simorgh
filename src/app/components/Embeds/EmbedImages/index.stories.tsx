// Same as above but we will need React
import React from 'react';
import EmbedImages from '.';
import { chartEmbedImages, mapEmbedImages, tableEmbedImages } from './fixtures';

export default {
  title: 'Components/Embed Images',
  component: EmbedImages,
};

export const Chart = () => <EmbedImages embedImages={chartEmbedImages} />;

export const Map = () => <EmbedImages embedImages={mapEmbedImages} />;

export const Table = () => <EmbedImages embedImages={tableEmbedImages} />;
