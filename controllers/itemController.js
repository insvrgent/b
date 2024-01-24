const router = require('express').Router();

var routerItem = require('require-directory')(module, '../router/item/');

//get item
router.use('/', routerItem.get);

//get all item
router.use('/all', routerItem.getall);

const auth = require('../components/auth');

//create item
router.use('/', auth(['admin']), routerItem.create);


//edit item
router.use('/', auth(['admin']), routerItem.edit);

//delete item
router.use('/', auth(['admin']), routerItem.rm);

module.exports = router;
