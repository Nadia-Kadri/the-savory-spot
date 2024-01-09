import express from "express";
import methodOverride from "method-override";
import bodyParser from "body-parser";
import { format } from "date-fns";

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method')); // override with POST having ?_method=DELETE
app.use(express.static("public"));

// Get Routes for Webpages
app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/breakfast", (req, res) => {
  const breakfastRecipes = recipes.filter(recipe => recipe.recipeType === "breakfast");
  res.render("recipes.ejs", { recipes: breakfastRecipes });
});

app.get("/dinner", (req, res) => {
  const dinnerRecipes = recipes.filter(recipe => recipe.recipeType === "dinner");
  res.render("recipes.ejs", { recipes: dinnerRecipes });
});

app.get("/dessert", (req, res) => {
  const dessertRecipes = recipes.filter(recipe => recipe.recipeType === "dessert");
  res.render("recipes.ejs", { recipes: dessertRecipes });
});

app.get("/:recipe", (req, res) => {
  const recipe = recipes.find(recipe => recipe.routeName === req.params.recipe);
  res.render("recipe.ejs", { recipe: recipe });
});

// Post Route for Form Submission
app.post("/submit", (req, res) => {
  handleFormSubmission(req.body);
  res.render("submit.ejs", { recipe: req.body.name, recipeType: req.body.recipeType });
});

// Delete Route to Delete Recipe from Recipes Array
app.delete("/delete/:recipe", (req, res) => {
  res.redirect("/" + req.body.recipeType)
});

// Server Running
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Process User Input and Push to Recipe Array
function handleFormSubmission(formInput) {
  let recipe = {
    name: formInput.name,
    routeName: formInput.name.replace(/\s+/g, "").toLowerCase(),
    recipeType: formInput.recipeType,
    description: formInput.description,
    ingredients: formInput.ingredients.split(", "),
    instructions: formInput.instructions,
    date: format(Date.now(), "MMM do, yyyy")
  }

  recipes.push(recipe);
}

// Recipes Array
let recipes = [
  { 
    name: "Best Fluffy Pancakes",
    routeName: "bestfluffypancakes",
    recipeType: "breakfast",
    description: "Easy. Quick. Fluffy. The Best Fluffy Pancakes recipe you will fall in love with.",
    ingredients: ["2 Cups All-Purpose Flour", "1/4 Cup Granulated Sugar", "4 Tsp Baking Powder", "1/4 Tsp Baking Soda", "1/2 Tsp Salt", "1 3/4 Cups Milk", "1/4 Cup Butter", "2 Tsp Vanilla Extract", "1 Large Egg"],
    instructions: `1. Combine together the flour, sugar, baking powder, baking soda and salt in a large-sized bowl. 
      2. In a separate bowl, whisk together the milk, slightly cooled melted butter, vanilla and egg.
      3. Slowly fold the wet ingredients into the dry ingredients. Mix together until smooth.
      4. Heat a nonstick pan or griddle over low-medium heat and add butter to lightly grease pan. Pour ¼ cup of batter onto the pan and spread out gently into a round shape.
      5. When the underside is golden and bubbles begin to appear on the surface, flip with a spatula and cook until golden. Repeat with remaining batter.
      6. Serve with honey, maple syrup, fruit, ice cream or frozen yogurt, or enjoy plain!`,
    date: format(1704700000000, "MMM do, yyyy")
  },
  {
    name: "Baked Ziti",
    routeName: "bakedziti",
    recipeType: "dinner",
    description: "Layers of tender ziti noodles, with zesty meat sauce and a creamy ricotta cheese layer",
    ingredients: ["1lb Ground Beef", "1 Small Onion", "28oz Pasta Sauce", "14oz Diced Tomatoes", "2 Tsp Italian Seasoning", "1/2 Cup Water", "16oz Ziti", "15oz Ricotta Cheese", "2 Tbsp Parsley", "1 Egg", "2 Cups Mozzarella", "1/4 Cup Parmesan"],
    instructions: `1. Preheat oven to 375°F
      2. Brown ground sausage and onion breaking up until the sausage is fairly fine. Drain any fat.
      3. Add in Italian seasoning, water, tomatoes and pasta sauce. Simmer 10-15 minutes or until thickened.
      4. Meanwhile, boil ziti in salted water until al dente. Drain and rinse.
      5. In a small bowl, mix ricotta, egg, parsley, 1 cup mozzarella cheese, and parmesan cheese.
      6. Add a thin layer (about 1 cup) of sauce to the bottom of a greased 9x13 pan. Layer half of the ziti, top with all of the ricotta mixture, and half of the sauce.
      7. Add remaining ziti, remaining sauce, and top with remaining mozzarella cheese.
      8. Bake 25-30 minutes or until golden and bubbly.`,
    date: format(1704200000000, "MMM do, yyyy")
  },
  {
    name: "Chocolate Chip Cookies",
    routeName: "chocolatechipcookies",
    recipeType: "dessert",
    description: "Amazingly delicious and doughy. A chocolate chip cookie that turns out perfect every single time! ",
    ingredients: ["1 Cup Butter", "1 Cup Granulated Sugar", "1 Cup Light Brown Sugar", "2 Tsp Vanilla Extract", "2 Large Eggs", "3 Cups All-Purpose Flour", "1 Tsp Baking Soda", "1/2 Tsp Baking Powder", "1 Tsp Sea Salt", "2 Cups Chocolate Chips"],
    instructions: `1. Preheat oven to 375 degrees F. Line three baking sheets with parchment paper and set aside.
      2. In a medium bowl mix flour, baking soda, baking powder and salt. Set aside.
      3. Cream together butter and sugars until combined.
      4. Beat in eggs and vanilla until light (about 1 minute).
      5. Mix in the dry ingredients until combined.
      6. Add chocolate chips and mix well.
      7. Roll 2-3 Tablespoons (depending on how large you like your cookies) of dough at a time into balls and place them evenly spaced on your prepared cookie sheets.
      8. Bake in preheated oven for approximately 8-10 minutes. Take them out when they are just barely starting to turn brown.
      9. Let them sit on the baking pan for 2 minutes before removing to cooling rack.`,
    date: format(1704400000000, "MMM do, yyyy")
  }
];