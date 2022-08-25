import React from 'react';
import { render, act, screen } from '@testing-library/react';
import { css, Theme } from '@emotion/react';
import Image from '.';

describe('Image', () => {
  it('should preload when preload is true', () => {
    expect(true).toBe(false);
  });

  it('should not preload when preload is false', () => {
    expect(true).toBe(false);
  });

  it('should lazy load when lazy load is true', () => {
    expect(true).toBe(false);
  });

  it('should not lazy load when lazy load is false', () => {
    expect(true).toBe(false);
  });

  it('should be a responsive image', () => {
    expect(true).toBe(false);
  });

  it('should support jpeg images', () => {
    expect(true).toBe(false);
  });

  it('should support webp images', () => {
    expect(true).toBe(false);
  });

  it('should support AMP images', () => {
    expect(true).toBe(false);
  });

  it('should support jpeg images', () => {
    expect(true).toBe(false);
  });

  it('should support aspect ratio to prevent content layout shift', () => {
    expect(true).toBe(false);
  });

  it('should load a placeholder when the image has not yet loaded', () => {
    expect(true).toBe(false);
  });

  it('should render an alt tag', () => {
    render(<Image src="someSrc.jpeg" alt="imageAlt" />);
    expect(screen.getByAltText('imageAlt')).toBeInTheDocument();
  });

  it('should be able to apply custom styles', () => {
    expect(true).toBe(false);
  });

  it('should render the image', () => {
    expect(true).toBe(false);
  });
});
