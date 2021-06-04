const { Router } = require('express');
const router = Router();
const LogEntry = require('../models/logentry');

router.get('/all', async (req, res, next) => {
    try {
        const entries = await LogEntry.find();
        res.json(entries);
    } catch (error) {
        next(error)
    }
});

router.get('/vivo', async (req, res, next) => {
    try {
        const entries = await LogEntry.find({'operadora':'vivo'});
        res.json(entries);
    } catch (error) {
        next(error)
    }
});

router.get('/tim', async (req, res, next) => {
    try {
        const entries = await LogEntry.find({'operadora':'tim'});
        res.json(entries);
    } catch (error) {
        next(error)
    }
});

router.get('/claro', async (req, res, next) => {
    try {
        const entries = await LogEntry.find({'operadora':'claro'});
        res.json(entries);
    } catch (error) {
        next(error)
    }
});

router.get('/oi', async (req, res, next) => {
    try {
        const entries = await LogEntry.find({'operadora':'oi'});
        res.json(entries);
    } catch (error) {
        next(error)
    }
});


router.post('/', async (req, res, next) => {
    try {
        const logEntry = new LogEntry(req.body);
        const createdEntry = await logEntry.save();
        res.json(createdEntry);
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(422);
        }
        next(error);
    }
})

module.exports = router;