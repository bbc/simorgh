import React from 'react';
import styled from '@emotion/styled';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withServicesKnob } from '#psammead/psammead-storybook-helpers/src';
import {
  getBodyCopy,
  getLongPrimer,
} from '#psammead/gel-foundations/src/typography';
import {
  getSansRegular,
  getSansBold,
  getSansRegularItalic,
  getSansBoldItalic,
} from '#psammead/psammead-styles/src/font-styles';
import notes from '../README.md';
import InlineLink from './index';
import { POSTBOX } from '../../../../components/ThemeProvider/palette';

const RegularParagraph = styled.p`
  ${({ script }) => getBodyCopy(script)};
  ${({ service }) => getSansRegular(service)}
`;
const BoldParagraph = styled.p`
  ${({ script }) => getBodyCopy(script)};
  ${({ service }) => getSansBold(service)}
`;
const ItalicParagraph = styled.p`
  ${({ script }) => getBodyCopy(script)};
  ${({ service }) => getSansRegularItalic(service)}
`;
const BoldItalicParagraph = styled.p`
  ${({ script }) => getBodyCopy(script)};
  ${({ service }) => getSansBoldItalic(service)}
`;

const Caption = styled.figcaption`
  ${({ script }) => getLongPrimer(script)};
  ${({ service }) => getSansRegularItalic(service)}
`;

const textDecorationStyle = {
  borderBottom: 'none',
  textDecoration: `underline ${POSTBOX}`,
};

const renderWrappedInlineLink = ({ longText, text, style }) => (
  <>
    {longText}&nbsp;
    <InlineLink style={style} href="https://www.bbc.com/news">
      {text}
    </InlineLink>
    &nbsp;
    {longText}
  </>
);

storiesOf('Components/InlineLink', module)
  .addDecorator(withKnobs)
  .addDecorator(withServicesKnob())
  .add(
    'default',
    ({ text }) => (
      <>
        <InlineLink href="https://www.bbc.com/news">{text}</InlineLink>
        <br />
        <br />
        Please note this component does not have its own typography styling
        (font-size, font-family and line-height) as it is expected to be used
        within another component such as paragraph or caption. For a more
        realistic storybook example of this component see the Paragraph and
        Caption stories - this should be removed in
        https://github.com/bbc/psammead/issues/733
      </>
    ),
    { notes, knobs: { escapeHTML: false } },
  )
  .add(
    'inline-link inside a regular paragraph',
    ({ longText, script, service, text }) => (
      <RegularParagraph script={script} service={service}>
        {renderWrappedInlineLink({ longText, text })}
      </RegularParagraph>
    ),
    { notes, knobs: { escapeHTML: false } },
  )
  .add(
    'inline-link inside a bold paragraph',
    ({ longText, script, service, text }) => (
      <BoldParagraph script={script} service={service}>
        {renderWrappedInlineLink({ longText, text })}
      </BoldParagraph>
    ),
    { notes, knobs: { escapeHTML: false } },
  )
  .add(
    'inline-link inside a italic paragraph',
    ({ longText, script, service, text }) => (
      <ItalicParagraph script={script} service={service}>
        {renderWrappedInlineLink({ longText, text })}
      </ItalicParagraph>
    ),
    { notes, knobs: { escapeHTML: false } },
  )
  .add(
    'inline-link inside a bold and italic paragraph',
    ({ longText, script, service, text }) => (
      <BoldItalicParagraph script={script} service={service}>
        {renderWrappedInlineLink({ longText, text })}
      </BoldItalicParagraph>
    ),
    { notes, knobs: { escapeHTML: false } },
  )
  .add(
    'experimental styled inline link with text-decoration style',
    ({ longText, script, service, text }) => (
      <>
        <RegularParagraph script={script} service={service}>
          {renderWrappedInlineLink({
            longText,
            text,
            style: textDecorationStyle,
          })}
        </RegularParagraph>
        <Caption script={script} service={service}>
          {renderWrappedInlineLink({
            longText,
            text,
            style: textDecorationStyle,
          })}
        </Caption>
        <br />
        <br />
        Please note this an experimental example of inline link styled with
        text-decoration: underline instead of border-bottom: solid. The 1st
        paragraph is an example of inline link in a regular paragraph and the
        2nd example is an example of inline link within a Caption. This has only
        been implemented for this storybook example. This experiment is a part
        of this issue: https://github.com/bbc/psammead/issues/2706
      </>
    ),
    { notes, knobs: { escapeHTML: false } },
  );
