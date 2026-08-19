import { CLIENT_COMPONENT_RENDER_ERROR } from '#lib/logger.const';
import loggerMock from '#testHelpers/loggerMock';
import { render, screen } from '../react-testing-library-with-providers';
import ErrorBoundary from '.';

const ThrowingComponent = () => {
  throw new Error('Boom');
};

describe('ErrorBoundary', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Silence React's default console.error logging of the caught error.
    jest.spyOn(console, 'error').mockImplementation(() => undefined);
  });

  it('renders the children when there is no error', () => {
    render(
      <ErrorBoundary componentName="TestComponent">
        <p>All good</p>
      </ErrorBoundary>,
    );
    expect(screen.getByText('All good')).toBeInTheDocument();
  });

  it('renders the fallback and logs the error when a child throws', () => {
    render(
      <ErrorBoundary
        componentName="TestComponent"
        fallback={<p>Fallback content</p>}
      >
        <ThrowingComponent />
      </ErrorBoundary>,
    );

    expect(screen.getByText('Fallback content')).toBeInTheDocument();
    expect(loggerMock.error).toHaveBeenCalledWith(
      CLIENT_COMPONENT_RENDER_ERROR,
      expect.objectContaining({
        componentName: 'TestComponent',
        error: 'Boom',
      }),
    );
  });

  it('renders nothing when there is no fallback provided and a child throws', () => {
    const { container } = render(
      <ErrorBoundary componentName="TestComponent">
        <ThrowingComponent />
      </ErrorBoundary>,
    );

    expect(container).toBeEmptyDOMElement();
  });
});
