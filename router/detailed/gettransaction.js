const db = require("../../models");
const router = require('express').Router();
const Op = require('sequelize').Op;

router.get('/', async (req, res) => {
    const transactions = await db.transaction.findAll({
        where: {
            createdAt: {
                [Op.between]: [req.body.startDate, req.body.endDate],
            },
        }
    })
    return res.status(201).json({ transactions });
});

module.exports = router;