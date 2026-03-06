require('dotenv').config();
const express = require('express');

const app = express();

const PORT = process.env.PORT;

app.use(express.json());

app.use('/api', require('./routes/index'));

app.listen(PORT, (error) => {

    if (error) {
        console.log("Error starting server:", error);
        return false;
    }

    console.log(`Server is running on port`);

});