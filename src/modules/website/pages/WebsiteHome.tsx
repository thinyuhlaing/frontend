"use client";

import { motion } from "framer-motion";

export default function WebsiteHome() {
  // Animation Variants
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  const stagger = {
    animate: { transition: { staggerChildren: 0.1 } },
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-100">
      {/* --- Hero Section --- */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="initial"
            animate="animate"
            variants={stagger}
            className="space-y-8"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-block px-4 py-1.5 rounded-full bg-indigo-50 text-(--primary) text-xs font-bold uppercase tracking-widest"
            >
              ✨ Version 2.0 is live
            </motion.span>
            <motion.h1
              variants={fadeInUp}
              className="text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1]"
            >
              Design your <span className="text-(--primary)">digital</span>{" "}
              future.
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-slate-500 leading-relaxed max-w-lg"
            >
              The all-in-one platform to manage your connection, security, and
              digital assets with enterprise-grade speed.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex gap-4">
              <button className="bg-(--primary) text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-indigo-100 hover:bg-(--primary)/80 hover:-translate-y-1 transition-all">
                Start for Free
              </button>
              <button className="group flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 transition-all">
                <i className="fa-solid fa-play text-xs p-3 bg-white shadow-md rounded-full group-hover:scale-110 transition-transform"></i>
                Watch Demo
              </button>
            </motion.div>
          </motion.div>

          {/* Decorative Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-[2rem] blur-2xl opacity-10 animate-pulse"></div>
            <div className="relative bg-slate-50 border border-slate-200 rounded-[2rem] p-8 shadow-2xl">
              {/* Content representing a dashboard snippet */}
              <div className="space-y-6">
                <div className="h-4 w-1/2 bg-slate-200 rounded-full animate-pulse"></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-24 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center">
                    <i className="fa-solid fa-chart-line text-indigo-400 text-2xl"></i>
                  </div>
                  <div className="h-24 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center">
                    <i className="fa-solid fa-shield-halved text-emerald-400 text-2xl"></i>
                  </div>
                </div>
                <div className="h-32 bg-(--primary) rounded-2xl shadow-lg flex items-end p-4 text-white font-bold">
                  System Secure
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- Features Grid (Inspired by your Account Design) --- */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold">Powerful Core Features</h2>
            <p className="text-slate-500">
              Everything you need to scale your application.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Connection & Security",
                icon: "fa-tower-broadcast",
                color: "text-blue-500",
                desc: "Enterprise-grade encryption for all your data streams.",
              },
              {
                title: "Real-time Analytics",
                icon: "fa-gauge-high",
                color: "text-purple-500",
                desc: "Track every interaction with microsecond precision.",
              },
              {
                title: "Cloud Integration",
                icon: "fa-cloud-arrow-up",
                color: "text-indigo-500",
                desc: "Seamless sync across all your devices and platforms.",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all group"
              >
                <div
                  className={`w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${feature.color}`}
                >
                  <i className={`fa-solid ${feature.icon} text-2xl`}></i>
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
