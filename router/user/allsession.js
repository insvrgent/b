var db = require("../../models");
const router = require('express').Router();
const auth = require('../../components/auth');

router.get('/', async (req, res) => {
    const ses = await db.session.findAll(
        { where: { user_id: req.ses.user_id } }
    );
    return res.status(201).json(ses);
});

module.exports = router;