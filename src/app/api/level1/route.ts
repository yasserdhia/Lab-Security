import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({
        success: false,
        error: 'Username and password are required'
      }, { status: 400 });
    }

    // INTENTIONALLY VULNERABLE: Direct string concatenation
    // This is the vulnerability that students need to exploit
    const vulnerableQuery = `SELECT id, username, email, first_name, last_name, role FROM users WHERE username = '${username}' AND password = '${password}'`;

    console.log('Executing query:', vulnerableQuery); // For educational purposes

    try {
      // Test basic connection first
      await pool.query('SELECT 1');
      console.log('Database connection test successful');
      
      const result = await pool.query(vulnerableQuery);
      console.log('Query result:', result.rows);
      
      if (result.rows.length > 0) {
        const user = result.rows[0];
        return NextResponse.json({
          success: true,
          message: 'Login successful! You have bypassed the authentication.',
          data: {
            user: user,
            query: vulnerableQuery, // Show the executed query for educational purposes
            vulnerability: 'String-based SQL Injection',
            impact: 'Authentication bypass, potential data exposure'
          }
        });
      } else {
        return NextResponse.json({
          success: false,
          message: 'Invalid credentials. Try a different approach.',
          data: {
            query: vulnerableQuery,
            hint: 'The query executed successfully but returned no results. Try manipulating the WHERE clause.'
          }
        });
      }
    } catch (dbError: any) {
      console.error('Database error:', dbError);
      // Return database errors to help with learning (normally you wouldn't do this in production)
      return NextResponse.json({
        success: false,
        error: 'Database error occurred',
        message: dbError.message,
        data: {
          query: vulnerableQuery,
          hint: 'SQL syntax error detected. This might reveal useful information about the database structure.'
        }
      }, { status: 500 });
    }

  } catch (error: any) {
    console.error('Server error:', error);
    return NextResponse.json({
      success: false,
      error: 'Server error occurred',
      message: error.message
    }, { status: 500 });
  }
}
