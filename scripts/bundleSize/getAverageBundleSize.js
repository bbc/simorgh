export default pageBundlesTotals =>
  pageBundlesTotals.reduce((acc, currentValue, currentIndex, array) => {
    const isLastItem = currentIndex === array.length - 1;
    const total = acc + currentValue;
    if (isLastItem) {
      return Math.round(total / array.length);
    }
    return total;
  }, 0);
