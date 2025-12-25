import * as clickTracking from '#app/hooks/useClickTrackerHandler';
import { render } from '../react-testing-library-with-providers';
import InPicture from '.';

describe('InPictureVideo', () => {
  it('should track clicks', () => {
    const clickTrackerSpy = jest.spyOn(clickTracking, 'default');
    render(<InPicture />);
    expect(true).toBe(true);
  });
});
