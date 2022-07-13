import React, { useState } from 'react';
import styles from './Counter.module.scss';

const Counter: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  const isMax = count >= 3;
  const isMin = count === 0;

  const increment = (): void => {
    !isMax && setCount((s) => s + 1);
  };
  const decrement = (): void => {
    !isMin && setCount((s) => s - 1);
  };

  const renderMessage = (isMax: boolean, isMin: boolean) => {
    if (isMax) {
      return (
        <div aria-label="warning-message" className={styles['validation-message']}>
          3 is a max value
        </div>
      );
    } else if (isMin) {
      return (
        <div aria-label="warning-message" className={styles['validation-message']}>
          0 is a min value
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <div className={styles['counter']}>
      <div aria-label="display" className={styles['display']}>
        {count}
      </div>
      <div className={styles['btn-group']}>
        <button
          type="button"
          name="increment"
          onClick={increment}
          disabled={isMax}
          className={`${styles['btn']} ${styles['inc']}`}
        >
          Inc
        </button>
        <button
          type="button"
          name="decrement"
          onClick={decrement}
          disabled={isMin}
          className={`${styles['btn']} ${styles['dec']}`}
        >
          Dec
        </button>
      </div>
      {renderMessage(isMax, isMin)}
    </div>
  );
};

Counter.displayName = Counter.name;

export { Counter };
