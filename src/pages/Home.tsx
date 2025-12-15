import { Navbar } from "../components/Navbar"




export const Home: React.FC = () => {
  return (
  <>
   <Navbar/>
    <div className="home-page">

      {/* Hero Section */}
      <section
  className="hero min-h-screen bg-cover bg-center relative"
  style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092')" }}
>
  <div className="hero-overlay  bg-opacity-60 absolute inset-0"></div>
  <div className="hero-content text-center text-neutral-content relative z-10">
    <div className="max-w-xl">
      <h1 className="mb-6 text-5xl font-bold text-white-700 bg-white">Welcome to FoodieHub 🍽️</h1>
      <p className="mb-6 text-2xl bg-white">Discover different types and categories of food from all over the world.</p>
    </div>
  </div>
</section>


      {/* About Section */}
      <section className="py-16 px-4 bg-base-100 text-center">
        <h2 className="text-3xl font-bold mb-4">About Us</h2>
        <p className="max-w-xl mx-auto">
          FoodieHub connects food lovers with the best restaurants, offering seamless booking, delivery, and event planning.
        </p>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 bg-base-200">
        <h2 className="text-3xl font-bold text-center mb-8">Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="card bg-base-100 shadow-xl">
            <figure><img src="https://source.unsplash.com/400x250/?food,delivery" alt="Food Delivery" /></figure>
            <div className="card-body">
              <h3 className="card-title">🍕 Food Delivery</h3>
              <p>Get your favorite meals delivered to your door, fast and fresh.</p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <figure><img src="https://source.unsplash.com/400x250/?restaurant,table" alt="Table Booking" /></figure>
            <div className="card-body">
              <h3 className="card-title">🪑 Table Booking</h3>
              <p>Reserve tables at top restaurants in just a few clicks.</p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <figure><img src="" alt="Event Hosting" /></figure>
            <div className="card-body">
              <h3 className="card-title">🎉 Event Hosting</h3>
              <p>Plan private parties and events with our partner venues.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      
    </div>

  </>    
)
}
