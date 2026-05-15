import { useState, useEffect, useRef } from "react";
import { useGoogleLogin } from "@react-oauth/google";

export default function LoginPage({ onLogin }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const hasFetched = useRef(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code && !hasFetched.current) {
      hasFetched.current = true;
      
      window.history.replaceState({}, document.title, window.location.pathname);
      handleCallbackFromGoogle(code);
    }
  }, []);

  // ฟังก์ชันสำหรับส่ง Code ไปแลก Token ที่ Backend
  const handleCallbackFromGoogle = async (code) => {
    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";
      
      const res = await fetch(`${apiUrl}/api/user/auth/callback?code=${code}`, {
        method: "GET",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || "การยืนยันตัวตนล้มเหลว");
      }

      const data = await res.json();

      // ลบ Code ออกจาก URL เพื่อไม่ให้รกและป้องกันการโหลดซ้ำ
      window.history.replaceState({}, document.title, window.location.pathname);

      // ส่งข้อมูลเข้าสู่ระบบไปยัง Component หลัก
      onLogin({
        id: data.id,
        name: data.user_name,
        avatar: data.picture_url,
        token: data.access_token,
        provider: "google",
      });
      
    } catch (err) {
      setError(err.message || "ไม่สามารถเชื่อมต่อกับระบบได้");
    } finally {
      setLoading(false);
    }
  };

  // จัดการ Google Login เชื่อมต่อกับ FastAPI Backend
  const handleGoogleLogin = useGoogleLogin({
    flow: "auth-code",
    ux_mode: "redirect",
    redirect_uri: window.location.origin,
  });

  return (
    <div className="min-h-screen flex">
      {/* Left panel (Branding & Decorative) */}
      <div
        className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 text-white relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #064e3b 0%, #065f46 40%, #047857 70%, #059669 100%)",
        }}
      >
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/5 rounded-full" />
        <div className="absolute top-1/3 -right-10 w-60 h-60 bg-emerald-300/10 rounded-full" />
        <div className="absolute bottom-10 left-1/4 w-40 h-40 bg-teal-400/10 rounded-full" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center text-2xl font-black text-emerald-900"></div>
            <span className="text-2xl font-bold tracking-wide">
              Thailand Travel Guide
            </span>
          </div>
          <p className="text-emerald-200 text-sm">
            มัดรวมแหล่งท่องเที่ยวทั่วไทยสำหรับคุณ
          </p>
        </div>

        <div className="relative z-10 space-y-6 ">
          <h2 className="text-4xl font-bold leading-tight">
            สำรวจ
            <br />
            <span className="text-amber-300 ">ความงาม</span>
            <br />
            ของไทย
          </h2>
          <p className="text-emerald-200 text-base leading-relaxed max-w-xs">
            ค้นพบสถานที่ท่องเที่ยวกว่า 500 แห่งทั่วทุกภาค
            พร้อมรีวิวจากนักท่องเที่ยวจริง
          </p>

          <div className="flex gap-6 text-sm">
            <div>
              <div className="text-2xl font-bold text-amber-300">500+</div>
              <div className="text-emerald-300">สถานที่</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-300">77</div>
              <div className="text-emerald-300">จังหวัด</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-300">5</div>
              <div className="text-emerald-300">ภูมิภาค</div>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex gap-3">
          {["🌊 ชายหาด", "🏔️ ภูเขา", "🏛️ วัด", "🌿 ธรรมชาติ"].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm text-emerald-100 border border-white/20"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Right panel (Auth Section) */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
          
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              ยินดีต้อนรับ
            </h1>
            <p className="text-gray-500 text-sm mb-8">
              เข้าสู่ระบบเพื่อสำรวจการเดินทางของคุณ
            </p>

            {error && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm text-left">
                {error}
              </div>
            )}

            {/* Google Login Button เท่านั้น */}
            <button
              onClick={() => handleGoogleLogin()}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-4 px-4 border-2 border-gray-100 rounded-xl hover:border-emerald-400 hover:bg-emerald-50 transition-all duration-300 font-semibold text-gray-700 disabled:opacity-60 disabled:cursor-not-allowed group"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              {loading
                ? "กำลังสื่อสารกับ Google..."
                : "ดำเนินการต่อด้วย Google"}
            </button>

            <div className="mt-10 text-xs text-gray-400">
              การเข้าสู่ระบบแสดงว่าคุณยอมรับข้อกำหนดการใช้งานและนโยบายความเป็นส่วนตัว
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
