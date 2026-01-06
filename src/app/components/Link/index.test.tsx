import * as clickTracking from '#app/hooks/useClickTrackerHandler';
import { render } from '../react-testing-library-with-providers';
import Link from '.';

describe('Link', () => {
  it.each([
    {
      type: 'html',
      spaLink: false,
    },
    {
      type: 'Next',
      spaLink: true,
    },
  ])(
    'should render a valid anchor element for a $type type link',
    ({ spaLink }) => {
      const href = '/forwarding_link';
      const title = 'Some Title';

      const { container } = render(
        <Link href={href} spaLink={spaLink}>
          {title}
        </Link>,
      );
      const anchor = container.querySelector('a');

      expect(anchor?.href).toBe(`http://localhost${href}`);
      expect(anchor?.innerHTML).toBe(title);
    },
  );

  it('should track clicks', () => {
    const href = '/forwarding_link';
    const title = 'Some Title';
    const isSpaLink = true;
    const sampleEventData = {
      url: href,
      block: {
        componentName: title,
      },
    };
    const clickTrackerSpy = jest.spyOn(clickTracking, 'default');

    render(
      <Link href={href} eventTrackingData={sampleEventData} spaLink={isSpaLink}>
        {title}
      </Link>,
    );
    expect(clickTrackerSpy).toHaveBeenCalledWith(sampleEventData, isSpaLink);
  });
});
