/** @jsx jsx */
import { jsx } from '@emotion/react';
import styles from './styles';

export const UploadSvg = () => (
  <svg
    css={styles.fileUploadIcon}
    focusable="false"
    aria-hidden="true"
    viewBox="0 0 14 14"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M6.43125 1.35625V9.8H7.56875V1.35625H6.43125ZM13.5625 11.2875V8.6625H12.425V11.2875C12.425 12.1625 12.1625 12.425 11.2875 12.425H2.7125C1.8375 12.425 1.575 12.1625 1.575 11.2875V8.6625H0.4375V11.2875C0.4375 12.5125 0.525 13.5625 2.7125 13.5625H11.2438C13.475 13.5625 13.5625 12.5125 13.5625 11.2875ZM7.04375 2.05625L11.2 6.2125L11.9875 5.38125L7 0.4375L2.0125 5.425L2.84375 6.25625L7.04375 2.05625Z" />
  </svg>
);

export const DeleteSvg = () => (
  <svg
    viewBox="0 0 17 18"
    xmlns="http://www.w3.org/2000/svg"
    focusable="false"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.1215 0.5L8.5 7.12203L1.87797 0.5L0 2.37797L6.62203 9L0 15.622L1.8785 17.5L8.5 10.8785L15.1215 17.5L17 15.622L10.378 9L17 2.37797L15.1215 0.5Z"
    />
  </svg>
);

export const VIDEO_SVG_DATA_URI =
  "data:image/svg+xml,%3Csvg viewBox='0 0 12 12' xmlns='http://www.w3.org/2000/svg' focusable='false' aria-hidden='true'%0A%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cpath d='M.5.6h12v12H.5z' /%3E%3Cpath fill='currentColor' d='M2.144.96v11.28l8.712-5.64z' /%3E%3C/g%3E%3C/svg%3E";
export const AUDIO_SVG_DATA_URI =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%0AviewBox='0 0 13 12'%0Afocusable='false'%0Aaria-hidden='true'%0A%3E%3Cpath d='M9.021 1.811l-.525.525c.938.938 1.5 2.25 1.5 3.675s-.563 2.738-1.5 3.675l.525.525c1.05-1.087 1.725-2.55 1.725-4.2s-.675-3.112-1.725-4.2z' /%3E%3Cpath d='M10.596.199l-.525.562c1.35 1.35 2.175 3.225 2.175 5.25s-.825 3.9-2.175 5.25l.525.525c1.5-1.462 2.4-3.525 2.4-5.775s-.9-4.312-2.4-5.812zM6.996 1.511l-2.25 2.25H.996v4.5h3.75l2.25 2.25z' /%3E%3C/svg%3E";
export const DOCUMENT_SVG_DATA_URI =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Ctitle%3Edocument%3C/title%3E%3Cpath d='M21.3,3,27,8.7V29H5V3H21.3M22,0H2V32H30V8L22,0Z'/%3E%3Crect x='10' y='13' width='12' height='3'/%3E%3Crect x='10' y='17' width='12' height='3'/%3E%3Crect x='10' y='21' width='12' height='3'/%3E%3C/svg%3E";
