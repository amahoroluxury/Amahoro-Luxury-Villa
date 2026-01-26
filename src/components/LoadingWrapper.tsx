'use client';

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";

export default function LoadingWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <LoadingScreen key="loading" />
      ) : (
        <div key="content">
          {children}
        </div>
      )}
    </AnimatePresence>
  );
}
