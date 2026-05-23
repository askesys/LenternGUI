import { useState, useEffect, useMemo } from "react";
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
  const [selected, setSelected] = useState(value);

  useEffect(() => {
    setSelected(value);
  }, [value]);

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

  function toggleItem(item) {
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]
    );
  }

  function toggleCategoryExpansion(category) {
    onExpandedCategoriesChange?.({
      ...expandedCategories,
      [category]: !expandedCategories[category],
    });
  }

  useEffect(() => {
    onChange(selected);
  }, [selected, onChange]);

  return (
    <>
      {Object.entries(groups).map(([category, entries]) => {
        const entryIds = entries.map(getItemValue);
        const selectedCount = entryIds.filter((id) => selected.includes(id)).length;
        const collapsed = !expandedCategories[category];

        return (
          <div key={category} className="multi-check-group">
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
