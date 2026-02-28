// MySQL/PostgreSQL Script - Delete all users except Shaha (8539068184)
const mysql = require('mysql2/promise');

const DB_CONFIG = {
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database_name'
};

async function deleteUsers() {
  let connection;
  
  try {
    connection = await mysql.createConnection(DB_CONFIG);
    
    const [result] = await connection.execute(
      'DELETE FROM users WHERE username != ? OR mobile != ?',
      ['Shaha', '8539068184']
    );
    
    console.log(`✓ Deleted ${result.affectedRows} users`);
    console.log('✓ User "Shaha" (8539068184) preserved');
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    if (connection) await connection.end();
  }
}

deleteUsers();
