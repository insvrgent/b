const express = require("express");
const cors = require("cors");
const db = require("./models");
// db.sequelize.sync({ force: true });

const userController = require('./controllers/userController');
const tableController = require('./controllers/tableController');
const itemController = require('./controllers/itemController');
const checkoutController = require('./controllers/checkoutController');
const detailedController = require('./controllers/detailedController');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', userController);
app.use('/table', tableController);
app.use('/checkout', checkoutController);
app.use('/item', itemController);
app.use('/detailed', detailedController);

const port = process.env.PORT; // Use environment variable or default to 5000
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
