
import {Navbar} from '../components/Navbar'
import { Footer } from '../components/Footer'



export const NewCategories =()=> {
    return (
        <>
        <Navbar/>
        <Footer/>
        
          <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
  <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">
    Our Categories
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 hover:bg-red-100 transition">
      <h3 className="text-xl font-bold text-red-700 mb-2">Breakfast</h3>
      <p className="text-gray-700 text-sm">
        Start your day with delicious breakfast options.
      </p>
    </div>

    
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 hover:bg-red-100 transition">
      <h3 className="text-xl font-bold text-red-700 mb-2">Lunch</h3>
      <p className="text-gray-700 text-sm">
        Tasty lunch meals for a perfect midday break.
      </p>
    </div>

    
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 hover:bg-red-100 transition">
      <h3 className="text-xl font-bold text-red-700 mb-2">Dinner</h3>
      <p className="text-gray-700 text-sm">
        Hearty and delightful dinner dishes.
      </p>
    </div>

   
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 hover:bg-red-100 transition">
      <h3 className="text-xl font-bold text-red-700 mb-2">Desserts</h3>
      <p className="text-gray-700 text-sm">
        Sweet treats and indulgent desserts.
      </p>
    </div>

    
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 hover:bg-red-100 transition">
      <h3 className="text-xl font-bold text-red-700 mb-2">Drinks</h3>
      <p className="text-gray-700 text-sm">
        Refreshing drinks to accompany your meals.
      </p>
    </div>
  </div>
</div>


        </>
    );
}  