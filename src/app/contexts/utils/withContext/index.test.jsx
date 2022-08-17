import React, { useContext } from 'react';
import { cleanup, render, waitFor } from '@testing-library/react';
import withContext from '.';

const NewContext = React.createContext({});

describe('withContext', () => {
  afterEach(() => {
    cleanup();
  });

  it('creates context provider with data and context', async () => {
    const Component = () => {
      const { text } = useContext(NewContext);

      return <span>{text}</span>;
    };

    const ContextProviderWithData = withContext({
      foobar: {
        text: 'dummy text',
      },
    });

    const { container } = render(
      <ContextProviderWithData Context={NewContext} dataKey="foobar">
        <Component />
      </ContextProviderWithData>,
    );

    await waitFor(() => container.querySelector('span'));

    expect(container.firstChild.innerHTML).toEqual('dummy text');
  });

  it('doesnt use data key if not provided', async () => {
    const Component = () => {
      const { text } = useContext(NewContext);

      return <span>{text}</span>;
    };

    const ContextProviderWithData = withContext({
      text: 'dummy text',
    });

    const { container } = render(
      <ContextProviderWithData Context={NewContext}>
        <Component />
      </ContextProviderWithData>,
    );

    await waitFor(() => container.querySelector('span'));

    expect(container.firstChild.innerHTML).toEqual('dummy text');
  });
});
