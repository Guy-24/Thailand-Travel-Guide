# 🌴 Thailand Travel Guide (DevOps Project)

ยินดีต้อนรับสู่โปรเจกต์ **Thailand Travel Guide**! แอปพลิเคชันแนะนำสถานที่ท่องเที่ยวในประเทศไทยที่พัฒนาด้วยแนวคิด Modern Web Development และหลักการ DevOps (CI/CD)

---

## 🚀 เทคโนโลยีที่ใช้ (Tech Stack)

### **Backend (API)**
* **Framework:** [FastAPI](https://fastapi.tiangolo.com/) (Python 3.13+)
* **Database:** PostgreSQL (Production) / SQLite (Testing)
* **ORM:** SQLAlchemy 2.0
* **Validation:** Pydantic v2
* **Security:** Google OAuth2 (OpenID Connect) & JWT

### **Frontend**
* **Framework:** React + Vite
* **Language:** JavaScript/TypeScript

---

## 🛠️ การติดตั้งและเริ่มต้นใช้งาน (Getting Started)

### 1. โคลนโปรเจกต์
```bash
git clone [https://github.com/Guy-24/Thailand-Travel-Guide.git](https://github.com/Guy-24/Thailand-Travel-Guide.git)
cd Thailand-Travel-Guide
2. ตั้งค่า Backend
Bash
cd backend
python -m venv venv
# Windows:
.\venv\Scripts\activate
# MacOS/Linux:
source venv/bin/activate

pip install -r requirements.txt
3. ตั้งค่า Environment Variables
สร้างไฟล์ .env ในโฟลเดอร์ backend/ และระบุค่าดังนี้:

Code snippet
DATABASE_URL=your_postgresql_url
secret_key=your_secret_key
Client_ID=your_google_client_id
Client_Secret=your_google_client_secret
🧪 การทดสอบระบบ (Testing)
โปรเจกต์นี้ใช้ Pytest สำหรับการทำ Automated Testing เพื่อตรวจสอบความถูกต้องของ API ทุกครั้งที่มีการแก้ไข

คำสั่งรันเทส:

Bash
cd backend
python -m pytest test_main.py -v
🔄 ระบบ CI/CD (DevOps Pipeline)
เราใช้ GitHub Actions ในการทำ Continuous Integration (CI) เพื่อตรวจสอบโค้ดโดยอัตโนมัติเมื่อมีการ push หรือ pull request ไปยัง branch dev หรือ main

Workflow ขั้นตอนทำงาน:
Setup: ติดตั้ง Python 3.13 และเครื่องมือที่จำเป็น

Dependencies: ติดตั้ง Library ทั้งหมดผ่าน pip

Automated Testing: รันเทสทั้งหมด 10 ข้อ (Users, Places, Reviews, Security)

Security Check: ตรวจสอบความถูกต้องของ Pydantic Settings และ Environment Variables

📂 โครงสร้างโฟลเดอร์ (Folder Structure)
.github/workflows/: เก็บไฟล์ CI/CD (GitHub Actions)

backend/: โค้ดส่วน API ทั้งหมด (Python)

api/: จัดการ Routes แยกตามหมวดหมู่ (User, Place, Review)

core/: ตั้งค่าระบบหลัก Security และ Config

models.py: โครงสร้างตารางฐานข้อมูล

frontend/: โค้ดส่วนหน้าบ้าน (React)

👤 ผู้พัฒนา
Guy-24 (GitHub ID)

CSS497 DevOps Project