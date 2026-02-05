const request = require("supertest");
const app = require("../app");

describe("Initial tests for the index route", () => {
  test("GET / should return a welcome message", (done) => {
    request(app)
      .get("/")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  test("POST / should return ERROR", (done) => {
    request(app)
      .post("/")
      .then((response) => {
        expect(response.statusCode).toBe(404);
        expect(response.statusCode).not.toBe(200);
        done();
      });
  });

  test("GET / should return Welcome", (done) => {
    request(app)
      .get("/")
      .then((response) => {
        expect(response.text).toMatch(/Welcome/);
        done();
      });
  });
});
