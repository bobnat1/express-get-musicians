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
    // test("returns first item in the db", async () => {
    //     const response = await request(app).get("/musicians/1");
    //     const otherResponse = await request(app).get("/musicians");
    //     expect(response).toBe(otherResponse[0])
    // })

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