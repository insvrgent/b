var db = require("../../models");
const router = require('express').Router();

router.put('/', async (req, res) => {
    try {
        const { item_id, name, price, cogs, qty } = req.body;
        if (cogs > price) return res.status(400).json({ message: "cogs value cant over the db.item price" });

        await db.item.update({
            name: name,
            price: price,
            cogs: cogs,
            qty: qty,
        }, { where: { item_id: item_id } })

        return res.status(201).json({ message: "editing success" });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Error editing user" });
    }
});

module.exports = router;