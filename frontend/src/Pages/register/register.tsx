import { useState } from "react";
import z from "zod";
import type { signUpInterface } from "../../Types/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Hooks/Auth/useAuth";
import { FaEye } from "react-icons/fa";
import { FiEyeOff } from "react-icons/fi";

const Register = () => {
  const navigate = useNavigate();
  const { signup, isLoading } = useAuth();

  const [showpassword, setShowpassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const schema = z
    .object({
      email: z.string().email("Email is not valid"),
      name: z.string().min(3, "name must be more than 3 char"),
      password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[a-zA-Z]/, "Password must contain at least one letter")
        .regex(/\d/, "Password must contain at least one number")
        .regex(
          /[!@#$%^&*(),.?":{}|<>_\-+=]/,
          "Password must contain at least one special character",
        ),
      confirmPassword: z.string().min(1, "Please confirm your password"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Password do not match",
      path: ["confirmPassword"],
    });

  const defaultValues: signUpInterface = {
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<signUpInterface>({
    mode: "all",
    resolver: zodResolver(schema),
    defaultValues,
  });

  const userRegister = async (values: signUpInterface) => {
    const data = await signup(values);
    if (data) {
      navigate("/login");
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
              Make it Yours
            </h1>
            <p className="mt-2 text-[#646F8C]/70">
              A little space, just for you
            </p>
          </div>

          <form
            onSubmit={handleSubmit(userRegister)}
            className="flex flex-col gap-6"
          >
            <div>
              <label htmlFor="name" className="text-[#646F8C]/70 font-semibold">
                Name
              </label>
              <div className="bg-white p-2 rounded-xl my-1.5">
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  className={`input ${errors.name ? "border-red-500 focus:ring-red-500/50" : "border-border focus:ring-primary/50"} `}
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
            </div>

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

            {/* confirm password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="text-[#646F8C]/70 font-semibold"
              >
                Confirm Password
              </label>
              <div className="bg-white p-2 rounded-xl my-1.5">
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    placeholder="confirm password"
                    className={`input ${errors.confirmPassword ? "border-red-500 focus:ring-red-500/50" : "border-border focus:ring-primary/50"} `}
                    {...register("confirmPassword")}
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-200 hover:text-[#03113a] transition-colors cursor-pointer"
                  >
                    <span>
                      {showConfirmPassword ? (
                        <FiEyeOff size={20} />
                      ) : (
                        <FaEye size={20} />
                      )}
                    </span>
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword.message}
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
              {isLoading ? "Loading..." : "Register"}
            </button>
          </form>

          <div>
            Already have account?{" "}
            <a href="/login" className="text-[#03113a] underline">
              login
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
