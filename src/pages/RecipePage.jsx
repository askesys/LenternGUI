import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useRecipes } from "../context/RecipeContext";
import TopBar from "../components/TopBar";
import { useEffect, useMemo, useState } from "react";

const emptyForm = {
  title: "",
  image: "",
  calories: 0,
  portions: 1,
  time: 0,
  ingredients: "",
  steps: "",
};

const buildRecipeFromForm = (form) => ({
  ...form,
  ingredients: form.ingredients
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean),
});

export default function RecipePage() {
  const { id } = useParams();
  const location = useLocation();
  const { recipes, addRecipe, updateRecipe, deleteRecipe } = useRecipes();
  const navigate = useNavigate();
  const isNewRecipe = !id || id === "create";
  const isEditRecipe = Boolean(id) && !isNewRecipe && window.location.pathname.endsWith("/edit");

  const recipe = useMemo(
    () => recipes.find((item) => String(item.id) === String(id)),
    [recipes, id]
  );

  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (isNewRecipe) {
      setForm(emptyForm);
      return;
    }

    if (recipe) {
      setForm({
        title: recipe.title || "",
        image: recipe.image || "",
        calories: recipe.calories ?? 0,
        portions: recipe.portions ?? 1,
        time: recipe.time ?? 0,
        ingredients: Array.isArray(recipe.ingredients)
          ? recipe.ingredients.join("\n")
          : "",
        steps: recipe.steps || "",
      });
    }
  }, [isNewRecipe, recipe]);

  if (!isNewRecipe && !recipe) return <p>Not found</p>;

  const handleCreate = () => {
    addRecipe(buildRecipeFromForm(form));
    navigate("/", { replace: true });
  };

  const handleUpdate = () => {
    updateRecipe({
      ...recipe,
      ...buildRecipeFromForm(form),
    });
    navigate(`/recipe/${recipe.id}`, { replace: true });
  };

  const handleFieldChange = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleCancel = () => {
    const returnTo = location.state?.from || (isEditRecipe ? `/recipe/${recipe.id}` : "/");

    navigate(returnTo, { replace: true });
  };

  const pageTitle = isEditRecipe ? "Edit recipe" : isNewRecipe ? "Create recipe" : "Recipe";
  const submitLabel = isEditRecipe ? "Save changes" : "Create recipe";
  const submitHandler = isEditRecipe ? handleUpdate : handleCreate;

  if (isNewRecipe || isEditRecipe) {
    return (
      <>
        <TopBar showSearch={false} showAdd={false} />

        <div className="recipePage">
          <h1>{pageTitle}</h1>

          <div className="newRecipeForm">
          <label className="newRecipeField">
            <span>Title</span>
            <input
              type="text"
              value={form.title}
              onChange={(e) => handleFieldChange("title", e.target.value)}
            />
          </label>

          <label className="newRecipeField">
            <span>Image URL</span>
            <input
              type="text"
              value={form.image}
              onChange={(e) => handleFieldChange("image", e.target.value)}
            />
          </label>

          <div className="newRecipeGrid">
            <label className="newRecipeField">
              <span>Calories</span>
              <input
                type="number"
                min="0"
                value={form.calories}
                onChange={(e) => handleFieldChange("calories", Number(e.target.value))}
              />
            </label>

            <label className="newRecipeField">
              <span>Portions</span>
              <input
                type="number"
                min="1"
                value={form.portions}
                onChange={(e) => handleFieldChange("portions", Number(e.target.value))}
              />
            </label>

            <label className="newRecipeField">
              <span>Time (min)</span>
              <input
                type="number"
                min="0"
                value={form.time}
                onChange={(e) => handleFieldChange("time", Number(e.target.value))}
              />
            </label>
          </div>

          <label className="newRecipeField">
            <span>Ingredients</span>
            <textarea
              rows="6"
              value={form.ingredients}
              onChange={(e) => handleFieldChange("ingredients", e.target.value)}
              placeholder="Enter one ingredient per line"
            />
          </label>

          <label className="newRecipeField">
            <span>Steps</span>
            <textarea
              rows="6"
              value={form.steps}
              onChange={(e) => handleFieldChange("steps", e.target.value)}
            />
          </label>

            <div className="newRecipeActions">
              <button type="button" onClick={handleCancel}>
                Cancel
              </button>
              <button type="button" onClick={submitHandler}>
                {submitLabel}
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <TopBar
        showSearch={false}
        showAdd={false}
        actions={
          <>
            <button
              type="button"
              className="topbar-action-btn"
              onClick={() =>
                navigate(`/recipe/${recipe.id}/edit`, {
                  replace: true,
                  state: { from: location.pathname },
                })
              }
            >
              Edit
            </button>
            <button
              type="button"
              className="topbar-action-btn danger"
              onClick={() => {
                deleteRecipe(recipe.id);
                navigate("/");
              }}
            >
              Delete
            </button>
          </>
        }
      />

      <div className="recipePage">
        <div className="recipeDetailsCard">
          <div className="recipeHero">
            <img src={recipe.image} alt={recipe.title} />

            <div className="recipeHeaderRow">
              <h1>{recipe.title}</h1>
              <div className="recipeMetaPills">
                <span className="recipeMetaPill">{recipe.calories} kcal</span>
                <span className="recipeMetaPill">{recipe.portions} portions</span>
                <span className="recipeMetaPill">{recipe.time} min</span>
              </div>
            </div>
          </div>

          <div className="recipeContentGrid">
            <div className="recipeSection recipeSectionIngredients">
              <h3>Ingredients</h3>
              <ul>
                {recipe.ingredients.map((i, idx) => (
                  <li key={idx}>{i}</li>
                ))}
              </ul>
            </div>

            <div className="recipeSection recipeSectionSteps">
              <h3>Steps</h3>
              <p>{recipe.steps}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}