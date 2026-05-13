const ATTRACTIONS = [
  // ยอดนิยม / ภาคใต้
  {
    id: 1,
    name: "หาดไวท์แซนด์ เกาะช้าง",
    location: "ตราด",
    region: "ภาคตะวันออก",
    category: "ชายหาด",
    rating: 4.8,
    reviews: 1243,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=280&fit=crop",
    tags: ["ชายหาด", "ดำน้ำ"],
    popular: true,
  },
  {
    id: 2,
    name: "วัดพระแก้ว",
    location: "กรุงเทพฯ",
    region: "ภาคกลาง",
    category: "วัดและศาสนา",
    rating: 4.9,
    reviews: 5821,
    image: "https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=400&h=280&fit=crop",
    tags: ["วัด", "ประวัติศาสตร์"],
    popular: true,
  },
  {
    id: 3,
    name: "ดอยอินทนนท์",
    location: "เชียงใหม่",
    region: "ภาคเหนือ",
    category: "ภูเขาและน้ำตก",
    rating: 4.7,
    reviews: 2104,
    image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=400&h=280&fit=crop",
    tags: ["ภูเขา", "ธรรมชาติ"],
    popular: true,
  },
  {
    id: 4,
    name: "หาดป่าตอง",
    location: "ภูเก็ต",
    region: "ภาคใต้",
    category: "ชายหาด",
    rating: 4.6,
    reviews: 3892,
    image: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=400&h=280&fit=crop",
    tags: ["ชายหาด", "ไนท์ไลฟ์"],
    popular: true,
  },
  {
    id: 5,
    name: "อุทยานแห่งชาติขาใหญ่",
    location: "นครราชสีมา",
    region: "ภาคตะวันออกเฉียงเหนือ",
    category: "อุทยานธรรมชาติ",
    rating: 4.7,
    reviews: 1876,
    image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=280&fit=crop",
    tags: ["สัตว์ป่า", "ป่าไม้"],
    popular: true,
  },
  {
    id: 6,
    name: "ตลาดน้ำอัมพวา",
    location: "สมุทรสงคราม",
    region: "ภาคกลาง",
    category: "ตลาดและชุมชน",
    rating: 4.5,
    reviews: 2341,
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=280&fit=crop",
    tags: ["ตลาด", "อาหาร", "วัฒนธรรม"],
    popular: true,
  },
  {
    id: 7,
    name: "เกาะพีพี",
    location: "กระบี่",
    region: "ภาคใต้",
    category: "ชายหาด",
    rating: 4.8,
    reviews: 4120,
    image: "https://images.unsplash.com/photo-1537956965359-7573183d1f57?w=400&h=280&fit=crop",
    tags: ["เกาะ", "ดำน้ำ"],
    popular: true,
  },
  {
    id: 8,
    name: "วัดร่องขุ่น (วัดขาว)",
    location: "เชียงราย",
    region: "ภาคเหนือ",
    category: "วัดและศาสนา",
    rating: 4.9,
    reviews: 3654,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=280&fit=crop",
    tags: ["วัด", "สถาปัตยกรรม"],
    popular: false,
  },
  {
    id: 9,
    name: "ทะเลสาบสงขลา",
    location: "สงขลา",
    region: "ภาคใต้",
    category: "อุทยานธรรมชาติ",
    rating: 4.4,
    reviews: 876,
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400&h=280&fit=crop",
    tags: ["ทะเลสาบ", "ธรรมชาติ"],
    popular: false,
  },
  {
    id: 10,
    name: "อุทยานประวัติศาสตร์สุโขทัย",
    location: "สุโขทัย",
    region: "ภาคเหนือ",
    category: "พิพิธภัณฑ์",
    rating: 4.8,
    reviews: 2890,
    image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&h=280&fit=crop",
    tags: ["ประวัติศาสตร์", "มรดกโลก"],
    popular: false,
  },
  {
    id: 11,
    name: "น้ำตกหญ้าไทร",
    location: "ราชบุรี",
    region: "ภาคกลาง",
    category: "ภูเขาและน้ำตก",
    rating: 4.3,
    reviews: 543,
    image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=400&h=280&fit=crop",
    tags: ["น้ำตก", "เดินป่า"],
    popular: false,
  },
  {
    id: 12,
    name: "ปราสาทหินพนมรุ้ง",
    location: "บุรีรัมย์",
    region: "ภาคตะวันออกเฉียงเหนือ",
    category: "พิพิธภัณฑ์",
    rating: 4.7,
    reviews: 1654,
    image: "https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=400&h=280&fit=crop",
    tags: ["ปราสาท", "ขอม", "ประวัติศาสตร์"],
    popular: false,
  },
];

function AttractionCard({ attraction }) {
  const [saved, setSaved] = useState(false);

  return (
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
          onClick={() => setSaved(!saved)}
          className="absolute top-2.5 right-2.5 w-8 h-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow transition hover:scale-110"
        >
          {saved ? "❤️" : "🤍"}
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
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {attraction.location} · {attraction.region}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-amber-400 text-sm">⭐</span>
            <span className="font-semibold text-sm text-gray-800">{attraction.rating}</span>
            <span className="text-gray-400 text-xs">({attraction.reviews.toLocaleString()})</span>
          </div>
          <button className="text-xs font-medium text-emerald-600 hover:text-emerald-700 border border-emerald-200 hover:border-emerald-400 px-3 py-1 rounded-full transition">
            ดูรายละเอียด
          </button>
        </div>

        <div className="flex gap-1 mt-2 flex-wrap">
          {attraction.tags.map((tag) => (
            <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";

export default function AttractionGrid({ activeRegion, searchQuery }) {
  const filtered = ATTRACTIONS.filter((a) => {
    const matchRegion =
      activeRegion === "ยอดนิยม" ? a.popular : a.region === activeRegion;
    const matchSearch =
      !searchQuery ||
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.tags.some((t) => t.includes(searchQuery));
    return matchRegion && matchSearch;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-gray-800">
          {activeRegion === "ยอดนิยม" ? "สถานที่ยอดนิยม" : `สถานที่ท่องเที่ยว ${activeRegion}`}
          <span className="ml-2 text-sm font-normal text-gray-400">({filtered.length} แห่ง)</span>
        </h2>
        <button className="text-sm text-emerald-600 hover:underline font-medium flex items-center gap-1">
          ดูทั้งหมด
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <div className="text-4xl mb-2">🔍</div>
          <p>ไม่พบสถานที่ที่ค้นหา</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((a) => (
            <AttractionCard key={a.id} attraction={a} />
          ))}
        </div>
      )}
    </div>
  );
}
