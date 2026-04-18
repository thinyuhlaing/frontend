"use client";
import { useEffect } from "react";
// import { useAppDispatch, useAppSelector } from "../store/hooks";
import { hideSnackbar } from "@/modules/base/store/slices/appSnackbarSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { RootState } from "@/lib/store";
// import { hideSnackbar } from "@/store/slices/appSnackbarSlice";

const AppSnackbar = () => {
  const { type, open, title, message } = useAppSelector(
    (state) => state.snackbar,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!open) return;

    const timer = setTimeout(() => {
      dispatch(hideSnackbar());
    }, 5000);

    return () => clearTimeout(timer);
  }, [open, dispatch]);

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${
        open
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-2 pointer-events-none"
      }`}
    >
      <div
        className={
          type === "error"
            ? "bg-red-50 border-s-4 border-red-500 p-4"
            : "bg-teal-50 border-t-2 border-teal-500 rounded-lg p-4 0/30"
        }
        role="alert"
        // tabindex="-1"
        aria-labelledby="hs-bordered-success-style-label"
      >
        <div className="flex">
          <div className="shrink-0">
            {/* <!-- Icon --> */}
            {type === "error" ? (
              <span className="inline-flex justify-center items-center size-8 rounded-full border-4 border-red-100 bg-red-200 text-red-800 -900 00">
                <svg
                  className="shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  // stroke-width="2"
                  // stroke-linecap="round"
                  // stroke-linejoin="round"
                >
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </span>
            ) : (
              <span
                className="inline-flex justify-center items-center size-8 rounded-full border-4 border-teal-100 bg-teal-200 text-teal-800
          l-900 400"
              >
                <svg
                  className="shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  // stroke-width="2"
                  // stroke-linecap="round"
                  // stroke-linejoin="round"
                >
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                  <path d="m9 12 2 2 4-4"></path>
                </svg>
              </span>
            )}
            {/* <!-- End Icon --> */}
          </div>
          <div className="ms-3">
            <h3
              id="hs-bordered-success-style-label"
              className="text-secondary font-semibold "
            >
              {title}
            </h3>
            <p className="text-sm text-gray-700 ">{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppSnackbar;
