const db = require("../../models");
const router = require('express').Router();
const Op = require('sequelize').Op;

router.get('/', async (req, res) => {
    try {
        const notsold = await db.item.findAll({
            where: {
                createdAt: {
                    [Op.between]: [req.body.startDate, req.body.endDate],
                },
                item_id: {
                    [Op.or]: {
                        [Op.eq]: null,
                        [Op.notIn]: db.Sequelize.literal('(SELECT item_id FROM detailed_transactions)')
                    }
                }
            },
        });

        const soldout = await db.item.findAll({
            where: {
                createdAt: {
                    [Op.between]: [req.body.startDate, req.body.endDate],
                },
                qty: 0,
            },
        });

        const soldover = await db.item.findAll({
            where: {
                createdAt: {
                    [Op.between]: [req.body.startDate, req.body.endDate],
                },
                qty: {
                    [Op.lt]: 0,
                },
            },
        });

        return res.status(201).json({ notsold: notsold, soldout: soldout, soldover: soldover });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;