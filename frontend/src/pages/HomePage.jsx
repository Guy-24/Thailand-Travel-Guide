import { useState } from "react";
import Navbar from "../components/Navbar";
import HeroBanner from "../components/HeroBanner";
import RegionTabs from "../components/RegionTabs";
import AttractionGrid from "../components/AttractionGrid";
import ReviewSection from "../components/ReviewSection";
import WhySection from "../components/WhySection";
import Footer from "../components/Footer";

export default function HomePage({ user, onLogout }) {
  const [activeRegion, setActiveRegion] = useState("ทั้งหมด"); 
  const [activeCategory, setActiveCategory] = useState("ทั้งหมด"); 
  const [searchQuery, setSearchQuery] = useState("");
  const [favoriteItems, setFavoriteItems] = useState([]);

  const toggleFavorite = (attraction) => {
    setFavoriteItems((prev) => {
      // เช็คว่ามีสถานที่นี้ในรายการโปรดหรือยัง
      const isExist = prev.find((item) => item.id === attraction.id);

      if (isExist) {
        // ถ้ามีแล้ว (กดซ้ำ) เอาออก
        return prev.filter((item) => item.id !== attraction.id);
      } else {
        // ถ้ายังไม่มี ให้เพิ่มเข้าไป
        return [...prev, attraction];
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar
        user={user}
        onLogout={onLogout}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        favoriteItems={favoriteItems}
      />
      <HeroBanner />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <RegionTabs
          activeRegion={activeRegion}
          setActiveRegion={setActiveRegion}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        <AttractionGrid
          activeRegion={activeRegion}
          activeCategory={activeCategory}
          searchQuery={searchQuery}
          favoriteItems={favoriteItems}
          toggleFavorite={toggleFavorite}
        />
      </div>
      <ReviewSection />
      <WhySection />
      <Footer />
    </div>
  );
}
