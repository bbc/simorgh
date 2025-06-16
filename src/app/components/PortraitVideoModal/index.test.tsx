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
} as unknown as Player;

describe('PortraitVideoModal', () => {
  beforeAll(() => {
    HTMLDialogElement.prototype.show = jest.fn();
    HTMLDialogElement.prototype.showModal = jest.fn();
    // HTMLDialogElement.prototype.close = jest.fn();
  });

  it('should render the modal when active', () => {
    render(
      <Component selectedVideoIndex={0} items={items} onClose={mockClose} />,
    );
  });

  it('should close the modal when the close button is clicked', () => {
    const { container } = render(
      <Component selectedVideoIndex={0} items={items} onClose={mockClose} />,
    );

    container.dispatchEvent(new Event('close'));

    expect(mockClose).toHaveBeenCalled();
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

      const mockSMPEvent = {
        playlist: { items: [{ versionID: items[0].versionId }] },
      } as SMPEvent;

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

      const mockSMPEvent = {
        playlist: { items: [{ versionID: items[1].versionId }] },
      } as SMPEvent;

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

      const mockSMPEvent = {
        playlist: { items: [{ versionID: items[items.length - 1].versionId }] },
      } as SMPEvent;

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
