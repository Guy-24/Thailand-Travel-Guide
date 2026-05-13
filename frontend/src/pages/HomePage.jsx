import { useState } from "react";
import Navbar from "../components/Navbar";
import HeroBanner from "../components/HeroBanner";
import RegionTabs from "../components/RegionTabs";
import AttractionGrid from "../components/AttractionGrid";
import ReviewSection from "../components/ReviewSection";
import WhySection from "../components/WhySection";
import Footer from "../components/Footer";

export default function HomePage({ user, onLogout }) {
  const [activeRegion, setActiveRegion] = useState("ยอดนิยม");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar user={user} onLogout={onLogout} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <HeroBanner />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <RegionTabs activeRegion={activeRegion} setActiveRegion={setActiveRegion} />
        <AttractionGrid activeRegion={activeRegion} searchQuery={searchQuery} />
      </div>
      <ReviewSection />
      <WhySection />
      <Footer />
    </div>
  );
}
