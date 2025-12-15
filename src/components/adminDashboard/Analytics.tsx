import { FaUsers, FaDollarSign } from 'react-icons/fa';
import { motion } from 'framer-motion';
import {LineChart,Line,PieChart,Pie,Cell,XAxis,YAxis,Tooltip,CartesianGrid,ResponsiveContainer,} from 'recharts';
import { BiFoodMenu, BiSolidFoodMenu } from 'react-icons/bi';
import { ordersApi } from '../../features/api/ordersApi';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import { PuffLoader } from 'react-spinners';
import { userApi } from '../../features/api/userApi';
import { mealApi } from '../../features/api/mealsApi';

const cardVariants = {
  hover: {
    scale: 1.05,
    transition: { type: 'spring' as const, stiffness: 300 },
  },
  tap: { scale: 0.95 },
};

const PIE_COLORS = ['#14b8a6', '#8b5cf6', '#facc15']; // teal, purple, yellow

interface OrderDetails {
  orderId: number;
  userId: number;
  mealId: number;
  createdAt: string;
  status: string;
  meal: {
    mealName: string;
    mealBadge: string;
    mealPrice: number;
    mealUrl: string;
  };
}

const lineData = [
  { name: 'Jan', value: 5000 },
  { name: 'Feb', value: 3500 },
  { name: 'Mar', value: 4200 },
  { name: 'Apr', value: 6100 },
  { name: 'May', value: 7000 },
];

export const Analytics = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const { data: ordersData = [], isLoading } =
    ordersApi.useGetAllOrdersQuery({
      skip: !isAuthenticated,
    });
  const { data: usersData = [], isLoading: userDataIsLoading } =
    userApi.useGetAllUsersQuery({
      skip: !isAuthenticated,
    });
  const { data: mealsData = [], isLoading: mealsDataIsLoading } =
    mealApi.useGetAllMealsQuery({
      skip: !isAuthenticated,
    });

  const confirmedOrders = ordersData.filter(
    (orders: OrderDetails) => orders.status === 'confirmed'
  ).length;
  const pendingOrders = ordersData.filter(
    (orders: OrderDetails) => orders.status === 'pending'
  ).length;
  const canceledOrder = ordersData.filter(
    (orders: OrderDetails) => orders.status === 'canceled'
  ).length;

  const totalRevenue = ordersData
    .filter((order: OrderDetails) => order.status === 'confirmed')
    .reduce(
      (sum: number, order: OrderDetails) => sum + Number(order.meal.mealPrice),
      0
    );

  const pieData = [
    { name: 'Confirmed Orders', value: confirmedOrders },
    { name: 'Pending Orders', value: pendingOrders },
    { name: 'Canceled Orders', value: canceledOrder },
  ];

  const usersCount = usersData.length;
  const mealsCount = mealsData.length;

  return (
    <div className="container mx-auto py-12 px-4">
      {/* Header */}
      <h1 className="text-4xl font-extrabold text-red-600 mb-12 text-center">
        Analytics Dashboard
      </h1>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Orders */}
        <motion.div
          className="bg-gradient-to-br from-red-600 to-red-400 text-white rounded-xl shadow-lg p-6 flex flex-col items-center"
          variants={cardVariants}
          whileHover="hover"
          whileTap="tap"
        >
          {isLoading ? (
            <PuffLoader color="#ffffff" />
          ) : (
            <>
              <BiSolidFoodMenu size={40} />
              <h2 className="text-xl font-semibold mt-4">Orders</h2>
              <p className="text-3xl font-bold mt-2">
                {confirmedOrders + pendingOrders + canceledOrder}
              </p>
            </>
          )}
        </motion.div>

        {/* Users */}
        <motion.div
          className="bg-gradient-to-br from-red-500 to-red-300 text-white rounded-xl shadow-lg p-6 flex flex-col items-center"
          variants={cardVariants}
          whileHover="hover"
          whileTap="tap"
        >
          {userDataIsLoading ? (
            <PuffLoader color="#ffffff" />
          ) : (
            <>
              <FaUsers size={40} />
              <h2 className="text-xl font-semibold mt-4">Users</h2>
              <p className="text-3xl font-bold mt-2">{usersCount}</p>
            </>
          )}
        </motion.div>

        {/* Meals */}
        <motion.div
          className="bg-gradient-to-br from-red-400 to-red-200 text-white rounded-xl shadow-lg p-6 flex flex-col items-center"
          variants={cardVariants}
          whileHover="hover"
          whileTap="tap"
        >
          {mealsDataIsLoading ? (
            <PuffLoader color="#ffffff" />
          ) : (
            <>
              <BiFoodMenu size={40} />
              <h2 className="text-xl font-semibold mt-4">Meals</h2>
              <p className="text-3xl font-bold mt-2">{mealsCount}</p>
            </>
          )}
        </motion.div>

        {/* Revenue */}
        <motion.div
          className="bg-gradient-to-br from-red-300 to-red-100 text-red-800 rounded-xl shadow-lg p-6 flex flex-col items-center"
          variants={cardVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <FaDollarSign size={40} />
          <h2 className="text-xl font-semibold mt-4">Revenue</h2>
          <p className="text-3xl font-bold mt-2">
            Ksh {totalRevenue.toLocaleString()}
          </p>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Pie Chart */}
        <div className="bg-white shadow-xl rounded-xl p-6">
          <h3 className="text-xl font-bold text-red-600 mb-4">
            Order Status Breakdown
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#14b8a6"
                dataKey="value"
                label
              >
                {pieData.map((_entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={PIE_COLORS[index % PIE_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart */}
        <div className="bg-white shadow-xl rounded-xl p-6">
          <h3 className="text-xl font-bold text-red-600 mb-4">
            Monthly Revenue Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={lineData}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#14b8a6"
                strokeWidth={3}
                dot={{ r: 5, fill: '#14b8a6' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
