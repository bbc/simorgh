import parseArgs from './args';
import { fetchPr, fetchIssue } from './fetch';
import { scanPr, scanIssue } from './scan';
import { patchPr, patchIssue } from './patch';

const redactPr = async (reqBody, regex) => {
  const pr = await fetchPr(reqBody);

  const scannedPr = await scanPr(pr, regex);

  if (scannedPr.foundMatch) {
    await patchPr(reqBody, scannedPr);
    throw new Error('Match found and patched.');
  }
};

const redactIssue = async (reqBody, regex) => {
  const issue = await fetchIssue(reqBody);

  const scannedIssue = await scanIssue(issue, regex);

  if (scannedIssue.foundMatch) {
    await patchIssue(reqBody, scannedIssue);
    throw new Error('Match found and patched.');
  }
};

const scanExposures = async () => {
  const { repo, flag, id, regexString } = parseArgs(process.argv);

  const regex = new RegExp(regexString, 'gi');

  const reqBody = {
    owner: 'bbc',
    repo,
    id,
  };

  await {
    '-pr': redactPr,
    '-issue': redactIssue,
  }[flag](reqBody, regex);

  return 'No matches found.';
};

export default scanExposures;
