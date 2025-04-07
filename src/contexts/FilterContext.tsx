"use client";

import { TFormatEnum } from "@/types/constants";
import { createContext, useState, ReactNode } from "react";

type FilterContextType = {
  format: TFormatEnum;
  setFormat: (format: TFormatEnum) => void;
};

export const FilterContext = createContext<FilterContextType | undefined>(
  undefined
);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [format, setFormat] = useState<TFormatEnum>("");

  return (
    <FilterContext.Provider value={{ format, setFormat }}>
      {children}
    </FilterContext.Provider>
  );
}
