describe('toggles', () => {
  it('should retrieve local toggles', async () => {
    const localToggle = await import('.');

    console.log(JSON.stringify(localToggle));
  });
});
