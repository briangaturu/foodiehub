
import { useSelector } from 'react-redux';
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { Layout } from "../dashboardDesign/Layout";
//import { logout } from '../redux/actions/authActions';

// Import images from src/assets/images/
import chickenImg from '../assets/images/grilledchicken.jpeg';
import smoothieImg from '../assets/images/mangosmoothie.jpeg';
import burgerImg from '../assets/images/burger.jpeg';
import pizzaImg from '../assets/images/pizza.jpeg';

const suggestedMeals = [
  {
    id: 1,
    name: 'Grilled Chicken',
    price: '$10',
    image: chickenImg,
  },
  {
    id: 2,
    name: 'Mango Smoothie',
    price: '$4',
    image: smoothieImg,
  },
  {
    id: 3,
    name: ' Burger',
    price: '$8',
    image: burgerImg,
  },
  {
    id: 4,
    name: ' Pizza',
    price: '$9',
    image: pizzaImg,
  },
];

export const Dashboard = () => {
  const user = useSelector((state: any) => state.auth.user);

  return (

    <div className="h-screen">
            <Navbar />
            <Layout />
            <Footer />
        

    <div className="min-h-screen bg-red-700 " >
      {/* Header */}
      <div className="navbar bg-red-50 px-6 mb-6">
        <div className="flex-1">
          <span className="text-xl font-bold">🍽️ FOODIEHUB</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline text-md">{user?.name || 'Guest'}</span>
          <div className="avatar">
            <div className="w-8 rounded-full">
              <img src={user?.avatar || '/default-avatar.png'} alt="avatar" />
            </div>
          </div>
          <button
            className="btn btn-sm btn-error btn-outline"
            //onClick={() => dispatch(logout())}
          >
            Logout
          </button>
        </div>
      </div>

      

      <div className="px-6">
        <h1 className="text-2xl font-bold mb-4">🍴 Suggested Meals</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {suggestedMeals.map((meal) => (
            <div key={meal.id} className="card bg-base-200 shadow-md">
              <figure>
                <img
                  src={meal.image}
                  alt={meal.name}
                  className="w-full h-40 object-cover"
                />
              </figure>
              <div className="card-body bg-red-50">
                <h2 className="card-title">{meal.name}</h2>
                <p className="text-lg">{meal.price}</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-sm btn-primary">Order Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Dashboard;




