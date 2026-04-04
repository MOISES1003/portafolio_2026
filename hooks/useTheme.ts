"use client";

import { useState } from "react";

function getInitialTheme(): "dark" | "light" {
    if (typeof window === "undefined") return "dark"; // SSR guard
    return (localStorage.getItem("theme") as "dark" | "light") ?? "dark";
}

export function useTheme() {
    const [theme, setTheme] = useState<"dark" | "light">(getInitialTheme);

    const toggleTheme = () => {
        const next = theme === "dark" ? "light" : "dark";
        setTheme(next);
        localStorage.setItem("theme", next);
        document.documentElement.setAttribute("data-theme", next);
    };

    return { theme, toggleTheme };
}