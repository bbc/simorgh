import escapeEntities from '.';

const text = char => `A Quick brown fox jumps over a lazy dog ${char}`;

describe('escapeEntities', () => {
  it.each`
    entity      | char
    ${`&quot;`} | ${`"`}
    ${`&#34;`}  | ${`"`}
    ${`&amp;`}  | ${`&`}
    ${`&#38;`}  | ${`&`}
    ${`&apos;`} | ${`'`}
    ${`&#39;`}  | ${`'`}
    ${`&lt;`}   | ${`<`}
    ${`&#60;`}  | ${`<`}
    ${`&gt;`}   | ${`>`}
    ${`&#62;`}  | ${`>`}
  `('should replace $entity with $char', ({ entity, char }) => {
    const expected = text(char);
    const input = text(entity);
    expect(escapeEntities(input)).toEqual(expected);
  });
});
