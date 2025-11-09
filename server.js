const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const authRoutes = require('./routes/auth');
const studentsRoutes = require('./routes/students');
const attendanceRoutes = require('./routes/attendance');
const marksRoutes = require('./routes/marks');
const reportsRoutes = require('./routes/reports');

const app = express();

// ✅ These must come BEFORE routes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
  secret: 'secret123',
  resave: false,
  saveUninitialized: false
}));

// ✅ This must also come BEFORE routes
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Now load routes
app.use('/auth', authRoutes);
app.use('/students', studentsRoutes);
app.use('/attendance', attendanceRoutes);
app.use('/marks', marksRoutes);
app.use('/reports', reportsRoutes);

// ✅ Login page route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// ✅ Start server
app.listen(3000, () => console.log('✅ Server running at http://localhost:3000'));
