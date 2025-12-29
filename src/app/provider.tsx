"use client";

import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <AnimatePresence mode="wait">
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5 }}
        >
            <Navbar />
            {children}
        </motion.div>
    </AnimatePresence>
  );
}
