import userEvent from '@testing-library/user-event';
import {
  render,
  screen,
  within,
} from '#app/components/react-testing-library-with-providers';
import mockIdctaConfig from '#app/contexts/AccountContext/mocks';
import ModalReviewPrototype from '.';
import { prototypeCopy } from './translations';

describe('temporary original modal prototype', () => {
  it.each([
    ['articleBottom', 'Discover more', prototypeCopy.articleBottom],
    ['articleLink', 'Open another article', prototypeCopy.articleLink],
    ['inline', 'sign in or register', prototypeCopy.inline],
  ] as const)(
    'opens and dismisses the %s example with its own copy and account links',
    async (example, trigger, copy) => {
      render(<ModalReviewPrototype example={example} />, {
        service: 'ws',
        idctaConfig: mockIdctaConfig,
      });

      await userEvent.click(screen.getByText(trigger));
      const dialog = screen.getByRole('dialog', { name: copy.title });
      expect(within(dialog).getByText(copy.description)).toBeInTheDocument();

      const signIn = within(dialog).getByTestId(
        'account-sign-in-modal-sign-in',
      );
      const register = within(dialog).getByTestId(
        'account-sign-in-modal-register',
      );
      if (
        !(signIn instanceof HTMLAnchorElement) ||
        !(register instanceof HTMLAnchorElement)
      ) {
        throw new Error('Expected account actions to be links');
      }
      expect(signIn).toHaveAttribute(
        'href',
        expect.stringContaining(mockIdctaConfig.signin_url),
      );
      expect(register).toHaveAttribute(
        'href',
        expect.stringContaining(mockIdctaConfig.register_url),
      );
      expect(new URL(signIn.href).searchParams.get('ptrt')).toBe(
        window.location.href,
      );
      expect(new URL(register.href).searchParams.get('ptrt')).toBe(
        window.location.href,
      );

      await userEvent.keyboard('{Escape}');
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    },
  );

  it('places the optional inline prompt between article paragraphs', () => {
    render(<ModalReviewPrototype example="inline" />, {
      service: 'ws',
      idctaConfig: mockIdctaConfig,
    });

    const main = screen.getByRole('main');
    const prompt = within(main).getByRole('complementary', {
      name: 'Inline sign-in example',
    });
    const paragraphs = main.querySelectorAll('p');
    expect(paragraphs.length).toBeGreaterThanOrEqual(3);
    expect(paragraphs[0].compareDocumentPosition(prompt)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );
    expect(prompt.compareDocumentPosition(paragraphs[2])).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );
    expect(
      within(prompt).getByText(/You can keep reading either way/),
    ).toBeInTheDocument();
  });
});
