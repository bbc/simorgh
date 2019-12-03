import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import Metadata from './Metadata';
import { missingAresMediaMetadataBlock } from './fixtureData';
import { getMetadataBlock } from './helpers/metadata';

describe('Metadata', () => {
  const {
    model: { blocks },
  } = missingAresMediaMetadataBlock;
  const embedSource =
    'https://www.test.bbc.com/ws/av-embeds/articles/c3wmq4d1y3wo/p01k6mtv/en-GB';
  const aresMediaBlock = getMetadataBlock(blocks) || { model: {} };
  shouldMatchSnapshot(
    'should render Metadata correctly ',
    <Metadata aresMediaBlock={aresMediaBlock} embedSource={embedSource} />,
  );
});
