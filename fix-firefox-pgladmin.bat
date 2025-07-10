@echo off
REM ===================================================================
REM حل مشكلة Firefox مع pgAdmin - Firefox pgAdmin Fix
REM ===================================================================
REM هذا السكريبت يوضح كيفية حل مشكلة "Not Secure" في Firefox
REM ===================================================================

echo.
echo ========================================
echo  حل مشكلة Firefox مع pgAdmin
echo  Firefox pgAdmin Fix
echo ========================================
echo.

echo 🚨 المشكلة: Firefox يظهر "Not Secure" عند فتح pgAdmin
echo 🎯 الحل: عدة طرق متاحة
echo.

echo ========================================
echo  الحلول المتاحة
echo ========================================
echo.

echo [1] الحل السريع - تجاوز التحذير:
echo     • اذهب إلى: http://localhost:8888
echo     • انقر على "Advanced" أو "متقدم"  
echo     • انقر على "Accept the Risk and Continue"
echo     • ستدخل pgAdmin بنجاح ✅
echo.

echo [2] استخدام Chrome بدلاً من Firefox:
echo     • Chrome يعمل بشكل طبيعي مع localhost
echo     • لا يحتاج تجاوز تحذيرات
echo     • يفتح pgAdmin مباشرة ✅
echo.

echo [3] تغيير إعدادات Firefox:
echo     • اكتب في شريط العناوين: about:config
echo     • ابحث عن: security.tls.insecure_fallback_hosts
echo     • أضف القيمة: localhost:8888
echo     • أعد تشغيل Firefox
echo.

echo ========================================
echo  بيانات دخول pgAdmin
echo ========================================
echo.
echo URL: http://localhost:8888
echo البريد الإلكتروني: admin@sqlilab.com
echo كلمة المرور: admin123
echo.

echo ========================================
echo  اختبار الوصول
echo ========================================
echo.

set /p openChrome=هل تريد فتح pgAdmin في Chrome الآن؟ (Y/N): 

if /i "%openChrome%"=="Y" (
    echo.
    echo 🚀 فتح pgAdmin في Chrome...
    start chrome "http://localhost:8888"
    echo ✅ تم فتح pgAdmin في Chrome!
) else (
    echo.
    echo 📝 يمكنك فتح pgAdmin يدوياً باستخدام:
    echo    Chrome: http://localhost:8888
    echo    Firefox: http://localhost:8888 (مع تجاوز التحذير)
)

echo.
echo ========================================
echo  لماذا تحدث هذه المشكلة؟
echo ========================================
echo.
echo • Firefox أكثر صرامة في الأمان من Chrome
echo • يحذر من HTTP على منافذ غير معتادة
echo • localhost آمن محلياً، لذا التحذير غير مهم
echo • pgAdmin يستخدم HTTP افتراضياً
echo • المختبر مخصص للتعلم فقط
echo.

echo ========================================
echo  النصائح
echo ========================================
echo.
echo ✅ استخدم Chrome للسهولة
echo ✅ في Firefox: اقبل المخاطر وتابع
echo ✅ pgAdmin سيعمل بشكل طبيعي بعد الدخول
echo ✅ هذا طبيعي في بيئة التطوير المحلية
echo.

echo 🎉 pgAdmin جاهز للاستخدام!
echo.

pause
