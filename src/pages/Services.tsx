
import {Navbar} from '../components/Navbar'
import { Footer } from '../components/Footer'



export const NewServices =()=> {
    return (
        <>
        <Navbar/>
        <Footer/>
        
         <div className="max-w-5xl mx-auto my-10 grid grid-cols-1 md:grid-cols-3 gap-8">
  
  <div className="bg-white border border-red-200 rounded-lg p-6 shadow hover:shadow-lg transition">
    <div className="text-red-600 text-4xl mb-4">
      🚚
    </div>
    <h3 className="text-xl font-bold text-gray-800 mb-2">Delivery</h3>
    <p className="text-gray-600">
      Enjoy fast and reliable delivery straight to your doorstep. Fresh meals, every time!
    </p>
  </div>

  
  <div className="bg-white border border-red-200 rounded-lg p-6 shadow hover:shadow-lg transition">
    <div className="text-red-600 text-4xl mb-4">
      🍽️
    </div>
    <h3 className="text-xl font-bold text-gray-800 mb-2">Table Booking</h3>
    <p className="text-gray-600">
      Reserve your table easily online and ensure a perfect dining experience with no waiting.
    </p>
  </div>

  
  <div className="bg-white border border-red-200 rounded-lg p-6 shadow hover:shadow-lg transition">
    <div className="text-red-600 text-4xl mb-4">
      🎉
    </div>
    <h3 className="text-xl font-bold text-gray-800 mb-2">Events</h3>
    <p className="text-gray-600">
      Host your special occasions with us. We handle events of all sizes with delicious catering.
    </p>
  </div>
</div>


        </>
    );
}  