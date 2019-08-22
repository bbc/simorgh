const fs = require('fs');

const generateBuildTag = (name, number, url, commit, commitAuthor) => ({
  name,
  number,
  url,
  commit,
  commitAuthor,
});

const name = process.argv[2];
const number = process.argv[3];
const url = process.argv[4];
const commit = process.argv[5];
const commitAuthor = process.argv[6];

const tag = generateBuildTag(name, number, url, commit, commitAuthor);

const data = JSON.stringify(tag);
fs.writeFileSync('./pack/build_tag.json', data);
