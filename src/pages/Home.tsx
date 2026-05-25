import { Navbar } from "../components/Navbar"

export const Home: React.FC = () => {
  return (
    <>
      {/* Fixed background */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092')" }}
      />

      <Navbar />

      <div className="home-page">

        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center relative">
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 text-center max-w-xl px-4">
            <h1 className="mb-8 text-5xl font-bold text-white">
              Welcome to FoodieHub 🍽️
            </h1>
            <p className="mb-6 text-2xl text-white/90">
              Discover different types and categories of food from all over the world.
            </p>
          </div>
        </section>

        {/* About Section */}
        <section className="min-h-screen flex items-center justify-center relative py-24 px-4 text-center">
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-6 text-white">About Us</h2>
            <p className="max-w-xl mx-auto text-white/90 text-lg">
              FoodieHub connects food lovers with the best restaurants, offering seamless booking, delivery, and event planning.
            </p>
          </div>
        </section>

        {/* Services Section */}
        <section className="min-h-screen flex flex-col items-center justify-center relative py-24 px-4">
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 w-full">
            <h2 className="text-4xl font-bold text-center mb-12 text-white">Our Services</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <div className="card bg-white shadow-xl">
                <figure>
                  <img src="https://images.unsplash.com/photo-1526367790999-0150786686a2?w=400&h=250&fit=crop" alt="Food Delivery" />
                </figure>
                <div className="card-body">
                  <h3 className="card-title">🍕 Food Delivery</h3>
                  <p>Get your favorite meals delivered to your door, fast and fresh.</p>
                </div>
              </div>

              <div className="card bg-white shadow-xl">
                <figure>
                  <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=250&fit=crop" alt="Table Booking" />
                </figure>
                <div className="card-body">
                  <h3 className="card-title">🪑 Table Booking</h3>
                  <p>Reserve tables at top restaurants in just a few clicks.</p>
                </div>
              </div>

              <div className="card bg-white shadow-xl">
                <figure>
                  <img src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=250&fit=crop" alt="Event Hosting" />
                </figure>
                <div className="card-body">
                  <h3 className="card-title">🎉 Event Hosting</h3>
                  <p>Plan private parties and events with our partner venues.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  )
}