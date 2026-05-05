/** @jsxImportSource @emotion/react */
/* eslint-disable jsx-a11y/aria-role */
import { RedCardSVG, SecondYellowCardSVG } from '#app/components/icons';
import styles from './index.styles';

const Card = ({ player }) => (
  <div css={styles.cardContainer()} role="text">
    {player.actions[0].type === 'Red Card' ? (
      <span css={styles.redCard()} aria-hidden data-testid="red-card-img">
        <RedCardSVG />
      </span>
    ) : (
      <span
        css={styles.yellowCard()}
        aria-hidden
        data-testid="second-yellow-card-img"
      >
        <SecondYellowCardSVG />
      </span>
    )}
  </div>
);

export default Card;
