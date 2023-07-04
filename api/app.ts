import express, { Request, Response } from "express";
import { PathOrFileDescriptor, readFile } from "fs";

const app = express();

function createResponse(res: Response, path: PathOrFileDescriptor) {
  const shouldFail = Math.random() < 0.4;

  if (shouldFail) {
    res.status(400).send({ message: "Bad Request" });
    return;
  }

  readFile(path, "utf-8", (err, data) => {
    if (err) {
      res.status(404).send({ message: "Server couldn't read file" });
      console.error(`Couldn't read from ${path}`);

      return;
    }

    try {
      res.send(JSON.parse(data));
    } catch (error) {
      res.status(400).send({ message: "Couldn't parse file" });
      console.error(error);
    }
  });
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
