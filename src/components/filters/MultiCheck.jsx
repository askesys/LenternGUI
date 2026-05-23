import { useMemo } from "react";
import { OneCheck } from "./OneCheck";

const formatCategory = (category) =>
  category
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

export function MultiCheck({
  name,
  data,
  value = [],
  onChange,
  expandedCategories = {},
  onExpandedCategoriesChange,
}) {
  const selected = value ?? [];

  const groups = useMemo(
    () =>
      data.reduce((acc, entry) => {
        const category =
          typeof entry === "string" ? "Options" : entry.category || "Other";
        const list = acc[category] || [];
        return {
          ...acc,
          [category]: [...list, entry],
        };
      }, {}),
    [data]
  );

  const getItemValue = (entry) =>
    typeof entry === "string" ? entry : entry.id;

  const getItemLabel = (entry) =>
    typeof entry === "string" ? entry : entry.name;

  const hasSameSelection = (nextSelection) =>
    nextSelection.length === selected.length &&
    nextSelection.every((item) => selected.includes(item));

  const emitSelection = (nextSelection) => {
    if (!onChange || hasSameSelection(nextSelection)) {
      return;
    }

    onChange(nextSelection);
  };

  function toggleItem(item) {
    const nextSelection = selected.includes(item)
      ? selected.filter((x) => x !== item)
      : [...selected, item];

    emitSelection(nextSelection);
  }

  function toggleCategoryExpansion(category) {
    onExpandedCategoriesChange?.({
      ...expandedCategories,
      [category]: !expandedCategories[category],
    });
  }

  function toggleCategorySelection(category, entries) {
    const entryIds = entries.map(getItemValue);
    const allSelected = entryIds.every((id) => selected.includes(id));

    const nextSelection = allSelected
      ? selected.filter((id) => !entryIds.includes(id))
      : Array.from(new Set([...selected, ...entryIds]));

    emitSelection(nextSelection);
  }

  return (
    <>
      {Object.entries(groups).map(([category, entries]) => {
        const entryIds = entries.map(getItemValue);
        const selectedCount = entryIds.filter((id) => selected.includes(id)).length;
        const collapsed = !expandedCategories[category];
        const allSelected = selectedCount === entryIds.length;

        return (
          <div key={category} className="multi-check-group">
            <div className="category-toggle-row">
              <button
                type="button"
                className="category-toggle"
                onClick={() => toggleCategoryExpansion(category)}
              >
                <span>{formatCategory(category)}</span>
                <span className="category-meta">
                  <span className="category-count">
                    {selectedCount}/{entryIds.length}
                  </span>
                  <span className="category-chevron">
                    {collapsed ? "▸" : "▾"}
                  </span>
                </span>
              </button>
              <button
                type="button"
                className="category-toggle-btn"
                onClick={() => toggleCategorySelection(category, entries)}
                aria-label={`${allSelected ? "Clear" : "Select"} ${formatCategory(category)}`}
              >
                {allSelected ? "−" : "+"}
              </button>
            </div>

            {!collapsed && (
              <div className="category-items">
                {entries.map((entry) => {
                  const itemValue = getItemValue(entry);
                  const itemLabel = getItemLabel(entry);

                  return (
                    <OneCheck
                      key={itemValue}
                      group={name}
                      title={itemLabel}
                      checked={selected.includes(itemValue)}
                      onChange={() => toggleItem(itemValue)}
                    />
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}
