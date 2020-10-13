const { spawn } = require('child_process');

const semver = ['major', 'minor', 'patch'];

const getOutdatedPackages = () =>
  new Promise(resolve => {
    const child = spawn('npm outdated', ['--json'], { shell: true });
    let result = '';

    child.stdout.on('data', data => {
      result += data.toString();
    });

    child.on('close', () => {
      const outdatedPackages = Object.entries(
        JSON.parse(result),
      ).map(([packageName, { wanted, latest }]) => [
        packageName,
        wanted,
        latest,
      ]);

      resolve(outdatedPackages);
    });
  });

const updatePackages = ({ outdatedPackages, version }) =>
  new Promise(resolve => {
    const commands = outdatedPackages
      .map(([packageName, wanted, latest]) => {
        const [latestMajor] = latest.split('.').map(Number);
        const [wantedMajor, wantedMinor] = wanted.split('.').map(Number);

        if (version === 'patch') {
          return `${packageName}@"<${wantedMajor}.${wantedMinor + 1}"`;
        }
        if (version === 'minor') {
          return `${packageName}@"<${wantedMajor + 1}.0.0"`;
        }
        if (version === 'major') {
          if (wantedMajor !== latestMajor) {
            return `${packageName}@${latestMajor}`;
          }
        }
        return null;
      })
      .join(' ');

    const child = spawn(`npm install ${commands}`, null, {
      shell: true,
      stdio: 'inherit',
    });
    child.on('exit', resolve);
  });

return getOutdatedPackages().then(outdatedPackages => {
  const removeArgDashes = arg => arg.substring(2);
  const version = process.argv
    .slice(2)
    .filter(arg => semver.includes(removeArgDashes(arg)))
    .map(removeArgDashes)
    .pop();

  return updatePackages({ outdatedPackages, version });
});
