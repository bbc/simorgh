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

const getDials = () =>
  new Promise((resolve, reject) => {
    const dialsPath = process.env.COSMOS_DIALS_PATH;

    if (!dialsPath) {
      reject(new Error('Dials filepath undefined'));
    }

    return fs.readFile(dialsPath, (err, data) => {
      if (err) {
        reject(err);
      }

      const dials = JSON.parse(data);

      Object.keys(dials).forEach(dial => {
        const value = dials[dial];
        dials[dial] = transformDial(value);
      });

      resolve(dials);
    });
  });

export default getDials;
