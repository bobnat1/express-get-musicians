// install dependencies
const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

const request = require("supertest")
const { db } = require('./db/connection');
const { Musician } = require('./models/index')
const app = require('./src/app');
const seedMusician = require("./seedData");


describe('./musicians endpoint', () => {
    // Write your tests here
    test("get a status code of 200", async () => {
        const response = await request(app).get("/musician");
        expect(response.statusCode).toBe(200);
    })
    test("testing correct json response", async () => {
        const response = await request(app).get("/musician");
        const responseData = JSON.parse(response.text);
        expect(responseData[0].name).toBe('Mick Jagger');
    } )
    test("test new endpoint /:id", async () => {
        const response = await request(app).get("/musician/1");
        const responseData = JSON.parse(response.text);
        expect(responseData.name).toBe('Mick Jagger');
    })
    test("test new endpoint put /:id", async () => {
        const response = await request(app).put("/musician/1").send({"instrument": "knife"});
        const responseData = JSON.parse(response.text);
        expect(responseData.instrument).toBe('knife');
    })
 
})

// describe("Test /band endpoints", () => {
//     test("test / endpoint", async () => {
//         const response = await request(app).get("/band");
//         const responseData =
//     })
// })

describe("test validation methods", () => {
    test("creating musician with a name sends a validation error", async () => {

        const musicianData = {
            name: "",
            instrument: "shotgun"
        };

        const response = await request(app).post("/musician").send(musicianData);

        expect(response.body.error[0].path).toBe("name");
    })
    test("creating musician with an instrument sends a validation error", async () => {

        const musicianData = {
            name: "hakia",
            instrument: ""
        };

        const response = await request(app).post("/musician").send(musicianData);

        expect(response.body.error[0].path).toBe("instrument");
    })
})