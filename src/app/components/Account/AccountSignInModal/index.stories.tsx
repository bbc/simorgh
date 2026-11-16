import { MouseEvent, useState } from 'react';
import { fn } from 'storybook/test';
import { service as hindiServiceConfig } from '#app/lib/config/services/hindi';
import AccountSignInModal, { AccountSignInModalProps } from '.';
import readme from './README.md';

const ModalStory = ({ onClose, ...args }: AccountSignInModalProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return isOpen ? (
    <AccountSignInModal
      {...args}
      onClose={() => {
        onClose();
        setIsOpen(false);
      }}
    />
  ) : (
    <button type="button" onClick={() => setIsOpen(true)}>
      Open Sign In Modal
    </button>
  );
};

export default {
  title: 'Account/AccountSignInModal',
  component: AccountSignInModal,
  globals: {
    service: { service: 'ws', variant: 'default' },
  },
  args: {
    title: 'Sign in to save stories',
    description: 'Save stories and read them at your convenience',
    closeLabel: 'Close',
    signInText: 'Sign In',
    signInAccessibleLabel: 'Sign in to My News',
    registerText: 'Register',
    separatorText: 'or',
    signInUrl: 'https://example.com/signin',
    registerUrl: 'https://example.com/register',
    isDismissible: true,
    onClose: fn(),
    onSignInClick: fn((event: MouseEvent<HTMLAnchorElement>) =>
      event.preventDefault(),
    ),
    onRegisterClick: fn((event: MouseEvent<HTMLAnchorElement>) =>
      event.preventDefault(),
    ),
  },
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    closeLabel: { control: 'text' },
    signInText: { control: 'text' },
    signInAccessibleLabel: { control: 'text' },
    registerText: { control: 'text' },
    separatorText: { control: 'text' },
    signInUrl: { control: 'text' },
    registerUrl: { control: 'text' },
    isDismissible: { control: 'boolean' },
  },
  parameters: { layout: 'fullscreen', docs: { readme } },
};

export const SaveArticle = (args: AccountSignInModalProps) => (
  <ModalStory {...args} />
);

export const FollowTopic = (args: AccountSignInModalProps) => (
  <ModalStory {...args} />
);
FollowTopic.args = {
  title: 'Sign in to follow topics',
  description:
    'Get straight to the news that interests you and never miss a story',
};

export const CustomCopy = (args: AccountSignInModalProps) => (
  <ModalStory {...args} />
);
CustomCopy.args = {
  title: 'Discover more with BBC Account',
  description: 'Create an account to get more from BBC News.',
  signInText: 'Sign in to your account',
  registerText: 'Create an account',
  signInAccessibleLabel: 'Sign in to your BBC Account',
};

const hindiTranslations = hindiServiceConfig.default.translations;

export const Hindi = (args: AccountSignInModalProps) => (
  <ModalStory {...args} />
);
Hindi.args = {
  title: hindiTranslations.accountSignInModal?.title,
  description: hindiTranslations.accountSignInModal?.description,
  closeLabel: hindiTranslations.accountSignInModal?.closeLabel,
  signInText: hindiTranslations.account?.signIn,
  signInAccessibleLabel: hindiTranslations.account?.signInAccessibleLabel,
  registerText: hindiTranslations.account?.register,
  separatorText: hindiTranslations.accountPromoBanner?.buttonSeparatorText,
};
Hindi.globals = {
  service: { service: 'hindi', variant: 'default' },
};

export const NonDismissible = (args: AccountSignInModalProps) => (
  <ModalStory {...args} />
);
NonDismissible.args = {
  isDismissible: false,
};
