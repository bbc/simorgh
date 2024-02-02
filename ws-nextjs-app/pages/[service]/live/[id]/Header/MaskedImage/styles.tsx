import { css, Theme } from '@emotion/react';

const maskColours = {
  black: '0,0,0',
  white: '255,255,255',
};

const mobileImageMask = `
  rgba(${maskColours.black}) 0%,
  rgba(${maskColours.white}, 0.99) 7%,
  rgba(${maskColours.white}, 0.98) 13%,
  rgba(${maskColours.white}, 0.97) 19%,
  rgba(${maskColours.white}, 0.96) 24%,
  rgba(${maskColours.white}, 0.95) 29%,
  rgba(${maskColours.white}, 0.93) 34%,
  rgba(${maskColours.white}, 0.91) 39%,
  rgba(${maskColours.white}, 0.89) 43%,
  rgba(${maskColours.white}, 0.87) 47%,
  rgba(${maskColours.white}, 0.84) 51%,
  rgba(${maskColours.white}, 0.82) 55%,
  rgba(${maskColours.white}, 0.78) 59%,
  rgba(${maskColours.white}, 0.75) 62%,
  rgba(${maskColours.white}, 0.7) 65%,
  rgba(${maskColours.white}, 0.65) 69%,
  rgba(${maskColours.white}, 0.61) 72%,
  rgba(${maskColours.white}, 0.55) 75%,
  rgba(${maskColours.white}, 0.49) 79%,
  rgba(${maskColours.white}, 0.42) 82%,
  rgba(${maskColours.white}, 0.35) 85%,
  rgba(${maskColours.white}, 0.27) 89%,
  rgba(${maskColours.white}, 0.19) 92%,
  rgba(${maskColours.white}, 0.1) 96%,
  rgba(${maskColours.white}, 0) 100%
`;

const group4Mask = `
  rgba(${maskColours.black}) 0%,
  rgba(${maskColours.black}) 50%,
  rgba(${maskColours.black}) 54%,
  rgba(${maskColours.white}, 0.98) 56%,
  rgba(${maskColours.white}, 0.96) 58%,
  rgba(${maskColours.white}, 0.93) 60%,
  rgba(${maskColours.white}, 0.89) 62%,
  rgba(${maskColours.white}, 0.84) 64%,
  rgba(${maskColours.white}, 0.8) 66%,
  rgba(${maskColours.white}, 0.74) 68%,
  rgba(${maskColours.white}, 0.68) 70%,
  rgba(${maskColours.white}, 0.62) 72%,
  rgba(${maskColours.white}, 0.56) 74%,
  rgba(${maskColours.white}, 0.5) 76%,
  rgba(${maskColours.white}, 0.44) 78%,
  rgba(${maskColours.white}, 0.38) 80%,
  rgba(${maskColours.white}, 0.32) 82%,
  rgba(${maskColours.white}, 0.26) 84%,
  rgba(${maskColours.white}, 0.2) 86%,
  rgba(${maskColours.white}, 0.16) 88%,
  rgba(${maskColours.white}, 0.11) 90%,
  rgba(${maskColours.white}, 0.07) 92%,
  rgba(${maskColours.white}, 0.04) 94%,
  rgba(${maskColours.white}, 0.02) 96%,
  rgba(${maskColours.white}, 0) 98%,
  rgba(${maskColours.white}, 0) 100%`;

const extraWideMask = `
  rgba(${maskColours.white}, 0) 0%,
  rgba(${maskColours.white}, 0.01) 2%,
  rgba(${maskColours.white}, 0.02) 3%,
  rgba(${maskColours.white}, 0.05) 4%,
  rgba(${maskColours.white}, 0.08) 5%,
  rgba(${maskColours.white}, 0.12) 6%,
  rgba(${maskColours.white}, 0.16) 7%,
  rgba(${maskColours.white}, 0.21) 8%,
  rgba(${maskColours.white}, 0.26) 9%,
  rgba(${maskColours.white}, 0.32) 10%,
  rgba(${maskColours.white}, 0.38) 11%,
  rgba(${maskColours.white}, 0.44) 12%,
  rgba(${maskColours.white}, 0.5) 13%,
  rgba(${maskColours.white}, 0.56) 14%,
  rgba(${maskColours.white}, 0.63) 15%,
  rgba(${maskColours.white}, 0.69) 16%,
  rgba(${maskColours.white}, 0.74) 17%,
  rgba(${maskColours.white}, 0.8) 18%,
  rgba(${maskColours.white}, 0.85) 19%,
  rgba(${maskColours.white}, 0.89) 20%,
  rgba(${maskColours.white}, 0.93) 21%,
  rgba(${maskColours.white}, 0.96) 22%,
  rgba(${maskColours.white}, 0.98) 23%,
  rgba(${maskColours.black}) 24%,
  rgba(${maskColours.black}) 25%,
  rgba(${maskColours.black}) 50%,
  rgba(${maskColours.black}) 54%,
  rgba(${maskColours.white}, 0.98) 56%,
  rgba(${maskColours.white}, 0.96) 58%,
  rgba(${maskColours.white}, 0.93) 60%,
  rgba(${maskColours.white}, 0.89) 62%,
  rgba(${maskColours.white}, 0.84) 64%,
  rgba(${maskColours.white}, 0.8) 66%,
  rgba(${maskColours.white}, 0.74) 68%,
  rgba(${maskColours.white}, 0.68) 70%,
  rgba(${maskColours.white}, 0.62) 72%,
  rgba(${maskColours.white}, 0.56) 74%,
  rgba(${maskColours.white}, 0.5) 76%,
  rgba(${maskColours.white}, 0.44) 78%,
  rgba(${maskColours.white}, 0.38) 80%,
  rgba(${maskColours.white}, 0.32) 82%,
  rgba(${maskColours.white}, 0.26) 84%,
  rgba(${maskColours.white}, 0.2) 86%,
  rgba(${maskColours.white}, 0.16) 88%,
  rgba(${maskColours.white}, 0.11) 90%,
  rgba(${maskColours.white}, 0.07) 92%,
  rgba(${maskColours.white}, 0.04) 94%,
  rgba(${maskColours.white}, 0.02) 96%,
  rgba(${maskColours.white}, 0) 98%,
  rgba(${maskColours.white}, 0) 100%`;

export default {
  maskedImageWrapper: ({ mq }: Theme) =>
    css({
      maskSize: '100% 100%',
      maskImage: `linear-gradient(
      180deg, ${mobileImageMask})`,
      aspectRatio: '16 /9',
      [mq.GROUP_4_MIN_WIDTH]: {
        height: '100%',
        maxWidth: '60%',
        objectFit: 'cover',
        position: 'absolute',
        insetInlineEnd: 0,
      },
    }),

  linearGradientLtr: ({ mq }: Theme) =>
    css({
      [mq.GROUP_4_MIN_WIDTH]: {
        maskImage: `linear-gradient(
          270deg, ${group4Mask})`, // 270deg for LTR
      },
      [mq.GROUP_5_MIN_WIDTH]: {
        maskImage: `linear-gradient(
          270deg, ${extraWideMask})`, // 270deg for LTR
      },
    }),

  linearGradientRtl: ({ mq }: Theme) =>
    css({
      [mq.GROUP_4_MIN_WIDTH]: {
        maskImage: `linear-gradient(
          90deg, ${group4Mask})`, // 90deg for RTL
      },
      [mq.GROUP_5_MIN_WIDTH]: {
        maskImage: `linear-gradient(
          90deg, ${extraWideMask})`, // 90deg for RTL
      },
    }),
};
