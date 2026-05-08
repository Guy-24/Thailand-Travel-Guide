import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import ListingPage from './pages/ListingPage'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="listings" element={<ListingPage />} />
      </Route>
    </Routes>
  )
}

export default App
