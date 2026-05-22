const recipes = [
  {
    id: 1,
    title: "Omelette",
    image: "/recipe_images/omelette-without-eggs.jpg",
    calories: 640,
    portions: 4,
    time: 15,
    ingredients: ["Eggs", "Salt", "Pepper"],
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
    ingredients: ["Flour", "Milk", "Eggs", "Sugar"],
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
    ingredients: ["Flour", "Cacao", "Sugar", "Butter", "Eggs"],
    steps:
      "1. Mix dry ingredients\n2. Add wet ingredients\n3. Bake at 180°C for 40 min",
  },
];

export default recipes;