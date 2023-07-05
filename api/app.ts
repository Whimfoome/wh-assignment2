import express, { Request, Response } from "express";
import { readFile } from "node:fs/promises";

const app = express();

async function createResponse(res: Response, path: string) {
  const shouldFail = Math.random() < 0.4;

  if (shouldFail) {
    res.status(400).send({ message: "Bad Request" });
    return;
  }

  try {
    const contents = await readFile(path, { encoding: "utf-8" });
    res.send(JSON.parse(contents));
  } catch (err) {
    res.status(404).send({ message: "Server couldn't read file" });
    console.error(err);
  }
}

app.get("/countries", (_req: Request, res: Response) => {
  createResponse(res, "./assets/countries.json");
});

app.get("/continents", (_req: Request, res: Response) => {
  createResponse(res, "./assets/continents.json");
});

if (process.env.NODE_ENV === "test") {
  app.get("/failFileRead", (_req: Request, res: Response) => {
    createResponse(res, "./assets/non-existent-file.json");
  });

  app.get("/invalidParse", (_req: Request, res: Response) => {
    createResponse(res, "./assets/invalid.json");
  });
}

export default app;
