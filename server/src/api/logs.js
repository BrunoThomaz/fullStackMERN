const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.json({
        message: 'Test router file',
    });
});

module.exports = router;