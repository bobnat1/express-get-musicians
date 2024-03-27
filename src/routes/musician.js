const { Router } = require("express");
const musicianRouter = Router();
const { Musician } = require("../../models/index.js");

//TODO: Create a GET /musicians route to return all musicians 
musicianRouter.get("/", async (req, res) => {
    let musicians = await Musician.findAll();
    res.json(musicians);
})

musicianRouter.get("/1", async (req, res) => {
    let musician = await Musician.findAll();
    res.json(musician[0]);
})

musicianRouter.get("/:id", async (req, res) => {
    let musician = await Musician.findByPk(req.params.id);
    res.json(musician);
})

musicianRouter.post("/", async (req, res) => {
    const newMusican = await Musician.create(req.body);
    if (!newMusican)
        throw new Error("No user created");
    res.send(newMusican.name)
}) 

musicianRouter.put("/:id", async (req, res) => {
    const musician = await Musician.findByPk(req.params.id);
    const updatedMus = await musician.update(req.body);

    res.send(updatedMus);
})

musicianRouter.delete("/:id", async (req, res) => {
    const musician = await Musician.findByPk(req.params.id);
    const deletedMus = await musician.destroy();
    console.log(`Deleted ${deletedMus.name}.`)
    res.send(deletedMus);
})

module.exports = musicianRouter;