export default function WhySection() {
  return (
    <section className="bg-emerald-50 py-12 px-4">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 items-center">
        <div className="w-full lg:w-2/5 relative">
          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1528181304800-259b08848526?w=600&h=420&fit=crop"
              alt="นักท่องเที่ยว"
              className="w-full h-72 lg:h-96 object-cover"
              onError={(e) => { e.target.src = "https://placehold.co/600x420/059669/white?text=TourThai"; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/40 to-transparent" />
          </div>
          {/* Floating stats card */}
          <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-lg p-4 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-xl">🗺️</div>
              <div>
                <p className="font-bold text-gray-800 text-sm">500+ สถานที่</p>
                <p className="text-gray-400 text-xs">ทั่วประเทศไทย</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-3/5">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            ทำไมต้องท่องเที่ยวกับ <span className="text-emerald-600">TTG</span>
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            โลกของการท่องเที่ยวในยุคนี้เปลี่ยนไปมาก เพียงแค่ค้นหาบนออนไลน์ก็สามารถวางแผนทริปได้ทันที
            TTG คือแพลตฟอร์มที่รวบรวมข้อมูลสถานที่ท่องเที่ยวทั่วไทยครบทุกภูมิภาค
            พร้อมรีวิวจากนักท่องเที่ยวจริงและเครื่องมือวางแผนการเดินทางที่ช่วยให้ทริปของคุณสนุกและง่ายขึ้น
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: "🌏", title: "ครบทุกภูมิภาค", desc: "ข้อมูลสถานที่ท่องเที่ยวครบ 77 จังหวัด 5 ภูมิภาค" },
              { icon: "⭐", title: "รีวิวจริงจากผู้ใช้", desc: "รีวิวโดยนักท่องจากหลากหลายพื้นที่ทั่วโลก" },
              { icon: "🗺️", title: "วางแผนทริปง่าย", desc: "หาสถานที่และแหล่งท่องเที่ยวที่เหมาะกับคุณที่สุด" },
              { icon: "🧗", title: "สร้างประสบการณ์ไม่รู้ลืม", desc: "มาทำให้การเดินทางครั้งนี้เป็นที่จดจำตลอดไป" },
            ].map((item) => (
              <div key={item.title} className="flex gap-3 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="text-2xl shrink-0">{item.icon}</div>
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm mb-0.5">{item.title}</h4>
                  <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
