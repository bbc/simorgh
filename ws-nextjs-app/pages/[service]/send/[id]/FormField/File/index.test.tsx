import React from 'react';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '#app/components/react-testing-library-with-providers';
import userEvent from '@testing-library/user-event';
import { LiveRegionContextProvider } from '#app/components/LiveRegion/LiveRegionContext';

import FileField from '.';
import {
  AUDIO_SVG_DATA_URI,
  DOCUMENT_SVG_DATA_URI,
  VIDEO_SVG_DATA_URI,
} from './svgs';
import { FormContext } from '../../FormContext';
import { FormScreen, HtmlType } from '../../types';

const defaultInputState = {
  isValid: true,
  required: false,
  value: [],
  htmlType: 'file' as HtmlType,
  messageCode: null,
  wasInvalid: false,
};

const mockDefaultProps = {
  label: 'foobar',
  handleChange: jest.fn(),
  handleFocusOut: jest.fn(),
  hasAttemptedSubmit: false,
};

const mockContextValue = {
  formState: {},
  handleChange: jest.fn(),
  handleFocusOut: jest.fn(),
  handleSubmit: jest.fn(),
  submitted: false,
  attemptedSubmitCount: 0,
  validationErrors: [],
  progress: '0',
  screen: 'form' as FormScreen,
  submissionID: '',
};

const blob = new Blob(['data:image/png;base64,']);
const mockImgFile = new File([blob], 'img.png', {
  type: 'image/png',
});
const imageFileInputState = {
  ...defaultInputState,
  value: [
    {
      file: mockImgFile,
      messageCode: null,
    },
  ],
};

