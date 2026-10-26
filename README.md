# LINE Photo Vote (HTML + CSS + JavaScript + Supabase)

เว็บพื้นฐานสำหรับกลุ่ม LINE: สมาชิกกรอกชื่อเล่น ส่งรูป และโหวตได้หนึ่งรูปต่อ browser token ต่อกิจกรรม

## ไฟล์
- `index.html` — หน้าเว็บทั้งหมด
- `schema.sql` — สร้างตาราง, RLS policies และ Storage bucket
- `README.md` — คู่มือ

## 1) สร้าง Supabase
1. เข้า https://supabase.com/ แล้วสร้างโปรเจกต์
2. เปิด `SQL Editor` > `New query`
3. วางเนื้อหา `schema.sql` ทั้งหมด แล้วกด Run
4. ไปที่ `Project Settings` > `API` (หรือ Connect) แล้วคัดลอก Project URL และ `anon`/publishable key

## 2) ตั้งค่าเว็บ
เปิด `index.html` ด้วย editor แล้วหา:
```js
const SUPABASE_URL = 'ใส่_PROJECT_URL_ที่นี่';
const SUPABASE_ANON_KEY = 'ใส่_ANON_KEY_ที่นี่';
```
แทนด้วยค่าจริงจากโปรเจกต์ Supabase

ใช้ได้เฉพาะ `anon`/publishable key ในเว็บสาธารณะเท่านั้น **ห้ามใส่ service_role/secret key ใน HTML**.

## 3) เปิดเว็บบนเครื่องเพื่อทดสอบ
เพราะใช้ JavaScript module ให้เปิดผ่าน local web server แทนการดับเบิลคลิกไฟล์:
```bash
python3 -m http.server 8000
```
แล้วเปิด http://localhost:8000

## 4) นำขึ้นออนไลน์ฟรี
วิธีง่ายสุดคือ GitHub Pages:
1. สร้าง repository ใหม่บน GitHub
2. อัปโหลด `index.html` ไปไว้ที่ root ของ repository
3. เข้า Settings > Pages
4. เลือก Deploy from a branch, เลือก `main` และ `/ (root)` แล้ว Save
5. รอ URL จาก GitHub Pages แล้วส่ง URL ลงกลุ่ม LINE

อีกทางคือ Netlify Drop: https://app.netlify.com/drop (ลากไฟล์ `index.html` ไปวาง) ทั้งนี้การเผยแพร่และหน้าตาตั้งค่าอาจเปลี่ยนตามบริการ

## 5) ใช้งาน
- แชร์ลิงก์เว็บในกลุ่ม LINE
- สมาชิกกรอกชื่อเล่นและส่งรูป JPG/PNG/WebP ไม่เกิน 5 MB
- ทุกคนที่มีลิงก์ดูรูปและคะแนนได้
- ผู้ใช้แต่ละ browser token ลงคะแนนได้หนึ่งครั้งต่อกิจกรรม
- รีเฟรชหน้าเพื่ออัปเดตคะแนน

## 6) ปิดโหวต / เปิดรอบใหม่
ใน Supabase > Table Editor > `contests`:
- ปิดรับรูป: ตั้ง `upload_open = false`
- ปิดโหวต: ตั้ง `voting_open = false`
- ปิดกิจกรรม: ตั้ง `status = finished`
- เริ่มรอบใหม่: เพิ่ม row ใหม่ โดยตั้ง `is_current = true`, `upload_open = true`, `voting_open = true`, `status = active`; เปลี่ยนรอบเก่า `is_current = false`

ควรมี `is_current = true` เพียงหนึ่งรายการในเวลาเดียวกัน

## ข้อจำกัดและความปลอดภัย
- นี่คือ starter ที่เรียบง่าย ไม่ใช่ระบบป้องกันการโกงที่แข็งแรง ผู้ใช้ล้าง localStorage/ใช้เบราว์เซอร์อื่นได้
- ชื่อเล่นไม่ได้ยืนยันตัวตน สมาชิกที่รู้ลิงก์สามารถอัปโหลดได้ และทุกคนที่มีลิงก์เห็นรูปได้
- RLS ป้องกันไม่ให้เว็บสาธารณะแก้ไข/ลบกิจกรรมผ่าน client แต่ผู้ดูแลจัดการผ่าน Supabase Dashboard
- Public bucket ทำให้รูปเข้าถึงได้โดย URL; อย่าใช้กับภาพที่เป็นความลับ
- สำหรับเว็บที่ใช้จริง ควรเพิ่ม rate limiting, ตรวจไฟล์ฝั่ง server, จำกัดจำนวน upload ต่อ browser, และระบบ admin ที่มี authentication
- โค้ดนี้เป็น เวอร์ชัน MVP; ทดสอบด้วยรูปทดสอบก่อนแชร์จริง และตรวจโควตา/ราคา Supabase กับ GitHub Pages ปัจจุบัน
