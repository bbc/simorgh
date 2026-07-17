/* eslint-disable import/prefer-default-export */
import VisuallyHiddenText from '#app/components/VisuallyHiddenText';
import Action from './action';
import styles from '../index.styles';
import type { PlayerActions } from '../types';

interface KeyEventsProps {
  homeKeyEvents: PlayerActions[];
  awayKeyEvents: PlayerActions[];
  homeName: string;
  awayName: string;
  keyEventsTitle?: string;
}

export const KeyEvents = ({
  homeKeyEvents,
  awayKeyEvents,
  homeName,
  awayName,
  keyEventsTitle,
}: KeyEventsProps) => {
  const title = keyEventsTitle || 'Key Events';

  return (
    <>
      <VisuallyHiddenText as="h3">{title}</VisuallyHiddenText>
      <div css={styles.keyEventsHome}>
        <VisuallyHiddenText as="h4">{homeName}</VisuallyHiddenText>
        <Action contestantActions={homeKeyEvents} alignment="home" />
      </div>
      <div css={styles.keyEventsAway}>
        <VisuallyHiddenText as="h4">{awayName}</VisuallyHiddenText>
        <Action contestantActions={awayKeyEvents} alignment="away" />
      </div>
    </>
  );
};
