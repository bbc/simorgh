import { getElement, shouldContainText } from '../support/bodyTestHelper';

const glyphs = [
  '$',
  '%',
  '+',
  '-',
  '=',
  '_',
  '£',
  '¥',
  '©',
  '°',
  '²',
  '³',
  '¹',
  '×',
  'ẞ',
  'ß',
  'à',
  'á',
  'â',
  'æ',
  'ç',
  'è',
  'é',
  'ê',
  'î',
  'ô',
  '÷',
  'û',
  'Ŵ',
  'ŵ',
  'Ŷ',
  'ŷ',
  '⁰',
  '⁴',
  '⁵',
  '⁶',
  '⁷',
  '⁸',
  '⁹',
  '₀',
  '₁',
  '₂',
  '₃',
  '₄',
  '₅',
  '₆',
  '₇',
  '₈',
  '₉',
  '€',
];
const glyphsStr = glyphs.join(',');

describe('Glyph Tests', () => {
  // eslint-disable-next-line no-undef
  before(() => {
    cy.visit('/news/articles/c0000000017o'); // @TODO - not available in Prod
  });

  it('should render special characters in headlines', () => {
    const headerBranding = getElement('h1');
    shouldContainText(headerBranding, glyphsStr);
  });
});
