var db = require("../../models");
const router = require('express').Router();
const auth = require('../../components/auth');

router.get('/', async (req, res) => {
    const cek = await db.user.findOne({
        where: { user_id: req.ses.user_id, role: "guest" }
    });

    if (!cek) {
        return res.status(401);
    }

    res.status(201).json(cek.user_id);
});

module.exports = router;