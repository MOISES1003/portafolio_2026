"use client";

import { useLogout } from "@/features/auth/hooks";
import { useAuthStore } from "@/store/useAuthStore";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Proyectos", href: "/admin/projects" },
  { name: "Empresas", href: "/admin/companies" },
  { name: "Tecnologías", href: "/admin/technology" },
  { name: "Web", href: "/" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { logoutSession } = useLogout();
  const user = useAuthStore((state) => state.user);
  return (
    <aside className="w-64 bg-zinc-900 text-white flex flex-col">
      {/* Header */}
      <div className="h-12 flex flex-col items-start px-6 text-lg font-semibold border-b border-zinc-800">
        <span className="text-lg font-semibold text-white">Admin</span>
        {user && (
          <span className="text-sm text-zinc-400 truncate">{user.email}</span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {links.map((link) => {
          const active =
            link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`block rounded-md px-4 py-2 text-sm transition
                ${active
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                }
              `}
            >
              {link.name}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-zinc-800 p-4">
        <button
          onClick={logoutSession}
          className="w-full text-left rounded-md px-4 py-2 text-sm text-red-400 hover:bg-zinc-800 hover:text-red-300 transition"
        >
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
