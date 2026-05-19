// biome-ignore-all lint/a11y/useValidAriaRole: we want this
import { RedCardSVG, SecondYellowCardSVG } from '#app/components/icons';
import styles from '../index.styles';
import type { PlayerActions } from '../types';

interface CardProps {
  player: PlayerActions;
}

const Card = ({ player }: CardProps) => (
  <div css={styles.cardContainer} role="text">
    {player.actions[0].type === 'Red Card' ? (
      <span css={styles.redCard} aria-hidden data-testid="red-card-img">
        <RedCardSVG />
      </span>
    ) : (
      <span
        css={styles.yellowCard}
        aria-hidden
        data-testid="second-yellow-card-img"
      >
        <SecondYellowCardSVG />
      </span>
    )}
  </div>
);

export default Card;
