import { useEffect, useState } from "react";
import { useRef } from "react";
import { motion } from "framer-motion";
import logo from "../assets/logo.png"

// * React icons
import { IoIosArrowBack } from "react-icons/io";
import { SlSettings } from "react-icons/sl";
import { AiOutlineAppstore } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { HiOutlineCreditCard } from "react-icons/hi";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { RiBuilding3Line } from "react-icons/ri";
import { useMediaQuery } from "react-responsive";
import { IoWalletOutline } from "react-icons/io5";
import { CgCreditCard } from "react-icons/cg";
import { MdMenu } from "react-icons/md";
import { NavLink, useLocation, useRoutes } from "react-router-dom";

const Sidebar = () => {
  let isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });
  const [open, setOpen] = useState(isTabletMid ? false : true);
  const sidebarRef = useRef();
  const { pathname } = useLocation();

  useEffect(() => {
    if (isTabletMid) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isTabletMid]);

  useEffect(() => {
    isTabletMid && setOpen(false);
  }, [pathname]);

  const Nav_animation = isTabletMid
    ? {
        open: {
          x: 0,
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          x: -250,
          width: 0,
          transition: {
            damping: 40,
            delay: 0.15,
          },
        },
      }
    : {
        open: {
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          width: "4rem",
          transition: {
            damping: 40,
          },
        },
      };


  return (
    <div className="h-full">
      <div
        onClick={() => setOpen(false)}
        className={`md:hidden fixed inset-0 min-h-full z-[998] bg-black/50 ${
          open ? "block" : "hidden"
        } `}
      ></div>
      <motion.div
        ref={sidebarRef}
        variants={Nav_animation}
        initial={{ x: isTabletMid ? -250 : 0 }}
        animate={open ? "open" : "closed"}
        className=" bg-white text-gray z-[999] max-w-[16rem]  w-[16rem] overflow-hidden md:relative fixed min-h-screen shadow-right"
      >
        <div className="flex items-center gap-2.5 font-medium border-b py-3 border-slate-300  mx-3">
          <img src={logo} className="w-10 h-10" alt="" />
          <span className="text-3xl whitespace-pre mx-2">zkp<span className="text-[#4F6F52] font-semibold">Cards</span></span>          
        </div>
        <div className=" -mb-4 mt-2 p-2.5 flex rounded-md gap-6 items-center md:cursor-pointer cursor-default duration-300 font-medium">
        <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#739072] focus:border-[#739072] block w-full p-2.5 ">
          <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-link"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
            <option selected>Select a chain</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
          </select>
        </div>

        <div className="flex flex-col  h-full">
          
          <ul className="whitespace-pre px-2.5 text-[0.9rem] py-5 flex flex-col gap-1  font-medium overflow-x-hidden scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100   md:h-[68%] h-[70%]">
            <li>
              <NavLink to={"/Dpools"} className="p-2.5 flex rounded-md gap-6 items-center md:cursor-pointer cursor-default duration-300 font-medium">
                <AiOutlineAppstore size={23} className="min-w-max" />
                Debit Pools
              </NavLink>
            </li>
            <li>
            <NavLink to={"/Dcards"} className="p-2.5 flex rounded-md gap-6 items-center md:cursor-pointer cursor-default duration-300 font-medium">
                <HiOutlineCreditCard size={23} className="min-w-max" />
                Debit Cards
              </NavLink>
            </li>
            <li>
            <NavLink to={"/Cpools"} className="p-2.5 flex rounded-md gap-6 items-center md:cursor-pointer cursor-default duration-300 font-medium">
                <AiOutlineAppstore size={23} className="min-w-max" />
                Credit Pools
              </NavLink>
            </li>
            <li>
            <NavLink to={"/create"} className="p-2.5 flex rounded-md gap-6 items-center md:cursor-pointer cursor-default duration-300 font-medium">
                <MdOutlineDashboardCustomize size={23} className="min-w-max" />
                Create Pools
              </NavLink>
            </li>
            <li>
              <NavLink to={"/ccards"} className="mb-4 p-2.5 flex rounded-md gap-6 items-center md:cursor-pointer cursor-default duration-300 font-medium">
                <CgCreditCard size={23} className="min-w-max" />
                Credit Cards
              </NavLink>
            </li>
            <li>
              <hr className="border"/>
              <button className="w-full p-2.5 mt-4 flex gap-6 md:cursor-pointer bg-[#739072] hover:bg-[#4F6F52] transition-all duration-300 text-white font-normal rounded-lg hover:cursor-pointer shadow-[#ECE3CE] shadow-lg">
                <IoWalletOutline  size={23} className="min-w-max" />
                Connect Wallet
              </button>
            </li>

          </ul>
        </div>
        <motion.div
          onClick={() => {
            setOpen(!open);
          }}
          animate={
            open
              ? {
                  x: 0,
                  y: 0,
                  rotate: 0,
                }
              : {
                  x: -10,
                  y: -200,
                  rotate: 180,
                }
          }
          transition={{ duration: 0 }}
          className="absolute w-fit h-fit md:block z-50 hidden right-2 bottom-3 cursor-pointer"
        >
          <IoIosArrowBack size={25} />
        </motion.div>
      </motion.div>
      
      <div className="m-3 md:hidden  " onClick={() => setOpen(true)}>
        <MdMenu size={25} />
      </div>
    </div>
  );
};

export default Sidebar;
