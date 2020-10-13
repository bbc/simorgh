const { spawn } = require('child_process');

const allowedArgs = ['--major', '--minor', '--patch'];

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

const updatePackages = ({ outdatedPackages, versionToBump }) =>
  new Promise(resolve => {
    const commands = outdatedPackages
      .map(([packageName, wanted, latest]) => {
        const [latestMajor] = latest.split('.').map(Number);
        const [wantedMajor, wantedMinor] = wanted.split('.').map(Number);

        if (versionToBump === 'patch') {
          return `${packageName}@"<${wantedMajor}.${wantedMinor + 1}"`;
        }
        if (versionToBump === 'minor') {
          return `${packageName}@"<${wantedMajor + 1}.0.0"`;
        }
        if (versionToBump === 'major') {
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
  const versionToBump = process.argv
    .slice(2)
    .filter(arg => allowedArgs.includes(arg))
    .map(arg => arg.substring(2))
    .pop();

  return updatePackages({ outdatedPackages, versionToBump });
});
