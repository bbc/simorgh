const isValidId = id => {
  try {
    return !Number.isNaN(id) && Number.isInteger(parseFloat(id));
  } catch {
    return false;
  }
};

const isValidRegex = regex => {
  try {
    RegExp(regex);
  } catch {
    return false;
  }
  return regex !== '';
};

const parseArgs = argv => {
  if (argv.length !== 6) {
    throw new Error(
      'Incorrect number of args.\nUsage: node path/to/exposure-scanning <repo> <-pr/-issue> <id> <regex>',
    );
  }

  const repo = argv[2];
  const flag = argv[3]; // -pr or -issue
  const id = argv[4];
  const regexString = argv[5];

  if (!isValidRegex(regexString)) {
    throw new Error('Invalid regex argument given.');
  }

  if (!isValidId(id)) {
    throw new Error('Invalid issue/pr id.');
  }

  const isValidFlag = ['-pr', 'issue'].includes(flag);

  if (!isValidFlag) {
    throw new Error('Invalid flag argument given.');
  }

  return { repo, flag, id, regexString };
};

export default parseArgs;
