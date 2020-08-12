module.exports = bundlesData =>
  bundlesData.sort((a, b) => {
    const total1 = a[a.length - 1];
    const total2 = b[b.length - 1];

    return total1 - total2;
  });
