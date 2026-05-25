import React from 'react'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { FoodCardSection } from '../components/foods/FoodCardSection'

export const Foods: React.FC = () => {
  return (
    <>
      {/* Fixed background */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092')" }}
      />

      <Navbar />

      <section className="min-h-screen relative px-4 py-12">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10">
          <FoodCardSection />
        </div>
      </section>

      <Footer />
    </>
  )
}