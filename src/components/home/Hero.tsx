import heroImage from "../../assets/react.svg";

export const Hero = () => {
  return (
    
    <section className="bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 min-h-fit flex items-center justify-center px-4">
        <div className="hero-content flex-col-reverse lg:flex-row-reverse gap-12 max-w-6xl">
            {/* Image */}
            <div className="relative">
            <img
                src={heroImage}
                alt="Delicious restaurant food and dining experience"
                className="w-full max-w-md rounded-3xl shadow-2xl object-cover transform hover:scale-105 transition-transform duration-300"
            />
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full opacity-15 animate-pulse delay-1000"></div>
            </div>

            {/* Text Content */}
            <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-800 leading-tight">
                Welcome to Mathe`s 
                <span className="block bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                Kitchen Excellence
                </span>
            </h1>
            <p className="mt-6 text-lg text-gray-700 leading-relaxed">
                Mathe's Kitchen handcrafted dishes made with the finest ingredients, served in an atmosphere 
                that celebrates the art of dining. Every meal is a journey of flavors.
            </p>
            
            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="btn bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white border-none shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-lg px-8">
                View My Order
                </button>
                <button className="btn btn-outline border-orange-400 text-orange-600 hover:bg-orange-500 hover:border-orange-500 hover:text-white transition-all duration-200 text-lg px-8">
                View Meals
                </button>
            </div>

            {/* Stats */}
            <div className="mt-12 flex flex-wrap justify-center lg:justify-start gap-8">
                <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">500+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
                </div>
                <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">50+</div>
                <div className="text-sm text-gray-600">Signature Dishes</div>
                </div>
                <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">5★</div>
                <div className="text-sm text-gray-600">Average Rating</div>
                </div>
            </div>
            </div>
        </div>
    </section>
  );
};