var db = require("../../models");
const router = require('express').Router();

router.get('/', async (req, res) => {
    const get = await db.item.findOne({
        where: { item_id: req.body.item_id }
    });

    res.status(201).json(get);
});

module.exports = router;