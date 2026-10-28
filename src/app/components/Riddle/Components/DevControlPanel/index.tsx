import { PropsWithChildren, use } from 'react';
import Text from '../../../Text';
import styles from './index.module.scss';
import { LocalStorageContext } from '../../LocalStorageProvider';
import { RiddleContext } from '../../RiddleProvider';

const Option = ({ title, children }: PropsWithChildren<{ title: string }>) => {
  return (
    <div className={styles.optionContainer}>
      <Text>{title}</Text>
      {children}
    </div>
  );
};

export default () => {
  const { addCoins } = use(LocalStorageContext);
  const {
    devTime,
    forceTimeInc24: forceTimeInc,
    forceTimeDec24: forceTimeDec,
    gameState,
    devOptionResetGoes,
  } = use(RiddleContext);

  return (
    <>
      <Text className={styles.title} fontVariant="sansBold">
        Developer Tools
      </Text>
      <Text className={styles.date} fontVariant="sansBold">
        Sim Date: {devTime.toDateString()}
      </Text>
      <Text className={styles.date} fontVariant="sansBold">
        Game State: {gameState}
      </Text>
      <div className={styles.container}>
        <Option title="Time Controls">
          <button type="button" onClick={() => forceTimeInc()}>
            +24h
          </button>
          <button type="button" onClick={() => forceTimeDec()}>
            -24h
          </button>
        </Option>
        <Option title="Credits">
          <button type="button" onClick={() => addCoins(700)}>
            +700C
          </button>
          <button
            type="button"
            onClick={() => {
              devOptionResetGoes();
            }}
          >
            ADD ATTEMPTS
          </button>
        </Option>
      </div>
    </>
  );
};
