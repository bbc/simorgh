import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import styled from 'styled-components';
import {
  C_POSTBOX,
  C_EBON,
  C_STORM,
  C_WHITE,
} from '../../lib/constants/styles';

const PaletteBlock1 = styled.div`
  background-color: ${C_POSTBOX};
  border: 1px solid #000000;
  height: 50px;
  width: 50px;
`;
const PaletteLabel = styled.span`
  color: ${C_EBON};
`;

const PaletteBlock2 = styled.div`
  background-color: ${C_EBON};
  border: 1px solid #000000;
  height: 50px;
  width: 50px;
`;
const PaletteBlock3 = styled.div`
  background-color: ${C_STORM};
  border: 1px solid #000000;
  height: 50px;
  width: 50px;
`;

const PaletteBlock4 = styled.div`
  background-color: ${C_WHITE};
  border: 1px solid #000000;
  height: 50px;
  width: 50px;
`;

storiesOf('Palette', module).add('Primary colour palette', () => (
  <React.Fragment>
    <PaletteBlock1 />
    <PaletteLabel>Postbox #B80000</PaletteLabel>
    <PaletteBlock2 />
    <PaletteLabel>Ebon #222222</PaletteLabel>
    <PaletteBlock3 />
    <PaletteLabel>Storm #404040</PaletteLabel>
    <PaletteBlock4 />
    <PaletteLabel>White #FFFFFF</PaletteLabel>
  </React.Fragment>
));
