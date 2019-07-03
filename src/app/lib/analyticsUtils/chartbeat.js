export const chartbeatUID = 50924;

export const useCanonical = true;

export const cknsSylphid = () => {};

export const domain = service =>
  service ? `${service}.bbc.co.uk` : `bbc.co.uk`;

export const sections = ({ service }) => {
  const parts = [];

  parts.push(service);

  return parts;
};

export const title = () => {};

export const type = () => {};
