import fs from 'fs';

const getDials = () => {
  const dialsPath = process.env.COSMOS_DIALS_PATH;

  const values = fs.readFileSync(dialsPath);
  return JSON.parse(values);
};

export default getDials;
