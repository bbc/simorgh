const checkType = types => {
  const acceptableTypes = ['Person', 'Event', 'Organization', 'Place'];
  if (types.length === 0 || types.length > 1) {
    return 'Thing';
  }
  return acceptableTypes.includes(types[0]) ? types[0] : 'Thing';
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
