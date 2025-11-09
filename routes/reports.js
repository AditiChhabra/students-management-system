const express = require('express');
const pool = require('../db');

const router = express.Router();

// Get full report for 1 student
router.get('/:id', async (req, res) => {
  const studentId = req.params.id;

  try {
    // Student info
    const [[student]] = await pool.query('SELECT * FROM students WHERE id = ?', [studentId]);

    // Attendance percentage
    const [attendanceRecords] = await pool.query(
      'SELECT COUNT(*) AS total, SUM(status = "Present") AS present FROM attendance WHERE student_id = ?',
      [studentId]
    );
    const { total, present } = attendanceRecords[0];
    const attendance_percentage = total ? Math.round((present / total) * 100) : 0;

    // Marks
    const [marks] = await pool.query('SELECT * FROM marks WHERE student_id = ?', [studentId]);

    res.json({ student, attendance_percentage, marks });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error retrieving report' });
  }
});

module.exports = router;
