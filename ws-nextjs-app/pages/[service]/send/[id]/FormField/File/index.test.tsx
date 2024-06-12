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

const defaultInputState = {
  isValid: true,
  required: false,
  value: [],
  htmlType: 'file',
  messageCode: null,
};

const blob = new Blob(['data:image/png;base64,']);
const mockImgFile = new File([blob], 'img.png', {
  type: 'image/png',
});
const imageFileInputState = { ...defaultInputState, value: [mockImgFile] };

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
          describedBy="foo"
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
          describedBy="foo"
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
          describedBy="foo"
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
          describedBy="foo"
        />,
      );
    });

    expect(
      screen.getByText(/here's what you're sending:/i),
    ).toBeInTheDocument();
  });

  it('should call the function to update state when a file is added', async () => {
    const contextValue = { handleChange: jest.fn() };
    const { container } = await act(async () => {
      return render(
        <FormContext.Provider value={contextValue}>
          <FileField
            id="foo"
            name="bar"
            inputState={defaultInputState}
            describedBy="foo"
          />
        </FormContext.Provider>,
      );
    });

    const inputFile = container.querySelector('#foo') as Element;
    fireEvent.change(inputFile, { target: { files: [mockImgFile] } });

    expect(contextValue.handleChange).toHaveBeenCalledWith('bar', [
      mockImgFile,
    ]);
  });

  it('should remove a file from the list when the remove button is clicked', async () => {
    const user = userEvent.setup();
    const contextValue = { handleChange: jest.fn() };
    await act(async () => {
      render(
        <FormContext.Provider value={contextValue}>
          <LiveRegionContextProvider>
            <FileField
              id="foo"
              name="bar"
              inputState={imageFileInputState}
              describedBy="foo"
            />
          </LiveRegionContextProvider>
        </FormContext.Provider>,
      );
    });

    const removeButton = screen.getByRole('button', {
      name: /remove/i,
    });
    await user.click(removeButton);

    expect(contextValue.handleChange).toHaveBeenCalledWith('bar', []);
  });

  it('should remove the file thumbnail from state when the remove button is pressed', async () => {
    const user = userEvent.setup();
    const contextValue = { handleChange: jest.fn() };
    await act(async () => {
      render(
        <FormContext.Provider value={contextValue}>
          <LiveRegionContextProvider>
            <FileField
              id="foo"
              name="bar"
              inputState={imageFileInputState}
              describedBy="foo"
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
      expect(screen.getByRole('presentation')).toHaveAttribute(
        'src',
        'undefined',
      ),
    );
  });

  it('should display an image thumbnail when an image file type is added', async () => {
    await act(async () => {
      render(
        <FileField
          id="foo"
          name="bar"
          inputState={imageFileInputState}
          describedBy="foo"
        />,
      );
    });

    await waitFor(() =>
      expect(screen.getByRole('presentation')).toHaveAttribute(
        'src',
        'data:image/png;base64,ZGF0YTppbWFnZS9wbmc7YmFzZTY0LA==',
      ),
    );
  });

  it('should display a video svg when a video file type is added', async () => {
    const mockVideoFile = new File([blob], 'video.mp4', {
      type: 'video/mp4',
    });
    const inputState = { ...defaultInputState, value: [mockVideoFile] };

    await act(async () => {
      render(
        <FileField
          id="foo"
          name="bar"
          inputState={inputState}
          describedBy="foo"
        />,
      );
    });

    await waitFor(() =>
      expect(screen.getByRole('presentation')).toHaveAttribute(
        'src',
        VIDEO_SVG_DATA_URI,
      ),
    );
  });

  it('should display an audio svg when an audio file type is added', async () => {
    const mockAudioFile = new File([blob], 'audio.mp3', {
      type: 'audio/mpeg',
    });
    const inputState = { ...defaultInputState, value: [mockAudioFile] };

    await act(async () => {
      render(
        <FileField
          id="foo"
          name="bar"
          inputState={inputState}
          describedBy="foo"
        />,
      );
    });

    await waitFor(() =>
      expect(screen.getByRole('presentation')).toHaveAttribute(
        'src',
        AUDIO_SVG_DATA_URI,
      ),
    );
  });

  it('should display an document svg when any other file type is added', async () => {
    const mockFile = new File([blob], 'pdf.pdf', {
      type: 'application/pdf',
    });
    const inputState = { ...defaultInputState, value: [mockFile] };

    await act(async () => {
      render(
        <FileField
          id="foo"
          name="bar"
          inputState={inputState}
          describedBy="foo"
        />,
      );
    });

    await waitFor(() =>
      expect(screen.getByRole('presentation')).toHaveAttribute(
        'src',
        DOCUMENT_SVG_DATA_URI,
      ),
    );
  });
});
