function managerEntries(entry = []) {
  return [...entry, require.resolve('./register.tsx')];
}

module.exports = { managerEntries };
