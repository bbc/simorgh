import { render } from '#app/components/react-testing-library-with-providers';
import Message from './index';

describe('Media Message', () => {
  it('should display the media message', () => {
    const { getByText } = render(
      <Message
        message="Please enable Javascript or try a different browser"
        placeholderSrc="http://foo.bar/placeholder.png"
        placeholderSrcset="http://foo.bar/placeholder.png"
      />,
    );
    const message = getByText(
      'Please enable Javascript or try a different browser',
    );
    expect(message).toBeInTheDocument();
  });

  it('should display the media message without a placeholder image', () => {
    const { getByText } = render(
      <Message message="Контент більше не доступний" />,
    );

    expect(getByText('Контент більше не доступний')).toBeInTheDocument();
  });
});
