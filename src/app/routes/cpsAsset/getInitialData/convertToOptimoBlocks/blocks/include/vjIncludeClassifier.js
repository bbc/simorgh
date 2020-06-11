import { ampSupported } from './ampSrcBuilder';

const vjIncludeClassifier = ({ href, pathname }) => {
  const pathnameIsAmp = pathname.endsWith('.amp');

  if (!pathnameIsAmp) {
    return 'vj-include-canonical';
  }

  if (ampSupported(href)) {
    return 'vj-include-supports-amp';
  }

  return 'vj-include-not-supporting-amp';
};

export default vjIncludeClassifier;
