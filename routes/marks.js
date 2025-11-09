const express = require('express');
const pool = require('../db');

const router = express.Router();

// Add marks
router.post('/add', async (req, res) => {
  const { student_id, subject, marks, max_marks } = req.body;

  try {
    await pool.query(
      'INSERT INTO marks (student_id, subject, marks, max_marks) VALUES (?, ?, ?, ?)',
      [student_id, subject, marks, max_marks]
    );
    res.json({ message: 'Marks saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
