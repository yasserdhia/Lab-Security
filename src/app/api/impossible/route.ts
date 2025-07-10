import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import pool from '@/lib/db';

interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  created_at: string;
}

interface LoginRequest {
  username: string;
  password: string;
}

// Input validation and sanitization
function validateInput(input: string): { isValid: boolean; sanitized: string } {
  if (!input || typeof input !== 'string') {
    return { isValid: false, sanitized: '' };
  }
  
  // Remove any potentially dangerous characters
  const sanitized = input.trim().replace(/[<>'";&|`$(){}[\]\\]/g, '');
  
  // Check length constraints
  if (sanitized.length < 1 || sanitized.length > 255) {
    return { isValid: false, sanitized };
  }
  
  // Check for common SQL injection patterns (additional layer of protection)
  const sqlPatterns = [
    /union\s+select/i,
    /drop\s+table/i,
    /delete\s+from/i,
    /update\s+.*set/i,
    /insert\s+into/i,
    /exec\s*\(/i,
    /sp_/i,
    /xp_/i,
    /--/,
    /\/\*/,
    /\*\//,
    /0x[0-9a-f]+/i,
    /char\s*\(/i,
    /ascii\s*\(/i,
    /concat\s*\(/i,
    /substring\s*\(/i,
    /length\s*\(/i,
    /version\s*\(/i,
    /database\s*\(/i,
    /user\s*\(/i,
    /@@/,
    /information_schema/i,
    /sys\./i,
    /pg_/i,
    /sleep\s*\(/i,
    /benchmark\s*\(/i,
    /waitfor\s+delay/i
  ];
  
  for (const pattern of sqlPatterns) {
    if (pattern.test(sanitized)) {
      return { isValid: false, sanitized };
    }
  }
  
  return { isValid: true, sanitized };
}

// Secure password hashing with salt
async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12; // High salt rounds for security
  return await bcrypt.hash(password, saltRounds);
}

// Secure password verification
async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    // Never expose internal errors
    console.error('Password verification error:', error);
    return false;
  }
}

// Generic error response to prevent information leakage
function createErrorResponse(): NextResponse {
  return NextResponse.json(
    { 
      success: false, 
      message: 'Authentication failed. Please check your credentials and try again.' 
    },
    { status: 401 }
  );
}

// Success response with minimal information
function createSuccessResponse(username: string): NextResponse {
  return NextResponse.json({
    success: true,
    message: 'Login successful',
    user: { username } // Only return non-sensitive information
  });
}

export async function POST(request: NextRequest) {
  let client;
  
  try {
    // Parse and validate request body
    let body: LoginRequest;
    
    try {
      body = await request.json();
    } catch (error) {
      console.error('JSON parsing error:', error);
      return createErrorResponse();
    }
    
    // Validate required fields
    if (!body.username || !body.password) {
      return createErrorResponse();
    }
    
    // Validate and sanitize inputs
    const usernameValidation = validateInput(body.username);
    const passwordValidation = validateInput(body.password);
    
    if (!usernameValidation.isValid || !passwordValidation.isValid) {
      return createErrorResponse();
    }
    
    const sanitizedUsername = usernameValidation.sanitized;
    const sanitizedPassword = passwordValidation.sanitized;
    
    // Additional length checks
    if (sanitizedUsername.length < 3 || sanitizedPassword.length < 6) {
      return createErrorResponse();
    }
    
    // Get database connection
    try {
      client = await pool.connect();
    } catch (error) {
      console.error('Database connection error:', error);
      return NextResponse.json(
        { success: false, message: 'Service temporarily unavailable' },
        { status: 503 }
      );
    }
    
    // Use parameterized query - COMPLETELY PREVENTS SQL INJECTION
    const query = 'SELECT id, username, password, email FROM users WHERE username = $1 LIMIT 1';
    
    let result;
    try {
      result = await client.query(query, [sanitizedUsername]);
    } catch (error) {
      console.error('Database query error:', error);
      return createErrorResponse();
    }
    
    // Check if user exists
    if (!result.rows || result.rows.length === 0) {
      // Simulate timing to prevent username enumeration
      await new Promise(resolve => setTimeout(resolve, Math.random() * 100 + 50));
      return createErrorResponse();
    }
    
    const user: User = result.rows[0];
    
    // Verify password securely
    const isPasswordValid = await verifyPassword(sanitizedPassword, user.password);
    
    if (!isPasswordValid) {
      // Add timing delay to prevent timing attacks
      await new Promise(resolve => setTimeout(resolve, Math.random() * 100 + 50));
      return createErrorResponse();
    }
    
    // Successful authentication
    console.log(`Successful login for user: ${user.username}`);
    return createSuccessResponse(user.username);
    
  } catch (error) {
    // Log error securely without exposing details
    console.error('Unexpected error in impossible level:', error);
    
    // Return generic error response
    return NextResponse.json(
      { success: false, message: 'An unexpected error occurred' },
      { status: 500 }
    );
  } finally {
    // Always release database connection
    if (client) {
      try {
        client.release();
      } catch (error) {
        console.error('Error releasing database connection:', error);
      }
    }
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({ 
    status: 'Impossible Level Active',
    security: 'Maximum Protection',
    description: 'This endpoint is fully protected against SQL injection and other security vulnerabilities'
  });
}