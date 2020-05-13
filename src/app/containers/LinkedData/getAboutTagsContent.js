const checkType = types => {
  const acceptableTypes = [
    'core:Person',
    'core:Event',
    'core:Organization',
    'core:Place',
  ];

  if (types.length === 0) {
    return 'Thing';
  }

  let typesFound = 0;
  let typeFound;
  types.forEach(type => {
    if (acceptableTypes.includes(type)) {
      typesFound += 1;
      typeFound = type.replace('core:', '');
    }
  });

  if (typesFound === 1) {
    return typeFound;
  }
  return 'Thing';
};

const checkSameAs = uris => {
  const sameAs = uris.filter(uri => uri.includes('http://dbpedia.org'));
  return sameAs.length ? sameAs : undefined;
};

export default aboutTags => {
  if (aboutTags && aboutTags.length > 0) {
    const content = [];
    aboutTags.forEach(tag => {
      const about = {
        '@type': checkType(tag.thingType),
        name: tag.thingLabel,
      };

      if (tag['skos:altLabel']) {
        about.alternateName = tag['skos:altLabel'];
      }

      if (tag.thingSameAs && tag.thingSameAs.length > 0) {
        about.sameAs = checkSameAs(tag.thingSameAs);
      }

      content.push(about);
    });
    return content;
  }
  return undefined;
};
