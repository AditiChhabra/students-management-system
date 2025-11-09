CREATE DATABASE IF NOT EXISTS sse_attendance;
USE sse_attendance;

CREATE TABLE IF NOT EXISTS faculty (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  roll_number VARCHAR(20) NOT NULL UNIQUE,
  class VARCHAR(50) NOT NULL,
  department VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS attendance (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  date DATE NOT NULL,
  status ENUM('Present','Absent') NOT NULL,
  UNIQUE KEY uniq_att (student_id, date),
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS marks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  subject VARCHAR(100) NOT NULL,
  marks INT NOT NULL,
  max_marks INT NOT NULL,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

-- Insert default login user (username: admin, password: admin123)
INSERT INTO faculty (username, password_hash)
VALUES ('admin', '$2b$10$2b4YJbF8jN1hP7bqgq5K7e5kAkE4O8rJ1mJ3dE3yJmJ3h2D5b4b1i')
ON DUPLICATE KEY UPDATE username=username;
