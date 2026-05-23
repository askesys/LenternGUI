import { useNavigate } from "react-router-dom";

export default function TopBar({
  query = "",
  onQueryChange = () => {},
  showSearch = true,
  showAdd = true,
  actions = null,
}) {
  const navigate = useNavigate();

  const handleCreate = () => {
    navigate("/recipe/create");
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <div className="topbar">
      <div className="topbar-brand">
        <button
          type="button"
          className="topbar-logo"
          onClick={handleLogoClick}
          aria-label="Go to all recipes"
        >
          Lentern
        </button>
      </div>

      {showSearch && (
        <input
          className="search"
          placeholder="Search recipes..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
        />
      )}

      <div className="topbar-actions">
        {actions}
        {showAdd && (
          <button className="addBtn" onClick={handleCreate}>
            + Create recipe
          </button>
        )}
      </div>
    </div>
  );
}