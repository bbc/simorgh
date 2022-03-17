var isValidId = function isValidId(id) {
  try {
    return !Number.isNaN(id) && Number.isInteger(parseFloat(id));
  } catch (_unused) {
    return false;
  }
};

var isValidRegex = function isValidRegex(regex) {
  try {
    RegExp(regex);
  } catch (_unused2) {
    return false;
  }

  return regex !== '';
};

var parseArgs = function parseArgs(argv) {
  if (argv.length !== 6) {
    throw new Error('Incorrect number of args.\nUsage: node path/to/exposure-scanning <repo> <-pr/-issue> <id> <regex>');
  }

  var repo = argv[2];
  var flag = argv[3]; // -pr or -issue

  var id = argv[4];
  var regexString = argv[5];

  if (!isValidRegex(regexString)) {
    throw new Error('Invalid regex argument given.');
  }

  if (!isValidId(id)) {
    throw new Error('Invalid issue/pr id.');
  }

  var isValidFlag = ['-pr', 'issue'].includes(flag);

  if (!isValidFlag) {
    throw new Error('Invalid flag argument given.');
  }

  return {
    repo: repo,
    flag: flag,
    id: id,
    regexString: regexString
  };
};

export default parseArgs;