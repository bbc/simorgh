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
    isSaving: false,
    isRemoving: false,
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

export const Saving = {
  args: {
    isSaving: true,
    buttonText: 'Saving',
  },
};

export const Saved = {
  args: {
    isSaved: true,
    buttonText: 'Saved to My News',
    removeText: 'Remove',
  },
};

export const Removing = {
  args: {
    isRemoving: true,
    buttonText: 'Removing',
  },
};
