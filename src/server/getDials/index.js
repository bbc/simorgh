import fs from 'fs';

const transformDial = value => {
  switch (value) {
    case 'true':
      return true;
    case 'false':
      return false;
    default:
      return value;
  }
};

const getDials = () => {
  const dialsPath = process.env.COSMOS_DIALS_PATH;

  if (!dialsPath) {
    return {};
  }

  const buffer = fs.readFileSync(dialsPath);
  const dials = JSON.parse(buffer);

  Object.keys(dials).forEach(dial => {
    const value = dials[dial];
    dials[dial] = transformDial(value);
  });

  return dials;
};

export default getDials;
