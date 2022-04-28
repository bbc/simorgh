import parseArgs from '.';

describe('Parsing arguments', () => {
  it('should return an object containing the repo, flag, id and regex string', () => {
    expect(
      parseArgs(['node', 'scan.js', 'simorgh', '-pr', '1234', 'regex']),
    ).toEqual({
      repo: 'simorgh',
      flag: '-pr',
      id: '1234',
      regexString: 'regex',
    });
  });

  it('should throw an error without logging args if the number of args given is incorrect', () => {
    expect(() =>
      parseArgs(['node', 'scan.js', 'simorgh', '-pr', '1234', 're[g]ex', '-u']),
    ).toThrow(
      'Incorrect number of args.\nUsage: node path/to/exposure-scanning <repo> <-pr/-issue> <id> <regex>',
    );
  });

  it('should throw an error without logging args if an invalid id is given', () => {
    expect(() =>
      parseArgs([
        'node',
        'scan.js',
        'psammead',
        '-issue',
        'add-topic-tags',
        'regex',
      ]),
    ).toThrow('Invalid issue/pr id');
  });

  it('should throw an error without logging args if an invalid regex is given', () => {
    expect(() =>
      parseArgs(['node', 'scan.js', 'psammead', '-issue', '12341234', '']),
    ).toThrow('Invalid regex argument given.');
  });

  it('should throw an error without logging args if an invalid flag is given', () => {
    expect(() =>
      parseArgs([
        'node',
        'scan.js',
        'psammead',
        '-not-an-issue',
        '12341234',
        'regex',
      ]),
    ).toThrow('Invalid flag argument given.');
  });
});
