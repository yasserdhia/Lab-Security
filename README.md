# SQL Injection Lab - Cybersecurity Training Platform

A comprehensive, educational SQL injection testing laboratory built with Next.js 14, PostgreSQL, and Docker. This platform provides hands-on experience with various SQL injection techniques in a controlled, ethical environment.

## 🎯 Project Overview

This lab contains **8 progressive levels** of SQL injection vulnerabilities, each designed to teach different attack techniques and defense strategies. From basic string injection to advanced filter evasion, students will master the full spectrum of SQL injection exploitation.

## 🛡️ Educational Purpose

**⚠️ IMPORTANT DISCLAIMER ⚠️**

This project is designed **exclusively for educational and authorized penetration testing purposes**. All vulnerabilities are intentionally implemented for learning. **DO NOT** use these techniques on systems you do not own or have explicit permission to test. Unauthorized access to computer systems is illegal and unethical.

## 🚀 Features

- **8 Progressive Difficulty Levels** - From beginner to expert
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
- **URL**: http://localhost:8080
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
4. **Try different payloads** in the login form
5. **Analyze the responses** to understand the vulnerability
6. **Progress through levels** as you master each technique

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

## 🛡️ Security Note

This application contains **intentional vulnerabilities** for educational purposes. Never deploy in production. Always use parameterized queries, input validation, and proper security practices in real applications.

**Happy Ethical Hacking!** 🎯
This lab is usefull to to lean and test with defirent of vunrlablities with all levels
