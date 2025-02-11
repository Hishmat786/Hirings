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


// Employee Login
router.post('/login', async (req, res) => {
    console.log("Login endpoint hit!");
    try {
        const { email, password } = req.body;

        // Find employee by email and password
        const employee = await Employee.findOne({ email, password });

        console.log("e", employee)
        if (!employee) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        res.status(200).json({ message: 'Login successful', employee });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
