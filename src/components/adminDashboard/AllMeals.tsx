import { AiFillDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { mealApi } from "../../features/api/mealsApi";
import { PuffLoader } from "react-spinners";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { SaveIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";
import Swal from "sweetalert2";

interface mealData {
  mealId: number;
  mealName: string;
  mealUrl: string;
  mealDescription: string;
  rating: number;
  mealPrice: string;
  mealBadge: string;
  createdAt: string;
}

interface FoodTypes {
  mealName: string;
  mealPrice: string;
  mealUrl: string;
  mealBadge: string;
  mealDescription: string;
  rating: number;
}

export const AllMeals = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMeal, setEditingMeal] = useState<mealData | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleModalToggle = (meal?: mealData) => {
    if (meal) {
      setEditingMeal(meal);
      reset(meal);
    } else {
      setEditingMeal(null);
      reset();
    }
    setIsModalOpen(!isModalOpen);
  };

  const {
    data: mealsData,
    isLoading,
    error,
  } = mealApi.useGetAllMealsQuery({});

  const [deleteMeals] = mealApi.useDeleteMealMutation();
  const [createMeals] = mealApi.useCreateMealMutation();
  const [updateMeal] = mealApi.useUpdateMealMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FoodTypes>();

  const onSubmit = async (data: FoodTypes) => {
    const loadingToastId = toast.loading(
      editingMeal ? "Updating Meal..." : "Creating Meal..."
    );

    try {
      if (editingMeal) {
        const updated = await updateMeal({
          mealId: editingMeal.mealId,
          ...data,
        }).unwrap();
        toast.success(updated?.message || "Meal updated!", {
          id: loadingToastId,
        });
      } else {
        const res = await createMeals(data).unwrap();
        toast.success(res?.message || "Meal created!", {
          id: loadingToastId,
        });
      }
      reset();
      setIsModalOpen(false);
      setEditingMeal(null);
    } catch (error: any) {
      toast.error("Failed: " + (error.data?.message || "Something went wrong"), {
        id: loadingToastId,
      });
    }
  };

  const deleteMealbyId = async (mealId: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this meal.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result: { isConfirmed: any }) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteMeals(mealId).unwrap();
          toast.success("Meal deleted successfully!");
          Swal.fire("Deleted", res.message, "success");
        } catch (error: any) {
          Swal.fire("Something went wrong", "Please try again", "error");
        }
      }
    });
  };

  return (
    <>
      <Toaster richColors position="top-right" />

      {/* Header with Search and Add Button */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
        <h2 className="text-3xl font-extrabold text-red-600">
          All Meals Menus Page
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search meals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button
            className="btn btn-wide border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition"
            onClick={() => handleModalToggle()}
          >
            Add Meal
          </button>
        </div>
      </div>

      {/* Status messages */}
      {error ? (
        <span className="text-red-600 font-semibold">
          Something went wrong. Please try again.
        </span>
      ) : isLoading ? (
        <span className="flex justify-center">
          <PuffLoader color="#dc2626" />
        </span>
      ) : mealsData?.length === 0 ? (
        <span className="text-gray-600">No Meals Found</span>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-lg">
            <thead className="bg-red-600">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  #
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Name / Image
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Price
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Date Added
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mealsData
                .filter((meal: mealData) =>
                  meal.mealName
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                )
                .map((meal: mealData) => (
                  <tr
                    key={meal.mealId}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-4 py-4 whitespace-nowrap text-gray-800 font-medium">
                      {meal.mealId}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-md overflow-hidden">
                          <img
                            src={meal.mealUrl}
                            alt={meal.mealName}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div>
                          <div className="font-bold text-gray-800">
                            {meal.mealName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {meal.mealBadge}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-gray-800">
                      {meal.rating}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-gray-800">
                      KSH: {meal.mealPrice}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-gray-800">
                      {new Date(meal.createdAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap flex gap-2">
                      <button
                        onClick={() => handleModalToggle(meal)}
                        className="btn btn-sm border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition"
                      >
                        <FiEdit />
                      </button>
                      <button
                        onClick={() => deleteMealbyId(meal.mealId)}
                        className="btn btn-sm border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition"
                      >
                        <AiFillDelete />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-8 relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              onClick={() => handleModalToggle()}
            >
              <FaTimes size={18} />
            </button>

            <h2 className="text-2xl font-bold text-red-600 mb-6 text-center">
              {editingMeal ? "EDIT MEAL" : "ADD NEW MEAL"}
            </h2>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Food Name
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter Food Name"
                  {...register("mealName", { required: true })}
                />
                {errors.mealName && (
                  <span className="text-red-600 text-sm">
                    Food Name is required.
                  </span>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Food Description
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter Description"
                  {...register("mealDescription", { required: true })}
                />
                {errors.mealDescription && (
                  <span className="text-red-600 text-sm">
                    Food Description is required.
                  </span>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Image Link
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter image link"
                  {...register("mealUrl", { required: true })}
                />
                {errors.mealUrl && (
                  <span className="text-red-600 text-sm">
                    Image Link is required.
                  </span>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Meal Badge
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter the Meal Badge"
                  {...register("mealBadge", { required: true })}
                />
                {errors.mealBadge && (
                  <span className="text-red-600 text-sm">
                    Meal Badge is required.
                  </span>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Meal Price
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter the Meal Price"
                  {...register("mealPrice", { required: true })}
                />
                {errors.mealPrice && (
                  <span className="text-red-600 text-sm">
                    Meal Price is required.
                  </span>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Meal Ratings
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter Meal Ratings"
                  {...register("rating", { required: true })}
                />
                {errors.rating && (
                  <span className="text-red-600 text-sm">
                    Meal Rating is required.
                  </span>
                )}
              </div>

              <div className="flex justify-end mt-6 gap-3">
                <button
                  type="button"
                  onClick={() => handleModalToggle()}
                  className="btn border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition"
                >
                  <FaTimes className="mr-2" /> Cancel
                </button>
                <button
                  type="submit"
                  className="btn bg-red-600 text-white hover:bg-red-700 transition"
                >
                  {isLoading ? (
                    <span className="loading loading-spinner text-white"></span>
                  ) : (
                    <SaveIcon className="mr-2" />
                  )}
                  {editingMeal ? "Update Meal" : "Add Meal"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
