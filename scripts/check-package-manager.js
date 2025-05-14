const ensureYarn = () => {
  // If npm is being run, print a message and cause 'npm install' to fail.
  if (!process.env.npm_execpath.includes('yarn')) {
    process.exit(1);
  }
};

ensureYarn();
