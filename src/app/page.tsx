import Link from 'next/link';
import { VulnerabilityLevel } from '@/types';

const vulnerabilityLevels: VulnerabilityLevel[] = [
  {
    id: 1,
    title: 'Basic String Injection',
    description: 'Simple SQL injection using string concatenation. Learn the fundamentals of how SQL injection works.',
    difficulty: 'Beginner',
    vulnerabilityType: 'String-based SQL Injection',
    hints: [
      'Try using single quotes in your input',
      'Look for error messages that reveal database structure',
      'Common payloads: \' OR \'1\'=\'1\' --'
    ]
  },
  {
    id: 2,
    title: 'Numeric Injection',
    description: 'SQL injection in numeric fields without quotes. Understand how numeric contexts can be exploited.',
    difficulty: 'Beginner',
    vulnerabilityType: 'Numeric SQL Injection',
    hints: [
      'No quotes needed for numeric injection',
      'Try: 1 OR 1=1',
      'Union-based attacks work well here'
    ]
  },
  {
    id: 3,
    title: 'Union-based Injection',
    description: 'Extract data using UNION SELECT statements. Learn advanced data extraction techniques.',
    difficulty: 'Intermediate',
    vulnerabilityType: 'Union-based SQL Injection',
    hints: [
      'Determine the number of columns first',
      'Use UNION SELECT to extract data',
      'Try: \' UNION SELECT username, password FROM users --'
    ]
  },
  {
    id: 4,
    title: 'Blind Boolean Injection',
    description: 'Extract data when no direct output is visible. Master inference-based attacks.',
    difficulty: 'Intermediate',
    vulnerabilityType: 'Blind SQL Injection',
    hints: [
      'Use boolean logic to infer data',
      'Try: \' AND (SELECT COUNT(*) FROM users) > 0 --',
      'Automate with tools like sqlmap'
    ]
  },
  {
    id: 5,
    title: 'Time-based Blind Injection',
    description: 'Use time delays to extract information. Learn stealth data extraction methods.',
    difficulty: 'Advanced',
    vulnerabilityType: 'Time-based Blind SQL Injection',
    hints: [
      'Use pg_sleep() for PostgreSQL',
      'Try: \'; SELECT CASE WHEN (1=1) THEN pg_sleep(5) ELSE pg_sleep(0) END --',
      'Measure response times to infer data'
    ]
  },
  {
    id: 6,
    title: 'Second-order Injection',
    description: 'Exploit stored data that gets executed later. Understand persistent injection attacks.',
    difficulty: 'Advanced',
    vulnerabilityType: 'Second-order SQL Injection',
    hints: [
      'Payload gets stored and executed later',
      'Look for profile update functionality',
      'Try storing malicious data in user fields'
    ]
  },
  {
    id: 7,
    title: 'Error-based Injection',
    description: 'Extract data through database error messages. Learn information disclosure techniques.',
    difficulty: 'Expert',
    vulnerabilityType: 'Error-based SQL Injection',
    hints: [
      'Use extractvalue() or updatexml() functions',
      'Force errors to reveal data',
      'Try: \' AND extractvalue(1, concat(0x7e, (SELECT version()), 0x7e)) --'
    ]
  },
  {
    id: 8,
    title: 'Advanced Filter Bypass',
    description: 'Bypass WAFs and input filters. Master evasion techniques and advanced payloads.',
    difficulty: 'Expert',
    vulnerabilityType: 'Filter Evasion',
    hints: [
      'Use encoding techniques (URL, hex, etc.)',
      'Try comment variations: /**/, #, --+',
      'Use alternative syntax: UNION/**/SELECT'
    ]
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyber-dark via-gray-900 to-cyber-dark">
      {/* Header */}
      <header className="border-b border-cyber-blue/30 backdrop-blur-sm bg-black/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-lg flex items-center justify-center">
                <span className="text-xl font-bold text-black">🛡️</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-cyber-blue">SQL Injection Lab</h1>
                <p className="text-sm text-gray-400">Cybersecurity Training Platform</p>
              </div>
            </div>
            <div className="scanning-line">
              <span className="text-cyber-green font-mono text-sm">
                [SYSTEM STATUS: ONLINE]
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-green bg-clip-text text-transparent">
            Master SQL Injection Techniques
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Welcome to the most comprehensive SQL injection testing laboratory. 
            Practice ethical hacking techniques in a controlled environment with 
            progressively challenging vulnerability scenarios.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/level1" 
              className="cyber-button px-8 py-3 rounded-lg font-semibold transition-all duration-300"
            >
              Start Level 1
            </Link>
            <button className="border-2 border-cyber-blue text-cyber-blue px-8 py-3 rounded-lg font-semibold hover:bg-cyber-blue hover:text-black transition-all duration-300">
              View Documentation
            </button>
          </div>
        </section>

        {/* Warning Banner */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-cyber-red/20 to-orange-500/20 border border-cyber-red/50 rounded-lg p-6">
            <div className="flex items-center gap-4">
              <span className="text-3xl">⚠️</span>
              <div>
                <h3 className="text-xl font-bold text-cyber-red mb-2">Educational Purpose Only</h3>
                <p className="text-gray-300">
                  This laboratory is designed for educational and authorized penetration testing purposes only. 
                  Do not use these techniques on systems you do not own or have explicit permission to test.
                  Unauthorized access to computer systems is illegal and unethical.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Vulnerability Levels Grid */}
        <section>
          <h3 className="text-3xl font-bold mb-8 text-center text-cyber-blue">
            Vulnerability Levels
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {vulnerabilityLevels.map((level) => (
              <Link key={level.id} href={`/level${level.id}`}>
                <div className="vulnerability-card rounded-lg p-6 h-full hover:scale-105 transition-all duration-300 cursor-pointer">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-cyber-blue">
                      Level {level.id}
                    </span>
                    <span className={`level-badge level-${level.difficulty.toLowerCase()}`}>
                      {level.difficulty}
                    </span>
                  </div>
                  
                  <h4 className="text-lg font-semibold mb-3 text-white">
                    {level.title}
                  </h4>
                  
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {level.description}
                  </p>
                  
                  <div className="border-t border-cyber-blue/30 pt-4">
                    <p className="text-xs text-cyber-green font-mono">
                      {level.vulnerabilityType}
                    </p>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">
                        {level.hints.length} hints available
                      </span>
                      <span className="text-cyber-blue">
                        Click to start →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Statistics Section */}
        <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-cyber-blue/10 rounded-lg border border-cyber-blue/30">
            <div className="text-3xl font-bold text-cyber-blue mb-2">8</div>
            <div className="text-gray-400">Vulnerability Levels</div>
          </div>
          <div className="text-center p-6 bg-cyber-green/10 rounded-lg border border-cyber-green/30">
            <div className="text-3xl font-bold text-cyber-green mb-2">25+</div>
            <div className="text-gray-400">Attack Techniques</div>
          </div>
          <div className="text-center p-6 bg-cyber-purple/10 rounded-lg border border-cyber-purple/30">
            <div className="text-3xl font-bold text-cyber-purple mb-2">100%</div>
            <div className="text-gray-400">Hands-on Learning</div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-cyber-blue/30 mt-20">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center text-gray-400">
            <p className="mb-2">
              © 2025 SQL Injection Lab | Educational Security Platform
            </p>
            <p className="text-sm">
              Built with Next.js, PostgreSQL, and Docker for comprehensive cybersecurity education
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
