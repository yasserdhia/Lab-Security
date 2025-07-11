# SQL Injection Lab - Cybersecurity Training Platform

A comprehensive, educational SQL injection testing laboratory built with Next.j🌐 Frontend: http://localhost:3000
🗄️ pgAdmin GUI: http://localhost:888814, PostgreSQL, and Docker. This platform provides hands-on experience with various SQL injection techniques in a controlled, ethical environment.

## 🎯 Project Overview

This lab contains **8 progressive levels** of SQL injection vulnerabilities, plus a **special "Impossible Level"** that demonstrates maximum security implementation. From basic string injection to advanced filter evasion, students will master the full spectrum of SQL injection exploitation and learn how to defend against these attacks.

## 🛡️ Educational Purpose

**⚠️ IMPORTANT DISCLAIMER ⚠️**

This project is designed **exclusively for educational and authorized penetration testing purposes**. All vulnerabilities are intentionally implemented for learning. **DO NOT** use these techniques on systems you do not own or have explicit permission to test. Unauthorized access to computer systems is illegal and unethical.

## 🚀 Features

- **8 Progressive Difficulty Levels** - From beginner to expert
- **1 Impossible Level** - Maximum security demonstration
- **Interactive Payload Management** - Add, edit, delete, and use SQL injection payloads
- **Real Database Integration** - PostgreSQL with realistic data
- **Modern UI/UX** - Cyberpunk-themed interface with animations
- **Educational Content** - Detailed explanations and prevention methods
- **Docker Support** - Easy deployment and isolation
- **Comprehensive Coverage** - All major SQL injection types
- **Interactive Learning** - Hands-on practice with immediate feedback

## 🏗️ Architecture

```
├── Frontend (Next.js 14 + React 18)
│   ├── Modern TypeScript implementation
│   ├── Tailwind CSS with custom cyberpunk theme
│   └── Responsive design with animations
├── Backend (Next.js API Routes)
│   ├── Intentionally vulnerable endpoints
│   ├── Educational response formatting
│   └── Progressive difficulty scaling
├── Database (PostgreSQL 15)
│   ├── Realistic sample data
│   ├── Multiple tables for complex scenarios
│   └── Production-like schema design
└── Infrastructure (Docker)
    ├── Multi-container setup
    ├── Isolated environment
    └── Easy deployment
```

## 🔐 Security Implementation

### Password Security
- **All password authentication uses bcrypt hashing** for secure password storage
- **Valid login credentials are required** for all levels (SQL injection is in username field)
- **Strong encryption** protects user passwords even when database is compromised
- **Educational Focus**: Learn SQL injection without compromising password security

### Default Credentials
| Username | Password | Role |
|----------|----------|------|
| admin | admin123 | Administrator |
| john_doe | password123 | User |
| jane_smith | password123 | User |
| bob_wilson | password123 | User |
| alice_brown | password123 | Manager |

### Authentication Flow
1. **Username**: Intentionally vulnerable to SQL injection (for learning)
2. **Password**: Secured with bcrypt - cannot be bypassed through SQL injection
3. **Result**: Realistic authentication system with educational vulnerabilities

## 📚 Vulnerability Levels

### Level 1: Basic String Injection 🟢
- **Difficulty**: Beginner
- **Type**: String-based SQL Injection
- **Focus**: Understanding SQL injection fundamentals
- **Key Learning**: String concatenation vulnerabilities

### Level 2: Numeric Injection 🟢
- **Difficulty**: Beginner  
- **Type**: Numeric SQL Injection
- **Focus**: Exploiting numeric fields without quotes
- **Key Learning**: Numeric context manipulation

### Level 3: Union-based Injection 🟡
- **Difficulty**: Intermediate
- **Type**: Union-based SQL Injection
- **Focus**: Data extraction using UNION SELECT
- **Key Learning**: Database enumeration and data exfiltration

### Level 4: Blind Boolean Injection 🟡
- **Difficulty**: Intermediate
- **Type**: Blind SQL Injection
- **Focus**: Inference-based attacks without direct output
- **Key Learning**: Boolean logic exploitation

### Level 5: Time-based Blind Injection 🔴
- **Difficulty**: Advanced
- **Type**: Time-based Blind SQL Injection
- **Focus**: Using time delays for data extraction
- **Key Learning**: Stealth data extraction techniques

### Level 6: Second-order Injection 🔴
- **Difficulty**: Advanced
- **Type**: Second-order SQL Injection
- **Focus**: Exploiting stored data execution
- **Key Learning**: Persistent injection attacks

### Level 7: Error-based Injection 🟣
- **Difficulty**: Expert
- **Type**: Error-based SQL Injection
- **Focus**: Information disclosure through errors
- **Key Learning**: Advanced database fingerprinting

