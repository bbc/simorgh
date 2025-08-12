import React from 'react';
import { ImageResponse } from 'next/og';
import { LayoutProps } from './types';
import BackgroundImage from './BackgroundImage';

const horizontalLayout = ({ image, fonts, badges }: LayoutProps) =>
  new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          position: 'relative',
        }}
      >
        {image && <BackgroundImage image={image} />}
        {badges && badges.length > 0 && (
          <div
            style={{
              position: 'absolute',
              bottom: 30,
              right: 25,
              display: 'flex',
              flexDirection: 'column',
              gap: 15,
            }}
          >
            {badges.filter(Boolean).map(child => child)}
          </div>
        )}
      </div>
    ),
    {
      width: 1024,
      height: 576,
      fonts,
    },
  );

export default horizontalLayout;
