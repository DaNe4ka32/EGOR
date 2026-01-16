import { createContext } from "react";

export interface Category {
  name: string;
  icon: string;
}

export const CategoriesContext = createContext<Category[] | undefined>(
  undefined
);