### Level 8: Advanced Filter Bypass 🟣
- **Difficulty**: Expert
- **Type**: Filter Evasion
- **Focus**: WAF bypass and advanced payloads
- **Key Learning**: Sophisticated evasion techniques

### 🔒 Impossible Level: Maximum Security 🟢
- **Difficulty**: Demonstration
- **Type**: Secure Implementation
- **Focus**: Complete SQL injection immunity
- **Key Learning**: Production-ready security practices
- **Features**: 
  - Parameterized queries with full separation of code and data
  - Comprehensive input validation and sanitization
  - Secure password hashing with bcrypt
  - Generic error handling without information disclosure
  - Timing attack prevention
  - No rate limiting (demonstrates security without functionality loss)
- **Challenge**: Try ANY SQL injection attack - they will all fail!
- **Documentation**: See `IMPOSSIBLE_LEVEL_GUIDE.md` for detailed security analysis

## 🛠️ Quick Start

### Prerequisites

- **Docker** and **Docker Compose**
- **Node.js 18+** (for local development)
- **Git**

### 🚀 Docker Deployment (Recommended)

1. **Clone the repository**
```bash
git clone https://github.com/your-username/Lab-Security.git
cd Lab-Security
```

2. **Start the application**
```bash
docker-compose up -d
```

3. **Access the application**
```
🌐 Frontend: http://localhost:3000
� pgAdmin GUI: http://localhost:8080
�🗄️ Database: localhost:5432
```

### 🔧 pgAdmin Database Management

The lab includes **pgAdmin 4** for easy database management through a web interface.

**pgAdmin Access:**
- **URL**: http://localhost:8888
- **Email**: admin@sqlilab.com
- **Password**: admin123

**Pre-configured Database Connection:**
- **Name**: SQL Injection Lab Database
- **Host**: db (automatically configured)
- **Port**: 5432
- **Database**: sqli_lab
- **Username**: postgres
- **Password**: password

The database connection is automatically configured when you start pgAdmin!

4. **Initialize database (if needed)**
```bash
npm run db:init
```

## 🎮 Usage Guide

### Getting Started

1. **Visit the home page** at `http://localhost:3000`
2. **Choose your starting level** (recommend Level 1 for beginners)
3. **Read the level description** and hints carefully
4. **Use the interactive payload manager** to test different SQL injection payloads
5. **Analyze the responses** to understand the vulnerability
6. **Progress through levels** as you master each technique

### 🎯 Interactive Payload Management

Each level now includes a powerful payload management system:

#### **View & Use Payloads**
- Click "Show Payloads" to see all available SQL injection payloads
- Click any payload to automatically fill the username field
- Perfect for quick testing and learning

#### **Manage Your Payloads**
- Click "Manage" to enable advanced payload management
- **Add**: Create custom payloads for specific scenarios
- **Edit**: Modify existing payloads with inline editing
- **Delete**: Remove payloads you don't need
- **Hover Effects**: Edit/delete options appear on hover

#### **Features**
- **Duplicate Prevention**: Can't add the same payload twice
- **Real-time Validation**: Immediate feedback on payload status
- **Keyboard Shortcuts**: Enter to save, Escape to cancel
- **Session Persistence**: Changes persist during your session

### Common Payloads to Try

```sql
-- Basic Authentication Bypass
' OR '1'='1' --
' OR 1=1 --
admin' --

-- Union-based Data Extraction
' UNION SELECT username, password FROM users --
' UNION SELECT version(), user() --

-- Boolean Blind Injection
' AND (SELECT COUNT(*) FROM users) > 0 --
' AND 1=1 --

-- Time-based Blind Injection
'; SELECT pg_sleep(5) --
' AND (SELECT COUNT(*) FROM pg_sleep(5)) --
```

## 🚀 Run the Project

```bash
# Install dependencies
npm install

# Start with Docker (recommended)
docker-compose up -d

# Or run locally
npm run dev

# Access at http://localhost:3000
```

## 🔍 Security Analysis with SonarQube

This project includes **SonarQube integration** for comprehensive security scanning:

### Quick Start with SonarQube:
```bash
# Start SonarQube
docker-compose -f docker-compose.sonarqube.yml up -d

# Install SonarQube Scanner
npm install -g sonarqube-scanner

# Run security analysis
run-sonar-scan.bat
```

**SonarQube Dashboard**: http://localhost:9000
- **Login**: admin / admin (change on first login)
- **Expected Results**: The scanner will detect intentional vulnerabilities for educational purposes

📋 **Detailed Guide**: See `SONARQUBE_QUICKSTART.md` for step-by-step instructions.

## 🛡️ Security Note

This application contains **intentional vulnerabilities** for educational purposes. Never deploy in production. Always use parameterized queries, input validation, and proper security practices in real applications.

**Happy Ethical Hacking!** 🎯
This lab is usefull to to lean and test with defirent of vunrlablities with all levels
