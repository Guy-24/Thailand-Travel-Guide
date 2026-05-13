const REGIONS = [
  { label: "ยอดนิยม", icon: "👍" },
  { label: "ภาคเหนือ", icon: "🏔️" },
  { label: "ภาคกลาง", icon: "🏛️" },
  { label: "ภาคตะวันออกเฉียงเหนือ", icon: "🌾" },
  { label: "ภาคตะวันออก", icon: "🌊" },
  { label: "ภาคใต้", icon: "🏖️" },
];

const CATEGORIES = [
  { label: "ชายหาด", icon: "🏖️" },
  { label: "วัดและศาสนา", icon: "🛕" },
  { label: "ภูเขาและน้ำตก", icon: "🏔️" },
  { label: "พิพิธภัณฑ์", icon: "🏛️" },
  { label: "อุทยานธรรมชาติ", icon: "🌿" },
  { label: "ตลาดและชุมชน", icon: "🛍️" },
  { label: "กิจกรรมผจญภัย", icon: "🧗" },
  { label: "เพิ่มเติม", icon: "⋯" },
];

export default function RegionTabs({ activeRegion, setActiveRegion }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
      {/* Region tabs */}
      <div className="flex border-b border-gray-100 overflow-x-auto scrollbar-hide">
        {REGIONS.map((r) => (
          <button
            key={r.label}
            onClick={() => setActiveRegion(r.label)}
            className={`flex items-center gap-2 px-5 py-3.5 text-sm font-medium whitespace-nowrap transition-all shrink-0 border-b-2 ${
              activeRegion === r.label
                ? "border-emerald-600 text-emerald-700 bg-emerald-50"
                : "border-transparent text-gray-600 hover:text-emerald-600 hover:bg-gray-50"
            }`}
          >
            <span>{r.icon}</span>
            <span>{r.label}</span>
          </button>
        ))}
      </div>

      {/* Category icons */}
      <div className="grid grid-cols-4 sm:grid-cols-8 divide-x divide-y divide-gray-100">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.label}
            className="flex flex-col items-center gap-2 p-4 hover:bg-emerald-50 hover:text-emerald-700 transition group"
          >
            <div className="w-12 h-12 bg-emerald-50 group-hover:bg-emerald-100 rounded-xl flex items-center justify-center text-2xl transition">
              {cat.icon}
            </div>
            <span className="text-xs text-gray-600 group-hover:text-emerald-700 text-center leading-tight">
              {cat.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
