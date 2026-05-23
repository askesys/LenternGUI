import { useRecipes } from "../context/RecipeContext";

export default function TopBar({ query, onQueryChange }) {
  const { addRecipe } = useRecipes();

  const handleAdd = () => {
    const newRecipe = {
      id: Date.now(),
      title: "New Recipe",
      image: "/recipe_images/omelette-without-eggs.jpg",
      calories: 0,
      portions: 1,
      time: 0,
      ingredients: [],
      steps: "Write steps..."
    };

    addRecipe(newRecipe);
  };

  return (
    <div className="topbar">
      <input
        className="search"
        placeholder="Search recipes..."
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
      />

      <button className="addBtn" onClick={handleAdd}>
        + Add recipe
      </button>
    </div>
  );
}