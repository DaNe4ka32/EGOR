import { useContext } from "react";
import { CategoriesContext } from "../contexts/CategoriesContextValue";
import type { Category } from "../contexts/CategoriesContextValue";

export const useCategories = (): Category[] => {
  const context = useContext(CategoriesContext);
  if (!context) {
    throw new Error("useCategories must be used within a CategoriesProvider");
  }
  return context;
};
