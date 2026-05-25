import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'

export const NewMeals = () => {
  return (
    <>
      {/* Fixed background */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092')" }}
      />

      <Navbar />

      <section className="min-h-screen flex items-center justify-center relative px-4">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-xl mx-auto p-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-center shadow-2xl">
          <h2 className="text-4xl font-bold text-white mb-4">New Meals Coming Soon! 🍽️</h2>
          <p className="text-white/90 text-lg mb-8">
            Our chefs are working on delicious new recipes to delight your taste buds.
            Stay tuned for exciting updates and be the first to try our latest creations!
          </p>
          <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 hover:-translate-y-px hover:shadow-lg">
            Notify Me
          </button>
        </div>
      </section>

      <Footer />
    </>
  )
}