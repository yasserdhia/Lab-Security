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

    // INTENTIONALLY VULNERABLE: Numeric injection
    // Treat username as user ID (numeric)
    const userId = username; // Directly use input as number
    const vulnerableQuery = `SELECT id, username, email, first_name, last_name, role FROM users WHERE id = ${userId} AND password = '${password}'`;

    console.log('Executing query:', vulnerableQuery);

    try {
      const result = await pool.query(vulnerableQuery);
      
      if (result.rows.length > 0) {
        const users = result.rows;
        return NextResponse.json({
          success: true,
          message: 'Numeric injection successful! You have accessed user data.',
          data: {
            users: users,
            query: vulnerableQuery,
            vulnerability: 'Numeric SQL Injection',
            impact: 'Data exposure, authentication bypass via numeric manipulation',
            tip: 'Notice how you can access multiple users with UNION SELECT or OR conditions'
          }
        });
      } else {
        return NextResponse.json({
          success: false,
          message: 'No results found. Try different numeric payloads.',
          data: {
            query: vulnerableQuery,
            hint: 'Try: 1 OR 1=1, or use UNION SELECT to extract data from other tables'
          }
        });
      }
    } catch (dbError: any) {
      return NextResponse.json({
        success: false,
        error: 'Database error occurred',
        message: dbError.message,
        data: {
          query: vulnerableQuery,
          hint: 'SQL error might reveal database structure. Try different numeric syntax.'
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
