import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import pool from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({
        success: false,
        message: 'Invalid credentials provided'
      }, { status: 400 });
    }

    // INTENTIONALLY VULNERABLE: Blind Boolean Injection
    // This endpoint only returns true/false responses, no data or error details
    const vulnerableQuery = `SELECT id, username, password FROM users WHERE username = '${username}'`;

    console.log('Executing query:', vulnerableQuery);

    try {
      // Test basic connection first
      await pool.query('SELECT 1');
      console.log('Database connection test successful');
      
      const result = await pool.query(vulnerableQuery);
      console.log('Query result:', result.rows);
      
      if (result.rows.length > 0) {
        const user = result.rows[0];
        const isValidPassword = await bcrypt.compare(password, user.password);
        
        if (isValidPassword) {
          // True condition - user found
          return NextResponse.json({
            success: true,
            message: 'Login successful',
            response_pattern: 'TRUE_CONDITION',
            debug_info: {
              note: 'In blind injection, you only get this type of response pattern',
              query: vulnerableQuery,
              technique: 'Boolean-based blind SQL injection',
              hint: 'Look for consistent differences between true and false conditions'
            }
          });
        } else {
          // Password invalid but user exists
          return NextResponse.json({
            success: false,
            message: 'Login failed',
            response_pattern: 'FALSE_CONDITION',
            debug_info: {
              note: 'Password verification failed',
              query: vulnerableQuery,
              hint: 'Try bypassing the WHERE clause entirely'
            }
          });
        }
      } else {
        // False condition - no user found or query returned false
        return NextResponse.json({
          success: false,
          message: 'Login failed',
          response_pattern: 'FALSE_CONDITION',
          debug_info: {
            note: 'This is the false condition response pattern',
            query: vulnerableQuery,
            hint: 'Try payloads that make the WHERE clause always true'
          }
        });
      }
    } catch (dbError: any) {
      console.error('Database error:', dbError);
      // Even errors are hidden in true blind injection
      // But we'll show minimal info for educational purposes
      return NextResponse.json({
        success: false,
        message: 'System error occurred',
        response_pattern: 'ERROR_CONDITION',
        debug_info: {
          note: 'SQL errors often indicate injection points',
          hint: 'Syntax errors suggest the injection point is working',
          error_type: 'SQL_SYNTAX_ERROR'
        }
      }, { status: 500 });
    }

  } catch (error: any) {
    console.error('Server error:', error);
    return NextResponse.json({
      success: false,
      message: 'System temporarily unavailable'
    }, { status: 500 });
  }
}
