import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecipes } from "../context/RecipeContext";
import ConfirmDialog from "./ConfirmDialog";

export default function RecipeCard({ recipe }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { deleteRecipe } = useRecipes();
  const [showMenu, setShowMenu] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCardClick = () => {
    navigate(`/recipe/${recipe.id}`);
  };

  return (
    <>
    {showConfirm && (
      <ConfirmDialog
        message="Are you sure you want to delete this recipe?"
        onConfirm={() => {
          setShowConfirm(false);
          deleteRecipe(recipe.id);
        }}
        onCancel={() => setShowConfirm(false)}
      />
    )}
    <div className="recipe-card-modern" onClick={handleCardClick}>

      <div className="recipe-image-wrapper">
        <img src={recipe.image} alt={recipe.title} />
      </div>

      <div className="recipe-body">
        <div className="recipe-header">
          <h5>{recipe.title}</h5>

          <div className="popup-menu-wrapper" ref={menuRef}>
            <button
              type="button"
              className="menu-btn"
              aria-expanded={showMenu}
              onClick={(event) => {
                event.stopPropagation();
                setShowMenu((current) => !current);
              }}
            >
              ⋮
            </button>

            {showMenu && (
              <div className="popup-menu">
                <button
                  type="button"
                  className="popup-menu-item"
                  onClick={(event) => {
                    event.stopPropagation();
                    setShowMenu(false);
                    navigate(`/recipe/${recipe.id}/edit`, {
                      replace: true,
                      state: { from: location.pathname },
                    });
                  }}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="popup-menu-item text-danger"
                  onClick={(event) => {
                    event.stopPropagation();
                    setShowMenu(false);
                    setShowConfirm(true);
                  }}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="recipe-meta">
          <span>{recipe.calories} kcal</span>
          <span>{recipe.portions} portions</span>
          <span>{recipe.time} min</span>
        </div>
      </div>
    </div>
    </>
  );
}