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
  console.log("this worked");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
