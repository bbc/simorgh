import onClient from '#app/lib/utilities/onClient';
import React, {
  createContext,
  PropsWithChildren,
  useMemo,
  useState,
} from 'react';

export type LocalStorage = {
  goes: number;
  coins: number;
  paidHints: boolean[];
  addCoins: (amount: number) => void;
  addGoes: () => void;
  reduceCoins: (amount: number) => void;
  reduceGoes: () => void;
  buyHint: (amount: number, price: number) => void;
  resetHints: () => void;
  isWinner: boolean;
  updateWinnerState: (bool: boolean) => void;
};

export const LocalStorageContext = createContext<LocalStorage>(
  {} as LocalStorage,
);

const DATA_KEY = 'ws_bbc_riddle';

const getLocalData = () => {
  if (onClient()) {
    const localStorageData = window.localStorage[DATA_KEY];
    if (localStorageData) {
      const parsedData = JSON.parse(localStorageData);
      return {
        goes: parsedData.goes ?? 5,
        coins: parsedData.coins ?? 0,
        paidHints: parsedData.paidHints ?? [false, false, false],
        isWinner: parsedData.isWinner ?? false,
      };
    }
  }

  return {
    goes: 5,
    coins: 0,
    paidHints: [false, false, false],
    isWinner: false,
  };
};

const setLocalData = ({
  goes,
  coins,
  paidHints,
  isWinner,
}: {
  goes?: number;
  coins?: number;
  paidHints?: boolean[];
  isWinner?: boolean;
}) => {
  if (onClient()) {
    const {
      goes: localGoes,
      coins: localCoins,
      paidHints: localPaidHints,
      isWinner: localIsWinner,
    } = getLocalData();
    const updatedData = {
      goes: goes ?? localGoes,
      coins: coins ?? localCoins,
      paidHints: paidHints ?? localPaidHints,
      isWinner: isWinner ?? localIsWinner,
    };
    const toStore = JSON.stringify(updatedData);
    window.localStorage.setItem(DATA_KEY, toStore);
  }
};

export default ({ children }: PropsWithChildren) => {
  const {
    goes: initialGoes,
    coins: initialCoins,
    paidHints: initialPaidHints,
    isWinner: initialIsWinner,
  } = getLocalData();

  const [coins, updateCoins] = useState(initialCoins);
  const [goes, updateGoes] = useState(initialGoes);
  const [paidHints, updatePaidHints] = useState(initialPaidHints);
  const [isWinner, updateIsWinner] = useState(initialIsWinner);

  const addCoins = (amount: number) => {
    updateCoins(prevAmount => {
      const newAmount = prevAmount + amount;
      setLocalData({ coins: newAmount });
      return newAmount;
    });
  };
  const addGoes = () => {
    updateGoes(() => {
      const newAmount = 5;
      setLocalData({ goes: newAmount });
      return newAmount;
    });
  };
  const reduceCoins = (amount: number) => {
    updateCoins(prevAmount => {
      const newAmount = prevAmount - amount;
      setLocalData({ coins: newAmount });
      return newAmount;
    });
  };

  const resetHints = () => {
    updatePaidHints(() => {
      const updatedBoughtHints = [false, false, false];
      setLocalData({ paidHints: updatedBoughtHints });
      return updatedBoughtHints;
    });
  };

  const value = useMemo(() => {
    const buyHint = (index: number, price: number) => {
      if (price <= coins) {
        reduceCoins(price);
        updatePaidHints(prevBoughtHints => {
          const updatedBoughtHints = [...prevBoughtHints];
          updatedBoughtHints[index] = true;
          setLocalData({ paidHints: updatedBoughtHints });
          return updatedBoughtHints;
        });
      }
    };

    const reduceGoes = () => {
      if (goes > 0) {
        updateGoes(prevGoes => {
          const newGoes = prevGoes - 1;
          setLocalData({ goes: newGoes });
          return newGoes;
        });
      }
    };

    const updateWinnerState = (bool: boolean) => {
      updateIsWinner(() => {
        setLocalData({ isWinner: bool });
        return bool;
      });
    };

    return {
      coins,
      goes,
      addCoins,
      addGoes,
      reduceCoins,
      reduceGoes,
      paidHints,
      buyHint,
      resetHints,
      isWinner,
      updateWinnerState,
    };
  }, [coins, goes, isWinner, paidHints]);

  return (
    <LocalStorageContext.Provider value={value}>
      {children}
    </LocalStorageContext.Provider>
  );
};
