import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <div className={styles.logo}>
              <span className={styles.logoIcon}>V</span>
              <span className={styles.logoText}>Verdee</span>
            </div>
            <p className={styles.tagline}>ซื้อ-ขาย ออนไลน์ ง่าย ปลอดภัย ได้เงินเร็ว</p>
            <div className={styles.stores}>
              <button className={styles.storeBtn}>📱 App Store</button>
              <button className={styles.storeBtn}>🤖 Google Play</button>
            </div>
          </div>

          <div className={styles.linksGroup}>
            <h4>บริษัท</h4>
            <a href="#">เกี่ยวกับเรา</a>
            <a href="#">ร่วมงานกับเรา</a>
            <a href="#">ข่าวสาร</a>
            <a href="#">ติดต่อเรา</a>
          </div>

          <div className={styles.linksGroup}>
            <h4>หมวดหมู่</h4>
            <a href="#">รถมือสอง</a>
            <a href="#">อสังหาริมทรัพย์</a>
            <a href="#">มือถือ</a>
            <a href="#">สัตว์เลี้ยง</a>
          </div>

          <div className={styles.linksGroup}>
            <h4>ช่วยเหลือ</h4>
            <a href="#">วิธีใช้งาน</a>
            <a href="#">ความปลอดภัย</a>
            <a href="#">รายงานปัญหา</a>
            <a href="#">นโยบายความเป็นส่วนตัว</a>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© 2025 Verdee. สงวนลิขสิทธิ์ทุกประการ</p>
          <div className={styles.socials}>
            <span>Facebook</span>
            <span>Instagram</span>
            <span>Line</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
