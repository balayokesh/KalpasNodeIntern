const router = require('express').Router();
const fs = require('fs');
const csv = require('csv-parser');

// Import Models
const Employee = require('../models/employee.model');

router.post('/', (req, res) => {
    const results = [];
    const filePath = req.body.filePath;
    fs.createReadStream(filePath)
        .pipe(csv({}))
        .on('data', (data) => results.push(data))
        .on('end', () => {
            console.log(results);
            for (var i=0; i<results.length; i++) {
                let data = results[i];
                let name = data.Name;
                let age = data.Age;
                const newEmployee = new Employee({
                    name, age
                });
                newEmployee.save()
                    .then(() => res.json("Data uploaded successfully"))
                    .catch(err => res.status(400).json(`Error: ${err}`));
            }
        }
    );
});

module.exports = router;