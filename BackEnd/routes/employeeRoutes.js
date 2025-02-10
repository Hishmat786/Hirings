const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

// Register employee
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check for existing employee
        const existingEmployee = await Employee.findOne({ email });
        if (existingEmployee) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const newEmployee = new Employee({ name, email, password, role });
        await newEmployee.save();
        res.status(201).json({ message: 'Employee registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
