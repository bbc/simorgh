import React from 'react';
import styled from '@emotion/styled';
import { GEL_SPACING } from '#psammead/gel-foundations/src/spacings';
import * as numerals from '../src/numerals';

const numeralSystems = Object.keys(numerals).filter(key =>
  Array.isArray(numerals[key]),
);

const Container = styled.div`
  padding: ${GEL_SPACING};
`;

const Value = styled.div`
  display: inline-block;
  margin: ${GEL_SPACING};
`;

const Component = () => {
  return (
    <Container>
      {numeralSystems.map(numeralSystem => (
        <div>
          <Value>{numeralSystem}</Value>
          <Value>{numerals[numeralSystem].join(', ')}</Value>
        </div>
      ))}
    </Container>
  );
};

export default {
  title: 'Translations/Numerals',
  Component,
  parameters: {
    chromatic: {
      disable: true,
    },
  },
};

export const Example = Component;