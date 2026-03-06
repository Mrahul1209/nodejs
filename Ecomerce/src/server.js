require('dotenv').config();
const express = require('express');
require('./config/db.config');

const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', require('./routes'));

app.listen(process.env.PORT, (err) => {
    if (err) {
        console.error('Error not starting server:', err);
        return;
    }
    console.log(`Server is running on port !!!!!!!!`);
});      