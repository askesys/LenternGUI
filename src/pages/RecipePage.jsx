import { useParams, useNavigate } from "react-router-dom";
import { useRecipes } from "../context/RecipeContext";
import { useState } from "react";

export default function RecipePage() {
  const { id } = useParams();
  const { recipes, updateRecipe, deleteRecipe } = useRecipes();
  const navigate = useNavigate();

  const recipe = recipes.find(r => r.id == id);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState(recipe);

  if (!recipe) return <p>Not found</p>;

  const handleSave = () => {
    updateRecipe(form);
    setEditMode(false);
  };

  return (
    <div className="recipePage">
      <img src={recipe.image} />

      {editMode ? (
        <input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
      ) : (
        <h1>{recipe.title}</h1>
      )}

      <p>Calories: {recipe.calories}</p>
      <p>Portions: {recipe.portions}</p>
      <p>Time: {recipe.time} min</p>

      <h3>Ingredients</h3>
      <ul>
        {recipe.ingredients.map((i, idx) => (
          <li key={idx}>{i}</li>
        ))}
      </ul>

      <h3>Steps</h3>
      <p>{recipe.steps}</p>

      <button onClick={() => setEditMode(!editMode)}>
        Edit
      </button>

      {editMode && <button onClick={handleSave}>Save</button>}

      <button
        onClick={() => {
          deleteRecipe(recipe.id);
          navigate("/");
        }}
      >
        Delete
      </button>
    </div>
  );
}