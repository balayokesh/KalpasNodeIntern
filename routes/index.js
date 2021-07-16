// Import npm modules
const router = require('express').Router();
const fs = require('fs');
const csv = require('csv-parser');
const jwt = require('jsonwebtoken');

// Import authenticator
const checkLogin = require('../controllers/authenticate.js');

// Import Models
const Employee = require('../models/employee.model');
const Admin = require('../models/admin.model');

// Create
router.post('/', checkLogin, (req, res) => {
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
router.get('/:id', checkLogin, (req, res) => {
    Employee.findById(req.params.id)
        .then(emp => res.json(emp))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

// Update
router.post('/edit/:id', checkLogin, (req, res) => {
    Employee.findById(req.params.id)
        .then(employee => {
            employee.name = req.body.name;
            employee.age = req.body.age;
            employee.save()
                .then(() => res.json('Employee details edited'))
                .catch(err => res.status(400).json(`Error: ${err}`));
        })
});
    

// Delete
router.delete('/:id', checkLogin, (req, res) => {
    Employee.findByIdAndDelete(req.params.id)
        .then(() => res.json('Employee details deleted'))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

// Login
router.post('/login', (req, res) => {
    let { username, password } = req.body;
    Admin.findOne({username: username, password: password})
        .then(record => {
            if (!record) {
                res.json(`${record} records found for ${username} and ${password}`);
            }
            else {
                const payload = {
                    username, password
                }
                const token = jwt.sign(payload, 'secret', { expiresIn: '1h' });
                res.json(token);
            }
        })
        .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;