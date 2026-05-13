export default function HeroBanner() {
  return (
    <div
      className="relative py-16 px-4 text-center text-white overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)",
      }}
    >
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-400/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-300/10 rounded-full translate-x-1/3 translate-y-1/3" />
      <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-amber-400/10 rounded-full -translate-x-1/2 -translate-y-1/2" />

      <div className="relative z-10 max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 leading-tight">
          ค้นพบ <span className="text-amber-300">ความงาม</span> ของประเทศไทย
        </h1>
        <p className="text-emerald-200 text-base mb-6">
          สำรวจสถานที่ท่องเที่ยวกว่า 500 แห่ง ครบทุกภูมิภาค พร้อมรีวิวจากนักท่องเที่ยวจริง
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap text-sm">
          <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur px-4 py-2 rounded-full">
            <span>✅</span>
            <span>ข้อมูลอัปเดตล่าสุด</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur px-4 py-2 rounded-full">
            <span>⭐</span>
            <span>รีวิวจากผู้ใช้จริง</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur px-4 py-2 rounded-full">
            <span>🗺️</span>
            <span>แผนที่นำทาง</span>
          </div>
        </div>
      </div>
    </div>
  );
}
