module.exports = {
  testPathForConsistencyCheck: 'some/index.test.js',

  resolveSnapshotPath: (testPath, snapshotExtension) => {
    return `${testPath}${snapshotExtension}.amp`;
  },

  resolveTestPath: (snapshotFilePath, snapshotExtension) => {
    return snapshotFilePath.replace(
      new RegExp(`${snapshotExtension}.amp$`),
      '',
    );
  },
};
