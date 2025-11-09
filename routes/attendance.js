const express = require('express');
const pool = require('../db');

const router = express.Router();

// Get list of students
router.get('/list', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM students ORDER BY roll_number');
  res.json(rows);
});

// Save attendance
router.post('/save', async (req, res) => {
  const { date, ...attendanceData } = req.body;

  try {
    for (const studentId in attendanceData) {
      const status = attendanceData[studentId];
      await pool.query(
        'INSERT INTO attendance (student_id, date, status) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE status=?',
        [studentId, date, status, status]
      );
    }
    res.json({ message: 'Attendance saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
