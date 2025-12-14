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
};

export const LocalStorageContext = createContext<LocalStorage>(
  {} as LocalStorage,
);

const DATA_KEY = 'ws_bbc_riddle';

const getLocalData = () => {
  const localStorageData = window.localStorage[DATA_KEY];
  if (localStorageData) {
    const parsedData = JSON.parse(localStorageData);
    return {
      goes: parsedData.goes ?? 5,
      coins: parsedData.coins ?? 0,
      paidHints: parsedData.paidHints ?? [false, false, false],
    };
  }

  return {
    goes: 5,
    coins: 0,
    paidHints: [false, false, false],
  };
};

const setLocalData = ({
  goes,
  coins,
  paidHints,
}: {
  goes?: number;
  coins?: number;
  paidHints?: boolean[];
}) => {
  const {
    goes: localGoes,
    coins: localCoins,
    paidHints: localPaidHints,
  } = getLocalData();
  const updatedData = {
    goes: goes ?? localGoes,
    coins: coins ?? localCoins,
    paidHints: paidHints ?? localPaidHints,
  };
  const toStore = JSON.stringify(updatedData);
  window.localStorage.setItem(DATA_KEY, toStore);
};

export default ({ children }: PropsWithChildren) => {
  const {
    goes: initialGoes,
    coins: initialCoins,
    paidHints: initialPaidHints,
  } = getLocalData();

  const [coins, updateCoins] = useState(initialCoins);
  const [goes, updateGoes] = useState(initialGoes);
  const [paidHints, updatePaidHints] = useState(initialPaidHints);

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

  // TO DO: Reset goes during transition period.
  // TO DO: Reset paid for.
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
    };
  }, [coins, goes, paidHints]);

  return (
    <LocalStorageContext.Provider value={value}>
      {children}
    </LocalStorageContext.Provider>
  );
};
