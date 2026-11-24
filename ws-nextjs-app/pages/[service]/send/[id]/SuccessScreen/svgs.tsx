import type { Interpolation, Theme } from '@emotion/react';
import { ExternalSvg } from '#app/components/icons';

const TickSvg = ({
  className,
  css,
}: {
  className?: string;
  css?: Interpolation<Theme>;
}) => (
  <ExternalSvg
    path="images/icons/success.svg"
    className={className}
    css={css}
    width="4rem"
    height="4rem"
    isColoured
  />
);

export default TickSvg;
