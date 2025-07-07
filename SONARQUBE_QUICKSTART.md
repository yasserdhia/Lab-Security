# 🚀 البدء السريع مع SonarQube

## الخطوات المطلوبة:

### 1. تشغيل SonarQube ✅
```bash
docker-compose -f docker-compose.sonarqube.yml up -d
```

### 2. الوصول لـ SonarQube
- افتح: http://localhost:9000
- تسجيل الدخول: `admin` / `admin`
- ⚠️ سيطلب تغيير كلمة المرور

### 3. إنشاء مشروع جديد
1. اضغط "Create Project"
2. اختر "Manually"
3. أدخل:
   - **Project Key**: `sql-injection-lab`
   - **Display Name**: `SQL Injection Lab - Security Analysis`
4. اضغط "Set Up"

### 4. إنشاء Token
1. اختر "Locally"
2. أدخل Token name: `sql-injection-lab-token`
3. اضغط "Generate"
4. 📋 **انسخ الـ Token** (ستحتاجه لاحقاً)

### 5. تشغيل الفحص
```bash
# استخدم السكريپت الجاهز
run-sonar-scan.bat

# أو استخدم الأمر المباشر
sonar-scanner -Dsonar.login=YOUR_TOKEN_HERE
```

---

## 📊 النتائج المتوقعة

سيجد SonarQube في هذا المشروع:

### 🔴 ثغرات أمنية (مقصودة):
- **SQL Injection** في جميع المستويات
- **Hardcoded passwords** في قاعدة البيانات
- **Missing input validation**
- **Direct SQL queries** بدون parameterization

### 🟡 مشاكل الأمان:
- **Sensitive data exposure**
- **Weak authentication** mechanisms
- **Information disclosure**
- **Debug information** in responses

### 🟠 جودة الكود:
- **Code complexity**
- **Duplicated code**
- **Type safety** issues
- **Best practices** violations

---

## 🎯 الهدف التعليمي

هذا المشروع **مصمم خصيصاً** لإظهار الثغرات الأمنية!

النتائج السيئة في SonarQube هي **مقصودة** لأغراض التعليم:
- ✅ تعلم كيفية اكتشاف الثغرات
- ✅ فهم تقارير الأمان
- ✅ معرفة كيفية إصلاح المشاكل
- ✅ التدرب على أدوات الفحص الأمني

---

**Happy Security Testing!** 🔒
