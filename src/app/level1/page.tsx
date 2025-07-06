'use client';

import LoginForm from '@/components/LoginForm';
import { LoginCredentials, ApiResponse } from '@/types';

export default function Level1() {
  const handleLogin = async (credentials: LoginCredentials): Promise<ApiResponse> => {
    try {
      const response = await fetch('/api/level1', {
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
    "This level uses basic string concatenation for SQL queries",
    "Try using single quotes (') to break out of the string context",
    "The classic payload ' OR '1'='1' -- should work here",
    "Look for SQL error messages that might reveal database structure",
    "The comment sequence -- will comment out the rest of the query"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyber-dark via-gray-900 to-cyber-dark py-12">
      <div className="container mx-auto px-6">
        <LoginForm
          level={1}
          title="Basic String Injection"
          description="This level demonstrates the most fundamental type of SQL injection vulnerability. The application concatenates user input directly into SQL queries without any sanitization or parameterization."
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
                <h3 className="text-lg font-semibold text-cyber-green mb-3">Vulnerable Code Example:</h3>
                <div className="code-block">
{`// Vulnerable SQL query construction
const query = "SELECT * FROM users WHERE username = '" + username + "' AND password = '" + password + "'";

// When user inputs: admin' OR '1'='1' --
// The query becomes:
// SELECT * FROM users WHERE username = 'admin' OR '1'='1' --' AND password = 'anything'`}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-cyber-green mb-3">Why This Works:</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-cyber-blue mr-2">•</span>
                    The single quote breaks out of the string context
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyber-blue mr-2">•</span>
                    OR '1'='1' creates a condition that's always true
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyber-blue mr-2">•</span>
                    The -- comments out the rest of the query, ignoring the password check
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyber-blue mr-2">•</span>
                    This bypasses authentication entirely
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-cyber-green mb-3">Prevention Methods:</h3>
                <div className="code-block">
{`// Use parameterized queries instead
const query = "SELECT * FROM users WHERE username = $1 AND password = $2";
const result = await pool.query(query, [username, hashedPassword]);

// Or use an ORM with built-in protection
const user = await User.findOne({
  where: {
    username: username,
    password: hashedPassword
  }
});`}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
