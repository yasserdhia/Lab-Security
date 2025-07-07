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

    // INTENTIONALLY VULNERABLE: Time-based blind injection
    const vulnerableQuery = `SELECT COUNT(*) FROM users WHERE username = '${username}' AND password = '${password}'`;

    console.log('Executing query:', vulnerableQuery);

    const startTime = Date.now();

    try {
      // Test basic connection first
      await pool.query('SELECT 1');
      console.log('Database connection test successful');
      
      const result = await pool.query(vulnerableQuery);
      console.log('Query result:', result.rows);
      const count = parseInt(result.rows[0].count);
      const executionTime = Date.now() - startTime;
      
      return NextResponse.json({
        success: count > 0,
        message: count > 0 ? 'Login successful' : 'Login failed',
        execution_time: executionTime,
        debug_info: {
          query: vulnerableQuery,
          vulnerability: 'Time-based Blind SQL Injection',
          technique: 'Use pg_sleep() to cause deliberate delays',
          example_payload: "'; SELECT CASE WHEN (1=1) THEN pg_sleep(5) ELSE pg_sleep(0) END --",
          timing_analysis: 'Compare response times to infer data'
        }
      });
    } catch (dbError: any) {
      console.error('Database error:', dbError);
      const executionTime = Date.now() - startTime;
      
      return NextResponse.json({
        success: false,
        message: 'Database error occurred',
        execution_time: executionTime,
        debug_info: {
          query: vulnerableQuery,
          error_hint: 'SQL errors can also be timed for information extraction'
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
