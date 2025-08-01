import { FaApple } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";

import { useEffect, useState } from "react";
import { HiOutlineLogout } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RiAdminLine } from "react-icons/ri";

interface HeaderProps {
  openModal: () => void;
  id: (arg: string) => void;
}

type User = {
  id: string;
  email: string;
  role: "admin" | "user"; // Extend roles if needed
  tokenExpire: string;
};

const Header = ({ openModal, id }: HeaderProps) => {
  const [currentTime, setCurrentTime] = useState<string>("");
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const userLocal: User = JSON.parse(userData);
        if (userLocal.role === "admin") {
          setAdmin(true);
        }
      } catch (error) {
        console.error("Error parsing user from localStorage", error);
      }
    }
  }, []);

  const formatDate = () => {
    const date = new Date();
    return date
      .toLocaleString("en-GB", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      })
      .replace(",", ""); // Remove the default comma
  };

  useEffect(() => {
    setCurrentTime(formatDate());

    const interval = setInterval(() => {
      setCurrentTime(formatDate()); // Update time every second
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // interface FullscreenDivElement extends HTMLDivElement {
  //   webkitRequestFullscreen?: () => void;
  //   msRequestFullscreen?: () => void;
  // }

  const logout = async () => {
    alert(" Are you sure to logout?");
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch(`${import.meta.env.VITE_API}auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const res = await response.json();
      // console.log("res=>>",JSON.stringify({ data }))
      // console.log("res2=>>", res )

      if (res.data === null) {
        // navigate(`/os/${token}`);
        toast.dismiss();
        toast.success(res.message);
      } else if (res.message === "Invalid token") {
        navigate("/");
      } else if (res.message === "Logout successfully") {
        localStorage.removeItem("access_token");
        localStorage.setIremoveItemtem("user");
        navigate("/");
        alert("navigate ");
      }

      navigate("/");
    } catch (error) {
      console.error("logout error:", error);
    }
  };

  return (
    <>
      <header className="absolute top-0 left-0 right-0 backdrop-blur-2xl flex items-center justify-between border-white/10  p-1 px-4 font-inter">
        <div className="flex items-center gap-10 text-xs">
          <span
            className="text-lg cursor-pointer"
            onClick={() => {
              id("apple");
              openModal();
            }}
          >
            <FaApple />
          </span>
          <span
            className="font-bold cursor-pointer"
            onClick={() => {
              id("finder");
              openModal();
            }}
          >
            Finder
          </span>
          <span
            className=" cursor-pointer"
            onClick={() => {
              id("file");
              openModal();
            }}
          >
            File
          </span>
          <span
            className=" cursor-pointer"
            onClick={() => {
              id("edit");
              openModal();
            }}
          >
            Edit
          </span>
          <span
            className=" cursor-pointer"
            onClick={() => {
              id("view");
              openModal();
            }}
          >
            View
          </span>
          <span
            className=" cursor-pointer"
            onClick={() => {
              id("go");
              openModal();
            }}
          >
            Go
          </span>
          <span
            className=" cursor-pointer"
            onClick={() => {
              id("window");
              openModal();
            }}
          >
            Window
          </span>
          <span
            className=" cursor-pointer"
            onClick={() => {
              id("help");
              openModal();
            }}
          >
            Help
          </span>
        </div>
        <div className="flex items-center gap-5 ">
          {/* <span className="text-lg cursor-pointer" onClick={() => {id("wifi");openModal();}}>
            <IoIosWifi />
          </span> */}
          <span
            className="text-lg cursor-pointer"
            onClick={() => {
              id("search");
              openModal();
            }}
          >
            <IoSearchOutline />
          </span>
          {admin ? (
            <span
              onClick={() => navigate("/admin")}
              className="text-sm cursor-pointer"
            >
              <RiAdminLine />
            </span>
          ) : null}

          <span className="text-sm cursor-pointer" onClick={logout}>
            <HiOutlineLogout />
          </span>
          <span
            className="w-[150px] cursor-pointer text-xs"
            onClick={() => {
              id("date");
              openModal();
            }}
          >
            {currentTime}
          </span>
        </div>
      </header>
    </>
  );
};

export default Header;
