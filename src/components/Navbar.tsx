import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full border-t border-radix-mauve3 h-12 flex items-center fixed bottom-0 z-50 ">
      <ul className="w-full flex justify-around">
        <Link to="/" className="text-radix-mauve11 hover:text-radix-mauve12">
          Contacts
        </Link>
        <Link
          to="/messages"
          className="text-radix-mauve11 hover:text-radix-mauve12"
        >
          Messages
        </Link>

        <Link
          to="/appointments"
          className="text-radix-mauve11 hover:text-radix-mauve12"
        >
          Appointments
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
