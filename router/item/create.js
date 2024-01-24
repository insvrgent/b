var db = require("../../models");
const router = require('express').Router();
const randomID = require('../../components/randomID');

router.post('/', async (req, res) => {
    await db.sequelize.sync();
    const t = await db.sequelize.transaction();

    try {
        const { name, price, cogs, qty } = req.body;
        if (cogs > price) return res.status(400).json({ message: "cogs value cant over the db.item price" });

        const id = await randomID.generateID(db.item);

        const result = await db.item.create({
            item_id: id,
            owner_id: req.ses.user_id,
            name: name,
            price: price,
            cogs: cogs,
            qty: qty,
        }, { transaction: t })

        const Tid = await randomID.generateID(db.transaction);
        await db.transaction.create({
            transaction_id: Tid,
            clerk_id: req.ses.user_id,
            table_id: "clerk table",
        }, { transaction: t });

        const Did = await randomID.generateID(db.detailed_transaction);
        await db.detailed_transaction.create({
            detailed_transaction_id: Did,
            transaction_id: Tid,
            item_id: id,
            qty_stock_change: qty,
        }, { transaction: t });

        await t.commit();
        
        res.status(201).json(result);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Error creating user" });
        await t.rollback();
    }
    finally {

    }
});

module.exports = router;