import { useMemo, useState } from "react";
import { useRecipes } from "../context/RecipeContext";
import RecipeCard from "../components/RecipeCard";
import TopBar from "../components/TopBar";
import FiltersBlock from "../components/FiltersBlock";
import ingredientsData from "../data/ingredients.json";
import { normalizeIngredients } from "../utils/ingredientHelpers";

export default function AllRecipes() {
  const { recipes, loading, error } = useRecipes();
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    ingredients: [],
    maxCalories: 0,
    maxCookingTime: 0,
  });

  const ingredientNameMap = useMemo(() => {
    return new Map(
      ingredientsData.ingredients.map((ingredient) => [ingredient.id, ingredient.name])
    );
  }, []);

  const filteredRecipes = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return recipes.filter((recipe) => {
      const searchableText = [
        recipe.title,
        recipe.steps,
        ...normalizeIngredients(recipe.ingredients),
        ...(recipe.ingredientIds || []).map(
          (ingredientId) => ingredientNameMap.get(ingredientId) || ingredientId
        ),
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = !normalizedQuery || searchableText.includes(normalizedQuery);

      const recipeIngredientIds = recipe.ingredientIds || [];
      const matchesIngredients =
        filters.ingredients.length === 0 ||
        filters.ingredients.every((ingredientId) =>
          recipeIngredientIds.includes(ingredientId)
        );

      const matchesCalories =
        Number(filters.maxCalories) === 0 ||
        recipe.calories <= Number(filters.maxCalories);

      const matchesCookingTime =
        Number(filters.maxCookingTime) === 0 ||
        recipe.time <= Number(filters.maxCookingTime);

      return (
        matchesSearch &&
        matchesIngredients &&
        matchesCalories &&
        matchesCookingTime
      );
    });
  }, [recipes, searchQuery, filters, ingredientNameMap]);

  return (
    <>
      <TopBar query={searchQuery} onQueryChange={setSearchQuery} />

      <div className="wrapper">
        <FiltersBlock onSubmit={setFilters} />
        <div className="cardsBlock">
          {loading ? (
            <p>Loading recipes...</p>
          ) : error ? (
            <p>Unable to load recipes right now. Please try again.</p>
          ) : filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))
          ) : (
            <p>No recipes match your current search or filters.</p>
          )}
        </div>
      </div>
    </>
  );
}