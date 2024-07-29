export default () => {
  describe('Media Placeholder', () => {
    // TEST DISABLED AS WE NO LONGER RENDER LEGACY MEDIA PAGES.
    it('outer iframe has z-index of 1', () => {
      const iframe = document.querySelector('iframe');
      expect(iframe).toBeInTheDocument();
      expect(
        window.getComputedStyle(iframe).getPropertyValue('z-index'),
      ).toEqual('1');
    });
  });
};
