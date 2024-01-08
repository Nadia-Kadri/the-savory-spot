import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Get Routes for Webpages
app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/breakfast", (req, res) => {
  res.render("breakfast.ejs", { recipes: breakfastRecipes });
});

app.get("/dinner", (req, res) => {
  res.render("dinner.ejs");
});

app.get("/dessert", (req, res) => {
  res.render("dessert.ejs");
});

// Post Route for Form Submission
app.post("/submit", (req, res) => {
  console.log(req.body)
  res.render("submit.ejs");
});

// Server Running
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Recipe Arrays
let breakfastRecipes = [
  { 
    name: "Best Fluffy Pancakes",
    recipeType: "breakfast",
    description: "SIMPLE. EASY. QUICK. FLUFFY. The Best Fluffy Pancakes recipe you will fall in love with. ",
    ingredients: ["2 Cups All-Purpose Flour", "1/4 Cup Granulated Sugar", "4 Tsp Baking Powder", "1/4 Tsp Baking Soda", "1/2 Tsp Salt", "1 3/4 Cups Milk", "1/4 Cup Butter", "2 Tsp Vanilla Extract", "1 Large Egg"],
    instructions: `
      1. Combine together the flour, sugar, baking powder, baking soda and salt in a large-sized bowl. 
      2. In a separate bowl, whisk together the milk, slightly cooled melted butter, vanilla and egg.
      3. Slowly fold the wet ingredients into the dry ingredients. Mix together until smooth.
      4. Heat a nonstick pan or griddle over low-medium heat and add butter to lightly grease pan. Pour ¼ cup of batter onto the pan and spread out gently into a round shape.
      5. When the underside is golden and bubbles begin to appear on the surface, flip with a spatula and cook until golden. Repeat with remaining batter.
      6. Serve with honey, maple syrup, fruit, ice cream or frozen yogurt, or enjoy plain!
    `,
    img: "",
    date: Date.now()
  }
]

let dinnerRecipes = [

]

let dessertRecipes = [

]