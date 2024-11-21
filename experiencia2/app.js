const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const bookRouter = require('./routes/books');
app.use('/api', bookRouter);

app.listen('3000', () => {
    console.log("Servidor en ejecucion");
});
