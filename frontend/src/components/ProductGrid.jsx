import { Heart } from 'lucide-react'
import { useState } from 'react'
import styles from './ProductGrid.module.css'

const products = [
  { id: 1, title: 'iPhone 15 Pro Max 256GB Natural Titanium', price: '45,900', location: 'กรุงเทพฯ', time: '2 นาทีที่แล้ว', emoji: '📱', badge: 'ยอดนิยม', verified: true },
  { id: 2, title: 'Toyota Camry 2022 2.5 HV Premium รถสวยมาก', price: '1,290,000', location: 'นนทบุรี', time: '15 นาทีที่แล้ว', emoji: '🚗', badge: 'ฮ็อต', verified: true },
  { id: 3, title: 'คอนโด ลุมพินี พาร์ค พหลฯ-สะพานควาย ชั้น 22', price: '3,200,000', location: 'จตุจักร', time: '1 ชั่วโมงที่แล้ว', emoji: '🏢', verified: false },
  { id: 4, title: 'Macbook Pro M3 16" 36GB 1TB Space Black', price: '89,000', location: 'สาทร', time: '2 ชั่วโมงที่แล้ว', emoji: '💻', badge: 'ใหม่', verified: true },
  { id: 5, title: 'Honda PCX 160 2023 สีขาว วิ่งน้อย 5,000 กม.', price: '82,000', location: 'ลาดพร้าว', time: '3 ชั่วโมงที่แล้ว', emoji: '🏍️', verified: false },
  { id: 6, title: 'ทองคำ 96.5% หนัก 1 บาท ราคาตามท้องตลาด', price: '37,500', location: 'บางรัก', time: '4 ชั่วโมงที่แล้ว', emoji: '💍', badge: 'ยืนยัน', verified: true },
  { id: 7, title: 'Sony WH-1000XM5 หูฟังตัดเสียง ของแท้ มือสอง', price: '8,500', location: 'พระโขนง', time: '5 ชั่วโมงที่แล้ว', emoji: '🎧', verified: false },
  { id: 8, title: 'เฟอร์นิเจอร์ไม้สัก โต๊ะ+เก้าอี้ 6 ที่นั่ง สภาพดี', price: '15,000', location: 'ดอนเมือง', time: '6 ชั่วโมงที่แล้ว', emoji: '🪑', verified: true },
]

const badgeColors = {
  'ยอดนิยม': '#16a34a',
  'ฮ็อต': '#dc2626',
  'ใหม่': '#2563eb',
  'ยืนยัน': '#d97706',
}

export default function ProductGrid({ title = 'สินค้ายอดนิยม' }) {
  const [liked, setLiked] = useState({})

  const toggleLike = (id) => setLiked(l => ({ ...l, [id]: !l[id] }))

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <a href="#" className={styles.seeAll}>ดูทั้งหมด →</a>
        </div>

        <div className={styles.grid}>
          {products.map(p => (
            <div key={p.id} className={styles.card}>
              <div className={styles.thumb}>
                <span className={styles.thumbEmoji}>{p.emoji}</span>
                {p.badge && (
                  <span className={styles.badge} style={{ background: badgeColors[p.badge] || 'var(--primary)' }}>
                    {p.badge}
                  </span>
                )}
                <button
                  className={`${styles.likeBtn} ${liked[p.id] ? styles.liked : ''}`}
                  onClick={() => toggleLike(p.id)}
                >
                  <Heart size={16} fill={liked[p.id] ? 'currentColor' : 'none'} />
                </button>
              </div>

              <div className={styles.info}>
                <p className={styles.productTitle}>{p.title}</p>
                <p className={styles.price}>฿{p.price}</p>
                <div className={styles.meta}>
                  <span className={styles.location}>📍 {p.location}</span>
                  {p.verified && <span className={styles.verified}>✓ ยืนยัน</span>}
                </div>
                <p className={styles.time}>{p.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
