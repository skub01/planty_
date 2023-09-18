"use strict";

const {
  db,
  models: { User, Recipe, UserRecipe, Ingredient, RecipeIngredient },
} = require("../server/db");
const { faker } = require("@faker-js/faker");

async function seed() {
  await db.sync({ force: true }); 
  console.log("db synced!");

  let users = [];

  for (let i = 0; i < 100; i++) {
    let newUser = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: "123",
    };
    users.push(newUser);
  }

  await Promise.all(users.map((user) => User.create(user)));

  const userRecipeList = await Promise.all([
    UserRecipe.create({ 
    userId: 1, recipeId: 2}),
    UserRecipe.create({ 
      userId: 2, recipeId: 3}),    
      UserRecipe.create({ 
        userId: 5, recipeId: 1}),
    ]); 

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

if (module === require.main) {
  runSeed();
}


module.exports = seed;
