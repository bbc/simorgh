import * as numerals from '.';
import styles from './index.module.scss';

const numeralSystems = Object.keys(numerals).filter(key =>
  Array.isArray(numerals[key]),
);

const Component = () => (
  <div className={styles.container}>
    {numeralSystems.map(numeralSystem => (
      <div key={numeralSystem}>
        <div className={styles.value}>{numeralSystem}</div>
        <div className={styles.value}>{numerals[numeralSystem].join(', ')}</div>
      </div>
    ))}
  </div>
);

export default {
  title: 'Translations/Numerals',
  Component,
  parameters: {
    chromatic: {
      disable: true,
    },
  },
};

export const Example = Component;
