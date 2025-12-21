import { css } from '@emotion/react';
import {
  BLACK,
  CLOUD_LIGHT,
  LUNAR_LIGHT,
  LUNAR,
  GREY_3,
  CLOUD_DARK,
  SERVICE_NEUTRAL_CORE,
} from '#app/components/ThemeProvider/palette';

const styles = {
  container: css`
    margin: 2rem auto 0;
    padding: 1.5rem;
    border-top: 1px solid ${CLOUD_LIGHT};
    max-width: 1008px;
    width: 100%;
    box-sizing: border-box;

    @media (max-width: 1024px) {
      max-width: 100%;
      padding: 1.5rem 1rem;
    }

    @media (max-width: 600px) {
      padding: 1rem;
    }
  `,
  heading: css`
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0 0 1.5rem 0;
    padding: 0;
    line-height: 1.25;
    color: ${BLACK};
  `,
  grid: css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
    list-style: none;
    padding: 0;
    margin: 0;

    @media (max-width: 768px) {
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 0.75rem;
    }

    @media (max-width: 480px) {
      grid-template-columns: 1fr;
    }
  `,
  articleBox: css`
    display: flex;
    flex-direction: column;
    padding: 1rem;
    border: 1px solid ${GREY_3};
    background-color: ${LUNAR_LIGHT};
    border-radius: 2px;

    &:hover {
      background-color: ${LUNAR};
      border-color: ${CLOUD_DARK};
    }

    &:active {
      background-color: ${GREY_3};
    }
  `,
  articleTitle: css`
    font-size: 1rem;
    font-weight: 700;
    line-height: 1.4;
    color: ${SERVICE_NEUTRAL_CORE};
    margin: 0;
    padding: 0;
    word-break: break-word;

    @media (max-width: 768px) {
      font-size: 0.95rem;
    }
  `,
  articleContent: css`
    font-size: 0.75rem;
    color: ${CLOUD_DARK};
    margin-top: 0.5rem;
  `,
};

export default styles;
