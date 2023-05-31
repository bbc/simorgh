import path from 'ramda/src/path';
import count from 'ramda/src/count';

export const getActionCount = metadata => {
  const uxAccessibility = path(['uxAccessibilityDoc'], metadata);
  const uxSwarm = path(['swarm'], metadata);
  const acceptanceCriteria = path(['acceptanceCriteria'], metadata);

  const getDone = path(['done']);

  return count(
    action => typeof action === 'undefined' || !getDone(action),
    [uxAccessibility, uxSwarm, acceptanceCriteria],
  );
};

export const isExempt = context => {
  const EXEMPTED = [
    'docs',
    'hooks',
    'simorgh structure',
    'cypress',
    'coding standards',
  ];

  const kind = path(['kind'], context) as string;
  if (!kind) return false;

  const lowerCaseKind = kind.toLowerCase();

  const regexPatter = RegExp(
    EXEMPTED.map(folderName => `^${folderName}/.*`).join('|'),
    'g',
  );

  return regexPatter.test(lowerCaseKind);
};
