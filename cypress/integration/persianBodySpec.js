import {
  checkElementStyles,
  getElement,
  renderedTitle,
  shouldContainText,
  shouldContainStyles,
  visibleImageNoCaption,
  visibleImageWithCaption,
} from '../support/bodyTestHelper';
import { BBCBlocksSVG } from '../../src/app/lib/constants/styles';

describe('Article Body Tests', () => {
  // eslint-disable-next-line no-undef
  before(() => {
    // Only 'c0000000028o' is available within the PROD enviroment
    cy.visit('/persian/articles/c0000000028o');
  });

  it('should render a headline', () => {
    checkElementStyles(
      'h1',
      'پهپادی که برایتان قهوه می‌آورد',
      'rgb(34, 34, 34)',
      'ReithSerifNewsMedium, Helvetica, Arial, sans-serif',
    );
  });

  it('should render a paragraph', () => {
    const p = getElement('p');
    shouldContainText(
      p,
      'شاید خیلی طول نکشد که زمانی برسد که وقتی خسته هستید و مثلا هوس فنجان قهوه‌ای را کردید، پهپادی را ببینید که با قهوه سراغتان می‌آید.',
    );
  });

  it('should have a placeholder image', () => {
    const placeholderImage = getElement('figure div').eq(0);
    shouldContainStyles(
      placeholderImage,
      'background-color',
      'rgb(236, 234, 231)',
    );
    shouldContainStyles(
      placeholderImage,
      'background-image',
      `url("data:image/svg+xml;base64,${BBCBlocksSVG}")`,
    );
    shouldContainStyles(placeholderImage, 'background-position', '50% 50%');
  });

  it('should have a visible image without a caption', () => {
    visibleImageNoCaption(getElement('figure').eq(0));
  });

  it('should have a visible image with a caption', () => {
    visibleImageWithCaption(getElement('figure').eq(2));
  });

  it('should render a title', () => {
    renderedTitle('پهپادی که برایتان قهوه می‌آورد – BBC News فارسی');
  });
});
