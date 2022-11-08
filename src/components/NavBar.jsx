import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import getNavElements from "../services/getNavElements";

const NavBar = () => {
  const [navStatus, setNavStatus] = useState(false);

  const navElements = getNavElements();

  return (
    <div className="flex justify-between items-center w-full h-20 px-4 text-white bg-black absolute">
      <div>
        <h1 className="text-5xl font-signature ml-2">Drift IAS</h1>
      </div>

      <ul className="hidden md:flex">
        {navElements.map((nav) => (
          <li
            key={nav.id}
            className="px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 duration-200"
          >
            <Link to={nav.link} duration={500}>
              {nav.name}
            </Link>
          </li>
        ))}
      </ul>

      <div
        onClick={() => setNavStatus(!navStatus)}
        className="cursor-pointer pr-4 z-10 text-gray-500 md:hidden"
      >
        {navStatus ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>

      {navStatus && (
        <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black to-gray-800 text-gray-500">
          {navElements.map((nav) => (
            <li
              key={nav.id}
              className="px-4 cursor-pointer capitalize py-6 text-4xl"
            >
              <Link
                onClick={() => setNavStatus(!navStatus)}
                to={nav.link}
                smooth
                duration={500}
              >
                {nav.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NavBar;
