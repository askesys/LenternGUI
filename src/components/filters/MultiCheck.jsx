import { useState, useEffect, useMemo } from "react";
import { OneCheck } from "./OneCheck";

const formatCategory = (category) =>
  category
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

export function MultiCheck({ name, data, value = [], onChange }) {
  const [selected, setSelected] = useState(value);
  const [expandedCategories, setExpandedCategories] = useState({});

  useEffect(() => {
    setSelected(value);
  }, [value]);

  useEffect(() => {
    const categories = Array.from(
      new Set(
        data.map((entry) =>
          typeof entry === "string" ? "Options" : entry.category || "Other"
        )
      )
    );

    setExpandedCategories((prev) =>
      categories.reduce(
        (acc, category) => ({
          ...acc,
          [category]: prev[category] ?? true,
        }),
        {}
      )
    );
  }, [data]);

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

  function toggleCategory(category, entries) {
    const entryIds = entries.map(getItemValue);
    const allSelected = entryIds.every((id) => selected.includes(id));

    setSelected((prev) => {
      if (allSelected) {
        return prev.filter((id) => !entryIds.includes(id));
      }

      const next = new Set(prev);
      entryIds.forEach((id) => next.add(id));
      return Array.from(next);
    });
  }

  function toggleCategoryExpansion(category) {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  }

  useEffect(() => {
    onChange(selected);
  }, [selected, onChange]);

  return (
    <>
      {Object.entries(groups).map(([category, entries]) => {
        const entryIds = entries.map(getItemValue);
        const selectedCount = entryIds.filter((id) => selected.includes(id)).length;
        const allSelected = selectedCount === entryIds.length;
        const collapsed = !expandedCategories[category];

        return (
          <div key={category} className="multi-check-group">
            <div className="category-header">
              <button
                type="button"
                className="category-toggle"
                onClick={() => toggleCategoryExpansion(category)}
              >
                <span>{formatCategory(category)}</span>
                <span className="category-count">
                  {selectedCount}/{entryIds.length}
                </span>
                <span className="category-chevron">
                  {collapsed ? "+" : "−"}
                </span>
              </button>
              <button
                type="button"
                className={`category-select-all ${allSelected ? "selected" : ""}`}
                onClick={() => toggleCategory(category, entries)}
              >
                {allSelected ? "Deselect all" : "Select all"}
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
