import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { useState } from "react";
import { MainContent } from "../../constants/mainContent";
import {
  AuthenticatedUserRouters,
  LandingRouters,
} from "../../constants/routes";
import { loginUser } from "../../redux/slices/authSlice";
import { setLoading } from "../../redux/slices/loadingSlice";
import { toast } from "react-toastify";
import { adminLogin } from "../../api/admin.api";

const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialData = {
    email: "",
    password: "",
  };
  const [payload, setPayload] = useState(initialData);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async () => {
    dispatch(setLoading(true));
    try {
      const response = await adminLogin(payload);
      console.log(response, "response");
      if (response?.success) {
        await dispatch(
          loginUser({
            token: response?.token,
            userId: response?.data?._id,
            role: response?.data?.role,
            data: response?.data, 
          })
        );
        localStorage.setItem("adminId", response?.data?._id);
        Swal.fire({
          icon: "success",
          title: "Login Success",
          text: "You have logged in successfully",
          timer: 3000,
        }).then(() => {
          navigate(AuthenticatedUserRouters.DASHBOARD);
        });
      } else {
        toast.error(response?.message || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text:
          error?.response?.data?.message ||
          error.message ||
          "Something went wrong",
        timer: 3000,
      });
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleChange = (e, field) => {
    const { value } = e.target;
    setPayload({
      ...payload,
      [field]: value,
    });
  };
  return (
    <>
      <div
        className="bg-hero-gradient rounded-md text-white min-h-screen flex items-center justify-around p-4"
      >
        <div className="w-full max-w-md bg-gradient-to-br from-slate-800/60 to-slate-900/50 backdrop-blur-lg border border-amber-600/20 rounded-3xl p-8 shadow-[0_30px_60px_rgba(0,0,0,0.6)] text-center space-y-6">
          <div className="flex justify-center mb-4">
            <img
              src={MainContent.appLogo}
              alt="App Logo"
              className="h-14 w-14 rounded-full cursor-pointer border-4 border-amber-400/80 shadow-[0_8px_30px_rgba(255,184,11,0.12)]"
              onClick={() => navigate(LandingRouters.DASHBOARD)}
            />
          </div>

          <h1 className="text-4xl font-extrabold text-amber-300 mb-1" style={{ textShadow: '0 4px 18px rgba(255,184,11,0.18)' }}>Admin Login</h1>
          <div className="space-y-5">
            <div>
              <label className="text-sm text-start text-amber-200/80 mb-2 block">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-slate-900/40 border border-amber-700/20 rounded-xl py-3 px-4 text-amber-100 placeholder-amber-200/60 focus:outline-none focus:ring-2 focus:ring-amber-400/60"
                value={payload.email}
                onChange={(e) => handleChange(e, "email")}
              />
            </div>
            <div>
              <label className="text-sm text-start text-amber-200/80 mb-2 block">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full bg-slate-900/40 border border-amber-700/20 rounded-xl py-3 px-4 pr-12 text-amber-100 placeholder-amber-200/60 focus:outline-none focus:ring-2 focus:ring-amber-400/60"
                  value={payload.password}
                  onChange={(e) => handleChange(e, "password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-200/90 p-1"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M3 3l18 18" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M10.58 10.58A3 3 0 0 0 13.42 13.42" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M2.16 12.12C3.94 7.72 7.73 5 12 5c1.7 0 3.31.42 4.78 1.16" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M15.54 15.54C13.77 16.98 12 17 12 17c-4.27 0-8.06-2.72-9.84-7.12" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M1.5 12s3.5-7 10.5-7 10.5 7 10.5 7-3.5 7-10.5 7S1.5 12 1.5 12z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="12" cy="12" r="3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <button
              className="w-full bg-gradient-to-r from-amber-400 to-amber-600 text-slate-900 p-4 rounded-2xl font-semibold text-lg hover:from-amber-500 hover:to-amber-700 transition-colors shadow-[0_14px_30px_rgba(255,167,0,0.18)] md:col-span-2 mt-2"
              onClick={handleSubmit}
              style={{ boxShadow: '0 10px 30px rgba(255,184,11,0.14)' }}
            >
              Login
            </button>
          </div>
        </div>
        <div className="hidden md:flex items-center justify-center w-1/3">
            <img
              src={MainContent.appLogo}
              alt="Brand"
              className="w-80 h-80 object-contain rounded-md"
              style={{ filter: 'drop-shadow(0 30px 60px rgba(255,184,11,0.25))' }}
            />
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
