CREATE DATABASE user_data;
USE user_data;
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  signup_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
use user_data;
select * from users;
TRUNCATE table users;
'2', 'user', 'user@gmail.com', '$2a$10$KMYhEVecgErZoTStq4vgKeCrbavU7XAutFZo008jCOWa60IoQpxJi', '2024-10-21 10:37:18'