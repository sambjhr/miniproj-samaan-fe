import Link from "next/link";
import { HiOutlineMenu } from "react-icons/hi";

export default function Navbar() {
  return (
    <div className="container mx-auto w-full border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-4 py-3">
        {/* LEFT: Logo */}
        <div className="flex items-center">
          <Link href="/">
            <img
              src="/logosamaan.png"
              alt="logo"
              className="h-[30px] w-[140px] cursor-pointer md:h-10 md:w-[186px]"
            />
          </Link>
        </div>

        <div className="hidden flex-1 items-center justify-center gap-10 font-medium text-gray-700 md:flex">
          <Link href="/">Home</Link>
          <Link href="/browseevent">Browse Event</Link>
          <Link href="/write">Create Event</Link>
        </div>

        {/* RIGHT: Login + Signup */}
        <div className="hidden items-center gap-4 md:flex">
          <Link
            href="/login"
            className="rounded-md border border-gray-500 px-6 py-2 text-gray-600 hover:bg-gray-100"
          >
            Log in
          </Link>

          <Link
            href="/signup"
            className="rounded-md border border-gray-500 px-6 py-2 text-gray-600 hover:bg-gray-100"
          >
            Sign Up
          </Link>
        </div>

        {/* MOBILE MENU ICON */}
        <HiOutlineMenu className="ml-auto block text-2xl md:hidden" />
      </div>
    </div>
  );
}
