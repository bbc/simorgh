import { MouseEvent } from 'react';
import { renderToString } from 'react-dom/server';
import userEvent from '@testing-library/user-event';
import {
  render,
  screen,
  within,
} from '#app/components/react-testing-library-with-providers';
import Link from '.';
import styles from './index.module.scss';

const linkProps = {
  href: 'https://www.bbc.com',
  text: 'BBC',
};

const blockClasses = `${styles.link} focusIndicatorInvert`;
const inlineClasses = `${styles.link} ${styles.inline} focusIndicatorInvert`;
const hiddenClasses = `${styles.link} ${styles.hidden} focusIndicatorInvert`;

const visibilityCases = [
  {
    inline: undefined,
    onlyShowIfJSenabled: undefined,
    serverClasses: blockClasses,
    mountedClasses: blockClasses,
  },
  {
    inline: false,
    onlyShowIfJSenabled: undefined,
    serverClasses: blockClasses,
    mountedClasses: blockClasses,
  },
  {
    inline: true,
    onlyShowIfJSenabled: undefined,
    serverClasses: inlineClasses,
    mountedClasses: inlineClasses,
  },
  {
    inline: undefined,
    onlyShowIfJSenabled: false,
    serverClasses: blockClasses,
    mountedClasses: blockClasses,
  },
  {
    inline: false,
    onlyShowIfJSenabled: false,
    serverClasses: blockClasses,
    mountedClasses: blockClasses,
  },
  {
    inline: true,
    onlyShowIfJSenabled: false,
    serverClasses: inlineClasses,
    mountedClasses: inlineClasses,
  },
  {
    inline: undefined,
    onlyShowIfJSenabled: true,
    serverClasses: hiddenClasses,
    mountedClasses: blockClasses,
  },
  {
    inline: false,
    onlyShowIfJSenabled: true,
    serverClasses: hiddenClasses,
    mountedClasses: blockClasses,
  },
  {
    inline: true,
    onlyShowIfJSenabled: true,
    serverClasses: hiddenClasses,
    mountedClasses: inlineClasses,
  },
];

describe('Footer Link', () => {
  describe.each(visibilityCases)(
    'inline=$inline, onlyShowIfJSenabled=$onlyShowIfJSenabled',
    ({ inline, onlyShowIfJSenabled, serverClasses, mountedClasses }) => {
      it('renders the expected server-side visibility classes before effects run', () => {
        const container = document.createElement('div');
        container.innerHTML = renderToString(
          <Link
            {...linkProps}
            inline={inline}
            onlyShowIfJSenabled={onlyShowIfJSenabled}
          />,
        );

        expect(
          within(container).getByRole('link', { name: linkProps.text }),
        ).toHaveClass(serverClasses, { exact: true });
      });

      it('renders the expected visibility classes after mounting', () => {
        render(
          <Link
            {...linkProps}
            inline={inline}
            onlyShowIfJSenabled={onlyShowIfJSenabled}
          />,
        );

        expect(screen.getByRole('link', { name: linkProps.text })).toHaveClass(
          mountedClasses,
          { exact: true },
        );
      });
    },
  );

  it('preserves the link text, destination and language', () => {
    render(<Link {...linkProps} lang="en-GB" />);

    const link = screen.getByRole('link', { name: linkProps.text });

    expect(link).toHaveAttribute('href', linkProps.href);
    expect(link).toHaveAttribute('lang', 'en-GB');
  });

  it('omits the language attribute when none is provided', () => {
    render(<Link {...linkProps} />);

    expect(screen.getByRole('link')).not.toHaveAttribute('lang');
  });

  it('calls the click handler with the link event', async () => {
    const onClick = jest.fn((event: MouseEvent<HTMLAnchorElement>) =>
      event.preventDefault(),
    );
    render(<Link {...linkProps} onClick={onClick} />);

    const link = screen.getByRole('link');
    await userEvent.click(link);

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'click', target: link }),
    );
  });
});
