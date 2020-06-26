// These are the commonly occuring characters, add more if need be.
// example character list https://www.w3schools.com/html/html_entities.asp
const entities = {
  '&quot;|&#34;': '"',
  '&amp;|&#38;': '&',
  '&apos;|&#39;': "'",
  '&lt;|&#60;': '<',
  '&gt;|&#62;': '>',
};

const entitiesRegex = new RegExp(Object.keys(entities).join('|'), 'gi');

// Utility used to escape encoded html character entities within legacy javascript strings
export default text => {
  return text.replace(entitiesRegex, char => {
    let match;
    Object.keys(entities).some(key => {
      if (key.match(char)) {
        match = key;
        return true;
      }
      return false;
    });
    return entities[match];
  });
};
