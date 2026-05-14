const REVIEWS = [
  {
    title: "สนานที่เที่ยวเยอะมากเลยครับ",
    body: "ใช้หาที่เที่ยวในช่วงหยุดยาว ข้อมูลละเอียด มีรีวิวจากคนจริง ช่วยตัดสินใจได้มาก",
    author: "คุณ อ้วน พันล้าน",
    rating: 5,
  },
  {
    title: "ได้ประสบการณ์สุดแปลกใหม่",
    body: "ชอบมากเลยครับ ได้ไปพบเจอกับผู้คนมากมาย ไปว่ายน้ำกับหนุ่มๆ มาสนุกมาก",
    author: "Jai Joitapu",
    rating: 5,
  },
  {
    title: "เยี่ยมมาก ไปเที่ยวได้ง่ายขึ้นจริงๆ",
    body: "ใช้งานง่าย หาสถานที่ท่องเที่ยวในภาคเหนือได้ครบมาก มีรูปสวยๆ อีกด้วย",
    author: "คุณ การ์ฟิว",
    rating: 5,
  },
  {
    title: "แนะนำให้เพื่อนๆ ทุกคนเลย",
    body: "ขอบคุณทีมงานที่ทำแอปดีๆ แบบนี้ครับ ท่องเที่ยวไทยสนุกขึ้นเยอะเลย",
    author: "คิม ไม่หัน",
    rating: 4,
  },
];

export default function ReviewSection() {
  return (
    <section className="bg-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xl font-bold text-gray-800 mb-6">เสียงตอบรับจากนักท่องเที่ยว</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {REVIEWS.map((r, i) => (
            <div
              key={i}
              className="border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:border-emerald-200 transition"
            >
              <div className="flex gap-0.5 mb-2">
                {Array.from({ length: r.rating }).map((_, j) => (
                  <span key={j} className="text-amber-400 text-sm">⭐</span>
                ))}
              </div>
              <h3 className="font-semibold text-gray-800 text-sm mb-1">{r.title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed mb-3">{r.body}</p>
              <p className="text-gray-700 text-xs font-medium">{r.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
