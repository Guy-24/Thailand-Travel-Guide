import { useState } from 'react'
import { Search, Filter, ChevronDown } from 'lucide-react'
import styles from './ListingPage.module.css'

const allListings = [
  { id: 1, title: 'iPhone 15 Pro Max 256GB', price: '45,900', cat: 'มือถือ', location: 'กรุงเทพฯ', emoji: '📱', verified: true },
  { id: 2, title: 'Toyota Camry 2022 HV Premium', price: '1,290,000', cat: 'รถยนต์', location: 'นนทบุรี', emoji: '🚗', verified: true },
  { id: 3, title: 'คอนโด ลุมพินี พาร์ค ชั้น 22', price: '3,200,000', cat: 'อสังหา', location: 'จตุจักร', emoji: '🏢', verified: false },
  { id: 4, title: 'MacBook Pro M3 16"', price: '89,000', cat: 'คอมพิวเตอร์', location: 'สาทร', emoji: '💻', verified: true },
  { id: 5, title: 'Honda PCX 160 2023', price: '82,000', cat: 'มอเตอร์ไซค์', location: 'ลาดพร้าว', emoji: '🏍️', verified: false },
  { id: 6, title: 'ทองคำ 96.5% หนัก 1 บาท', price: '37,500', cat: 'พระเครื่อง', location: 'บางรัก', emoji: '💍', verified: true },
  { id: 7, title: 'Sony WH-1000XM5', price: '8,500', cat: 'อิเล็กทรอนิกส์', location: 'พระโขนง', emoji: '🎧', verified: false },
  { id: 8, title: 'โต๊ะ+เก้าอี้ไม้สัก 6 ที่นั่ง', price: '15,000', cat: 'เฟอร์นิเจอร์', location: 'ดอนเมือง', emoji: '🪑', verified: true },
  { id: 9, title: 'PS5 + จอยเพิ่ม + เกม 10 แผ่น', price: '22,000', cat: 'เกม', location: 'บางนา', emoji: '🎮', verified: false },
  { id: 10, title: 'กล้อง Sony A7IV Body', price: '72,000', cat: 'กล้อง', location: 'สีลม', emoji: '📷', verified: true },
  { id: 11, title: 'จักรยานเสือหมอบ Trek Domane', price: '55,000', cat: 'กีฬา', location: 'อ่อนนุช', emoji: '🚴', verified: true },
  { id: 12, title: 'นาฬิกา Seiko Prospex SRPE99', price: '18,500', cat: 'แฟชั่น', location: 'เอกมัย', emoji: '⌚', verified: false },
]

const categories = ['ทั้งหมด', 'มือถือ', 'รถยนต์', 'อสังหา', 'คอมพิวเตอร์', 'มอเตอร์ไซค์', 'เกม', 'กล้อง']

export default function ListingPage() {
  const [search, setSearch] = useState('')
  const [activeCat, setActiveCat] = useState('ทั้งหมด')
  const [sort, setSort] = useState('ล่าสุด')

  const filtered = allListings.filter(l =>
    (activeCat === 'ทั้งหมด' || l.cat === activeCat) &&
    (l.title.toLowerCase().includes(search.toLowerCase()) || l.cat.includes(search))
  )

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        {/* Header */}
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>สินค้าทั้งหมด</h1>
          <p className={styles.pageCount}>{filtered.length} รายการ</p>
        </div>

        {/* Search & filter bar */}
        <div className={styles.filterBar}>
          <div className={styles.searchBox}>
            <Search size={16} />
            <input
              type="text"
              placeholder="ค้นหาสินค้า..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className={styles.sortBox}>
            <span>เรียงตาม:</span>
            <select value={sort} onChange={e => setSort(e.target.value)}>
              <option>ล่าสุด</option>
              <option>ราคา: ต่ำ-สูง</option>
              <option>ราคา: สูง-ต่ำ</option>
              <option>ยอดนิยม</option>
            </select>
          </div>
        </div>

        {/* Category chips */}
        <div className={styles.cats}>
          {categories.map(c => (
            <button
              key={c}
              className={`${styles.catChip} ${activeCat === c ? styles.catActive : ''}`}
              onClick={() => setActiveCat(c)}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className={styles.grid}>
          {filtered.map(item => (
            <div key={item.id} className={styles.card}>
              <div className={styles.thumb}>
                <span>{item.emoji}</span>
                {item.verified && <span className={styles.verBadge}>✓</span>}
              </div>
              <div className={styles.info}>
                <p className={styles.itemTitle}>{item.title}</p>
                <p className={styles.itemPrice}>฿{item.price}</p>
                <div className={styles.itemMeta}>
                  <span>📍 {item.location}</span>
                  <span className={styles.catTag}>{item.cat}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className={styles.empty}>
            <span>🔍</span>
            <p>ไม่พบสินค้าที่ค้นหา</p>
          </div>
        )}
      </div>
    </div>
  )
}
