const recipes = [
  {
    id: 1,
    title: "Omelette",
    image: "/recipe_images/omelette-without-eggs.jpg",
    calories: 640,
    portions: 4,
    time: 15,
    ingredients: [
      { name: "Eggs", amount: 3, measure: "pcs" },
      { name: "Salt", amount: 1, measure: "pinch" },
      { name: "Pepper", amount: 1, measure: "pinch" },
    ],
    ingredientIds: ["egg", "salt", "pepper"],
    steps:
      "1. Beat eggs\n2. Heat pan\n3. Pour mixture\n4. Cook until golden",
  },
  {
    id: 2,
    title: "Pancakes",
    image: "/recipe_images/pancakes.jpg",
    calories: 520,
    portions: 2,
    time: 20,
    ingredients: [
      { name: "Flour", amount: 200, measure: "g" },
      { name: "Milk", amount: 250, measure: "ml" },
      { name: "Eggs", amount: 2, measure: "pcs" },
      { name: "Sugar", amount: 2, measure: "tbsp" },
    ],
    ingredientIds: ["flour", "milk", "egg", "sugar"],
    steps:
      "1. Mix ingredients\n2. Heat pan\n3. Pour batter\n4. Flip when bubbles appear",
  },
  {
    id: 3,
    title: "Chocolate Cake",
    image: "/recipe_images/chocolate-cake.jpg",
    calories: 900,
    portions: 6,
    time: 60,
    ingredients: [
      { name: "Flour", amount: 200, measure: "g" },
      { name: "Cacao", amount: 50, measure: "g" },
      { name: "Sugar", amount: 150, measure: "g" },
      { name: "Butter", amount: 150, measure: "g" },
      { name: "Eggs", amount: 3, measure: "pcs" },
    ],
    ingredientIds: ["flour", "cacao", "sugar", "butter", "egg"],
    steps:
      "1. Mix dry ingredients\n2. Add wet ingredients\n3. Bake at 180°C for 40 min",
  },
];

export default recipes;