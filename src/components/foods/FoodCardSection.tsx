import { MdAdd, MdStar } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { FaSignInAlt } from "react-icons/fa";
import { mealApi } from "../../features/api/mealsApi";
import { PuffLoader } from "react-spinners";
import { ordersApi } from "../../features/api/ordersApi";
import { addToCart, openCart } from "../../features/cart/cartSlice";

interface mealsData{
  mealId:number,
  mealName:string,
  mealPrice:number,
  mealUrl:string,
  rating:string,
  mealBadge:string,
  mealDescription:string
}



const mealsData = [
    {
        id: 1,
        name: "Grilled Chicken Supreme",
        image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90",
        description: "Perfectly seasoned grilled chicken breast with herb butter, served with roasted seasonal vegetables and garlic mashed potatoes.",
        price: "$18.99",
        rating: 4.8,
        badge: "Popular"
    },
    {
        id: 2,
        name: "Truffle Pasta Alfredo",
        image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90",
        description: "House-made fettuccine in rich truffle alfredo sauce, topped with aged parmesan and fresh herbs.",
        price: "$22.99",
        rating: 4.9,
        badge: "Chef's Special"
    },
    {
        id: 3,
        name: "Harvest Buddha Bowl",
        image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90",
        description: "Nourishing blend of quinoa, roasted vegetables, avocado, and tahini dressing. A perfect plant-based delight.",
        price: "$16.99",
        rating: 4.7,
        badge: "Healthy"
    },
    {
        id: 4,
        name: "Prime Ribeye Steak",
        image: "steak",
        description: "Premium ribeye steak grilled to your preference, served with truffle fries and red wine reduction.",
        price: "$32.99",
        rating: 4.9,
        badge: "Premium"
    },
    {
        id: 5,
        name: "Seafood Paella",
        image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90",
        description: "Traditional Spanish paella with fresh shrimp, mussels, and saffron-infused rice.",
        price: "$26.99",
        rating: 4.6,
        badge: "Special"
    },
    {
        id: 6,
        name: "Chocolate Lava Cake",
        image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90",
        description: "Decadent warm chocolate cake with molten center, served with vanilla ice cream.",
        price: "$9.99",
        rating: 4.8,
        badge: "Dessert"
    },
];

const getBadgeColor = (badge: any) => {
  switch (badge) {
    case "Popular": return "badge-warning";
    case "Chef's Special": return "badge-error";
    case "Healthy": return "badge-success";
    case "Premium": return "badge-accent";
    case "Special": return "badge-info";
    case "Dessert": return "badge-secondary";
    default: return "badge-primary";
  }}

export const FoodCardSection = () => {
  const dispatch = useDispatch();

  const {data:mealsData=[],isLoading,error}= mealApi.useGetAllMealsQuery({})
  //console.log ("foodcard- mealsData:", mealsData)

const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)

const [] = ordersApi.useCreateOrderMutation()

const userId = user?.userId
console.log("userId:", userId)

 return (
    <section className="py-20 bg-black/50 px-4 text-white">
  <div className="max-w-7xl mx-auto">
    {/* Header */}
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400">
          The Foodie
        </span>
        
        <span className="block text-white">Experience</span>
      </h2>
      <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
        Discover a curated selection of dishes crafted with passion, precision, and unforgettable flavor.
        Dive into a world where every bite tells a story.
      </p>
    </div>

    {/* Meals Grid */}
    <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {error ? (
        <div className="text-red-200">Something went wrong. Try again.</div>
      ) : isLoading ? (
        <div>
          <PuffLoader color="#ffffff" />
        </div>
      ) : mealsData?.length === 0 ? (
        <div>No meals available.</div>
      ) : (
        mealsData.map((meal: mealsData) => (
          <div
            key={meal.mealId}
            className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
          >
            {/* Image Container */}
            <div className="relative overflow-hidden">
              <img
                src={meal.mealUrl}
                alt={meal.mealName}
                className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {/* Badge */}
              <div className="absolute top-4 left-4">
                <span className={`badge ${getBadgeColor(meal.mealBadge)} badge-lg text-white font-semibold`}>
                  {meal.mealBadge}
                </span>
              </div>
              {/* Rating */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                <MdStar className="text-yellow-400 text-sm" />
                <span className="text-sm font-semibold text-gray-700">{meal.rating}</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-orange-600 transition-colors">
                  {meal.mealName}
                </h3>
                <span className="text-2xl font-bold text-orange-600">Ksh {meal.mealPrice}</span>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">{meal.mealDescription}</p>

              {/* Action Button */}
              {isAuthenticated ? (
                <button
  className="btn w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white border-none shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
  onClick={() => {
    dispatch(addToCart({
      mealId: meal.mealId,
      mealName: meal.mealName,
      mealPrice: meal.mealPrice,
      mealUrl: meal.mealUrl,
      quantity: 1,
    }));
    dispatch(openCart());
  }}
>
  <MdAdd className="text-lg" />
  Add to Cart
</button>
              ) : (
                <a
                  href="/login"
                  className="btn w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white border-none shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center"
                >
                  <FaSignInAlt className="text-lg" />
                  Sign in to Order
                </a>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  </div>
</section>

  );
}
