import { createContext, useContext, useState } from "react";
import initialRecipes from "../data/recipes";

const RecipeContext = createContext();

export function RecipeProvider({ children }) {
  const [recipes, setRecipes] = useState(initialRecipes);

  const addRecipe = (recipe) => {
    setRecipes([...recipes, { ...recipe, id: Date.now() }]);
  };

  const updateRecipe = (updated) => {
    setRecipes(recipes.map(r => r.id === updated.id ? updated : r));
  };

  const deleteRecipe = (id) => {
    setRecipes(recipes.filter(r => r.id !== id));
  };

  return (
    <RecipeContext.Provider value={{
      recipes,
      addRecipe,
      updateRecipe,
      deleteRecipe
    }}>
      {children}
    </RecipeContext.Provider>
  );
}

export const useRecipes = () => useContext(RecipeContext);