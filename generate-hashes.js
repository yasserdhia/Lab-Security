// Password Hash Generator for SQL Injection Lab
// This script generates bcrypt hashes for the impossible level

const bcrypt = require('bcryptjs');

async function generateHashes() {
  const passwords = [
    { user: 'admin', password: 'admin123' },
    { user: 'john_doe', password: 'password123' },
    { user: 'jane_smith', password: 'jane2024' },
    { user: 'bob_wilson', password: 'bob123' },
    { user: 'alice_brown', password: 'alice456' }
  ];

  console.log('Generating bcrypt hashes for impossible level...\n');

  for (const entry of passwords) {
    const hash = await bcrypt.hash(entry.password, 12);
    console.log(`${entry.user}: ${entry.password} -> ${hash}`);
  }
}

generateHashes().catch(console.error);
