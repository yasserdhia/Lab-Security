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

    // INTENTIONALLY VULNERABLE: Second-order injection
    // First, store the potentially malicious data
    try {
      // Store user input (first order)
      const insertQuery = `INSERT INTO logs (user_id, action, details) VALUES (1, 'login_attempt', '{"username": "${username}", "password": "${password}"}')`;
      await pool.query(insertQuery);

      // Later, retrieve and use the stored data (second order - where injection occurs)
      const selectQuery = `SELECT details FROM logs WHERE action = 'login_attempt' AND details::text LIKE '%${username}%' ORDER BY timestamp DESC LIMIT 1`;
      
      console.log('Second-order query:', selectQuery);
      
      const result = await pool.query(selectQuery);
      
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
    return NextResponse.json({
      success: false,
      error: 'Server error occurred',
      message: error.message
    }, { status: 500 });
  }
}
