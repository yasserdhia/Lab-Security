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

    // INTENTIONALLY VULNERABLE: Numeric injection
    // Support both username and user ID approaches
    let vulnerableQuery;
    
    // If username is numeric, treat as ID
    if (!isNaN(Number(username))) {
      const userId = username;
      vulnerableQuery = `SELECT id, username, email, first_name, last_name, role, password FROM users WHERE id = ${userId}`;
    } else {
      // If username is string, also allow username-based login for convenience
      vulnerableQuery = `SELECT id, username, email, first_name, last_name, role, password FROM users WHERE username = '${username}'`;
    }

    console.log('Executing query:', vulnerableQuery);

    try {
      // Test basic connection first
      await pool.query('SELECT 1');
      console.log('Database connection test successful');
      
      const result = await pool.query(vulnerableQuery);
      console.log('Query result:', result.rows);
      
      if (result.rows.length > 0) {
        const users = result.rows;
        
        // Check password with bcrypt for each user
        let validUser = null;
        for (const user of users) {
          if (await bcrypt.compare(password, user.password)) {
            validUser = user;
            break;
          }
        }
        
        if (validUser) {
          return NextResponse.json({
            success: true,
            message: 'Numeric injection successful! You have accessed user data.',
            data: {
              user: { ...validUser, password: undefined },
              query: vulnerableQuery,
              vulnerability: 'Numeric SQL Injection',
              impact: 'Data exposure, authentication bypass via numeric manipulation',
              tip: 'Notice how you can access multiple users with UNION SELECT or OR conditions'
            }
          });
        } else {
          return NextResponse.json({
            success: false,
            message: 'Invalid credentials. Try a different approach.',
            data: {
              query: vulnerableQuery,
              hint: 'User found but password verification failed. Try manipulating the query to bypass authentication.'
            }
          });
        }
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
      console.error('Database error:', dbError);
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
    console.error('Server error:', error);
    return NextResponse.json({
      success: false,
      error: 'Server error occurred',
      message: error.message
    }, { status: 500 });
  }
}
