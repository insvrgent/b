const router = require('express').Router();
const auth = require('../../components/auth');

router.post('/', async (req, res) => {
    return res.status(200).json({success: true});
});

module.exports = router;