import { ImageResponse } from 'next/og';
import React from 'react';
import { BLACK, GREY_6 } from '#app/components/ThemeProvider/palette';
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
              flexDirection: 'row',
            }}
          >
            {badges.filter(Boolean).map((child, index, arr) => (
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  backgroundColor: BLACK,
                  padding: 15,
                  borderRadius: 30,
                  marginRight: index < arr.length - 1 ? '20px' : '0px',
                  border: `1px solid ${GREY_6}`,
                }}
              >
                {child}
              </div>
            ))}
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
