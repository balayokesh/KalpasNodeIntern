const router = require('express').Router();
const fs = require('fs');
const csv = require('csv-parser');

// Import Models
const Employee = require('../models/employee.model');

// Create
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

// Read
router.get('/:id', (req, res) => {
    Employee.findById(req.params.id)
        .then(emp => res.json(emp))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

// Update
router.post('/edit/:id', (req, res) => {
    Employee.findById(req.params.id)
        .then(employee => {
            employee.name = req.body.name;
            employee.age = req.body.age;
            employee.save()
                .then(() => res.json('Employee details deleted'))
                .catch(err => res.status(400).json(`Error: ${err}`));
        })
})
    

// Delete
router.delete('/:id', (req, res) => {
    Employee.findByIdAndDelete(req.params.id)
        .then(() => res.json('Employee details deleted'))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;