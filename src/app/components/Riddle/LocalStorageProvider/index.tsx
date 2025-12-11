import React, {
  createContext,
  PropsWithChildren,
  useMemo,
  useState,
} from 'react';

export type LocalStorage = {
  goes: number;
  coins: number;
  paidFor: boolean[];
  addCoins: (amount: number) => void;
  addGoes: () => void;
  reduceCoins: (amount: number) => void;
  reduceGoes: () => void;
  updatePaidFor: React.Dispatch<React.SetStateAction<boolean[]>>;
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
    };
  }

  return {
    goes: 5,
    coins: 0,
  };
};

const setLocalData = ({ goes, coins }: { goes?: number; coins?: number }) => {
  const { goes: localGoes, coins: localCoins } = getLocalData();
  const updatedData = {
    goes: goes ?? localGoes,
    coins: coins ?? localCoins,
  };
  const toStore = JSON.stringify(updatedData);
  window.localStorage.setItem(DATA_KEY, toStore);
};

export default ({ children }: PropsWithChildren) => {
  const { goes: initialGoes, coins: initialCoins } = getLocalData();

  const [coins, updateCoins] = useState(initialCoins);
  const [goes, updateGoes] = useState(initialGoes);
  const [paidFor, updatePaidFor] = useState([false, false, false]);

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
  const reduceGoes = () => {
    updateGoes(prevGoes => {
      const newGoes = prevGoes - 1;
      setLocalData({ goes: newGoes });
      return newGoes;
    });
  };

  // TO DO: Reset goes during transition period.
  // TO DO: Reset paid for.

  const value = useMemo(
    () => ({
      coins,
      goes,
      addCoins,
      addGoes,
      reduceCoins,
      reduceGoes,
      paidFor,
      updatePaidFor,
    }),
    [coins, goes, paidFor],
  );

  return (
    <LocalStorageContext.Provider value={value}>
      {children}
    </LocalStorageContext.Provider>
  );
};
