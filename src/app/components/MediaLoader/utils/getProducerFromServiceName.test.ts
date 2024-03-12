import getProducerFromServiceName from './getProducerFromServiceName';

describe('getProducerFromServiceName', () => {
  it('Should return a valid Producer value.', () => {
    const examples = [
      ['mundo', 'MUNDO'],
      ['MUNDO', 'MUNDO'],
      ['indonesia', 'INDONESIAN'],
      ['turkce', 'TURKISH'],
      ['cymrufyw', 'WALES'],
      ['newyddion', 'WALES'],
      ['naidheachdan', 'SCOTLAND'],
      [null, ''],
    ];

    examples.forEach(([input, output]) => {
      const result = getProducerFromServiceName(input);

      expect(result).toStrictEqual(output);
    });
  });
});
