import { useRecipes } from "../context/RecipeContext";
import RecipeCard from "../components/RecipeCard";
import TopBar from "../components/TopBar";
import FiltersBlock from "../components/FiltersBlock";

export default function AllRecipes() {
  const { recipes } = useRecipes();

  return (
    <>
      <TopBar />

      <div className="wrapper">
        <FiltersBlock onSubmit={(filters) => {
          // Handle filter submission
        }} />
        <div className="cardsBlock">
          {recipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
    </>
  );
}