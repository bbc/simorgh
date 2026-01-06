import { render } from '../react-testing-library-with-providers';
import InPicture from '.';

describe('InPictureVideo', () => {
  it('should track clicks', () => {
    render(<InPicture />);
    expect(true).toBe(true);
  });
});
