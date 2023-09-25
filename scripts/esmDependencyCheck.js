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

let countedRepos = 0;

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
  })
    .then(res => {
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
    })
    .catch(e => {
      countedRepos++;
      console.error(e);
      return 'error';
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

const writeCsvFile = data => {
  let csvContents =
    'Dependency,Type,Most Recent Version,Most Recent Version Date,Our Version,Our Version Date,Our Version Freshness in Days';

  data.forEach(
    ({
      name,
      type,
      mostRecentVersion,
      mostRecentVersionDate,
      ourVersion,
      ourVersionDate,
      ourFreshnessInDays,
    }) => {
      csvContents += `\n${name},${type},${mostRecentVersion},${mostRecentVersionDate},${ourVersion},${ourVersionDate},${ourFreshnessInDays}`;
    },
  );
  fs.writeFileSync('./esmDependencyTable.csv', csvContents);
};

const repoLength = Object.keys(allDependencies).length;

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
          depRepository.time,
        );

        const dateOfOurVersion = new Date(depRepository.time[ourVersion]);

        const ourFreshnessInDays = datediff(
          dateOfOurVersion.getTime(),
          dateNow,
        );
        setTimeout(() => {
          let latestVersion = '';
          if(Array.isArray(depRepository.versions)){
latestVersion = depRepository.versions.at(-1);
          }
          else {
            latestVersion = depRepository.versions;
          }
          gitRepo = getRepoFromNpmData(depRepository);
          if (gitRepo) {
            gitRepo = gitRepo.replace(
              /^(?:git)?(?:\+)?(https|ssh)?:\/\/(?:git@)?github.com\/|\.git(?:#?.*)$/g,
              '',
            );
            try {
              const remoteGitFile = getRemoteGitFile(gitRepo)
                .then(gitDepModuleType => {
                  countedRepos++;
                  dependencyTable.push({
                    name: dep,
                    type: gitDepModuleType,
                    mostRecentVersion: latestVersion,
                    mostRecentVersionDate: modifiedDate,
                    ourVersionDate: dateOfOurVersion,
                    ourVersion,
                    ourFreshnessInDays,
                  });
                  console.log(
                    `checking repo ${countedRepos} out of ${repoLength}: ${gitRepo}`,
                  );
                  if (countedRepos >= Object.keys(allDependencies).length) {
                    console.log('FINISHED');
                    writeCsvFile(dependencyTable);
                  }
                })
                .catch(e => {
                  console.error(e);
                  countedRepos++;
                });
            } catch (e) {
              console.error(e);
            }
          } else {
            countedRepos++;
            console.error(
              `dep ${dep} has no public repo so we're reading from local`,
            );
            const depRepository = JSON.parse(
              fs.readFileSync(`./node_modules/${dep}/package.json`),
            );
            const depType = depRepository.type
              ? depRepository.type
              : 'commonjs';
            dependencyTable.push({
              name: dep,
              type: depType,
              mostRecentVersion: latestVersion,
              mostRecentVersionDate: modifiedDate,
              ourVersion,
              ourVersionDate: dateOfOurVersion,
              ourFreshnessInDays,
            });
          }
        }, i * 50);
      } else {
        countedRepos++;
        console.log('no stdout', dep, stdout);
      }
    });
  } else {
    console.error(
      'No github token supplied. Please see ./scripts/README.md for details',
    );
    return false;
  }
});
