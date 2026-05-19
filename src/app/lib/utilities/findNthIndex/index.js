/* eslint-disable no-console */
import is from 'ramda/src/is';

const validateInputs = (n, predicate, inputArray) => {
  if (!(Number.isInteger(n) && n > 0)) {
    return false;
  }
  if (!is(Function, predicate)) {
    return false;
  }
  if (!is(Array, inputArray)) {
    return false;
  }
  return true;
};

const findNthIndex = (n, predicate, inputArray) => {
  if (!validateInputs(n, predicate, inputArray)) return -1;
  let count = 0;
  for (let i = 0; i < inputArray.length; i += 1) {
    if (n - count > inputArray.length - i) break;

    if (predicate(inputArray[i])) {
      if (count + 1 === n) return i;
      count += 1;
    }
  }
  return -1;
};

export default findNthIndex;
