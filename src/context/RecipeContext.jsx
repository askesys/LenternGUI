import { createContext, useContext, useEffect, useState } from "react";

const API_URL = "http://localhost:3001/recipes";

const RecipeContext = createContext();

export function RecipeProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Failed to load recipes");
        }

        const data = await response.json();
        setRecipes(Array.isArray(data) ? data : data.recipes || []);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadRecipes();
  }, []);

  const addRecipe = async (recipe) => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipe),
    });

    if (!response.ok) {
      throw new Error("Failed to create recipe");
    }

    const createdRecipe = await response.json();
    setRecipes((currentRecipes) => [...currentRecipes, createdRecipe]);
  };

  const updateRecipe = async (updated) => {
    const response = await fetch(`${API_URL}/${updated.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updated),
    });

    if (!response.ok) {
      throw new Error("Failed to update recipe");
    }

    const savedRecipe = await response.json();
    setRecipes((currentRecipes) =>
      currentRecipes.map((recipe) => (recipe.id === savedRecipe.id ? savedRecipe : recipe))
    );
  };

  const deleteRecipe = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete recipe");
    }

    setRecipes((currentRecipes) => currentRecipes.filter((recipe) => recipe.id !== id));
  };

  return (
    <RecipeContext.Provider value={{
      recipes,
      loading,
      error,
      addRecipe,
      updateRecipe,
      deleteRecipe
    }}>
      {children}
    </RecipeContext.Provider>
  );
}

export const useRecipes = () => useContext(RecipeContext);