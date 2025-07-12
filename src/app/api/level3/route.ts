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

    // INTENTIONALLY VULNERABLE: Perfect for UNION attacks
    // This query selects 6 columns, making it ideal for UNION SELECT demonstrations
    const vulnerableQuery = `SELECT id, username, email, role, created_at, password FROM users WHERE username = '${username}'`;

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
            message: 'UNION injection successful! You have extracted data from the database.',
            data: {
              extracted_data: { ...validUser, password: undefined },
              query: vulnerableQuery,
              vulnerability: 'Union-based SQL Injection',
              impact: 'Complete data extraction from any table in the database',
              columns_revealed: ['id', 'username', 'email', 'role', 'created_at', 'password'],
              next_steps: [
                'Try extracting from other tables',
                'Get database schema information',
                'Extract password hashes',
                'Enumerate database users and permissions'
              ]
            }
          });
        } else {
          return NextResponse.json({
            success: false,
            message: 'User found but password verification failed. Try manipulating the query.',
            data: {
              query: vulnerableQuery,
              hint: 'Try UNION SELECT to extract data or bypass authentication'
            }
          });
        }
      } else {
        return NextResponse.json({
          success: false,
          message: 'No direct match found, but UNION attacks might still work.',
          data: {
            query: vulnerableQuery,
            hint: 'The original query has 5 columns. Try: \' UNION SELECT username, password, email, role, id FROM users--',
            column_count: 5,
            suggested_payloads: [
              "' UNION SELECT 1,2,3,4,5--",
              "' UNION SELECT username, password, email, role, id FROM users--",
              "' UNION SELECT table_name, column_name, data_type, 1, 2 FROM information_schema.columns--"
            ]
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
          hint: 'SQL syntax error. Check column count and data types for UNION compatibility.',
          troubleshooting: [
            'Use ORDER BY to determine column count',
            'Ensure UNION SELECT has exactly 5 columns',
            'Match data types (use numbers or strings as needed)'
          ]
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
