const ensureYarn = () => {
  // If npm is being run, print a message and cause 'npm install' to fail.
  if (!process.env.npm_execpath.includes('yarn')) {
    console.log(
      [
        '\n',
        '┌───────────────────────────────────────────────────────────────────┐',
        '│ The Simorgh project now uses Yarn for package management:         │',
        '│                                                                   │',
        '│ https://github.com/bbc/simorgh/blob/latest/README.md#install-yarn │',
        '└───────────────────────────────────────────────────────────────────┘',
        '\n',
      ].join('\n'),
    );
    process.exit(1);
  }
};

ensureYarn();
