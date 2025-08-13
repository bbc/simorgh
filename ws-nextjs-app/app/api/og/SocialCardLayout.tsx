import React from 'react';
import { ImageResponse } from 'next/og';
import { BLACK, WHITE } from '#app/components/ThemeProvider/palette';
import { LayoutProps } from './types';
import BackgroundImage from './BackgroundImage';
import { PIDGIN } from './temp_ServiceLogos';

const socialCardLayout = async ({
  image,
  headline,
  fonts,
  badges,
}: LayoutProps) => {
  // const svgLogo = await import(
  //   `#app/components/ThemeProvider/chameleonLogos/${service}`
  // ).then(module => module.default);

  return new ImageResponse(
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
        {/* Text Gradient */}
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: '100%',
            background: `linear-gradient(to top, ${BLACK}, transparent)`,
          }}
        />
        {/* Brand Logo */}
        <div style={{ display: 'flex', padding: 30 }}>
          <PIDGIN />
        </div>
        {/* Bottom container */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            color: WHITE,
            fontSize: 32,
            padding: 30,
          }}
        >
          {/* Headline */}
          <div
            style={{
              display: 'flex',
              marginBottom: 20,
              fontFamily: 'Reith Serif Bold',
            }}
          >
            {headline}
          </div>
          {/* Badges */}
          {badges && badges.length > 0 && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 15,
              }}
            >
              {badges.filter(Boolean).map(child => child)}
            </div>
          )}
        </div>
      </div>
    ),
    {
      width: 800,
      height: 800,
      fonts,
    },
  );
};

export default socialCardLayout;
