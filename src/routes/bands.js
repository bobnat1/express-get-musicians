const { Router } = require("express");
const bandRouter = Router();
const { Musician, Band } = require("../../models/index.js")

bandRouter.get("/", async (req, res) => {
    let bands = await Band.findAll({include: Musician});
    res.json(bands);
})

bandRouter.get("/:id", async (req, res) => {
    let band = await Band.findByPk(req.params.id, {include: Musician});
    res.json(band);
})


module.exports = bandRouter;