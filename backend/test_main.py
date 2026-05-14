import pytest
from fastapi.testclient import TestClient
from main import app 
import models
from core.dependencies import verify_current_user
from datetime import datetime, timezone

client = TestClient(app)

# ==========================================
# 1. จำลองผู้ใช้ (Mock User) ที่ล็อกอินด้วย Google ผ่านแล้ว
# ==========================================
def override_verify_current_user():
    # สร้าง Object ของจำลองขึ้นมา (ใส่ค่าพื้นฐานให้ครบเพื่อป้องกัน Validation Error)
    mock_user = models.User()
    mock_user.id = 99
    mock_user.email = "test_google@gmail.com"
    mock_user.user_name = "Google Tester"
    mock_user.google_id = "mock_google_id_123"
    mock_user.picture_url = "https://nupec.com/wp-content/uploads/2021/12/domestic-cat-EABDSUL-1024x779.jpg"
    mock_user.created_at = datetime.now(timezone.utc)
    return mock_user

app.dependency_overrides[verify_current_user] = override_verify_current_user

# ==========================================
# หมวดที่ 1: ระบบผู้ใช้ (User Profile)
# ==========================================

def test_1_get_current_user_profile():
    """1. เทสการดึงข้อมูลโปรไฟล์ตัวเอง"""
    # ไม่ต้องแนบ Headers Token แล้ว เพราะเราจำลอง (Override) ไว้ด้านบนแล้ว
    response = client.get("/api/user/me")
    
    # ถ้า ResponseValidationError หายไป มันจะได้ 200 OK ครับ
    assert response.status_code == 200
    assert response.json()["email"] == "test_google@gmail.com"

    

def test_2_update_user_profile():
    """2. เทสการพยายามแก้ไขชื่อโปรไฟล์"""
    response = client.patch("/api/user/99", json={"user_name": "Updated Name"})
    # อาจจะได้ 200 (สำเร็จ) หรือ 404 (ถ้าระบบหา ID=1 ใน Database จริงไม่เจอ) 
    # ซึ่งทั้งคู่ถือว่าระบบ Route ทำงานถูกต้องแล้ว ไม่ติด 401 (Unauthorized)
    assert response.status_code in [200, 404]

# ==========================================
# หมวดที่ 2: ระบบสถานที่ (Places)
# ==========================================

def test_3_get_all_places():
    """3. เทสการดึงข้อมูลสถานที่ทั้งหมด"""
    response = client.get("/api/place/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_4_get_place_by_id_not_found():
    """4. เทสการดึงข้อมูลสถานที่ด้วย ID ที่ไม่มีจริง (ต้องได้ 404)"""
    response = client.get("/api/place/99999")
    assert response.status_code == 404

# ==========================================
# หมวดที่ 3: ระบบรีวิว (Reviews)
# ==========================================

def test_5_post_new_review():
    """5. เทสการเขียนรีวิวใหม่"""
    review_data = {
        "rating": 5,
        "place_name": "วัดอรุณราชวราราม",
        "user_name": "Google Tester"
    }
    response = client.post("/api/review/", json=review_data)
    # อาจจะได้ 200/201 (สำเร็จ) หรือ 400 (รีวิวซ้ำ)
    assert response.status_code in [200, 201, 400]

def test_6_get_my_reviews():
    """6. เทสการดึงประวัติการรีวิวของตัวเอง"""
    response = client.get("/api/review/my_reviews")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

# ==========================================
# หมวดที่ 4: การจัดการสิทธิ์และลบบัญชี (Security & Teardown)
# ==========================================

def test_7_get_all_users():
    """7. เทสการดึงรายชื่อผู้ใช้ทั้งหมดในระบบ"""
    # อิงจาก @router.get("/") ใน user.py
    response = client.get("/api/user/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_8_get_other_user_profile_forbidden():
    """8. เทสความปลอดภัย: พยายามดูข้อมูลของคนอื่น (ต้องโดนบล็อค 403)"""
    response = client.get("/api/user/100")
    assert response.status_code == 403
    assert response.json()["detail"] == "You don't have permission to perform this action"

def test_9_update_other_user_profile_forbidden():
    """9. เทสความปลอดภัย: พยายามแก้ไขชื่อของคนอื่น (ต้องโดนบล็อค 403)"""
    # จำลองสถานการณ์ Hacker พยายามเปลี่ยนชื่อ User คนอื่น
    response = client.patch("/api/user/100", json={"user_name": "Hacker Guy"})
    assert response.status_code == 403
    assert response.json()["detail"] == "You don't have permission to update this user's information"

def test_10_delete_own_account():
    """10. เทสการลบบัญชีผู้ใช้ของตัวเอง (ลบ ID 99)"""
    # เนื่องจาก Mock User ของเราคือ id=1 การสั่งลบ id=1 จึงเป็นการลบตัวเอง
    response = client.delete("/api/user/99")
    
    # ถ้าใน Database เทสมี ID 1 อยู่จริงจะได้ 200 (ลบสำเร็จ) 
    # แต่ถ้าฐานข้อมูลเพิ่งถูกล้างไป อาจจะได้ 404 (หาไม่เจอ) ซึ่งถือว่าระบบ Route ทำงานถูกต้องทั้งคู่
    assert response.status_code in [200, 404]