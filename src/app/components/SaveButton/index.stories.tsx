import SaveButton from '.';
import metadata from './metadata.json';
import readme from './README.md';

export default {
  title: 'Components/SaveButton',
  component: SaveButton,
  parameters: {
    metadata,
    docs: { readme },
  },
  args: {
    onClick: () => {},
    isLoading: false,
    isMutating: false,
    isSaved: false,
    disabled: false,
  },
};

export const Unsaved = {
  args: {
    buttonText: 'Save for later',
  },
};

export const Loading = {
  args: {
    isLoading: true,
    buttonText: 'Loading',
  },
};

export const Saved = {
  args: {
    isSaved: true,
    buttonText: 'Saved to My News',
    removeText: 'Remove',
  },
};

export const Saving = {
  args: {
    isMutating: true,
    buttonText: 'Saving',
  },
};

export const Removing = {
  args: {
    isMutating: true,
    isSaved: true,
    buttonText: 'Removing',
  },
};
