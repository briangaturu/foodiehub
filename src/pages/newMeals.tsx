
import {Navbar} from '../components/Navbar'
import { Footer } from '../components/Footer'



export const NewMeals =()=> {
    return (
        <>
        <Navbar/>
        <Footer/>
        
          <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg text-center">
  <h2 className="text-3xl font-bold text-gray-800 mb-4">New Meals Coming Soon!</h2>
  <p className="text-gray-600 mb-6">
    Our chefs are working on delicious new recipes to delight your taste buds.
    Stay tuned for exciting updates and be the first to try our latest creations!
  </p>
  <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded">
    Notify Me
  </button>
</div>

        </>
    );
}  