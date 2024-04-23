import AWS from 'aws-sdk';
import mysql from 'mysql';

// Database configuration
const dbConfig = {
  host: 'contact-me-database.c7cmwuoegaof.us-east-2.rds.amazonaws.com',
  user: 'admin',
  password: 'adminroot',
  database: 'portfolio'
};

// Create a connection pool
const pool = mysql.createPool(dbConfig);

export async function handler(event, context) {
  // Extract form submission data from the event object
  const formData = JSON.parse(event.body);

  // Create a promise to execute database query
  const queryPromise = new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
      } else {
        // Construct SQL query to insert data into database
        const sql = `INSERT INTO contact_form_data (fullname, email, subjects, message) VALUES (?, ?, ?, ?)`;
        const values = [formData.name, formData.email, formData.subject, formData.message];

        // Execute the query
        connection.query(sql, values, (error, results) => {
          connection.release(); // Release the connection back to the pool
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
      }
    });
  });

  try {
    // Execute the query and wait for the result
    const result = await queryPromise;

    // Return success response
    return {
        statusCode: 200,
        body: JSON.stringify({ success: true, message: 'Form submitted successfully' })
    };
  } catch (error) {
    // Return error response
    return {
        statusCode: 500,
        body: JSON.stringify({ success: false, error: 'An error occurred while submitting the form' })
    };
  }
}
