import React from 'react';
import styled from '@emotion/styled';

import useImageColour from '.';

const Wrapper = styled.div`
  width: 400px;
  background: ${({ background }) => background};
  transition: background 1s ease-in-out;
`;

const Img = styled.img`
  height: 225px;
  display: block;
`;

const Typo = styled.div`
  padding: 20px;
  font-family: sans-serif;
  color: ${({ colour }) => colour};
`;

const Component = () => {
  const url =
    'https://ichef.bbci.co.uk/ace/ws/976/cpsprodpb/12555/production/_121339057_scallopedhammerheadsimonpierce-gct.jpg';
  const contrastColour = '#fff';

  const { colour } = useImageColour(url, {
    contrastColour,
    fallbackColour: '#000',
    minimumContrast: 7,
  });
  return (
    <>
      <Wrapper background={colour.hex}>
        <Img src={url} alt="Photo of a bird" />
        <Typo colour={contrastColour}>
          Conservationists have welcomed the announcement by Ecuador that it
          will expand the marine reserve around the Galapagos.
        </Typo>
      </Wrapper>
    </>
  );
};

export default {
  title: 'Hooks/useImageColour',
  Component,
  parameters: { chromatic: { disable: true } },
};

export const Demo = Component;
