"use client";

import TextField from "@/modules/base/components/TextField";
import { SubmitHandler, useForm } from "react-hook-form";
import { login } from "@/modules/base/utils/auth";
import { showSnackbar } from "@/modules/base/store/slices/appSnackbarSlice";
import { useAppDispatch } from "@/lib/store/hooks";
import { motion } from "framer-motion";

interface FormData {
  email: string;
  password: string;
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const dispatch = useAppDispatch();

  const handleOnLogin: SubmitHandler<FormData> = async (data) => {
    try {
      await login({
        login: data.email,
        password: data.password,
      });

      dispatch(
        showSnackbar({
          type: "success",
          title: "Success",
          message: "Login successfully",
        }),
      );
    } catch (error: any) {
      dispatch(
        showSnackbar({
          type: "error",
          title: "Login Failed",
          message: error.message,
        }),
      );
    }
  };

  // Animation for card fade-in
  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  return (
    <div className="min-h-screen bg-white/5 flex items-center justify-center py-16 px-4 selection:bg-indigo-100">
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeInUp}
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 p-8 backdrop-blur-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-2 tracking-tight">
            Welcome Back
          </h1>
          <p className="text-slate-500 text-sm">
            Enter your credentials to access your account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(handleOnLogin)} className="space-y-6">
          <TextField
            id="email"
            label="Email Address"
            placeholder="test@company.com"
            register={register("email", {
              required: "Email is required",
            })}
            error={errors.email?.message as string}
          />

          <TextField
            id="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            register={register("password", {
              required: "Password is required",
              // minLength: {
              //   value: 6,
              //   message: "Password must be at least 6 characters",
              // },
            })}
            error={errors.password?.message as string}
          />

          <button
            type="submit"
            className="w-full py-3 px-4 bg-(--primary) text-white font-bold rounded-2xl shadow-lg hover:bg-(--primary)/80 hover:-translate-y-1 transition-all"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-slate-500 text-sm">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="text-(--primary) font-semibold hover:underline"
          >
            Sign Up
          </a>
        </div>
      </motion.div>
    </div>
  );
}
