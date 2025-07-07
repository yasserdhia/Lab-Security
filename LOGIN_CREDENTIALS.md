# 🔐 دليل بيانات الاعتماد لجميع المستويات

## ✅ بيانات الاعتماد الصحيحة

### 👤 حسابات المستخدمين المتاحة:
1. **Admin Account**: `admin` / `admin123` (ID: 1)
2. **John Doe**: `john_doe` / `password` (ID: 2)  
3. **Jane Smith**: `jane_smith` / `password123` (ID: 3)
4. **Bob Wilson**: `bob_wilson` / `pass123` (ID: 4)
5. **Alice Brown**: `alice_brown` / `alice2024` (ID: 5)

---

## 🎯 متطلبات كل مستوى

### **المستوى 1 - String-based Injection**
- **Username**: `admin` أو أي اسم مستخدم
- **Password**: `admin123` أو كلمة المرور المقابلة
- **مثال صحيح**: admin/admin123

### **المستوى 2 - Numeric Injection** 
- **Username**: يقبل اسم المستخدم أو ID رقمي
- **Password**: كلمة المرور المقابلة
- **أمثلة صحيحة**: 
  - `admin`/`admin123`
  - `1`/`admin123` (استخدام ID)
  - `2`/`password` (John Doe)

### **المستوى 3 - UNION-based Injection**
- **Username**: `admin` أو أي اسم مستخدم
- **Password**: `admin123` أو كلمة المرور المقابلة
- **مثال صحيح**: admin/admin123

### **المستوى 4 - Blind Boolean Injection**
- **Username**: `admin` أو أي اسم مستخدم
- **Password**: `admin123` أو كلمة المرور المقابلة
- **مثال صحيح**: admin/admin123

### **المستوى 5 - Time-based Blind Injection**
- **Username**: `admin` أو أي اسم مستخدم
- **Password**: `admin123` أو كلمة المرور المقابلة
- **مثال صحيح**: admin/admin123

### **المستوى 6 - Second-order Injection**
- **Username**: `admin` أو أي اسم مستخدم
- **Password**: `admin123` أو كلمة المرور المقابلة
- **مثال صحيح**: admin/admin123

---

## 🧪 اختبار سريع لجميع المستويات

```bash
# المستوى 1
curl -X POST -H "Content-Type: application/json" -d '{"username":"admin","password":"admin123"}' http://localhost:3000/api/level1

# المستوى 2 (مع اسم المستخدم)
curl -X POST -H "Content-Type: application/json" -d '{"username":"admin","password":"admin123"}' http://localhost:3000/api/level2

# المستوى 2 (مع ID رقمي)
curl -X POST -H "Content-Type: application/json" -d '{"username":"1","password":"admin123"}' http://localhost:3000/api/level2

# المستوى 3
curl -X POST -H "Content-Type: application/json" -d '{"username":"admin","password":"admin123"}' http://localhost:3000/api/level3

# المستوى 4
curl -X POST -H "Content-Type: application/json" -d '{"username":"admin","password":"admin123"}' http://localhost:3000/api/level4

# المستوى 5
curl -X POST -H "Content-Type: application/json" -d '{"username":"admin","password":"admin123"}' http://localhost:3000/api/level5

# المستوى 6
curl -X POST -H "Content-Type: application/json" -d '{"username":"admin","password":"admin123"}' http://localhost:3000/api/level6
```

---

## 🎉 كل المستويات تعمل الآن بشكل صحيح!

جميع المستويات تدعم تسجيل الدخول الصحيح مع البيانات المذكورة أعلاه. يمكنك استخدام أي من الحسابات المتاحة للاختبار.
