import { useState } from 'react';
import mockIdctaConfig from '#app/contexts/AccountContext/mocks';
import AccountSignInModal from '.';

const ACCOUNT_SIGN_IN_MODAL_CONTEXT = {
  SAVE_ARTICLE: 'saveArticle',
  FOLLOW_TOPIC: 'followTopic',
} as const;

type ModalStoryProps = {
  context?: (typeof ACCOUNT_SIGN_IN_MODAL_CONTEXT)[keyof typeof ACCOUNT_SIGN_IN_MODAL_CONTEXT];
};

const ModalStory = ({
  context = ACCOUNT_SIGN_IN_MODAL_CONTEXT.SAVE_ARTICLE,
}: ModalStoryProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return isOpen ? (
    <AccountSignInModal context={context} onClose={() => setIsOpen(false)} />
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
  },
  parameters: { layout: 'fullscreen' },
};

export const SaveArticle = () => <ModalStory />;

export const FollowTopic = () => (
  <ModalStory context={ACCOUNT_SIGN_IN_MODAL_CONTEXT.FOLLOW_TOPIC} />
);
FollowTopic.globals = {
  service: { service: 'ws', variant: 'default' },
};
