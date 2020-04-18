module.exports = {
  testPathForConsistencyCheck: 'some/index.test.js',

  resolveSnapshotPath: (testPath, snapshotExtension) => {
    return `${testPath}${snapshotExtension}.canonical`;
  },

  resolveTestPath: (snapshotFilePath, snapshotExtension) => {
    return snapshotFilePath.replace(
      new RegExp(`${snapshotExtension}.canonical$`),
      '',
    );
  },
};
