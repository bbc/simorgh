const { canonical } = global;

export default () => {
  it.skip('I can see the data collected with Chartbeat analytics', async () => {
    const chartbeatScript = canonical.document.querySelector(
      'head > script[src="//static.chartbeat.com/js/chartbeat.js"]',
    );

    expect(chartbeatScript).toBeInTheDocument();
  });
};
