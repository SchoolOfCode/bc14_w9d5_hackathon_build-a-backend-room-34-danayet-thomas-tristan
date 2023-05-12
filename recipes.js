import fs from "node:fs/promises";
import { v4 as uuidv4 } from "uuid";

const fileName = "recipes.json";

// GET ALL RECIPES
export async function getRecipes() {
  try {
    const data = await fs.readFile(fileName); // Reading the JSON and putting it into a data variable
    const recipes = JSON.parse(data); // Process the data, put it into a variable named "recipes"
    return recipes; // Give us the processed recipes
  } catch (error) {
    console.log("Could not get recipes", error);
  }
}

// GET A RECIPE BY ID
export async function getRecipeByID(id) {
  try {
    const data = await fs.readFile(fileName);
    const recipes = JSON.parse(data); // same as before
    const recipe = recipes.find((recipe) => recipe.id === id); // the variable "recipe" is the result of whatever the .find method returns
    return recipe;
  } catch (error) {
    console.log("Could not get recipe by ID", error);
  }
}

// CREATE A RECIPE
export async function createRecipe(newRecipe) {
  try {
    const data = await fs.readFile(fileName);
    const recipes = JSON.parse(data);
    const recipeWithId = { id: uuidv4(), ...newRecipe };
    recipes.push(recipeWithId);
    await fs.writeFile(fileName, JSON.stringify(recipes));
    return recipeWithId;
  } catch (error) {
    console.log("Could not create new recipe", error);
  }
}

// UPDATE A RECIPE BY ID
export async function updateRecipeByID(id, updatedRecipe) {
  try {
    const data = await fs.readFile(fileName);
    const recipes = JSON.parse(data);
    const index = recipes.findIndex((recipe) => recipe.id === id);
    const recipeToUpdate = { id, ...updatedRecipe };
    recipes[index] = recipeToUpdate;
    await fs.writeFile(fileName, JSON.stringify(recipes));
    return recipeToUpdate;
  } catch (error) {
    console.log("Could not update Recipe", error);
  }
}

// DELETE A RECIPE BY ID
export async function deleteRecipeByID(id) {
  try {
    const data = await fs.readFile(fileName);
    const recipes = JSON.parse(data);
    const filteredRecipes = recipes.filter((recipe) => recipe.id !== id);
    await fs.writeFile(fileName, JSON.stringify(filteredRecipes));
    return filteredRecipes;
  } catch (error) {
    console.log("Could not delete recipe", error);
  }
}
