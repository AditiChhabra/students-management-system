const express = require('express');
const pool = require('../db');

const router = express.Router();

// Add student
router.post('/add', async (req, res) => {
  const { name, roll_number, course, semester } = req.body;

  try {
    await pool.query(
      'INSERT INTO students (name, roll_number, class, department) VALUES (?, ?, ?, ?)',
      [name, roll_number, course, semester ]
    );
    res.json({ message: 'Student added successfully' });
  } catch (error) {
    console.error(error);

    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ error: "Roll Number already exists!" });
    }

    res.status(500).json({ error: 'Server error' });
  }
});
// List students (for dropdown)
router.get('/list', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM students ORDER BY roll_number');
  res.json(rows);
});


module.exports = router;
