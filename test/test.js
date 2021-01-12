const app = require("../src/index");
const request = require("supertest");

/**
 * Testing get all person endpoint
 */
describe("GET /persons", () => {
    it("respond with json containing a list of all persons", (done) => {
      request(app)
        .get("/persons")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200, done);
    });
  });
  
  /**
   * Testing person endpoint by giving an existing person
   */
  describe("GET /persons/:documentNumber", () => {
    it("respond with json containing a single person", (done) => {
      request(app)
        .get("/persons/0000000")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200, done);
    });
  
    it("respond with json person not found when the person does not exists", (done) => {
      request(app)
        .get("/persons/nonexistingperson")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(404)
        .expect('"person not found"')
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });
  });
  
  /**
   * Testing POST persons endpoint
   */
  describe("POST /persons", () => {
    it("respond with 201 created", (done) => {
      const data = {	
        "documentNumber": "000005",
        "fullname": "The Devil", 
        "birth": "2021-01-01",
        "documentNumberFather": "000000",
        "documentNumberMother": "000000"
    };
      request(app)
        .post("/persons")
        .send(data)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(201)
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });
  
    it("respond with 400 on bad request", (done) => {
      const data = {
        // no personname and password
      };
      request(app)
        .post("/persons")
        .send(data)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(400)
        .expect('"person not created"')
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });
  });
