import React from 'react';
import Component, { playlistLoadedCallback, getBlocks } from '.';
import {
  screen,
  render,
  fireEvent,
} from '../react-testing-library-with-providers';
import items from './fixture';
import { Player, SMPEvent } from '../MediaLoader/types';
import { setImageWidth } from '../MediaLoader/configs/portraitClipMedia';

const mockClose = jest.fn();

const mockPlayer = {
  queuePlaylist: jest.fn(),
  setPreviousPlaylist: jest.fn(),
  pause: jest.fn(),
} satisfies Partial<Player>;

describe('PortraitVideoModal', () => {
  beforeAll(() => {
    HTMLDialogElement.prototype.show = jest.fn();
    HTMLDialogElement.prototype.showModal = jest.fn();
    HTMLDialogElement.prototype.close = jest.fn();
  });

  it('should render the modal when active', () => {
    render(
      <Component selectedVideoIndex={0} items={items} onClose={mockClose} />,
    );

    const modal = screen.getByRole<HTMLDialogElement>('dialog');

    expect(modal.showModal).toHaveBeenCalled();
    expect(modal).toBeInTheDocument();
  });

  it('should close the modal when the close button is clicked', () => {
    render(
      <Component selectedVideoIndex={0} items={items} onClose={mockClose} />,
    );

    const closeButton = screen.getByTestId('close-modal-button');
    closeButton.click();

    expect(mockClose).toHaveBeenCalled();
  });

  it('should close the modal when the escape key is pressed', () => {
    render(
      <Component selectedVideoIndex={0} items={items} onClose={mockClose} />,
    );

    const dialog = screen.getByRole('dialog');
    fireEvent.keyDown(dialog, { key: 'Escape', code: 'Escape' });

    expect(mockClose).toHaveBeenCalled();
  });

  it('should not close the modal when clicking outside the modal with a mouse', () => {
    render(
      <Component selectedVideoIndex={0} items={items} onClose={mockClose} />,
    );

    const dialog = screen.getByRole('dialog');
    fireEvent.mouseDown(dialog);

    expect(mockClose).toHaveBeenCalled();
  });

  it('should not close the modal when clicking outside the modal with touch', () => {
    render(
      <Component selectedVideoIndex={0} items={items} onClose={mockClose} />,
    );

    const dialog = screen.getByRole('dialog');
    fireEvent.touchStart(dialog);

    expect(mockClose).toHaveBeenCalled();
  });

  it('should perform clean-up when component is unmounted', () => {
    Object.defineProperty(window, 'embeddedMedia', {
      writable: true,
      value: {
        api: {
          players: () => ({ bbcMediaPlayer0: mockPlayer }),
        },
      },
    });

    const { unmount } = render(
      <Component selectedVideoIndex={0} items={items} onClose={mockClose} />,
    );

    const dialog = screen.getByRole<HTMLDialogElement>('dialog');
    const removeEventListenerSpy = jest.spyOn(dialog, 'removeEventListener');

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'mousedown',
      expect.any(Function),
    );
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'touchstart',
      expect.any(Function),
    );
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'keydown',
      expect.any(Function),
    );
    expect(mockPlayer.pause).toHaveBeenCalled();
  });

  describe('playlistLoadedCallback', () => {
    beforeEach(() => {
      jest.clearAllMocks();

      Object.defineProperty(window, 'embeddedMedia', {
        writable: true,
        value: {
          api: {
            players: () => ({ bbcMediaPlayer0: mockPlayer }),
          },
        },
      });
    });

    it('should call the playlistLoadedCallback and call queuePlaylist for the next video', () => {
      const blocks = getBlocks(items);

      const mockSMPEvent: SMPEvent = {
        playlist: { items: [{ versionID: items[0].versionId }] },
      };

      playlistLoadedCallback(mockSMPEvent, blocks);

      const [_currentVideo, nextVideo] = blocks;

      expect(mockPlayer.setPreviousPlaylist).not.toHaveBeenCalled();

      expect(mockPlayer.queuePlaylist).toHaveBeenCalledWith(
        {
          title: nextVideo.model.video.title,
          holdingImageURL: setImageWidth(nextVideo.model.images[0].urlTemplate),
          items: [{ versionID: nextVideo.model.video.version.id }],
        },
        { statsObject: { clipPID: nextVideo.model.video.id } },
      );
    });

    it('should call the playlistLoadedCallback and call setPreviousPlaylist for the previous video and queuePlaylist for the next video', () => {
      const blocks = getBlocks(items);

      const mockSMPEvent: SMPEvent = {
        playlist: { items: [{ versionID: items[1].versionId }] },
      };

      playlistLoadedCallback(mockSMPEvent, blocks);

      const [prevVideo, _current, nextVideo] = blocks;

      expect(mockPlayer.setPreviousPlaylist).toHaveBeenCalledWith(
        {
          title: prevVideo.model.video.title,
          holdingImageURL: setImageWidth(prevVideo.model.images[0].urlTemplate),
          items: [{ versionID: prevVideo.model.video.version.id }],
        },
        { statsObject: { clipPID: prevVideo.model.video.id } },
      );

      expect(mockPlayer.queuePlaylist).toHaveBeenCalledWith(
        {
          title: nextVideo.model.video.title,
          holdingImageURL: setImageWidth(nextVideo.model.images[0].urlTemplate),
          items: [{ versionID: nextVideo.model.video.version.id }],
        },
        { statsObject: { clipPID: nextVideo.model.video.id } },
      );
    });

    it('should call playlistLoadedCallback and setPreviousPlaylist if there are no next videos', () => {
      const blocks = getBlocks(items);

      const mockSMPEvent: SMPEvent = {
        playlist: { items: [{ versionID: items[items.length - 1].versionId }] },
      };

      playlistLoadedCallback(mockSMPEvent, blocks);

      const [prevVideo] = blocks.slice(-2);

      expect(mockPlayer.setPreviousPlaylist).toHaveBeenCalledWith(
        {
          title: prevVideo.model.video.title,
          holdingImageURL: setImageWidth(prevVideo.model.images[0].urlTemplate),
          items: [{ versionID: prevVideo.model.video.version.id }],
        },
        { statsObject: { clipPID: prevVideo.model.video.id } },
      );

      expect(mockPlayer.queuePlaylist).not.toHaveBeenCalled();
    });
  });
});
