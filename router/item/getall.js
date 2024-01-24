var db = require("../../models");
const router = require('express').Router();

router.get('/', async (req, res) => {
    const ses = await db.item.findAll();

    return res.status(201).json(ses);
});

module.exports = router;