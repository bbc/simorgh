// Given an array, radiate out bidirectionally from a starting index
// Find the indices of the n closest elements that fulfill a predicate
export default ({ array, startingIndex, n, predicate }) => {
  const results = [];
  if (predicate(array[startingIndex])) results.push(startingIndex);
  let leftPointer = startingIndex - 1;
  let rightPointer = startingIndex + 1;

  while (leftPointer >= 0 || rightPointer < array.length) {
    const searchLeft = leftPointer >= 0;
    if (searchLeft && predicate(array[leftPointer])) {
      results.push(leftPointer);
    }

    const searchRight = rightPointer < array.length;
    if (searchRight && predicate(array[rightPointer])) {
      results.push(rightPointer);
    }

    if (results.length >= n) break;
    leftPointer -= 1;
    rightPointer += 1;
  }
  return results.slice(0, n).sort((a, b) => a - b);
};
