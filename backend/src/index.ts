import express from "express";

const app = express();
const port = 3001;

app.get("/", (_req, res) => {
  res.send("Hello from backend!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
