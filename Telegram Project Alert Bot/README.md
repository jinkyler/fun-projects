# Telegram PM Alert Bot

ระบบแจ้งเตือนงาน Preventive Maintenance (PM) ผ่าน Telegram โดยใช้ Google Sheets + Google Forms + Google Apps Script

---

## 📌 ความสามารถหลัก

- แจ้งเตือนรายการงาน PM ล่วงหน้าแบบอัตโนมัติผ่าน Telegram
- เจ้าหน้าที่อัพเดทสถานะผ่าน Google Form ได้
- สถานะงานจะถูก Sync กลับมายัง Google Sheet แบบเรียลไทม์
- ใช้งานร่วมกับ Google Apps Script เพื่อทำ Automation

---

## 🧰 สิ่งที่ต้องเตรียม

- Google Account
- Google Sheet สำหรับจัดเก็บรายการงาน
- Google Form สำหรับอัพเดทสถานะ
- Telegram Bot + Chat ID สำหรับรับการแจ้งเตือน
- เปิดใช้งาน Google Apps Script

---

## 📋 โครงสร้าง Google Sheet

> ชื่อไฟล์: `Preventive Maintenance`  
> ชื่อชีท: `info`

| Task | Round | Customer Name | Action | Contact Date | Status | Start Date | End Date | Owner | Google form Link | Incident | Note | File |
|------|-------|----------------|--------|---------------|--------|-------------|-----------|--------|------------------|----------|------|------|

---

## 📄 สร้างและเชื่อม Google Form

### ขั้นตอน:

1. ไปที่ [Google Forms](https://forms.google.com)
2. สร้างฟอร์มใหม่ กำหนดหัวข้อและรูปแบบตามตารางด้านล่าง
3. เชื่อมกับ Google Sheet:
   - กด `Responses > Link to Sheets`
   - เลือก Sheet เดียวกับที่ใช้ (`Preventive Maintenance`)
4. เพิ่ม Script ผ่าน `Extensions > Apps Script` และเขียนฟังก์ชัน `onFormSubmit` --//มีรวมอยู่ใน Code แล้ว

| หัวข้อ             | รูปแบบการกรอกข้อมูล             |
|--------------------|---------------------------------|
| Task Name          | Dropdown หรือ Short answer       |
| Status             | Dropdown (Pending, In Progress, Completed) |
| Additional Notes   | Paragraph (optional)            |

---

## 🤖 สร้าง Telegram Bot และหา Chat ID

### ✅ ขั้นตอนสร้าง Telegram Bot:

1. เปิด Telegram แล้วค้นหา `@BotFather`
2. พิมพ์คำสั่ง `/newbot` แล้วกรอกชื่อ + username
3. จะได้รับ **Bot Token** → บันทึกไว้

### 📌 หา Chat ID:

#### กรณีส่งเข้า *กลุ่ม*:
1. สร้าง Group และเพิ่ม Telegram Bot เข้าไป
2. ส่งข้อความใดก็ได้ในกลุ่ม
3. ไปที่ลิงก์นี้แทน Bot Token และเปิดในเบราว์เซอร์:  
   `https://api.telegram.org/bot<your-bot-token>/getUpdates`
4. มองหา `"chat":{"id":-xxxxxxxxxx,...}` → คัดลอกค่าจาก `id` (ต้องมี `-` ด้านหน้า)

#### กรณีส่งหา *คน*:
1. พิมพ์หา Bot ของคุณ แล้วกด "Start"
2. ทำแบบเดียวกันโดยใช้ลิงก์ `getUpdates` เหมือนด้านบน

---

## ⚙️ ตั้งค่า Google Apps Script

1. เปิด Sheet → `Extensions > Apps Script`
2. สร้างไฟล์ใหม่ เช่น `code.gs`
3. คัดลอกโค้ดจาก [`code.gs`](./code.gs) ไปวาง
4. ปรับค่าในโค้ด:
   - `botToken` → Token ของ Telegram Bot
   - `chatId` → Chat ID ที่ได้จากขั้นตอนก่อนหน้า

---

## ⏰ ตั้งค่า Trigger

1. เปิด Script Editor → กดไอคอน `Triggers (⏰)`
2. เพิ่ม Trigger 2 รายการ:
   - `onFormSubmit` → แบบ “From form” → “On form submit”
   - `sendTelegramNotification` → แบบ “Time-driven” → Daily เวลา 09:00

---

## ✅ ทดสอบระบบ

1. ใส่รายการ Task ในชีท `info`
2. ตั้ง `Start Date` ให้ตรงกับวันปัจจุบัน
3. กรอกฟอร์มเพื่อลองเปลี่ยนสถานะ
4. ตรวจสอบว่า:
   - Telegram ได้รับการแจ้งเตือนหรือไม่
   - สถานะในชีท `info` ถูกอัปเดตหรือไม่

---

## 🧠 ไฟล์ที่เกี่ยวข้อง

- [`code.gs`](./code.gs) – สคริปต์ทั้งหมดสำหรับเชื่อม Sheet, Form, และ Telegram Bot

---

## 💡 แนะนำเพิ่มเติม

- รองรับหลายโปรเจกต์ได้โดยเพิ่มแยกชีทหรือคอลัมน์จัดกลุ่ม
- สามารถสร้างรายงานอัตโนมัติ หรือส่งรายงานสรุปรายเดือนผ่าน Telegram ได้ในอนาคต
- หากใช้หลายภาษา สามารถแยกข้อความหรือ template ไว้ต่างหาก

---

## 🙋‍♂️ ผู้จัดทำ

> 📧 [tjinasri@outlook.co.th](mailto:tjinasri@outlook.co.th)  
> 🌐 [LinkedIn](https://linkedin.com/in/tjinasri)  
> 💼 [Fastwork Profile](https://fastwork.co/user/tjinasri)

---
