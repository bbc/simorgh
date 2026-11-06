import { type ReactElement } from 'react';
import {
  act,
  render,
} from '#app/components/react-testing-library-with-providers';
import loadQueryConsumer from '#app/contexts/QueryContext/loadQueryConsumer';
import ArticleNotFoundUASCleanup from '.';

jest.mock('#app/contexts/QueryContext/loadQueryConsumer');

it('renders nothing while cleanup loads and after its chunk fails', async () => {
  const pending = Promise.withResolvers<(_props: object) => ReactElement>();
  jest.mocked(loadQueryConsumer).mockReturnValue(pending.promise);
  const { container } = render(<ArticleNotFoundUASCleanup />);

  expect(container).toBeEmptyDOMElement();

  await act(async () => {
    pending.reject(new Error('Cleanup chunk failed'));
  });

  expect(container).toBeEmptyDOMElement();
  expect(loadQueryConsumer).toHaveBeenCalledTimes(1);
});
