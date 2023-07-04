import request from "supertest";
import app from "./app";

describe("GET /countries", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Successful return contries", async () => {
    jest.spyOn(Math, "random").mockReturnValue(0.5);

    const response = await request(app).get("/countries");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("continents");
  });

  test("Failed return contries", async () => {
    jest.spyOn(Math, "random").mockReturnValue(0.3);

    const response = await request(app).get("/countries");
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: "Bad Request" });
  });
});

describe("GET /continents", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Successful return continents", async () => {
    jest.spyOn(Math, "random").mockReturnValue(0.5);

    const response = await request(app).get("/continents");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("continents");
  });

  test("Failed return continents", async () => {
    jest.spyOn(Math, "random").mockReturnValue(0.3);

    const response = await request(app).get("/continents");
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: "Bad Request" });
  });
});

describe("Failure Handling", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("GET non-existent route should return 404", async () => {
    const response = await request(app).get("/non-existent");
    expect(response.status).toBe(404);
  });

  test("Read non-existent file should return 404", async () => {
    jest.spyOn(Math, "random").mockReturnValue(0.5);

    const response = await request(app).get("/failFileRead");
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Server couldn't read file" });
  });

  test("Fail JSON Parse should return 400", async () => {
    jest.spyOn(Math, "random").mockReturnValue(0.5);

    const response = await request(app).get("/invalidParse");
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: "Couldn't parse file" });
  });
});
