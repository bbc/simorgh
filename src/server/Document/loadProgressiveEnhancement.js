const fs = require('fs');

const readOutputProgressiveEnhancementPlugin = () => {
  try {
    const filePath = `${fs.realpathSync(
      process.cwd(),
    )}/build/progressive-enhancement-string.txt`;
    return fs.readFileSync(filePath, 'utf8');
  } catch (e) {
    return '';
  }
};

export default readOutputProgressiveEnhancementPlugin();
