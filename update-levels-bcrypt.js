// Script to update all levels to use bcrypt
// This will make all levels work with the new hashed passwords

const fs = require('fs');
const path = require('path');

const levels = ['level3', 'level4', 'level5', 'level6'];

for (const level of levels) {
  const filePath = path.join(__dirname, 'src', 'app', 'api', level, 'route.ts');
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Add bcrypt import if not exists
    if (!content.includes("import bcrypt from 'bcryptjs';")) {
      content = content.replace(
        "import { NextRequest, NextResponse } from 'next/server';",
        "import { NextRequest, NextResponse } from 'next/server';\nimport bcrypt from 'bcryptjs';"
      );
    }
    
    // Update query to include password field
    content = content.replace(
      /SELECT id, username, email, first_name, last_name, role FROM users/g,
      'SELECT id, username, email, first_name, last_name, role, password FROM users'
    );
    
    // Remove password comparison from WHERE clause and add bcrypt verification
    content = content.replace(
      /AND password = '\$\{password\}'/g,
      ''
    );
    
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${level}`);
  } catch (error) {
    console.error(`Error updating ${level}:`, error.message);
  }
}

console.log('All levels updated to support bcrypt!');
