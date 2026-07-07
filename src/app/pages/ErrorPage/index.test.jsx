import ErrorPage from './ErrorPage';
import {
  render,
  screen,
} from '../../components/react-testing-library-with-providers';

const renderErrorPage = ({ errorCode, service = 'news' }) => {
  const renderResult = render(<ErrorPage errorCode={errorCode} />, {
    service,
  });

  return {
    ...renderResult,
    statusCode: renderResult.container.querySelector(
      '[data-e2e="status-code"]',
    ),
  };
};

const expectErrorPageToRender = ({
  errorCode,
  expectedStatusCode,
  service = 'news',
  title,
}) => {
  const { statusCode } = renderErrorPage({ errorCode, service });

  expect(statusCode).toBeInTheDocument();
  expect(statusCode).toHaveTextContent(String(expectedStatusCode));

  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(title);

  expect(screen.getByRole('list')).toBeInTheDocument();
  expect(screen.getAllByRole('listitem')).not.toHaveLength(0);

  expect(screen.getByRole('link')).toBeInTheDocument();
  expect(screen.getByRole('link')).toHaveAttribute('href');
};

describe('ErrorPage', () => {
  it('should correctly render for 404', () => {
    expectErrorPageToRender({
      errorCode: 404,
      expectedStatusCode: 404,
      title: 'Page cannot be found',
    });
  });

  it('should correctly render for 500', () => {
    expectErrorPageToRender({
      errorCode: 500,
      expectedStatusCode: 500,
      title: 'Internal server error',
    });
  });

  it('should correctly render for other status code', () => {
    expectErrorPageToRender({
      errorCode: 123,
      expectedStatusCode: 500,
      title: 'Internal server error',
    });
  });

  it('should correctly render for 404 for persian', () => {
    expectErrorPageToRender({
      errorCode: 404,
      expectedStatusCode: '۴۰۴',
      service: 'persian',
      title: 'صفحه پیدا نشد',
    });
  });

  it('should correctly render for 500 for persian', () => {
    expectErrorPageToRender({
      errorCode: 500,
      expectedStatusCode: '۵۰۰',
      service: 'persian',
      title: 'خطا در سرور داخلی',
    });
  });
});
