import { useState } from "react";
import z from "zod";
import type { loginInterface } from "../../Types/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Hooks/Auth/useAuth";
import { FaEye } from "react-icons/fa";
import { FiEyeOff } from "react-icons/fi";

const Login = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();

  const [showpassword, setShowpassword] = useState(false);

  const schema = z.object({
    email: z.string().email("Email is not valid"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[a-zA-Z]/, "Password must contain at least one letter")
      .regex(/\d/, "Password must contain at least one number")
      .regex(
        /[!@#$%^&*(),.?":{}|<>_\-+=]/,
        "Password must contain at least one special character",
      ),
  });

  const defaultValues: loginInterface = {
    email: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<loginInterface>({
    mode: "all",
    resolver: zodResolver(schema),
    defaultValues,
  });

  const userLogin = async (values: loginInterface) => {
    try {
      const data = await login(values);
      if (data) {
        navigate("/");
      }
    } catch (error) {
      console.error("login failed", error);
    }
  };

  return (
    <>
      <section className="bg-[#E9EDFA] w-[90%] md:w-1/3 rounded-2xl ">
        <div className="p-4 flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <span className="bg-[#2B3A67] text-white py-2 px-4 rounded-full font-bold">
              A
            </span>
            <h2 className="font-semibold text-[#2B3A67]">Authentication App</h2>
          </div>

          <div>
            <h1 className="font-semibold text-2xl text-[#2B3A67]">
              Welcome back
            </h1>
            <p className="mt-2 text-[#646F8C]/70">Sign in to your space</p>
          </div>

          <form
            onSubmit={handleSubmit(userLogin)}
            className="flex flex-col gap-6"
          >
            <div>
              <label
                htmlFor="email"
                className="text-[#646F8C]/70 font-semibold"
              >
                Email
              </label>
              <div className="bg-white p-2 rounded-xl my-1.5">
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  autoComplete="email"
                  className={`input ${errors.email ? "border-red-500 focus:ring-red-500/50" : "border-border focus:ring-primary/50"} `}
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            {/* password */}
            <div>
              <label
                htmlFor="password"
                className="text-[#646F8C]/70 font-semibold"
              >
                Password
              </label>
              <div className="bg-white p-2 rounded-xl my-1.5">
                <div className="relative">
                  <input
                    type={showpassword ? "text" : "password"}
                    id="password"
                    placeholder="Enter your password"
                    className={`input ${errors.password ? "border-red-500 focus:ring-red-500/50" : "border-border focus:ring-primary/50"} `}
                    {...register("password")}
                  />

                  <button
                    type="button"
                    onClick={() => setShowpassword(!showpassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-200 hover:text-[#03113a] transition-colors cursor-pointer"
                  >
                    <span>
                      {showpassword ? (
                        <FiEyeOff size={20} />
                      ) : (
                        <FaEye size={20} />
                      )}
                    </span>
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !isValid}
              className={`
                w-full bg-[#2B3A67] text-white font-semibold rounded-lg py-2.5 transition duration-300
                ${
                  isLoading
                    ? "opacity-60 cursor-not-allowed"
                    : "hover:bg-[#03113a] cursor-pointer"
                }
               `}
            >
              {isLoading ? "Loading..." : "Login"}
            </button>
          </form>

          <div>
            Don't have an account?{" "}
            <a href="/register" className="text-[#03113a] underline">
              Sign Up
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
