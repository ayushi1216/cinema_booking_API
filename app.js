require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./models');

app.use(express.json());


const PORT = process.env.PORT || 2800;

db.sequelize.sync({ force: false }).then(() => {
    console.log('DataBase synced');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});