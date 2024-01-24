const db = require("../../models");
const router = require('express').Router();
const Op = require('sequelize').Op;

router.get('/', async (req, res) => {
    try {
        const transactions = await db.transaction.findAll({
            where: {
                createdAt: {
                    [Op.between]: [req.body.startDate, req.body.endDate],
                },
            },
            include: [
                {
                    model: db.detailed_transaction,
                    attributes: ['detailed_transaction_id', 'qty_stock_change'],
                    include: [
                        {
                            model: db.item,
                            attributes: ['item_id', 'price', 'cogs'],
                        },
                    ],
                },
            ],
        });

        return res.status(201).json({ transactions });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;