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
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='26' height='25' viewBox='0 0 26 25' fill='none'%3E%3Cpath d='M11.3 3.2002L6.1 8.5002H1C0.5 8.5002 0 8.9002 0 9.4002V15.5002C0 16.0002 0.4 16.5002 0.9 16.5002H6L11.3 21.8002C11.7 22.2002 12.3 22.2002 12.7 21.8002C12.9 21.6002 13 21.4002 13 21.1002V3.9002C13 3.3002 12.5 2.9002 12 2.9002C11.7 2.9002 11.5 3.0002 11.3 3.2002ZM17.8 3.5002L16.2 5.1002C18 7.1002 19.1 9.8002 19.1 12.5002C19.1 15.2002 18.1 17.9002 16.2 19.9002L17.8 21.5002C20.1 19.0002 21.3 15.8002 21.3 12.4002C21.3 9.1002 20.1 5.9002 17.8 3.5002Z' fill='%23141414'/%3E%3Cpath d='M21.1 0.200195L19.5 1.8002C22.3 4.7002 23.8 8.5002 23.8 12.5002C23.8 16.5002 22.3 20.3002 19.5 23.2002L21.1 24.8002C24.2 21.4002 26 17.0002 26 12.4002C26 7.9002 24.2 3.5002 21.1 0.200195Z' fill='%23141414'/%3E%3C/svg%3E";
export const DOCUMENT_SVG_DATA_URI =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Ctitle%3Edocument%3C/title%3E%3Cpath d='M21.3,3,27,8.7V29H5V3H21.3M22,0H2V32H30V8L22,0Z'/%3E%3Crect x='10' y='13' width='12' height='3'/%3E%3Crect x='10' y='17' width='12' height='3'/%3E%3Crect x='10' y='21' width='12' height='3'/%3E%3C/svg%3E";
