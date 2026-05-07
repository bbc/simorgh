/* eslint-disable import/prefer-default-export */
import VisuallyHiddenText from '#app/components/VisuallyHiddenText';
import Action from './action';
import styles from './index.styles';
import type { PlayerAction } from './action';

interface KeyEventsProps {
  homeKeyEvents: PlayerAction[];
  awayKeyEvents: PlayerAction[];
  homeName: string;
  awayName: string;
}

export const KeyEvents = ({
  homeKeyEvents,
  awayKeyEvents,
  homeName,
  awayName,
}: KeyEventsProps) => (
  <>
    <VisuallyHiddenText as="h3">Key Events</VisuallyHiddenText>
    <div css={styles.keyEventsHome()}>
      <VisuallyHiddenText as="h4">{homeName}</VisuallyHiddenText>
      <Action contestantActions={homeKeyEvents} alignment="home" />
    </div>
    <div css={styles.keyEventsAway()}>
      <VisuallyHiddenText as="h4">{awayName}</VisuallyHiddenText>
      <Action contestantActions={awayKeyEvents} alignment="away" />
    </div>
  </>
);
