# pgAdmin Database Management Guide

## 🔧 pgAdmin Access

**pgAdmin Web Interface**: http://localhost:8888

### Login Credentials
- **Email**: admin@sqlilab.com
- **Password**: admin123

## 🏗️ Pre-configured Database Connection

The database connection is automatically configured for you! You should see:

**Server Name**: "SQL Injection Lab Database"

### Manual Connection (if needed)
If the server doesn't appear automatically, add it manually:

1. **Right-click** on "Servers" in the left panel
2. **Select** "Create" > "Server..."
3. **Fill in the details**:
   - **Name**: SQL Injection Lab Database
   - **Host**: db
   - **Port**: 5432
   - **Maintenance database**: sqli_lab
   - **Username**: postgres
   - **Password**: password

## 📊 Database Structure

### Tables Available:
- **users** - User accounts with authentication data
- **products** - E-commerce product catalog
- **orders** - Customer order records
- **logs** - Activity logging table
- **comments** - User comments and posts

### Key Features:
- **Realistic Data** - Each table contains sample data for testing
- **Vulnerable Queries** - Use pgAdmin to see what the API queries return
- **Educational Insights** - Compare secure vs vulnerable query results

## 🎯 Using pgAdmin for SQL Injection Learning

### 1. **Monitor Queries**
- Watch the query execution in the web app logs
- Use pgAdmin to run the same queries manually
- See how injection payloads affect results

### 2. **Test Payloads**
- Copy queries from the web app console logs
- Modify them in pgAdmin's Query Tool
- Test different SQL injection techniques safely

### 3. **Understand Database Structure**
- Browse tables and their relationships
- See what sensitive data exists
- Plan more sophisticated attacks

### 4. **Verify Exploits**
- Check if your SQL injection actually worked
- View extracted data in a clear format
- Understand the impact of successful attacks

## 🔍 Example Usage

1. **Try an injection** on the web app (e.g., Level 1)
2. **Check the console logs** to see the executed query
3. **Open pgAdmin** and navigate to the Query Tool
4. **Run the same query** to see the results
5. **Modify the query** to test different payloads
6. **Explore table structure** to find other attack vectors

## 💡 Pro Tips

- Use the **Query Tool** (Tools > Query Tool) for custom SQL
- **Bookmark** commonly used queries
- Use **Table Properties** to understand column types and constraints
- Check **Dependencies** to see table relationships
- Monitor **Server Activity** to see all database connections

---

Happy learning and stay ethical! 🛡️
