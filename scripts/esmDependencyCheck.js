// eslint-disable no-console
const { exec } = require('child_process');
const fs = require('fs');
const fetch = require('node-fetch');
const dotenv = require('dotenv').config();
const { dependencies, devDependencies } = require('../package.json');

const allDependencies = { ...dependencies, ...devDependencies };
const dependencyTable = [];
const dateNow = new Date().getTime();
const datediff = (first, second) =>
  Math.round((second - first) / (1000 * 60 * 60 * 24));
const gitToken = dotenv.parsed.GIT_TOKEN || false;

const getRemoteGitFile = async gitDepUrl => {
  let url = `https://api.github.com/repos/${gitDepUrl}/contents/package.json`;
  if (url.includes('/tree/')) {
    url = url
      .replace(/\/tree\/[^\/]+\//, '/contents/')
      .replace('//contents/', '/')
      .replace('/contents/package.json', '/package.json');
  }

  return await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `token ${gitToken}`,
      Accept: 'application/vnd.github.v3.raw',
    },
  }).then(res => {
    if (res.status === 200) {
      return res.json().then(data => {
        if (!data.type) {
          return 'commonjs';
        } else if (data.type) {
          return data.type;
        }
        return false;
      });
    } else {
      return 'error';
    }
  });
};

const dealWithCaretsAndTildes = (versionString, timeJson) => {
  const plainVersion = versionString.match(/^[\d\.]+$/g);
  if (plainVersion) {
    return versionString; // if it's just numbers and dots
  }
  const lowestVersionMatches = versionString.match(/[\d\.]+$/g);
  if (!lowestVersionMatches) {
    return 'Unkonwn'; // if it contains a string that doesn't end in numbers and dots we give up
  }
  const splitOurVersionArray = lowestVersionMatches[0].split('.');

  let versionMatcherString = '';
  if (versionString.indexOf('^') !== -1) {
    versionMatcherString = splitOurVersionArray[0]; // caret means we are going to get anything belonging to major
  }
  if (versionString.indexOf('~') !== -1) {
    splitOurVersionArray.pop(); // tilde means we get all patches of the minor
    versionMatcherString = splitOurVersionArray.join('\\.');
  }
  versionMatcherString = versionMatcherString + '\\.';

  let versionToReturn = '';
  // loop through response from npm (which is handily in series order) and match our version with regex
  Object.keys(timeJson).forEach(version => {
    const splitVersionArray = version.split('.');
    const ourRegex = new RegExp(`^${versionMatcherString}`, 'gi');
    if (version.match(ourRegex)) {
      versionToReturn = version;
    }
  });
  return versionToReturn;
};

const getRepoFromNpmData = npmData => {
  if (
    npmData.hasOwnProperty('repository') &&
    npmData.repository.hasOwnProperty('url')
  ) {
    return npmData.repository.url;
  } else if (npmData.hasOwnProperty('repository')) {
    return npmData.repository;
  }
  return npmData.url || npmData.homepage;
};

Object.keys(allDependencies).forEach((dep, i) => {
  if (gitToken) {
    let gitRepo;
    const cmd = exec(`npm view ${dep} --json`, (err, stdout, stderr) => {
      if (err) {
        console.error(err);
      }
      if (stdout) {
        const depRepository = JSON.parse(stdout);
        const modifiedDate = new Date(depRepository.time.modified);

        const ourVersion = dealWithCaretsAndTildes(
          allDependencies[dep],
          stdout,
        );

        const dateOfOurVersion = new Date(depRepository.time[ourVersion]);

        const ourFreshnessInDays = datediff(
          dateOfOurVersion.getTime(),
          dateNow,
        );

        gitRepo = getRepoFromNpmData(depRepository);
        if (gitRepo) {
          gitRepo = gitRepo.replace(
            /^(?:git)?(?:\+)?(https|ssh)?:\/\/(?:git@)?github.com\/|\.git(?:#?.*)$/g,
            '',
          );
          const remoteGitFile = getRemoteGitFile(gitRepo).then(
            gitDepModuleType => {
              dependencyTable.push({
                name: dep,
                type: gitDepModuleType,
                mostRecentVersion: modifiedDate,
                ourVersion: dateOfOurVersion,
                ourFreshnessInDays,
              });
            },
          );
        } else {
          console.error(
            `dep ${dep} has no public repo so we're reading from local`,
          );
          const depRepository = JSON.parse(
            fs.readFileSync(`./node_modules/${dep}/package.json`),
          );
          const depType = depRepository.type ? depRepository.type : 'commonjs';
          dependencyTable.push({
            name: dep,
            type: depType,
            mostRecentVersion: modifiedDate,
            ourVersion: dateOfOurVersion,
            ourFreshnessInDays,
          });
        }
      } else {
        console.log('no stdout', dep, stdout);
      }

      let csvContents =
        'Dependency,Type, Most Recent Version, Our Version, Our Version Freshness in Days';
      dependencyTable.forEach(
        ({ name, type, mostRecentVersion, ourVersion, ourFreshnessInDays }) => {
          csvContents += `\n${name},${type},${mostRecentVersion},${ourVersion},${ourFreshnessInDays}`;
        },
      );
      fs.writeFileSync('./esmDependencyTable.csv', csvContents);
    });
  }
});
