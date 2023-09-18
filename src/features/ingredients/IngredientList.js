export const ingredients = [
  { name: "Black Beans", category: "Legumes" },
  { name: "Chickpeas", category: "Legumes" },
  { name: "Kidney Beans", category: "Legumes" },
  { name: "Lentils", category: "Legumes" },
  { name: "Tempeh", category: "Legumes" },
  { name: "Tofu", category: "Legumes" },
  { name: "White Beans", category: "Legumes" },

  { name: "Almond Flour", category: "Baking" },
  { name: "Chocolate Chips", category: "Baking" },
  { name: "Cocoa Powder", category: "Baking" },
  { name: "Coconut Flakes", category: "Baking" },
  { name: "Coconut Flour", category: "Baking" },
  { name: "Flour", category: "Baking" },
  { name: "Vanilla Extract", category: "Baking" },

  { name: "Cereal", category: "Grains" },
  { name: "Couscous", category: "Grains" },
  { name: "Oatmeal", category: "Grains" },
  { name: "Pasta", category: "Grains" },
  { name: "Quinoa", category: "Grains" },
  { name: "Rice", category: "Grains" },
  { name: "Spaghetti", category: "Grains" },

  { name: "Bell Pepper", category: "Vegetables" },
  { name: "Broccoli", category: "Vegetables" },
  { name: "Carrots", category: "Vegetables" },
  { name: "Cauliflower", category: "Vegetables" },
  { name: "Corn", category: "Vegetables" },
  { name: "Kale", category: "Vegetables" },
  { name: "Onion", category: "Vegetables" },
  { name: "Potatoes", category: "Vegetables" },
  { name: "Spinach", category: "Vegetables" },
  { name: "Tomatoes", category: "Vegetables" },
  { name: "Zucchini", category: "Vegetables" },

  { name: "Almonds", category: "Nuts" },
  { name: "Cashews", category: "Nuts" },
  { name: "Chia Seeds", category: "Nuts" },
  { name: "Peanut Butter", category: "Nuts" },
  { name: "Peanuts", category: "Nuts" },
  { name: "Pecans", category: "Nuts" },
  { name: "Pistachios", category: "Nuts" },
  { name: "Pumpkin Seeds", category: "Nuts" },
  { name: "Sunflower Seeds", category: "Nuts" },

  { name: "Apple", category: "Fruits" },
  { name: "Avocado", category: "Fruits" },
  { name: "Banana", category: "Fruits" },
  { name: "Cherry", category: "Fruits" },
  { name: "Grapes", category: "Fruits" },
  { name: "Lemon", category: "Fruits" },
  { name: "Lime", category: "Fruits" },
  { name: "Mango", category: "Fruits" },
  { name: "Orange", category: "Fruits" },
  { name: "Pear", category: "Fruits" },

  { name: "Basil", category: "Herbs" },
  { name: "Cilantro", category: "Herbs" },
  { name: "Green Onion", category: "Herbs" },
  { name: "Mint", category: "Herbs" },
  { name: "Oregano", category: "Herbs" },
  { name: "Parsley", category: "Herbs" },
  { name: "Rosemary", category: "Herbs" },
  { name: "Sage", category: "Herbs" },
  { name: "Thyme", category: "Herbs" },
];

export const ingredientCategories = [
  {
    category: "Legumes",
    ingredients: ingredients.filter(
      (ingredient) => ingredient.category === "Legumes"
    ),
  },
  {
    category: "Grains",
    ingredients: ingredients.filter(
      (ingredient) => ingredient.category === "Grains"
    ),
  },
  {
    category: "Vegetables",
    ingredients: ingredients.filter(
      (ingredient) => ingredient.category === "Vegetables"
    ),
  },
  {
    category: "Fruits",
    ingredients: ingredients.filter(
      (ingredient) => ingredient.category === "Fruits"
    ),
  },
  {
    category: "Nuts/Seeds",
    ingredients: ingredients.filter(
      (ingredient) => ingredient.category === "Nuts"
    ),
  },
  {
    category: "Herbs",
    ingredients: ingredients.filter(
      (ingredient) => ingredient.category === "Herbs"
    ),
  },
  {
    category: "Baking",
    ingredients: ingredients.filter(
      (ingredient) => ingredient.category === "Baking"
    ),
  },
];
