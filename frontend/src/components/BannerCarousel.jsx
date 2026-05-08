import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import styles from './BannerCarousel.module.css'

const banners = [
  {
    id: 1,
    bg: 'linear-gradient(135deg, #166534, #22c55e)',
    emoji: '🛡️',
    title: 'ยืนยันตัวตน ผ่าน e-KYC',
    subtitle: 'เพิ่มความมั่นใจ ปิดการขายได้ไวขึ้น',
    cta: 'ลงทะเบียนเลย',
    tag: 'Verdee',
    badge: 'ใหม่',
  },
  {
    id: 2,
    bg: 'linear-gradient(135deg, #1e40af, #3b82f6)',
    emoji: '🚗',
    title: 'รถมือสองคุณภาพดี',
    subtitle: 'ตรวจสอบรถทุกคันก่อนขาย มาตรฐาน 100%',
    cta: 'ดูรถทั้งหมด',
    tag: 'Auto',
    badge: 'Hot',
  },
  {
    id: 3,
    bg: 'linear-gradient(135deg, #0f4c39, #16a34a)',
    emoji: '📱',
    title: 'แอปเดียวจบ ครบทุกการซื้อ-ขาย',
    subtitle: 'โหลดแอปได้เลยทั้ง iOS และ Android',
    cta: 'โหลดแอป',
    tag: 'App',
    badge: 'ฟรี',
  },
]

export default function BannerCarousel() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % banners.length), 4500)
    return () => clearInterval(t)
  }, [])

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.track} style={{ transform: `translateX(-${current * 100}%)` }}>
          {banners.map(b => (
            <div key={b.id} className={styles.slide} style={{ background: b.bg }}>
              <div className={styles.slideContent}>
                <div className={styles.slideTag}>{b.tag}</div>
                <span className={styles.slideEmoji}>{b.emoji}</span>
                <h3 className={styles.slideTitle}>{b.title}</h3>
                <p className={styles.slideSubtitle}>{b.subtitle}</p>
                <button className={styles.slideCta}>{b.cta}</button>
              </div>
              <div className={styles.slideBadge}>{b.badge}</div>
            </div>
          ))}
        </div>

        <button className={`${styles.arrow} ${styles.arrowLeft}`} onClick={() => setCurrent(c => (c - 1 + banners.length) % banners.length)}>
          <ChevronLeft size={20} />
        </button>
        <button className={`${styles.arrow} ${styles.arrowRight}`} onClick={() => setCurrent(c => (c + 1) % banners.length)}>
          <ChevronRight size={20} />
        </button>

        <div className={styles.dots}>
          {banners.map((_, i) => (
            <button key={i} className={`${styles.dot} ${i === current ? styles.dotActive : ''}`} onClick={() => setCurrent(i)} />
          ))}
        </div>
      </div>
    </section>
  )
}
