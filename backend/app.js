import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.get("/news", (req, res) => {
  try {
    const news = db.prepare("SELECT * FROM news").all();
    res.json(news);
  } catch (error) {
    console.error("Error fetching news:", error.message);
    res.status(500).json({ error: "Failed to fetch news." });
  }
});

initDb();

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
