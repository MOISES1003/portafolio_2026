"use client";

import Sidebar from "@/components/admin/Sidebar";
import "@/lib/agGrid";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <Sidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
