import { useState } from "react";
import { useRecipes } from "../context/RecipeContext";
import { useNavigate } from "react-router-dom";

export default function TopBar() {
  const { addRecipe } = useRecipes();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

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
        onChange={(e) => setQuery(e.target.value)}
      />

      <button className="addBtn" onClick={handleAdd}>
        + Add recipe
      </button>
    </div>
  );
}