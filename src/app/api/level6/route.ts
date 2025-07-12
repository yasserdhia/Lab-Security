import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
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

    // First, try normal authentication with bcrypt
    try {
      // Test basic connection first
      await pool.query('SELECT 1');
      console.log('Database connection test successful');
      
      // INTENTIONALLY VULNERABLE: Username is still injectable
      const userQuery = `SELECT * FROM users WHERE username = '${username}'`;
      console.log('User query:', userQuery);
      
      const userResult = await pool.query(userQuery);
      
      if (userResult.rows.length > 0) {
        const user = userResult.rows[0];
        
        // Check password with bcrypt
        const isValidPassword = await bcrypt.compare(password, user.password);
        
        if (isValidPassword) {
          return NextResponse.json({
            success: true,
            message: 'Login successful! Valid credentials.',
            data: {
              user: { ...user, password: undefined }, // Don't return password hash
              query: userQuery,
              vulnerability: 'Username still injectable despite password protection',
              impact: 'Authentication bypass through username manipulation'
            }
          });
        }
      }
      
      // INTENTIONALLY VULNERABLE: Second-order injection
      // Store the potentially malicious data for later use
      const insertQuery = `INSERT INTO logs (user_id, action, details) VALUES (1, 'login_attempt', '{"username": "${username}", "password": "${password}"}')`;
      await pool.query(insertQuery);

      // Later, retrieve and use the stored data (second order - where injection occurs)
      const selectQuery = `SELECT details FROM logs WHERE action = 'login_attempt' AND details::text LIKE '%${username}%' ORDER BY timestamp DESC LIMIT 1`;
      
      console.log('Second-order query:', selectQuery);
      
      const result = await pool.query(selectQuery);
      console.log('Query result:', result.rows);
      
      if (result.rows.length > 0) {
        return NextResponse.json({
          success: true,
          message: 'Second-order injection detected!',
          data: {
            stored_data: result.rows[0],
            vulnerability: 'Second-order SQL Injection',
            explanation: 'Data was stored safely, but becomes dangerous when retrieved and used in dynamic queries',
            first_order: insertQuery,
            second_order: selectQuery,
            impact: 'Delayed execution makes this harder to detect and trace'
          }
        });
      } else {
        return NextResponse.json({
          success: false,
          message: 'No stored data found matching your input',
          debug_info: {
            hint: 'Try payloads that will be dangerous when retrieved later',
            second_order_query: selectQuery
          }
        });
      }
    } catch (dbError: any) {
      console.error('Database error:', dbError);
      return NextResponse.json({
        success: false,
        error: 'Database error in second-order execution',
        message: dbError.message,
        debug_info: {
          vulnerability: 'Second-order SQL injection triggered during data retrieval',
          hint: 'The injection happens when stored data is used in subsequent queries'
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