describe('File', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should visually hide the original input with type=file', async () => {
    const { container } = await act(async () => {
      return render(
        <FileField
          id="foo"
          name="bar"
          inputState={defaultInputState}
          {...mockDefaultProps}
        />,
      );
    });

    const inputFile = container.querySelector('#foo');

    expect(inputFile).not.toBeVisible();
  });

  it('should click visually hidden input when upload button is clicked', async () => {
    const user = userEvent.setup();

    const { container } = await act(async () => {
      return render(
        <FileField
          id="foo"
          name="bar"
          inputState={defaultInputState}
          {...mockDefaultProps}
        />,
      );
    });

    const uploadButton = screen.getByRole('button', {
      name: /choose a file/i,
    });

    const inputFile = container.querySelector('#foo') as HTMLElement;
    inputFile.click = jest.fn();
    await user.click(uploadButton);

    expect(inputFile.click).toHaveBeenCalled();
  });

  it('should hide the FileList component when the files array is empty', async () => {
    await act(async () => {
      render(
        <FileField
          id="foo"
          name="bar"
          inputState={defaultInputState}
          {...mockDefaultProps}
        />,
      );
    });

    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('should show the FileList component when the files array has one or more items', async () => {
    await act(async () => {
      render(
        <FileField
          id="foo"
          name="bar"
          inputState={imageFileInputState}
          {...mockDefaultProps}
        />,
      );
    });

    expect(
      screen.getByText(/here's what you're sending:/i),
    ).toBeInTheDocument();
  });

  it('should call the function to update state when a file is added', async () => {
    const { container } = await act(async () => {
      return render(
        <FormContext.Provider value={mockContextValue}>
          <FileField
            id="foo"
            name="bar"
            inputState={defaultInputState}
            {...mockDefaultProps}
          />
        </FormContext.Provider>,
      );
    });

    const inputFile = container.querySelector('#foo') as Element;
    fireEvent.change(inputFile, { target: { files: [mockImgFile] } });

    expect(mockContextValue.handleChange).toHaveBeenCalledWith('bar', [
      {
        file: mockImgFile,
      },
    ]);
  });

  it('should remove a file from the list when the remove button is clicked', async () => {
    const user = userEvent.setup();
    await act(async () => {
      render(
        <FormContext.Provider value={mockContextValue}>
          <LiveRegionContextProvider>
            <FileField
              id="foo"
              name="bar"
              inputState={imageFileInputState}
              {...mockDefaultProps}
            />
          </LiveRegionContextProvider>
        </FormContext.Provider>,
      );
    });

    const removeButton = screen.getByRole('button', {
      name: /remove/i,
    });
    await user.click(removeButton);

    expect(mockContextValue.handleChange).toHaveBeenCalledWith('bar', []);
  });

  it('should remove the file thumbnail from state when the remove button is pressed', async () => {
    const user = userEvent.setup();
    await act(async () => {
      render(
        <FormContext.Provider value={mockContextValue}>
          <LiveRegionContextProvider>
            <FileField
              id="foo"
              name="bar"
              inputState={imageFileInputState}
              {...mockDefaultProps}
            />
          </LiveRegionContextProvider>
        </FormContext.Provider>,
      );
    });

    const removeButton = screen.getByRole('button', {
      name: /remove/i,
    });

    await user.click(removeButton);

    await waitFor(() =>
      expect(screen.getByTestId('thumbnail')).toHaveAttribute(
        'src',
        'undefined',
      ),
    );
  });

  it('should rename any duplicate uploaded files', async () => {
    const mockDuplicateFile = new File([blob], 'img.png', {
      type: 'image/png',
    });
    const inputState = {
      ...defaultInputState,
      value: [
        {
          file: mockDuplicateFile,
          messageCode: null,
        },
        {
          file: mockDuplicateFile,
          messageCode: null,
        },
      ],
    };
    await act(async () => {
      render(
        <FileField
          id="foo"
          name="bar"
          inputState={inputState}
          {...mockDefaultProps}
        />,
      );
    });

    await waitFor(
      () => expect(screen.queryAllByText('img.png (2)')).toBeInTheDocument,
    );
  });
  it('should display an image thumbnail when an image file type is added', async () => {
    await act(async () => {
      render(
        <FileField
          id="foo"
          name="bar"
          inputState={imageFileInputState}
          {...mockDefaultProps}
        />,
      );
    });

    await waitFor(() =>
      expect(screen.getByTestId('thumbnail')).toHaveAttribute(
        'src',
        'data:image/png;base64,ZGF0YTppbWFnZS9wbmc7YmFzZTY0LA==',
      ),
    );
  });

  it('should display a video svg when a video file type is added', async () => {
    const mockVideoFile = new File([blob], 'video.mp4', {
      type: 'video/mp4',
    });
    const inputState = {
      ...defaultInputState,
      value: [
        {
          file: mockVideoFile,
          messageCode: null,
        },
      ],
    };

    await act(async () => {
      render(
        <FileField
          id="foo"
          name="bar"
          inputState={inputState}
          {...mockDefaultProps}
        />,
      );
    });

    await waitFor(() =>
      expect(screen.getByTestId('thumbnail')).toHaveAttribute(
        'src',
        VIDEO_SVG_DATA_URI,
      ),
    );
  });

  it('should display an audio svg when an audio file type is added', async () => {
    const mockAudioFile = new File([blob], 'audio.mp3', {
      type: 'audio/mpeg',
    });
    const inputState = {
      ...defaultInputState,
      value: [
        {
          file: mockAudioFile,
          messageCode: null,
        },
      ],
    };

    await act(async () => {
      render(
        <FileField
          id="foo"
          name="bar"
          inputState={inputState}
          {...mockDefaultProps}
        />,
      );
    });

    await waitFor(() =>
      expect(screen.getByTestId('thumbnail')).toHaveAttribute(
        'src',
        AUDIO_SVG_DATA_URI,
      ),
    );
  });

  it('should display an document svg when any other file type is added', async () => {
    const mockFile = new File([blob], 'pdf.pdf', {
      type: 'application/pdf',
    });
    const inputState = {
      ...defaultInputState,
      value: [
        {
          file: mockFile,
          messageCode: null,
        },
      ],
    };

    await act(async () => {
      render(
        <FileField
          id="foo"
          name="bar"
          inputState={inputState}
          {...mockDefaultProps}
        />,
      );
    });

    await waitFor(() =>
      expect(screen.getByTestId('thumbnail')).toHaveAttribute(
        'src',
        DOCUMENT_SVG_DATA_URI,
      ),
    );
  });
});
