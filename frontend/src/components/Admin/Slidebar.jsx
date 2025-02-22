import React from "react";
import { FaTachometerAlt, FaChevronRight } from "react-icons/fa";
import GroupIcon from "@mui/icons-material/Group";
import ClassIcon from "@mui/icons-material/Class";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import CategoryIcon from "@mui/icons-material/Category";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const menuItems = [
    { icon: <GroupIcon sx={{ color: "white" }} />, label: "Users", to: "/admin/users" },
    { icon: <ClassIcon sx={{ color: "white" }} />, label: "Books", to: "/admin/books" },
    { icon: <BookmarkIcon sx={{ color: "white" }} />, label: "BorrowRecord", to: "/admin/brrowrecord" },
    { icon: <CategoryIcon sx={{ color: "white" }} />, label: "Categories", to: "/admin/categorys" },
    { icon: <ChatRoundedIcon sx={{ color: "white" }} />, label: "Messages", to: "/admin/message" },
  ];

  return (
    <div className='bg-[#4E73DF] px-[25px] h-screen'>
      {/* Header */}
      <Link to={"/admin"}>
       <div className="py-6 flex items-center justify-center border-b border-white/30">
        <h1 className="text-white text-lg font-extrabold cursor-pointer">Admin Panel</h1>
      </div>
      </Link>
     

      {/* Dashboard */}
      <div className="flex items-center gap-4 py-5 border-b border-white/30">
        <FaTachometerAlt color="white" />
        <p className="text-sm font-bold text-white">Dashboard</p>
      </div>

      {/* Menu Items */}
      <div className="pt-4 border-b border-white/30">
        <p className="text-xs font-extrabold text-white/40">INTERFACE</p>
        {menuItems.map((item, index) => (
          <Link key={index} to={item.to}>
            <div className="flex items-center justify-between gap-4 py-4 cursor-pointer hover:bg-white/10 px-3 rounded-md transition-all">
              <div className="flex items-center gap-4">
                {item.icon}
                <p className="text-sm font-normal text-white">{item.label}</p>
              </div>
              <FaChevronRight color="white" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
