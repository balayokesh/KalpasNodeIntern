const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('test success');
});

module.exports = router;