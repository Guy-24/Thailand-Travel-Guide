import Hero from '../components/Hero'
import BannerCarousel from '../components/BannerCarousel'
import ProductGrid from '../components/ProductGrid'

export default function Home() {
  return (
    <>
      <Hero />
      <BannerCarousel />
      <ProductGrid title="สินค้ายอดนิยม" />
      <ProductGrid title="มาใหม่ล่าสุด" />
    </>
  )
}
