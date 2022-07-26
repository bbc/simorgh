const getMvtExperiments = headers => {
  return Object.entries(headers).reduce((result, [header, content]) => {
    if (header.startsWith('mvt-')) {
      const noMvtPrefixHeader = header.slice(4);

      if (content.includes(';')) {
        const [type, variation] = content.split(';');
        result.push({
          experimentName: noMvtPrefixHeader,
          variation,
          type,
        });
      } else {
        const variation = content;
        result.push({ experimentName: noMvtPrefixHeader, variation });
      }
    }
    return result;
  }, []);
};

export default getMvtExperiments;
