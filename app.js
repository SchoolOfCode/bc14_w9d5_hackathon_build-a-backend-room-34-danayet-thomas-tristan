import express from "express";

import {
  getRecipes,
  getRecipeByID,
  createRecipe,
  updateRecipeByID,
  deleteRecipeByID,
} from "./recipes.js";

const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(express.json());

app.get("/recipes", async (req, res) => {
  const displayRecipes = await getRecipes();
  res.send(displayRecipes);
  console.log("found recipes");
});

app.get("/recipes/:id", async (req, res) => {
  const id = req.params.id;
  const displayRecipeById = await getRecipeByID(id);
  console.log(displayRecipeById);
  res.send(displayRecipeById);
  console.log("found recipe by id");
});

app.post("/recipes", async (req, res) => {
  const newRecipe = req.body;
  const addNewRecipe = await createRecipe(newRecipe);
  res.send(addNewRecipe);
  console.log("New recipe added");
});

app.patch("/recipes/:id", async (req, res) => {
  const id = req.params.id;
  const updatedRecipe = req.body;
  const finalUpdateRecipe = await updateRecipeByID(id, updatedRecipe);
  res.send(finalUpdateRecipe);
  console.log("Recipe updated");
});

app.delete("/recipes/:id", async (req, res) => {
  const id = req.params.id;
  const deleteRecipe = await deleteRecipeByID(id);
  res.send(deleteRecipe);
  console.log("Recipe deleted");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
