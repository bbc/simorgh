import React from 'react';
import { ImageResponse } from 'next/og';

import { LayoutProps } from './types';
import BackgroundImage from './BackgroundImage';
import { PIDGIN } from './temp_ServiceLogos';

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
        {/* gradient */}
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: '50%',
            background:
              'linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent)',
          }}
        />
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            bottom: 15,
            padding: 30,
          }}
        >
          <PIDGIN />
        </div>
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
