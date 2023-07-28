export default bundlesData =>
  bundlesData.sort((a, b) => {
    const total1 = a.totalSize;
    const total2 = b.totalSize;

    return total1 - total2;
  });
