import { AiFillDelete } from "react-icons/ai"
import { FiEdit } from "react-icons/fi"
import type { RootState } from "../../app/store"
import { useSelector } from "react-redux"
import { ordersApi } from "../../features/api/ordersApi"
import { PuffLoader } from "react-spinners"
import Swal from "sweetalert2"

interface OrderDetails {
  orderId: number,
  userId: number,
  mealId: number,
  createdAt: string,
  status: string,
  meal: {
    mealName: string,
    mealBadge: string,
    mealPrice: number,
    mealUrl: string
  }
  user: {
    firstName: string,
    email: string
  }
}


const getStatusBadge = (status: any) => {
  switch (status) {
    case "confirmed": return "badge-success";
    case "canceled": return "badge-error";
    case "pending": return "badge-warning";
    default: return "badge-primary";
  }
}

export const AllOrders = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)
  const { data: ordersData = [], isLoading, error } = ordersApi.useGetAllOrdersQuery(undefined,{
    skip: !isAuthenticated
  })
  const [updateOrder] = ordersApi.useUpdateOrderMutation()
  const [deleteOrder] = ordersApi.useDeleteOrderMutation();

  const handleEdit = async (orderId:number) => {
    Swal.fire({
      title:"are you sure",
      text:"you want to confirm?",
      icon:"warning",
      showCancelButton:true,
      confirmButtonColor:"#d33",
      cancelButtonColor:"#3085d6",
      confirmButtonText:"confirm",
  }).then(async(res)=>{
    const updatepayLoad ={
      orderId:orderId,
      status:"confirmed"
    }
    if(res.isConfirmed){
      try {
        const response = await updateOrder(updatepayLoad).unwrap();
        console.log(response)
        Swal.fire("order updated successfully");
      } catch (err: any) {
        Swal.fire("Failed to update order: ", "error");
      }
    }
  });
}

  const handleDelete = async (orderId:number) => {
    Swal.fire({
  title: "Are you sure?",
  text: "You want to delete?",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#d33",
  cancelButtonColor: "#3085d6",
  confirmButtonText: "Yes, delete",
  cancelButtonText: "Cancel",
}).then(async(res)=>{
    if(res.isConfirmed){
      try {
        const response = await deleteOrder(orderId).unwrap();
        console.log(response) 
        Swal.fire("order deleted successfully");
      } catch (err: any) {
        Swal.fire("Failed to delete order: ", "error");
      }
    }
  });
  }

  return (
    <>
      <div className="text-3xl font-extrabold text-center mb-8 text-red-600">
  All Orders Page
</div>

<div className="overflow-x-auto">
  <table className="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-lg">
    {/* Table Head */}
    <thead className="bg-red-600">
      <tr>
        <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
          Order ID
        </th>
        <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
          Meal
        </th>
        <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
          Price
        </th>
        <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
          Ordered By
        </th>
        <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
          Order Date
        </th>
        <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
          Status
        </th>
        <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
          Actions
        </th>
      </tr>
    </thead>

    <tbody className="bg-white divide-y divide-gray-200">
      {error ? (
        <tr>
          <td colSpan={7} className="px-4 py-6 text-center text-red-600 font-semibold">
            Error while fetching your orders. Please try again.
          </td>
        </tr>
      ) : isLoading ? (
        <tr>
          <td colSpan={7} className="px-4 py-6 text-center">
            <PuffLoader color="#ef4444" />
          </td>
        </tr>
      ) : ordersData.length === 0 ? (
        <tr>
          <td colSpan={7} className="px-4 py-6 text-center text-gray-600">
            No orders available 😎
          </td>
        </tr>
      ) : (
        ordersData.map((order: OrderDetails) => (
          <tr key={order.orderId} className="hover:bg-gray-50">
            <td className="px-4 py-4 whitespace-nowrap font-medium text-gray-800">
              {order.orderId}
            </td>
            <td className="px-4 py-4 whitespace-nowrap">
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="h-12 w-12 rounded-md overflow-hidden">
                    <img
                      src={order.meal.mealUrl}
                      alt={order.meal.mealName}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
                <div>
                  <div className="font-bold text-gray-800">{order.meal.mealName}</div>
                  <div className="text-sm text-gray-500">{order.meal.mealBadge}</div>
                </div>
              </div>
            </td>
            <td className="px-4 py-4 whitespace-nowrap text-gray-800">
              Ksh {order.meal.mealPrice}
            </td>
            <td className="px-4 py-4 whitespace-nowrap">
              <div>
                <div className="font-bold text-gray-800">
                  {order.user.firstName}
                </div>
                <div className="text-sm text-gray-500">
                  {order.user.email}
                </div>
              </div>
            </td>
            <td className="px-4 py-4 whitespace-nowrap text-gray-800">
              {new Date(order.createdAt).toLocaleString()}
            </td>
            <td className="px-4 py-4 whitespace-nowrap">
              <div className={`badge badge-outline ${getStatusBadge(order.status)} text-red-600 border-red-600`}>
                {order.status}
              </div>
            </td>
            <td className="px-4 py-4 whitespace-nowrap flex gap-2">
              <button
                className="btn btn-sm border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition"
                onClick={() => handleEdit(order.orderId)}
              >
                <FiEdit />
              </button>
              <button
                className="btn btn-sm border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition"
                onClick={() => handleDelete(order.orderId)}
              >
                <AiFillDelete />
              </button>
            </td>
          </tr>
        ))
      )}
    </tbody>
  </table>
</div>

    </>
  )
}
