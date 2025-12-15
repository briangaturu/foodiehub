import {Link, useNavigate} from "react-router"
import {Footer} from "../components/Footer"
import { Navbar } from "../components/Navbar"
import { useForm } from "react-hook-form";
import { userApi } from "../features/api/userApi";
import { toast, Toaster } from "sonner";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";


interface loginUser{
  email:string,
  password:string
}

export const Login = () => {
    const navigate = useNavigate();
      const dispatch = useDispatch();
    const {register,handleSubmit,formState:{errors}}= useForm<loginUser>();

    const[loginUser] = userApi.useLoginUserMutation()

const onSubmit = async (data: loginUser) => {
        const loadingToastId = toast.loading("Logging in...");
        // console.log(data)
        try {
            const res = await loginUser(data).unwrap()
            console.log(res)
            dispatch(setCredentials(res))
            toast.success(res?.message, { id: loadingToastId })
            if (res.userType === "member") {
                navigate("/dashboard/me")
            } else {
                navigate("/admindashboard/analytics")
            }

        } catch (err: any) {
            toast.error('Failed to Login: ' + (err.data?.message || err.message || err.error || err));
            toast.dismiss(loadingToastId)
        }

    };

  return (
    <>
    <Toaster
        richColors
        position='top-right'/>
    <Navbar/>
    <div>
        <div>
{/* form section */}
<div className="flex items-center justify-center p-8">
                        <form className="w-full max-w-md space-y-6 bg-white rounded-2xl  p-8" onSubmit={handleSubmit(onSubmit)}>
                            <div className="text-center mb-6">
                                <div className="text-4xl font-bold text-blue-600 mb-2">Login</div>
                                <p className="text-gray-500">Welcome Back</p>
                            </div>

                            <label className="block">
                                <span className="text-red-700">Email</span>
                                <input type="email" className="input input-bordered  border-2 w-full mt-1" placeholder="Email"
                                {...register("email", {required:true})} />
                                {errors.email && (<span>Email is required</span>)}
                            </label>

                            <label className="block">
                                <span className="text-red-700">Password</span>
                                <input type="password" className="input input-bordered border-2 w-full mt-1" placeholder="Password"
                                {...register("password", {required:true})} />
                                {errors.email && (<span>Email is required</span>)}
                            </label>
                            <button type="submit" className="btn btn-info btn-circle btn-block mt-4 shadow-md hover:scale-105 transition-transform">
                                Login
                            </button>
                            <Link to="/forgotpassword" className="text-green-500 hover:underline ">
                                <span role="img" aria-label="home"></span> Forgot password?
                            </Link>
                            <div className="flex  text-center mt-4">
                                <Link to="/" className="text-blue-500 hover:underline flex items-center justify-center gap-1">
                                    <span role="img" aria-label="home"></span>HomePage
                                </Link>
                                <Link to="/register" className="text-green-500 hover:underline flex items-center justify-center gap-1">
                                    <span role="img" aria-label="home"></span> Need An Account?
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
