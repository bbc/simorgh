/* eslint-disable no-console */

async function getLatestTag() {
  const githubToken = process.env.GITHUB_TOKEN;
  if (!githubToken) {
    throw new Error('GITHUB_TOKEN environment variable is not set.');
  }
  const url = `https://api.github.com/repos/bbc/simorgh/releases/latest`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `token ${githubToken}`,
    },
  });
  if (response.ok) {
    const results = await response.json();
    return results.tag_name;
  }
  throw new Error('Failed to fetch the latest release.');
}

async function setLatestVersionEnv() {
  const version = await getLatestTag();
  process.env.SIMORGH_VERSION = version;
  console.log(`SIMORGH_VERSION=${version}`);
}

module.exports = {
  setLatestVersionEnv,
  getLatestVersion: getLatestTag,
};
