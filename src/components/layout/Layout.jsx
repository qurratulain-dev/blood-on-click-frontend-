import { Navbar } from "./Navbar";
import { Heart } from "lucide-react";

export function Layout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1">{children}</main>
      <footer className="mt-10 bg-gray-900 py-5 text-white">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-sm">&copy; 2026 Blood on Click. All rights reserved.</p>
          <p className="mt-1 text-sm">
            <Heart className="mr-1 inline-block size-4 text-red-500" />
            Save Lives - Donate Blood
          </p>
        </div>
      </footer>
    </div>
  );
}
