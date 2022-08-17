import React from 'react';
import { shape, func } from 'prop-types';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import styled from '@emotion/styled';
import * as typographies from '#psammead/gel-foundations/src/typography';
import { withServicesKnob } from '#psammead/psammead-storybook-helpers/src';
import { scriptPropType } from '#psammead/gel-foundations/src/prop-types';
import notes from '../README.md';

const TypographyText = styled.p`
  ${props =>
    props.script && props.typographyFunc
      ? props.typographyFunc(props.script)
      : ''}
`;

TypographyText.propTypes = {
  script: shape(scriptPropType).isRequired,
  typographyFunc: func.isRequired,
};

const typographyStory = (typographyFunc, text, script) => (
  <TypographyText script={script} typographyFunc={typographyFunc}>
    {text}
  </TypographyText>
);

const stories = storiesOf('Others/Typography', module)
  .addDecorator(withKnobs)
  .addDecorator(withServicesKnob());

Object.keys(typographies)
  .filter(typographyName => typeof typographies[typographyName] === 'function')
  .forEach(typographyName => {
    stories.add(
      typographyName.replace(/^get/, ''),
      ({ text, script }) =>
        typographyStory(typographies[typographyName], text, script),
      { notes, knobs: { escapeHTML: false } },
    );
  });
