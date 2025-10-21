import React from 'react';
import { BLACK, WHITE } from '#app/components/ThemeProvider/palette';

type BadgeProps = {
  text: string;
  icon?: React.ReactNode;
  textColour?: string;
  uppercase?: boolean;
  bold?: boolean;
};

const Badge = ({
  text,
  icon,
  textColour = WHITE,
  uppercase,
  bold,
}: BadgeProps) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: BLACK,
      padding: 16,
      borderRadius: 8,
    }}
  >
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        fontSize: 24,
        color: WHITE,
      }}
    >
      {icon && icon}
      <span
        style={{
          fontFamily: bold ? 'Reith Sans Bold' : 'Reith Sans Medium',
          textTransform: uppercase ? 'uppercase' : 'none',
          color: textColour,
        }}
      >
        {text}
      </span>
    </div>
  </div>
);

export default Badge;
