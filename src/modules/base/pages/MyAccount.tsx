"use client";

import {
  faChartLine,
  faEnvelope,
  faMailBulk,
  faNotesMedical,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import Image from "next/image";
import AccountCard from "../components/AccountCard";
import { useAuth } from "../hooks/useAuth";
import { useEnabledModules } from "@/moduleRegistry";

export default function MyAccount() {
  const { userInfo } = useAuth();
  const modules = useEnabledModules();
  const profileItems = modules
    .flatMap((mod) => mod.profileBlocks || [])
    .filter(Boolean);
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-(--primary)/10">
      <main
        className="max-w-7xl mx-auto p-6 md:py-10"
        // className="max-w-6xl mx-auto p-8 md:p-16"
      >
        {/* Header Section */}
        <motion.header
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
            My account
          </h1>
          <p className="text-gray-400 mt-2">
            Manage your profile and security preferences.
          </p>
        </motion.header>

        <div className="flex flex-col lg:flex-row justify-between items-start gap-16">
          {/* Main Grid: Features */}
          <div className="flex-1 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {profileItems.map((item) => (
                <AccountCard
                  key={item.id}
                  delay={0.1}
                  title={item.title}
                  description={item.description}
                  icon={item.icon}
                  href={item.href}
                />
              ))}
            </div>
          </div>

          {/* User Profile Sidebar */}
          <motion.aside
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="w-full lg:w-80 bg-gray-50 p-8 rounded-3xl border border-gray-100 sticky top-8"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="relative group">
                {/* <div className="absolute -inset-1 bg-gradient-to-r from-(--primary)/80 to-(--primary) rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div> */}
                {/* <div className="relative bg-white rounded-full p-4 w-20 h-20 flex items-center justify-center shadow-xl"> */}
                <Image
                  src={"/image/default-avatar.jpg"}
                  alt="avatar"
                  width={100}
                  height={100}
                  className="rounded-full border-2 border-transparent group-hover:border-(--primary)/30 transition-all object-cover"
                />

                {/* <i className="fa-solid fa-user text-(--primary) text-3xl"></i> */}
                {/* </div> */}
              </div>

              <div>
                <h2 className="font-bold text-xl text-gray-800">
                  {userInfo?.name}
                </h2>
                {/* <p className="text-(--primary) text-sm font-medium">
                  {userInfo}
                </p> */}
              </div>
            </div>

            <hr className="my-8 border-gray-200" />

            <div className="space-y-6">
              <div className="flex items-center gap-4 text-gray-600 hover:text-(--primary) transition-colors group cursor-default">
                <FontAwesomeIcon icon={faEnvelope} />
                <span className="text-sm font-medium">{userInfo?.email}</span>
              </div>
              {/* 
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="w-full flex items-center justify-center gap-3 bg-(--primary) hover:bg-(--primary)/80 text-white py-3 px-6 rounded-xl font-bold shadow-lg shadow-indigo-200 transition-all"
              >
                <i className="fa-solid fa-pen-to-square text-sm"></i>
                <span>Edit Profile</span>
              </motion.button> */}
            </div>
          </motion.aside>
        </div>
      </main>
    </div>
  );
}
