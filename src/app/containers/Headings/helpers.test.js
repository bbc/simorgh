import sanitisedSubheadlineCreator from './helpers';

describe('Headings sanitisation helper', () => {
  it('should return null for headline', () => {
    const result = sanitisedSubheadlineCreator(
      'headline',
      'Royal wedding 2018: Bouquet laid on tomb of unknown warrior',
    );
    expect(result).toBe(null);
  });

  it('should return an id for subheadline', () => {
    const result = sanitisedSubheadlineCreator(
      'subheadline',
      "Queen Victoria's myrtle",
    );
    expect(result).toBe('Queen-Victorias-myrtle');
  });

  it('should return an id for a persian subheadline', () => {
    const result = sanitisedSubheadlineCreator(
      'subheadline',
      'پهپادی که برایتان قهوه می‌آورد',
    );
    expect(result).toBe('پهپادی-که-برایتان-قهوه-می‌آورد');
  });

  it('should remove latin script punctuation', () => {
    const result = sanitisedSubheadlineCreator(
      'subheadline',
      '[.,/#?¿!$%^&*hello;:{world}=-_`~()«»]',
    );
    expect(result).toBe('helloworld');
  });

  it('should remove asian script punctuation', () => {
    const result = sanitisedSubheadlineCreator(
      'subheadline',
      '[’！，。？、~@#￥%……&*（hello）：；《）《》“world”〔〕-]|',
    );
    expect(result).toBe('helloworld');
  });

  it('should remove persian punctuation', () => {
    const result = sanitisedSubheadlineCreator(
      'subheadline',
      '[hello؟؛٬world]',
    );
    expect(result).toBe('helloworld');
  });
});
