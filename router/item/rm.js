var db = require("../../models");
const router = require('express').Router();

router.delete('/', async (req, res) => {
    try {
        const g = await db.item.findByPk(req.body.item_id);
        if (!g) throw new Error(`Item with ID ${req.body.item_id} not found.`);
        
        await db.item.destroy({
            where: { item_id: req.body.item_id }
        })

        res.status(201);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
});

module.exports = router;