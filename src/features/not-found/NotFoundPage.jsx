import { Link } from "react-router-dom";
import { Droplet, Home } from "lucide-react";

export function NotFoundPage() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 flex size-24 items-center justify-center rounded-full bg-red-100">
        <Droplet className="size-12 text-red-600" />
      </div>
      <h1 className="mb-2 text-7xl font-extrabold text-red-600">404</h1>
      <p className="mb-1 text-xl font-semibold text-gray-800">Page Not Found</p>
      <p className="mb-8 max-w-md text-sm text-gray-500">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-red-700"
      >
        <Home className="size-4" />
        Back to Home
      </Link>
    </div>
  );
}
