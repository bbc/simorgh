import CafEnabledServices from '../../app/lib/cafServices.const';

export default () => {
  describe('Media Placeholder', () => {
    if (!CafEnabledServices.includes(service)) {
      it('outer iframe has z-index of 1', () => {
        const iframe = document.querySelector('iframe');
        expect(iframe).toBeInTheDocument();
        expect(
          window.getComputedStyle(iframe).getPropertyValue('z-index'),
        ).toEqual('1');
      });
    }
  });
};
