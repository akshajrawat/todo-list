import React from "react";

const Navbar = () => {
  return (
    <nav className=" bg-blue-900 h-[5vh] flex justify-between items-center w-[100vw] text-white">
      <div className=" font-bold text-xl w-[50%] flex justify-center items-center"> i-Task </div>
      <div className=" w-[50%] flex justify-center items-center">
        <ul className=" flex justify-between items-center font-bold text-xl w-[10rem]">
          <li className=" hover:text-gray-300"> Home </li>
          <li className=" hover:text-gray-300"> Your Task </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
