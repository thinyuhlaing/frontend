"use client";
import Lottie from "lottie-react";
import loadingAnim from "../../../../public/animation/loading.json";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-[80vh] ">
      {/* Lottie animation */}
      <div className="w-40 h-40 md:w-48 md:h-48">
        <Lottie animationData={loadingAnim} loop />
      </div>
    </div>
  );
}
