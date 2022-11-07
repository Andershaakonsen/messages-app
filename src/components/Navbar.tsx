import React from "react";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <nav className="w-full border-t border-radix-mauve3 h-12 flex items-center fixed bottom-0 z-50 ">
      <ul className="w-full flex justify-around">
        <a href="/" className="text-radix-mauve11 hover:text-radix-mauve12">
          Contacts
        </a>
        <a
          href="/messages"
          className="text-radix-mauve11 hover:text-radix-mauve12"
        >
          Messages
        </a>

        <a
          href="/appointments"
          className="text-radix-mauve11 hover:text-radix-mauve12"
        >
          Appointments
        </a>
      </ul>
    </nav>
  );
};

export default Navbar;
