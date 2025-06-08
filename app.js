require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./models');

app.use(express.json());
app.use('/cinemas', require('./routes/cinema.routes'));

const PORT = process.env.PORT || 2800;

db.sequelize.sync({ force: false }).then(() => {
    console.log('DataBase synced');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});