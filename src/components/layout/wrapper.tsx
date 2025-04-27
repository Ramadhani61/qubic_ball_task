'use client';

import { useTheme } from "@/context/ThemeContext";

export default function BodyWrapper({ children }: { children: React.ReactNode }) {
  const { darkMode } = useTheme();

  return (
    <body className={darkMode ? "dark bg-gray-900 text-white" : "bg-white text-black"}>
      {children}
    </body>
  );
}
