const { runValidator } = require('.');

try {
  runValidator();
} catch (e) {
  process.exitCode = 1;
}
