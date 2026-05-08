import { useState } from 'react'
import { CheckCircle, Zap } from 'lucide-react'
import styles from './Hero.module.css'

const tabs = ['ยอดนิยม', 'มาร์เก็ตเพลส', 'รถยนต์', 'อสังหา']

export default function Hero() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <section className={styles.hero}>
      {/* Background decorations */}
      <div className={styles.bgOrb1} />
      <div className={styles.bgOrb2} />
      <div className={styles.bgGrid} />

      <div className={styles.content}>
        <h1 className={styles.headline}>
          ซื้อ-ขาย ของออนไลน์ จบง่ายที่ <span className={styles.brand}>Verdee</span>
        </h1>

        <div className={styles.badges}>
          <span className={styles.badge}>
            <CheckCircle size={16} />
            ตรวจสอบผู้ขาย
          </span>
          <span className={`${styles.badge} ${styles.badgeAccent}`}>
            <Zap size={16} />
            แชทในระบบ
          </span>
        </div>

        {/* Tabs */}
        <div className={styles.tabCard}>
          <div className={styles.tabs}>
            {tabs.map((t, i) => (
              <button
                key={t}
                className={`${styles.tab} ${i === activeTab ? styles.tabActive : ''}`}
                onClick={() => setActiveTab(i)}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Categories grid */}
          <CategoryGrid active={activeTab} />
        </div>
      </div>
    </section>
  )
}

const categories = [
  [
    { icon: '🚗', label: 'รถมือสอง' },
    { icon: '🏢', label: 'อสังหาริมทรัพย์' },
    { icon: '📱', label: 'มือถือ แท็บเล็ต' },
    { icon: '🏍️', label: 'มอไซค์' },
    { icon: '💎', label: 'พระเครื่อง' },
    { icon: '🐾', label: 'สัตว์เลี้ยง' },
    { icon: '🔌', label: 'เครื่องใช้ไฟฟ้า' },
    { icon: '➕', label: 'เพิ่มเติม' },
  ],
  [
    { icon: '👗', label: 'แฟชั่น' },
    { icon: '🏠', label: 'เฟอร์นิเจอร์' },
    { icon: '📷', label: 'กล้องถ่ายรูป' },
    { icon: '🎮', label: 'เกม' },
    { icon: '📚', label: 'หนังสือ' },
    { icon: '🧴', label: 'ความงาม' },
    { icon: '🔧', label: 'เครื่องมือ' },
    { icon: '➕', label: 'เพิ่มเติม' },
  ],
  [
    { icon: '🚗', label: 'รถยนต์' },
    { icon: '🏍️', label: 'มอเตอร์ไซค์' },
    { icon: '🚐', label: 'รถตู้/รถบัส' },
    { icon: '🚛', label: 'รถบรรทุก' },
    { icon: '🔩', label: 'อะไหล่รถ' },
    { icon: '🛞', label: 'ล้อ/ยาง' },
    { icon: '🧽', label: 'อุปกรณ์แต่งรถ' },
    { icon: '➕', label: 'เพิ่มเติม' },
  ],
  [
    { icon: '🏠', label: 'บ้านเดี่ยว' },
    { icon: '🏢', label: 'คอนโด' },
    { icon: '🏘️', label: 'ทาวน์เฮ้าส์' },
    { icon: '🌾', label: 'ที่ดิน' },
    { icon: '🏗️', label: 'อาคารพาณิชย์' },
    { icon: '🔑', label: 'เช่า' },
    { icon: '🏨', label: 'รีสอร์ต/โรงแรม' },
    { icon: '➕', label: 'เพิ่มเติม' },
  ],
]

function CategoryGrid({ active }) {
  return (
    <div className={styles.categoryGrid}>
      {categories[active].map((cat) => (
        <button key={cat.label} className={styles.catItem}>
          <span className={styles.catIcon}>{cat.icon}</span>
          <span className={styles.catLabel}>{cat.label}</span>
        </button>
      ))}
    </div>
  )
}
