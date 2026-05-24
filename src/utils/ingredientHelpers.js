export const knownMeasures = [
  "tbsp",
  "tsp",
  "cup",
  "cups",
  "g",
  "kg",
  "ml",
  "l",
  "pcs",
  "pinch",
  "clove",
  "slice",
];

export function normalizeIngredient(ingredient) {
  if (!ingredient) {
    return "";
  }

  if (typeof ingredient === "string") {
    return ingredient.trim();
  }

  if (typeof ingredient === "object") {
    const name = ingredient.name?.trim() || "";

    if (!name) {
      return "";
    }

    const amount = ingredient.amount === undefined || ingredient.amount === null
      ? ""
      : String(ingredient.amount).trim();
    const measure = ingredient.measure?.trim() || "";

    if (amount && measure) {
      return `${amount} ${measure} ${name}`.trim();
    }

    if (amount) {
      return `${amount} ${name}`.trim();
    }

    return name;
  }

  return String(ingredient).trim();
}

export function normalizeIngredients(ingredients = []) {
  if (!Array.isArray(ingredients)) {
    return [];
  }

  return ingredients
    .map(normalizeIngredient)
    .filter(Boolean);
}

export function formatIngredientDisplay(ingredient) {
  if (!ingredient) {
    return "";
  }

  if (typeof ingredient === "string") {
    return ingredient.trim();
  }

  if (typeof ingredient === "object") {
    const name = ingredient.name?.trim() || "";

    if (!name) {
      return "";
    }

    const amount = ingredient.amount === undefined || ingredient.amount === null
      ? ""
      : String(ingredient.amount).trim();
    const measure = ingredient.measure?.trim() || "";

    if (amount && measure) {
      return `${amount} ${measure} ${name}`.trim();
    }

    if (amount) {
      return `${amount} ${name}`.trim();
    }

    if (measure) {
      return `${measure} ${name}`.trim();
    }

    return name;
  }

  return String(ingredient).trim();
}

export function serializeIngredients(ingredients = []) {
  return normalizeIngredients(ingredients).join("\n");
}

export function parseIngredientLine(line) {
  const trimmed = line.trim();

  if (!trimmed) {
    return null;
  }

  const amountMatch = trimmed.match(/^([\d./]+)\s+(.*)$/);

  if (!amountMatch) {
    return { name: trimmed, amount: "", measure: "" };
  }

  const [, amount, rest] = amountMatch;
  const parts = rest.split(/\s+/).filter(Boolean);
  const firstPart = parts[0]?.toLowerCase();

  if (firstPart && knownMeasures.includes(firstPart)) {
    return {
      name: parts.slice(1).join(" "),
      amount,
      measure: firstPart,
    };
  }

  return {
    name: rest,
    amount,
    measure: "",
  };
}

export function buildIngredientsFromForm(value = []) {
  if (Array.isArray(value)) {
    return value
      .map((ingredient) => {
        if (!ingredient) {
          return null;
        }

        if (typeof ingredient === "string") {
          return parseIngredientLine(ingredient);
        }

        const name = ingredient.name?.trim() || "";

        if (!name && !ingredient.amount && !ingredient.measure) {
          return null;
        }

        return {
          name,
          amount: ingredient.amount === undefined || ingredient.amount === null
            ? ""
            : String(ingredient.amount).trim(),
          measure: ingredient.measure?.trim() || "",
        };
      })
      .filter(Boolean);
  }

  return value
    .split("\n")
    .map(parseIngredientLine)
    .filter(Boolean);
}
