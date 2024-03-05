/* eslint-disable no-prototype-builtins */
/* eslint-disable no-console */
const { exec } = require('child_process');
const fs = require('fs');

const { dependencies, devDependencies } = JSON.parse(
  fs.readFileSync('./package.json'),
);

const allDependencies = { ...dependencies, ...devDependencies };
const dependencyTable = [];

const dateNow = new Date().getTime();
const datediff = (first, second) =>
  Math.round((second - first) / (1000 * 60 * 60 * 24));
const gitHubToken = process.env.GITHUB_TOKEN;

let countedRepos = 0;

const getRemoteGitFile = async (gitDepUrl, args) => {
  let url = `https://api.github.com/repos/${gitDepUrl}/contents/package.json`;
  if (url.includes('/tree/')) {
    url = url
      .replace(/\/tree\/[^/]+\//, '/contents/')
      .replace('//contents/', '/')
      .replace('/contents/package.json', '/package.json');
  }

  return fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `token ${gitHubToken}`,
      Accept: 'application/vnd.github.v3.raw',
    },
  })
    .then(res => {
      if (res.status === 200) {
        return res.json().then(data => {
          if (!data.type) {
            return { type: 'commonjs', ...args };
          }
          if (data.type) {
            return { type: data.type, ...args };
          }
          return false;
        });
      }
      return { type: 'error', ...args };
    })
    .catch(e => {
      countedRepos += 1;
      console.error(e);
      return { type: 'error', ...args };
    });
};

const dealWithNonNumericCharacters = (versionString, timeJson) => {
  const patchVersion = versionString.match(/patch/);
  if (patchVersion) {
    const possibleVersionStrings = versionString.match(
      /@npm:([\d.]+)|@([\d.]+)/,
    );
    return possibleVersionStrings
      ? possibleVersionStrings[1] || possibleVersionStrings[2]
      : `Version number not processed in current form ${versionString}`;
  }

  const plainVersion = versionString.match(/^[\d.]+$/g);
  if (plainVersion) {
    return versionString; // if it's just numbers and dots
  }
  const lowestVersionMatches = versionString.match(/[\d.]+$/g);
  if (!lowestVersionMatches) {
    return 'Unknown'; // if it contains a string that doesn't end in numbers and dots we give up
  }
  const splitOurVersionArray = lowestVersionMatches[0].split('.');

  let versionMatcherString = '';
  if (versionString.indexOf('^') !== -1) {
    [versionMatcherString] = splitOurVersionArray; // caret means we are going to get anything belonging to major
  }
  if (versionString.indexOf('~') !== -1) {
    splitOurVersionArray.pop(); // tilde means we get all patches of the minor
    versionMatcherString = splitOurVersionArray.join('\\.');
  }
  versionMatcherString += '\\.';

  let versionToReturn = '';
  // loop through response from npm (which is handily in series order) and match our version with regex
  Object.keys(timeJson).forEach(version => {
    const ourRegex = new RegExp(`^${versionMatcherString}`, 'gi');
    if (version.match(ourRegex)) {
      versionToReturn = version;
    }
  });
  return versionToReturn;
};

const simplifyDate = modifiedDate => {
  const year = modifiedDate.getFullYear().toString();
  const month = (modifiedDate.getMonth() + 1).toString().padStart(2, '0');
  const day = modifiedDate.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getRepoFromNpmData = npmData => {
  if (
    npmData.hasOwnProperty('repository') &&
    npmData.repository.hasOwnProperty('url')
  ) {
    return npmData.repository.url;
  }
  if (npmData.hasOwnProperty('repository')) {
    return npmData.repository;
  }
  return npmData.url || npmData.homepage;
};

const writeCsvFile = data => {
  let csvContents =
    'Dependency,Type,Most Recent Version,Most Recent Version Date,Our Version,Our Version Date,Our Version Freshness in Days';

  data
    .sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    })
    .forEach(
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

if (gitHubToken) {
  console.log('Please wait. Gathering npm data...');
  Object.keys(allDependencies).forEach((dep, i) => {
    let gitRepo;
    console.log(`checking npm details for ${dep}`);
    exec(`npm view ${dep} --json`, (err, stdout) => {
      if (err) {
        console.error(err);
      }
      if (stdout) {
        const depRepository = JSON.parse(stdout);
        const modifiedDate = new Date(depRepository.time.modified);
        const simplifiedModifiedDate = simplifyDate(modifiedDate);
        const ourVersion = dealWithNonNumericCharacters(
          allDependencies[dep],
          depRepository.time,
          dep,
        );

        const dateOfOurVersion = new Date(depRepository.time[ourVersion]);
        const simplifiedDateOfOurVersion = simplifyDate(dateOfOurVersion);

        const ourFreshnessInDays = datediff(
          dateOfOurVersion.getTime(),
          dateNow,
        );
        setTimeout(() => {
          let latestVersion = '';
          if (Array.isArray(depRepository.versions)) {
            latestVersion = depRepository.versions.at(-1);
          } else {
            latestVersion = depRepository.versions;
          }
          gitRepo = getRepoFromNpmData(depRepository);
          if (gitRepo) {
            gitRepo = gitRepo.replace(
              /^(?:git)?(?:\+)?(https|ssh)?:\/\/(?:git@)?github.com\/|\.git(?:#?.*)$/g,
              '',
            );
            const gitRepoArgs = {
              latestVersion,
              ourVersion,
              ourFreshnessInDays,
              dateOfOurVersion,
              modifiedDate,
            };
            try {
              getRemoteGitFile(gitRepo, gitRepoArgs)
                .then(data => {
                  countedRepos += 1;
                  dependencyTable.push({
                    name: dep,
                    type: data.type,
                    mostRecentVersion: data.latestVersion,
                    mostRecentVersionDate: simplifiedModifiedDate,
                    ourVersion: data.ourVersion,
                    ourVersionDate: simplifiedDateOfOurVersion,
                    ourFreshnessInDays: data.ourFreshnessInDays,
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
                  countedRepos += 1;
                });
            } catch (e) {
              console.error(e);
            }
          } else {
            countedRepos += 1;
            console.error(
              `dep ${dep} has no public repo so we're reading from local`,
            );
            const repository = JSON.parse(
              fs.readFileSync(`./node_modules/${dep}/package.json`),
            );
            const depType = repository.type ? repository.type : 'commonjs';
            dependencyTable.push({
              name: dep,
              type: depType,
              mostRecentVersion: latestVersion,
              mostRecentVersionDate: simplifiedModifiedDate,
              ourVersion,
              ourVersionDate: simplifiedDateOfOurVersion,
              ourFreshnessInDays,
            });
          }
        }, i * 50);
      } else {
        countedRepos += 1;
        console.log('no stdout', dep, stdout);
      }
    });
  });
} else {
  console.error(
    'No github token supplied. Please see ./scripts/README.md for details',
  );
}
