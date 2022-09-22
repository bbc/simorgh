import React from 'react';
import styled from '@emotion/styled';
import { storiesOf } from '@storybook/react';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
} from '#psammead/gel-foundations/src/spacings';
import {
  GEL_FF_REITH_SANS,
  getBodyCopy,
} from '#psammead/gel-foundations/src/typography';
import latin from '../../../components/ThemeProvider/fontScripts/latin';
import { select, withKnobs } from '@storybook/addon-knobs';
import { withServicesKnob } from '#psammead/psammead-storybook-helpers/src/withServicesKnob';
import json5 from 'json5';
import {
  getSansRegular,
  getSansBold,
  getSansRegularItalic,
  getSansBoldItalic,
} from '#psammead/psammead-styles/src/font-styles';
import notes from '../README.md';
import * as colours from './colours';
import { grid } from './detection';
import * as fonts from './fonts';

const ColourContainer = styled.div`
  padding: ${GEL_SPACING_DBL};
  font-family: ${GEL_FF_REITH_SANS};
`;

const ColourRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${GEL_SPACING_DBL};
`;

const ColourBox = styled.div`
  background: ${props => props.colour};
  color: #000;
  padding: ${GEL_SPACING_DBL} ${GEL_SPACING};
  border-radius: 0.3125rem;
  display: inline-block;
  ${getBodyCopy(latin)};
`;

const ColourValue = styled.div`
  padding-left: ${GEL_SPACING};
  display: inline-block;
  ${getBodyCopy(latin)};
`;

const Detects = styled.li`
  color: red;
  &::after {
    content: ' = NO';
  }

  @supports (${props => props.detector}) {
    color: green;
    &::after {
      content: ' = YES';
    }
  }
`;

const Paragraph = styled.p`
  ${Object.values(fonts).join()}
`;

const camelCase = str => str.replace(/-([a-z])/g, g => g[1].toUpperCase());
const fontNames = Object.keys(fonts).sort();
const fontStyles = fontNames.map(x => x.substring(2).replace(/_/g, ' '));
const getFontStyles = fontName => {
  const font = fontNames.find(x => x.includes(fontName.replace(/ /g, '_')));
  const fontFace = fonts[font]() || '';
  const fontStyle = fontFace
    .replace(/"/g, '')
    .replace('@font-face', '')
    .replace(/: /g, ':"')
    .replace(/;/g, '",');

  const { fontFamily, fontWeight } = json5.parse(camelCase(fontStyle));
  return { fontFamily, fontWeight };
};

const detectionExamples = ['display: grid', grid];

const RegularParagraph = styled.p`
  ${({ script }) => script && getBodyCopy(script)};
  ${({ service }) => getSansRegular(service)}
`;
const BoldParagraph = styled.p`
  ${({ script }) => script && getBodyCopy(script)};
  ${({ service }) => getSansBold(service)}
`;
const ItalicParagraph = styled.p`
  ${({ script }) => script && getBodyCopy(script)};
  ${({ service }) => getSansRegularItalic(service)}
`;
const BoldItalicParagraph = styled.p`
  ${({ script }) => script && getBodyCopy(script)};
  ${({ service }) => getSansBoldItalic(service)}
`;

storiesOf('Utilities/Psammead Styles', module)
  .addDecorator(withKnobs)
  .addDecorator(withServicesKnob())
  .add(
    'font styles',
    () => {
      const fontName = select('Font Style', fontStyles, fontStyles[0]);
      return (
        <Paragraph style={getFontStyles(fontName)}>
          <span>The quick brown fox jumps over the lazy dog 0123456789</span>
          <br />
          <span>
            نص حكيم له سر قاطع وذو شأن عظيم مكتوب على ثوب أخضر ومغلف بجلد أزرق
          </span>
          <br />
          <span>
            ஒரு கட்டத்தில் தங்களை பெற்றோர் கவனிக்காமல் இருப்பதற்காக அவர்கள்
            இருவருக்குள்ளும் இந்த பிள்ளைகள் சண்டை மூட்டி தங்கள் பக்கம்
            திரும்பாமல் பார்த்துக் கொண்டுள்ளனர்.
          </span>
          <br />
          <span>
            তাইওয়ানের প্রতিরক্ষা মন্ত্রণালয় জানিয়েছে, রোববার তাদের বিমান
            প্রতিরক্ষা সীমানা লঙ্ঘন করেছে ১৯টি চীনা যুদ্ধবিমানের একটি বহর, যার
            ভেতর পারমানবিক বোমা হামলায় সক্ষম এমন অন্তত চারটি এইচ-৬ যুদ্ধবিমান
            ছিল।
          </span>
          <br />
          <span>
            2001 වසරේ සැප්තැම්බරයේ 11 වැනිදා, අඟහරුවාදාවකි. මරාගෙන මැරෙන
            ප්‍රහාරකයෝ එක්සත් ජනපදයේ මගී ප්‍රවාහන ජෙට් යානා තම ග්‍රහණයට ගෙන
            නිව්යෝර්ක් නුවර උසැති ගොඩනැගිලි දෙකක ගැටෙන්නට සැලැස්වූහ. දහස් ගණනකට
            ජීවිත අහිමි විය. ඇමරිකාවේ පමණක් නොව මුළු ලොවටම බලපෑ, ශතවර්ෂය තුළ
            සිදුවූ දරුණුතම සිද්ධියක් ලෙස එය තවමත් වර්තාගතය.
          </span>
        </Paragraph>
      );
    },
    { notes, knobs: { escapeHTML: false } },
  )
  .add(
    'fonts per service - Regular, RegularItalic, Bold, BoldItalic',
    ({ service, text, dir, script }) => {
      return (
        <div dir={dir}>
          <RegularParagraph script={script} service={service}>
            {text}
          </RegularParagraph>
          <ItalicParagraph script={script} service={service}>
            {text}
          </ItalicParagraph>
          <BoldParagraph script={script} service={service}>
            {text}
          </BoldParagraph>
          <BoldItalicParagraph script={script} service={service}>
            {text}
          </BoldItalicParagraph>
        </div>
      );
    },
    { notes, knobs: { escapeHTML: false } },
  )
  .add(
    'colours',
    () => (
      <ColourContainer>
        {Object.keys(colours).map(colour => (
          <ColourRow key={colours[colour]}>
            <ColourBox colour={colours[colour]}>{colours[colour]}</ColourBox>
            <ColourValue>{colour}</ColourValue>
          </ColourRow>
        ))}
      </ColourContainer>
    ),
    { notes },
  )
  .add(
    'CSS feature detection',
    () => (
      <ul>
        {detectionExamples.map(ex => (
          <Detects key={ex} detector={ex}>
            <pre>@supports ({ex})</pre>
          </Detects>
        ))}
      </ul>
    ),
    { notes },
  );
