
import { useState, useEffect } from "react";

function AttractionCard({ attraction, favoriteItems, toggleFavorite }) {
  const [saved, setSaved] = useState(false);
  const isSaved = favoriteItems.some((item) => item.id === attraction.id);

  const [localReviews, setLocalReviews] = useState(attraction.reviews);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [ratingInput, setRatingInput] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitReview = async () => {
    if (ratingInput === 0) return alert("กรุณาเลือกดาวก่อนกดยืนยันครับ");

    setIsSubmitting(true);
    try {
      const storedUser = JSON.parse(
        localStorage.getItem("tourism_user") || "{}",
      );
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";

      // ยิง API บันทึกข้อมูลลง Database
      const response = await fetch(`${apiUrl}/api/review/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: storedUser.token ? `Bearer ${storedUser.token}` : "",
        },
        body: JSON.stringify({
          rating: ratingInput,
          user_name: storedUser.name || "Unknown",
          place_name: attraction.name,
        }),
      });

      if (!response.ok) {
        // ดึงข้อมูล Error ที่ Backend ส่งมา (เช่น errorData.detail)
        const errorData = await response.json();
        throw new Error(errorData.detail || "บันทึกรีวิวไม่สำเร็จ");
      }

      // ถ้ายิง API ผ่าน ให้เพิ่มจำนวนรีวิวบนหน้าจอ +1 ทันที
      setLocalReviews((prev) => prev + 1);
      setIsReviewOpen(false); // ปิด Popup
      setRatingInput(0); // รีเซ็ตดาว

      alert("ขอขอบคุณสำหรับคะแนนรีวิว! ");

    } catch (err) {
      alert(err.message); 
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group">
        <div className="relative overflow-hidden">
          <img
            src={attraction.image}
            alt={attraction.name}
            className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.src = `https://placehold.co/400x280/059669/white?text=${encodeURIComponent(attraction.name)}`;
            }}
          />
          {attraction.popular && (
            <span className="absolute top-2.5 left-2.5 bg-amber-400 text-amber-900 text-xs font-bold px-2.5 py-1 rounded-full">
              🔥 ยอดนิยม
            </span>
          )}
          <button
            onClick={() => toggleFavorite(attraction)}
            className="absolute top-2.5 right-2.5 w-8 h-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow transition hover:scale-110"
          >
            {isSaved ? "❤️" : "🤍"}
          </button>
          <div className="absolute bottom-2.5 left-2.5">
            <span className="bg-emerald-700/80 text-white text-xs px-2 py-0.5 rounded-full backdrop-blur">
              {attraction.category}
            </span>
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-gray-800 text-sm leading-tight mb-1 group-hover:text-emerald-700 transition">
            {attraction.name}
          </h3>
          <div className="flex items-center gap-1 text-gray-500 text-xs mb-2">
            <svg
              className="w-3 h-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {attraction.location} · {attraction.region}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <span className="text-amber-400 text-sm">⭐</span>
              <span className="font-semibold text-sm text-gray-800">
                {attraction.rating}
              </span>
              <span className="text-gray-400 text-xs">
                ({localReviews.toLocaleString()})
              </span>
            </div>
            <button
              onClick={() => setIsReviewOpen(true)}
              className="text-m font-medium text-emerald-600 hover:text-emerald-700 border border-emerald-200 hover:border-emerald-400 px-4 py-2 rounded-full transition"
            >
              รีวิว
            </button>
          </div>

          <div className="flex gap-1 mt-2 flex-wrap">
            {attraction.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      {/* --- Popup สำหรับให้คะแนนรีวิว --- */}
      {isReviewOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            {/* โชว์รูปใหญ่ขึ้น */}
            <img
              src={attraction.image}
              alt={attraction.name}
              className="w-full h-56 object-cover"
            />
            <div className="p-6 text-center">
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                {attraction.name}
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                คุณให้คะแนนสถานที่นี้กี่ดาว?
              </p>

              {/* ระบบเลือกดาว */}
              <div className="flex justify-center gap-2 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRatingInput(star)}
                    className={`text-4xl transition-transform hover:scale-110 ${
                      ratingInput >= star ? "text-amber-400" : "text-gray-200"
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setIsReviewOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium"
                >
                  ยกเลิก
                </button>
                <button
                  onClick={handleSubmitReview}
                  disabled={isSubmitting}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium disabled:opacity-50"
                >
                  {isSubmitting ? "กำลังบันทึก..." : "ยืนยัน"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function AttractionGrid({
  activeRegion,
  activeCategory,
  searchQuery,
  favoriteItems,
  toggleFavorite,
}) {
  const [attractions, setAttractions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchPlaces = async () => {
      setIsLoading(true);
      setErrorMsg("");
      try {
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";
        const storedUser = JSON.parse(
          localStorage.getItem("tourism_user") || "{}",
        );
        const token = storedUser.token;
        // เรียก API
        const response = await fetch(`${apiUrl}/api/place/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "", // แนบ Token ไปให้ Backend ตรวจสอบ
          },
        });

        if (!response.ok) {
          throw new Error(`เกิดข้อผิดพลาด: ${response.status}`);
        }

        const data = await response.json();
        setAttractions(data); // นำข้อมูลจาก DB มาเก็บไว้ใน State
      } catch (err) {
        setErrorMsg(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlaces();
  }, []);

  const filtered = attractions
    .filter((a) => {
      const matchRegion =
        activeRegion === "ทั้งหมด"
          ? true
          : activeRegion === "ยอดนิยม"
            ? a.popular
            : a.region === activeRegion;

      const matchCategory =
        !activeCategory || activeCategory === "ทั้งหมด"
          ? true
          : a.category === activeCategory;

      const nameMatch = a.name
        ?.toLowerCase()
        .includes(searchQuery?.toLowerCase() || "");

      const locMatch = a.location
        ?.toLowerCase()
        .includes(searchQuery?.toLowerCase() || "");

      const tagsMatch = a.tags?.some((t) => t.includes(searchQuery || ""));

      const matchSearch = !searchQuery || nameMatch || locMatch || tagsMatch;

      return matchRegion && matchCategory && matchSearch;
    })
    .sort((a, b) => b.rating - a.rating);

  if (isLoading) {
    return (
      <div className="text-center py-16 text-gray-500">
        กำลังโหลดข้อมูลสถานที่...
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="text-center py-16 text-red-500">
        ไม่สามารถดึงข้อมูลได้: {errorMsg}
      </div>
    );
  }

  return (
    <>
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-gray-800">
            {activeRegion === "ยอดนิยม"
              ? "สถานที่ยอดนิยม"
              : `สถานที่ท่องเที่ยว ${activeRegion}`}
            <span className="ml-2 text-sm font-normal text-gray-400">
              ({filtered.length} แห่ง)
            </span>
          </h2>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <div className="text-4xl mb-2">🔍</div>
            <p>ไม่พบสถานที่ที่ค้นหา</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((a) => (
              <AttractionCard
                key={a.id}
                attraction={a}
                favoriteItems={favoriteItems}
                toggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
