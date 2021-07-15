const router = require('express').Router();
const fs = require('fs');
const csv = require('csv-parser');

router.post('/', (req, res) => {
    const results = [];
    const filePath = 'test.csv';
    fs.createReadStream(filePath)
        .pipe(csv({}))
        .on('data', (data) => results.push(data))
        .on('end', () => {
            res.send(results);
        });
});

module.exports = router;