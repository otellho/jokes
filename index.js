import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));

// Main route
app.get("/", async (req, res) => {
    try {
      const result = await axios.get("https://v2.jokeapi.dev/joke/Programming,Dark,Pun?type=twopart");
      
      if (result.data && result.data.setup && result.data.delivery) {
        res.render("index.ejs", {
          setup: result.data.setup,
          punchline: result.data.delivery,
        });
      } else {
        res.render("index.ejs", {
          setup: "No setup found.",
          punchline: "No punchline found.",
        });
      }
    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        res.status(500).send("An error occurred while fetching the joke.");
      }
  });

// API route to get a new joke
app.get("/get-joke", async (req, res) => {
  try {
    const result = await axios.get("https://v2.jokeapi.dev/joke/Miscellaneous,Dark,Pun?blacklistFlags=religious,racist,sexist,explicit&type=twopart");

    if (result.data && result.data.setup && result.data.delivery) {
      res.json({
        setup: result.data.setup,
        punchline: result.data.delivery
      });
    } else {
      res.json({
        setup: "No setup found.",
        punchline: "No punchline found."
      });
    }
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    res.status(500).json({ error: "An error occurred while fetching the joke." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
