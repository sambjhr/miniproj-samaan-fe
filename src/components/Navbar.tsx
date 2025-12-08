import Link from "next/link";
import { HiOutlineMenu } from "react-icons/hi";

export default function Navbar() {
  return (
    <header className="w-full border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-6">
        
        {/* LEFT: Logo */}
        <div className="flex items-center">
          <Link href="/">
            <img
              src="/logosamaan.png"
              alt="logo"
              className="w-[140px] h-[30px] md:h-10 md:w-[186px] cursor-pointer"
            />
          </Link>
        </div>

        {/* CENTER: Menu + Search (hidden on mobile) */}
        <div className="hidden md:flex flex-1 justify-center items-center gap-10 text-gray-700 font-medium">
          <Link href="/">Home</Link>
          <Link href="/browseevent">Browse Event</Link>
          <Link href="/createevent">Create Event</Link>
          <Link href="/write">Help</Link>

          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search events..."
            className="border border-gray-300 rounded-lg px-4 py-2 w-[220px]"
          />
        </div>

        {/* RIGHT: Login + Signup */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/login"
            className="border border-gray-500 px-6 py-2 rounded-md text-gray-600 hover:bg-gray-100"
          >
            Log in
          </Link>

          <Link
            href="/signup"
            className="border border-gray-500 px-6 py-2 rounded-md text-gray-600 hover:bg-gray-100"
          >
            Sign Up
          </Link>
        </div>

        {/* MOBILE MENU ICON */}
        <HiOutlineMenu className="block md:hidden text-2xl ml-auto" />
      </div>
    </header>
  );
}
