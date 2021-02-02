const ensureYarn = () => {
  // If npm is being run, print a message and cause 'npm install' to fail.
  console.log('process.env.npm_execpath', process.env.npm_execpath);
  if (!process.env.npm_execpath.includes('yarn')) {
    console.log(
      [
        '\n\n',
        '**************************************************************',
        '*                                                            *',
        '*  The Simorgh project now uses Yarn for package management  *',
        '*                                                            *',
        '**************************************************************',
        '\n\n',
      ].join('\n'),
    );
    process.exit(1);
  }
};

ensureYarn();
