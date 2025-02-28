import React, { createContext, ReactNode, useContext, useState } from "react";

type DayContextType = {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
};

// Context作成（初期値は空）
const DayContext = createContext<DayContextType | undefined>(undefined);

export const DayProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [date, setDate] = useState(new Date());

  return (
    // DayContext.ProviderはReactのContextを提供するコンポーネント。
    // value={{ date, setDate }} → date（現在の日付）とsetDate（日付を更新する関数）をコンテキストの値として提供
    // {children} → このProviderに囲まれたコンポーネントがdateとsetDateを使える
    <DayContext.Provider value={{ date, setDate}}>
      {children}
    </DayContext.Provider>
  );
};

// Contextを使うためのカスタムフック
// useDay() を呼び出したコンポーネントでdateとsetDateを使える

export const useDay = () => {
  const context = useContext(DayContext);
  if (!context) {
    throw new Error('DayProviderが見つかりません');
  }
  return context;
};