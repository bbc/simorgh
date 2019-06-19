import idSanitiser from '.';

describe('idSanitiser', () => {
  it('should replace spaces with hyphens', () => {
    const result = idSanitiser("Queen Victoria's myrtle");
    expect(result).toBe('Queen-Victorias-myrtle');
  });

  it('should replace spaces with hyphens in persian', () => {
    const result = idSanitiser('پهپادی که برایتان قهوه می‌آورد');
    expect(result).toBe('پهپادی-که-برایتان-قهوه-می‌آورد');
  });

  it('should remove latin script punctuation', () => {
    const result = idSanitiser('[.,/#?¿!$%^&*hello;:{world}=-_`~()«»]');
    expect(result).toBe('helloworld');
  });

  it('should remove asian script punctuation', () => {
    const result = idSanitiser(
      '[’！，。？、~@#￥%……&*（hello）：；《）《》“world”〔〕-]|',
    );
    expect(result).toBe('helloworld');
  });

  it('should remove persian punctuation', () => {
    const result = idSanitiser('[hello؟؛٬world]');
    expect(result).toBe('helloworld');
  });
});
