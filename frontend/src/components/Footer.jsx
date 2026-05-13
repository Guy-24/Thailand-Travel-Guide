export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white font-black"></div>
              <span className="text-white font-bold">TTG</span>
            </div>
            <p className="text-xs leading-relaxed mb-3">
              แพลตฟอร์มท่องเที่ยวไทยครบวงจร ค้นพบความงามของไทยได้ที่นี่
            </p>
          </div>

          {[
            {
              title: "สำรวจ",
              links: [
                "ภาคเหนือ",
                "ภาคกลาง",
                "ภาคใต้",
                "ภาคอีสาน",
                "ภาคตะวันออก",
              ],
            },
            {
              title: "ประเภท",
              links: ["ชายหาด", "วัดและศาสนา", "ภูเขา", "อุทยาน", "ตลาดชุมชน"],
            },
            {
              title: "เกี่ยวกับ",
              links: [
                "เกี่ยวกับเรา",
                "ติดต่อเรา",
                "นโยบายความเป็นส่วนตัว",
                "เงื่อนไขการใช้งาน",
              ],
            },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-white font-semibold text-sm mb-3">
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      // href="#"
                      className="text-xs hover:text-emerald-400 transition"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs">
          <p>© 2026 TTG สงวนลิขสิทธิ์</p>
          <p className="text-gray-600">
            Built with React + Tailwind CSS · FastAPI Backend
          </p>
        </div>
      </div>
    </footer>
  );
}
