const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "root",
  user: "root",
  password: "root"
});


describe('Database Test', () => {
  let client;

  beforeAll(async () => {
    try {
      // Connect to the database
      client = await pool.connect();
    } catch (error) {
      //console.error('Error connecting to the database:', error);
    }
  });

  afterAll(async () => {
    try {
      if (client) {
        // Release the database client
        await client.release();
      }
      // Close the database connection
      await pool.end();
    } catch (error) {
      //console.error('Error closing the database connection:', error);
    }
  });

  it('should load the database correctly', async () => {
    try {
      // Check if the necessary tables exist
      const tables = await client.query(
        "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'"
      );
      const tableNames = tables.rows.map((row) => row.table_name);
      expect(tableNames).toContain('users');
      expect(tableNames).toContain('course');

      // Retrieve sample data from the tables
      const users = await client.query('SELECT * FROM users');
      const courses = await client.query('SELECT * FROM course');

      // Check if the data is accurate
      expect(users.rows.length).toBeGreaterThan(0);
      expect(courses.rows.length).toBeGreaterThan(0);

      const specificUser = users.rows.find((user) => user.user_name === 'John Smith');
      expect(specificUser).toBeDefined();
      expect(specificUser.password).toBe('1');
    } catch (error) {
      //console.error('Error executing database query:', error);
    }
  });
});
