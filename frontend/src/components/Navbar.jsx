import { useState, useEffect } from "react";

export default function Navbar({
  user,
  onLogout,
  searchQuery,
  setSearchQuery,
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [editName, setEditName] = useState(user?.name || "");
  const [isConfirmDelete, setIsConfirmDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (isProfileModalOpen) {
      setEditName(user?.name || "");
      setIsConfirmDelete(false);
      setErrorMsg("");
    }
  }, [isProfileModalOpen, user]);

  const handleUpdateProfile = async () => {
    if (!editName.trim()) return setErrorMsg("กรุณากรอกชื่อผู้ใช้");
    if (editName === user.name) return setIsProfileModalOpen(false);

    setIsLoading(true);
    setErrorMsg("");
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";
      const res = await fetch(`${apiUrl}/api/user/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ user_name: editName }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        let errorMessage = "ไม่สามารถอัปเดตข้อมูลได้";
        
        // ตรวจสอบโครงสร้างของ Error ที่ส่งมาจาก FastAPI
        if (errorData.detail) {
          if (typeof errorData.detail === "string") {
            errorMessage = errorData.detail;
          } else if (Array.isArray(errorData.detail)) {
            // กรณีเป็น 422 Validation Error จาก Pydantic
            errorMessage = errorData.detail[0].msg; 
          } else {
            errorMessage = JSON.stringify(errorData.detail);
          }
        }
        throw new Error(errorMessage);
      }

      const updatedUser = await res.json();

      // อัปเดต State หลักของแอปและ LocalStorage
      const newUserObj = { ...user, name: updatedUser.user_name };
      localStorage.setItem("tourism_user", JSON.stringify(newUserObj));

      setIsProfileModalOpen(false);

      window.location.reload();
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsLoading(true);
    setErrorMsg("");
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";
      const res = await fetch(`${apiUrl}/api/user/${user.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || "ไม่สามารถลบบัญชีได้");
      }

      console.log("ลบข้อมูลใน DB สำเร็จ! กำลังจะเรียก handleLogout");

      // ปิด Modal และทำการ Logout ทันที
      setIsProfileModalOpen(false);

      setUser(null);
      localStorage.removeItem("tourism_user");
      window.history.replaceState({}, document.title, window.location.pathname);
      
    } catch (err) {
      console.error("ระบบเกิด Error และกระโดดมาที่ catch:", err);
      setErrorMsg(err.message);
      setIsLoading(false);
    }
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 shrink-0">
          <div className="w-9 h-9 bg-emerald-600 rounded-full flex items-center justify-center text-lg font-black text-white"></div>
          <div className="hidden sm:block">
            <span className="text-lg font-bold text-emerald-700 leading-none">
              TTG
            </span>
            <span className="block text-xs text-gray-400 leading-none">
              Thailand Travel Guide
            </span>
          </div>
        </a>

        {/* Search */}
        <div className="flex-1 max-w-xl relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ค้นหาสถานที่ท่องเที่ยว..."
            className="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:bg-white transition"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-1 text-sm font-medium text-gray-600">
          <a
            href="#"
            className="px-3 py-2 rounded-lg hover:bg-emerald-50 hover:text-emerald-700 transition"
          >
            แผนการเดินทาง
          </a>
          <a
            href="#"
            className="px-3 py-2 rounded-lg hover:bg-emerald-50 hover:text-emerald-700 transition"
          >
            รีวิว
          </a>
          <a
            href="#"
            className="px-3 py-2 rounded-lg hover:bg-emerald-50 hover:text-emerald-700 transition"
          >
            ทริปของฉัน
          </a>
        </div>

        {/* User */}
        <div className="relative shrink-0">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-100 transition"
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-7 h-7 rounded-full"
            />
            <span className="hidden sm:block text-sm font-medium text-gray-700 max-w-24 truncate">
              {user.name}
            </span>
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-1 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-800 truncate">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
              <a
                onClick={() => setIsProfileModalOpen(true)}
                className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <span>👤</span> แก้ไขโปรไฟล์
              </a>
              <hr className="my-1 border-gray-100" />
              <button
                onClick={onLogout}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <span>🚪</span> ออกจากระบบ
              </button>
            </div>
          )}
        </div>
      </div>


      {/* Profile Modal */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 m-4 relative animate-fade-in-up">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">จัดการโปรไฟล์</h2>
              <button
                onClick={() => setIsProfileModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                {errorMsg}
              </div>
            )}

            {/* โหมดแก้ไขปกติ */}
            {!isConfirmDelete ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ชื่อผู้ใช้งาน (Username)
                  </label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    disabled={isLoading}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  />
                </div>

                <div className="pt-4 flex flex-col gap-3">
                  <button
                    onClick={handleUpdateProfile}
                    disabled={isLoading}
                    className="w-full py-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 font-semibold transition-colors disabled:opacity-50"
                  >
                    {isLoading ? "กำลังบันทึก..." : "บันทึกการเปลี่ยนแปลง"}
                  </button>

                  {/* ปุ่มลบบัญชี จะเปลี่ยน UI ไปหน้าต่างยืนยัน */}
                  <button
                    onClick={() => setIsConfirmDelete(true)}
                    disabled={isLoading}
                    className="w-full py-2 text-red-600 hover:bg-red-50 rounded-xl font-medium transition-colors"
                  >
                    ลบบัญชีผู้ใช้
                  </button>
                </div>
              </div>
            ) : (
              /* โหมดยืนยันการลบ */
              <div className="space-y-4">
                <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                  <h3 className="text-red-800 font-bold mb-1">
                    คุณแน่ใจหรือไม่?
                  </h3>
                  <p className="text-red-600 text-sm leading-relaxed">
                    การกระทำนี้ไม่สามารถย้อนกลับได้
                    ข้อมูลการเดินทางและประวัติทั้งหมดของคุณจะถูกลบออกจากระบบทันที
                  </p>
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    onClick={() => setIsConfirmDelete(false)}
                    disabled={isLoading}
                    className="flex-1 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 font-medium transition-colors disabled:opacity-50"
                  >
                    ยกเลิก
                  </button>
                  <button
                    onClick={handleDeleteAccount}
                    disabled={isLoading}
                    className="flex-1 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 font-semibold transition-colors disabled:opacity-50"
                  >
                    {isLoading ? "กำลังลบ..." : "ยืนยันการลบ"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
