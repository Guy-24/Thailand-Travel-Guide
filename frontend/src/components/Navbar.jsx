import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, Heart, MessageCircle, User, Grid3X3, Menu, X, ChevronDown } from 'lucide-react'
import styles from './Navbar.module.css'

export default function Navbar() {
  const [searchVal, setSearchVal] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <>
      {/* Top bar */}
      <div className={styles.topBar}>
        <div className={styles.topBarInner}>
          <div className={styles.topLinks}>
            <a href="#">Verdee</a>
            <a href="#">Verdee Auto</a>
            <a href="#">Verdee Property</a>
          </div>
          <div className={styles.topRight}>
            <a href="#">ช่วยเหลือ</a>
            <div className={styles.langSwitch}>
              <span className={styles.langActive}>TH</span>
              <span>EN</span>
              <span>CN</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <header className={styles.navbar}>
        <div className={styles.navInner}>
          {/* Logo */}
          <Link to="/" className={styles.logo}>
            <div className={styles.logoIcon}>V</div>
            <div className={styles.logoText}>
              <span className={styles.logoMain}>Verdee</span>
              <span className={styles.logoSub}>by GREEN</span>
            </div>
          </Link>

          {/* Nav links */}
          <nav className={styles.navLinks}>
            <a href="#" className={styles.navLink}>บทความ</a>
          </nav>

          {/* Search */}
          <div className={styles.searchBox}>
            <Search size={18} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="ค้นหาสินค้า..."
              value={searchVal}
              onChange={e => setSearchVal(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          {/* Category button */}
          <button className={styles.categoryBtn}>
            <Grid3X3 size={18} />
            <span>หมวดหมู่</span>
          </button>

          {/* Actions */}
          <div className={styles.actions}>
            <button className={styles.iconBtn} title="รายการโปรด">
              <Heart size={22} />
            </button>
            <button className={styles.iconBtn} title="ข้อความ">
              <MessageCircle size={22} />
            </button>
            <button className={styles.iconBtn} title="โปรไฟล์">
              <User size={22} />
            </button>
            <button className={styles.sellBtn} onClick={() => navigate('/listings')}>
              ลงขาย
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button className={styles.mobileToggle} onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileSearch}>
            <Search size={18} />
            <input type="text" placeholder="ค้นหาสินค้า..." />
          </div>
          <a href="#" className={styles.mobileLink}>บทความ</a>
          <a href="#" className={styles.mobileLink}>หมวดหมู่</a>
          <a href="#" className={styles.mobileLink}>รายการโปรด</a>
          <a href="#" className={styles.mobileLink}>ข้อความ</a>
          <button className={styles.mobileSellBtn}>ลงขาย</button>
        </div>
      )}
    </>
  )
}
