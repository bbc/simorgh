const getMvtExperiments = headers => {
  return Object.entries(headers).reduce((result, [header, content]) => {
    if (header.startsWith('mvt-')) {
      const noMvtPrefixHeader = header.slice(4);

      if (content.includes(';')) {
        const [, variation] = content.split(';');
        return { ...result, [noMvtPrefixHeader]: variation };
      }
      const variation = content;
      return { ...result, [noMvtPrefixHeader]: variation };
    }
    return result;
  }, {});
};

export default getMvtExperiments;
