import React from 'react';
import Component from '.';
import { screen, render } from '../react-testing-library-with-providers';
import items from './fixture';

const mockClose = jest.fn();

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
  });

  it('should close the modal when the close button is clicked', () => {
    render(
      <Component selectedVideoIndex={0} items={items} onClose={mockClose} />,
    );

    const closeButton = screen.getByTestId('close-modal-button');
    closeButton.click();

    expect(mockClose).toHaveBeenCalled();
  });
});
