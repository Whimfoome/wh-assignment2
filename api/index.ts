import app from "./app";

const port = 8080;

app.listen(port, () => {
  console.log(`Running at http://localhost:${port}`);
});
