import { Footer } from '../components/Footer'
import { Navbar } from '../components/Navbar'
import {Link, useNavigate} from "react-router-dom"
import {useForm} from 'react-hook-form'
import { userApi } from '../features/api/userApi'
import {Toaster, toast} from "sonner";

interface registerUser{
  firstName:string,
  lastName:string,
  email:string,
  password:string
}


export const Register = () => {
  const Navigate = useNavigate()
const {register,handleSubmit,formState:{errors}}= useForm<registerUser>();

const [registerUser,{isLoading}] = userApi.useRegisterUserMutation()

const onSubmit = async(data:registerUser)=>{
  const toastid = toast.loading('registering user')
console.log(data)
try{
  const res = await registerUser(data).unwrap()
  // console.log(res)
  toast.success(res.message,{id: toastid})
  Navigate('/login')
}catch(err:any){
console.log("failed to create user",err)
toast.error('Failed to register' + (err.data?.error))
toast.dismiss(toastid)
}
}

  return (
    <>
    <Toaster
    richColors
    position='top-right'/>

    <Navbar/>
<div>
   <div>
    {/* form section */}
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-6">
  <form
  className="w-full max-w-lg mx-auto bg-white p-8 rounded-2xl shadow-md space-y-6"
  onSubmit={handleSubmit(onSubmit)}
>
  {/* Header */}
  <div className="text-center">
    <h2 className="text-3xl font-bold text-blue-700">Create Account</h2>
    <p className="text-sm text-gray-500 mt-1">Join our community today</p>
  </div>

  {/* Name Fields - Grouped Side by Side */}
  <div className="flex gap-4">
    <div className="form-control w-1/2">
      <label htmlFor="firstName" className="label">
        <span className="label-text font-semibold text-gray-700">First Name</span>
      </label>
      <input
        type="text"
        id="firstName"
        placeholder="John"
        className="input input-bordered w-full"
        {...register("firstName", { required: true })}
      />
      {errors.firstName && (
        <span className="text-sm text-red-500 mt-1">First name is required</span>
      )}
    </div>

    <div className="form-control w-1/2">
      <label htmlFor="lastName" className="label">
        <span className="label-text font-semibold text-gray-700">Last Name</span>
      </label>
      <input
        type="text"
        id="lastName"
        placeholder="Doe"
        className="input input-bordered w-full"
        {...register("lastName", { required: true })}
      />
      {errors.lastName && (
        <span className="text-sm text-red-500 mt-1">Last name is required</span>
      )}
    </div>
  </div>

  {/* Email */}
  <div className="form-control">
    <label htmlFor="email" className="label">
      <span className="label-text font-semibold text-gray-700">Email Address</span>
    </label>
    <input
      type="email"
      id="email"
      placeholder="you@example.com"
      className="input input-bordered w-full"
      {...register("email", { required: true })}
    />
    {errors.email && (
      <span className="text-sm text-red-500 mt-1">Email is required</span>
    )}
  </div>

  {/* Password */}
  <div className="form-control">
    <label htmlFor="password" className="label">
      <span className="label-text font-semibold text-gray-700">Password</span>
    </label>
    <input
      type="password"
      id="password"
      placeholder="••••••••"
      className="input input-bordered w-full"
      {...register("password", { required: true })}
    />
    {errors.password && (
      <span className="text-sm text-red-500 mt-1">Password is required</span>
    )}
  </div>

  {/* Submit Button */}
  <button
    type="submit"
    className="btn btn-primary w-full text-white text-base font-semibold bg-red-600"
  >
    {isLoading && (
      <span className="loading loading-spinner text-white mr-2"></span>
    )}
    Register
  </button>

  {/* Navigation Links */}
  <div className="flex justify-between text-sm mt-4 text-gray-600">
    <Link to="/" className="hover:text-blue-600 hover:underline">
      ← Back to Home
    </Link>
    <Link to="/login" className="hover:text-green-600 hover:underline">
      Already have an account? Login →
    </Link>
  </div>
</form>

</div>

    </div> 
</div>



    <Footer/>
    </>
  )
}
