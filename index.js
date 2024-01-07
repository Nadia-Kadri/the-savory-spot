import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs")
});

app.get("/breakfast", (req, res) => {
  res.render("breakfast.ejs")
});

app.get("/dinner", (req, res) => {
  res.render("dinner.ejs")
});

app.get("/dessert", (req, res) => {
  res.render("dessert.ejs")
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});