import {
  render,
  screen,
  act,
} from '#app/components/react-testing-library-with-providers';

import postsFixture from '#data/pidgin/posts/postFixture.json';
import Stream from './index';

const postFixture = postsFixture.data.results[0];

const mockStreamContentEmpty = {
  data: { results: [] },
};

const mockStreamContentSingle = {
  data: { results: [postFixture] },
};

const mockStreamContentMoreThanOne = {
  data: { results: [postFixture, postFixture] },
};

const observers = new Map();

const IntersectionObserver = jest.fn(cb => {
  const item = {
    callback: cb,
    elements: new Set(),
  };

  const instance = {
    observe: jest.fn(element => {
      item.elements.add(element);
    }),
    disconnect: jest.fn(() => {
      item.elements.clear();
    }),
  };

  observers.set(instance, item);

  return instance;
});

const triggerAllObservers = () => {
  observers.forEach(item => {
    item.callback([{ isIntersecting: true }]);
  });
};

describe('Live Page Stream', () => {
  beforeEach(() => {
    // @ts-expect-error mocking required for tests
    global.IntersectionObserver = IntersectionObserver;
  });

  afterEach(() => {
    observers.clear();
  });

  it('should return null with no stream content posts', async () => {
    await act(async () => {
      render(
        <Stream
          streamContent={mockStreamContentEmpty}
          contributors={null}
          setIsFirstPostVisible={() => {
            return null;
          }}
          ref={null}
        />,
      );
    });

    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  it('should render a single stream content post with no ordered list', async () => {
    await act(async () => {
      render(
        <Stream
          streamContent={mockStreamContentSingle}
          contributors={null}
          setIsFirstPostVisible={() => {
            return null;
          }}
          ref={null}
        />,
      );
    });

    expect(
      screen.getAllByRole('heading', {
        name: /Breaking News/i,
      }),
    ).toHaveLength(1);
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('should render a more than one stream content posts within a list', async () => {
    await act(async () => {
      render(
        <Stream
          streamContent={mockStreamContentMoreThanOne}
          contributors={null}
          setIsFirstPostVisible={() => {
            return null;
          }}
          ref={null}
        />,
      );
    });

    expect(
      screen.getAllByRole('heading', {
        name: /Breaking News/i,
      }),
    ).toHaveLength(2);
    expect(screen.queryByRole('list')).toBeInTheDocument();
  });

  it('should set isFirstPostVisible to true when the first post is on the screen', async () => {
    const callback = jest.fn();
    await act(async () => {
      render(
        <Stream
          streamContent={mockStreamContentMoreThanOne}
          contributors={null}
          setIsFirstPostVisible={callback}
          ref={null}
        />,
      );
    });
    triggerAllObservers();
    expect(callback).toHaveBeenCalledWith(true);
  });

  it('should render contributors when supplied', async () => {
    await act(async () => {
      render(
        <Stream
          streamContent={mockStreamContentSingle}
          contributors="Not a random dude"
          setIsFirstPostVisible={() => {
            return null;
          }}
          ref={null}
        />,
      );
    });
    expect(screen.queryByTestId('live-contributors')).toBeInTheDocument();
  });

  it('should not render contributors when they are null', async () => {
    await act(async () => {
      render(
        <Stream
          streamContent={mockStreamContentSingle}
          contributors={null}
          setIsFirstPostVisible={() => {
            return null;
          }}
          ref={null}
        />,
      );
    });

    expect(screen.queryByTestId('live-contributors')).not.toBeInTheDocument();
  });
  it('should render share button when share api is availible', async () => {
    // @ts-expect-error overwrites share to exist
    window.navigator.share = {};

    await act(async () => {
      render(
        <Stream
          streamContent={mockStreamContentSingle}
          contributors={null}
          setIsFirstPostVisible={() => {
            return null;
          }}
          ref={null}
        />,
      );
    });

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should not render share button when share api is unavailible', async () => {
    // @ts-expect-error overwrites share to exist
    delete window.navigator.share;

    await act(async () => {
      render(
        <Stream
          streamContent={mockStreamContentSingle}
          contributors={null}
          setIsFirstPostVisible={() => {
            return null;
          }}
          ref={null}
        />,
      );
    });

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
