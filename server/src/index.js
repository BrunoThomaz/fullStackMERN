const express = require('express');

const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const mongoose = require('mongoose');

const logs = require('./api/logs');

require('dotenv').config();

const middlewares = require('./middlewares');

const app = express();

app.use(express.json());

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(morgan('common'));
app.use(helmet());
app.use(cors({
    origin: process.env.CORS_ORIGIN,
}));

app.get('/', (req, res) => {
    res.json({
        message: 'Hello World!',
    });
});

app.use('/api/logs', logs);

app.use(middlewares.notFound);

app.use(middlewares.errorHandler);

const port = process.env.PORT || 1337;

app.listen(port, () => {
    console.log("Listening at: http://localhost:"+port)
})