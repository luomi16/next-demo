"use client"

import { useState, useRef, useEffect } from "react";

export default function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selection, setSelection] = useState("Most relevant");
  const dropdownRef = useRef(null);

  const options = ["Most relevant", "Most recent", "Most popular"];

  // useEffect(() => {
  //   // Close dropdown when clicking outside
  //   const handleClickOutside = (event) => {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //       setIsOpen(false);
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [dropdownRef]);

  return (
    <div className="relative inline-block text-left mt-8" ref={dropdownRef}>
      <div className="mt-2">
        <button
          type="button" className="flex"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selection}
          <svg
            width="13"
            height="9"
            viewBox="0 0 13 9"
            className="mt-2 ml-2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              <path
                d="M12.1398 7.80664L5.79751 1.46438M7.04947 1.29297L0.70721 7.63523"
                stroke="black"
                strokeWidth="2"
              />
            ) : (
              <path
                d="M0.707153 1.29297L7.04941 7.63523M5.79746 7.80664L12.1397 1.46438"
                stroke="#AAAAAA"
                strokeWidth="2"
              />
            )}
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute left-0 mt-2 w-56 shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-1" role="none">
            {options.map((option, index) => (
              <a
                href="#"
                className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 ${
                  selection === option ? "font-bold" : ""
                }`}
                role="menuitem"
                key={index}
                onClick={(e) => {
                  e.preventDefault();
                  setSelection(option);
                  setIsOpen(false);
                }}
              >
                {option}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
