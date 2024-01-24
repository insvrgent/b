const express = require('express');
const router = express.Router();

var routerDetailed = require('require-directory')(module, '../router/detailed/');

const auth = require('../components/auth');
router.use(auth(['admin']));

//get transaction
router.use('/', routerDetailed.gettransaction);

router.use('/all', routerDetailed.all);

//get info
router.use('/iteminfo', routerDetailed.iteminfo);

//get detailed
router.use('/detailed', routerDetailed.getdetailed);

router.use('/income', routerDetailed.income);

router.use('/mutation', routerDetailed.mutation);


module.exports = router;
