const db = require("../../models");
const router = require('express').Router();

router.get('/', async (req, res) => {
    try {
      const get = await db.detailed_transaction.findAll({
          group: ['item_id', 'createdAt']
      });

      return res.status(201).json(get);
  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;