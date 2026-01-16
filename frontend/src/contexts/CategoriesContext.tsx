import React from "react";
import { CategoriesContext } from "./CategoriesContextValue";
import type { Category } from "./CategoriesContextValue";

const categories: Category[] = [
  { name: "Спецодежда", icon: "👔" },
  { name: "Спецобувь", icon: "👢" },
  { name: "СИЗ", icon: "🛡️" },
  { name: "Защитная", icon: "🦺" },
  { name: "Камуфляж", icon: "🎖️" },
  { name: "Медицина", icon: "🏥" },
  { name: "Перчатки", icon: "🧤" },
  { name: "Хоз товары", icon: "🧹" },
];

export const CategoriesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <CategoriesContext.Provider value={categories}>
      {children}
    </CategoriesContext.Provider>
  );
};
