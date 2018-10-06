import React from 'react';
import { shouldShallowMatchSnapshot } from '../../helpers/tests/testHelpers';
import ParagraphContainer from './index';

const fragmentBlock = (text, attributes = []) => ({
  blockId: 'f-01',
  type: 'fragment',
  model: {
    text,
    attributes,
  },
});

const blocks = [fragmentBlock('This is some text.', ['bold'])];

describe('ParagraphContainer', () => {
  shouldShallowMatchSnapshot(
    'should render correctly',
    <ParagraphContainer blocks={blocks} lang="en_GB" script="latin" />,
  );
});
