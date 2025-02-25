"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Marquee.module.css";

const tagGroups = [
  ["# JavaScript", "# webdev", "# Typescript", "# Next.js", "# UI/UX"],
  ["# webdev", "# Gatsby", "# JavaScript", "# Tailwind", "# Typescript"],
  ["# animation", "# Tailwind", "# React", "# SVG", "# HTML"],
  ["# Gatsby", "# HTML", "# CSS", "# React", "# Next.js"],
  ["# Next.js", "# React", "# webdev", "# Typescript", "# Gatsby"],
];

export default function AnimatedLandingPage() {
  const [loading, setLoading] = useState(false);
  const [showRedirectNote, setShowRedirectNote] = useState(false);
  const [animationDurations, setAnimationDurations] = useState<number[]>([]);

  useEffect(() => {
    const loadingTimer = setTimeout(() => setLoading(true), 2000);
    const hideLoadingTimer = setTimeout(() => setLoading(false), 8000);
    const redirectNoteTimer = setTimeout(() => setShowRedirectNote(true), 8500);

    setAnimationDurations([15.951, 19.26, 10.449, 16.638, 15.936]);

    return () => {
      clearTimeout(loadingTimer);
      clearTimeout(hideLoadingTimer);
      clearTimeout(redirectNoteTimer);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      <motion.h1
        className="text-4xl md:text-6xl font-bold mb-6 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Welcome to Our Website
      </motion.h1>
      <motion.p
        className="text-lg md:text-xl text-center max-w-2xl mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        Explore trending technologies and design patterns with our interactive UI.
      </motion.p>

      <div className="min-h-[120px] flex items-center justify-center">
        <AnimatePresence>{loading && <LoadingAnimation key="loading" />}</AnimatePresence>
        <AnimatePresence>{showRedirectNote && !loading && <RedirectNote />}</AnimatePresence>
      </div>

      <div className="w-[40rem] max-w-[90vw] mt-12 border-2 border-black rounded-xl py-4">
        {tagGroups.map((tags, index) => (
          <motion.div
            key={index}
            className="relative overflow-hidden my-3"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
          >
            <div
              className={styles.marquee}
              style={{
                animationDuration: `${animationDurations[index]}s`,
                animationDirection: index % 2 === 0 ? "normal" : "reverse",
              }}
            >
              {[...tags, ...tags].map((tag, i) => (
                <div key={i} className="bg-black text-white px-3 py-1 rounded-md m-1 shadow-md text-sm">
                  {tag}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function LoadingAnimation() {
  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <motion.div
        className="w-16 h-16 border-t-4 border-b-4 border-black rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />
      <motion.h2
        className="mt-4 text-xl font-bold"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ delay: 0.2 }}
      >
        Loading...
      </motion.h2>
    </motion.div>
  );
}

function RedirectNote() {
  return (
    <motion.div
      className="mt-12 text-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <svg className="w-24 h-24 mx-auto" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="45" stroke="black" strokeWidth="2" />
        <path d="M30 50L45 65L70 35" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <motion.p
        className="text-sm text-gray-600 mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
      >
        If you are not redirected to another page in a few seconds,
        <a href="/language" className="underline text-blue-600 hover:text-blue-400 duration-200">click here</a>.
      </motion.p>
    </motion.div>
  );
}