import { useState } from 'react';
import mockIdctaConfig from '#app/contexts/AccountContext/mocks';
import AccountSignInModal from '.';

const ACCOUNT_SIGN_IN_MODAL_CONTEXT = {
  SAVE_ARTICLE: 'saveArticle',
  FOLLOW_TOPIC: 'followTopic',
} as const;

type ModalStoryProps = {
  context?: (typeof ACCOUNT_SIGN_IN_MODAL_CONTEXT)[keyof typeof ACCOUNT_SIGN_IN_MODAL_CONTEXT];
  title?: string;
  description?: string;
  isDismissible?: boolean;
};

const ModalStory = ({
  context = ACCOUNT_SIGN_IN_MODAL_CONTEXT.SAVE_ARTICLE,
  title,
  description,
  isDismissible,
}: ModalStoryProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return isOpen ? (
    <AccountSignInModal
      context={context}
      onClose={() => setIsOpen(false)}
      title={title}
      description={description}
      isDismissible={isDismissible}
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
    idctaConfig: mockIdctaConfig,
  },
  argTypes: {
    context: {
      control: 'select',
      options: Object.values(ACCOUNT_SIGN_IN_MODAL_CONTEXT),
    },
    isDismissible: {
      control: 'boolean',
    },
  },
  parameters: { layout: 'fullscreen' },
};

export const SaveArticle = (args: ModalStoryProps) => <ModalStory {...args} />;
SaveArticle.args = {
  context: ACCOUNT_SIGN_IN_MODAL_CONTEXT.SAVE_ARTICLE,
};

export const FollowTopic = (args: ModalStoryProps) => <ModalStory {...args} />;
FollowTopic.args = {
  context: ACCOUNT_SIGN_IN_MODAL_CONTEXT.FOLLOW_TOPIC,
};
FollowTopic.globals = {
  service: { service: 'ws', variant: 'default' },
};

export const CustomCopy = (args: ModalStoryProps) => <ModalStory {...args} />;
CustomCopy.args = {
  title: 'Sign in to read more',
  description: 'Create an account to get more from BBC News.',
  isDismissible: true,
};

export const NonDismissible = (args: ModalStoryProps) => (
  <ModalStory {...args} />
);
NonDismissible.args = {
  title: 'Sign in to read more',
  description: 'Create an account to get more from BBC News.',
  isDismissible: false,
};
