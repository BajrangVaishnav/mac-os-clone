import 'leaflet/dist/leaflet.css';

import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
import { RiTwitterXFill } from "react-icons/ri";
import L from 'leaflet';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import {
  AnimatePresence,
  motion,
} from 'motion/react';
// import { useNavigate } from "react-router-dom";
import { BiChevronRight } from 'react-icons/bi';
import { BsSearch } from 'react-icons/bs';
import {
  FaGithub,
  FaInstagram,
} from 'react-icons/fa';
import {
  FiChevronLeft,
  FiChevronRight,
  FiCloud,
  FiEye,
  FiFile,
  FiFileText,
  FiFolder,
  FiGlobe,
  FiHardDrive,
  FiImage,
  FiMapPin,
  FiMinus,
  FiMonitor,
  FiSearch,
  FiShare2,
  FiStar,
  FiTag,
  FiTrash2,
} from 'react-icons/fi';
import { GoFileDirectoryFill } from 'react-icons/go';
import { HiExternalLink } from 'react-icons/hi';
import { IoMdArrowDropup } from 'react-icons/io';
import { IoSearchOutline } from 'react-icons/io5';
import { LuFiles } from 'react-icons/lu';
import {
  MdOutlineEmail,
  MdScreenRotation,
} from 'react-icons/md';

import { RxCross2 } from 'react-icons/rx';
import { TfiArrowsCorner } from 'react-icons/tfi';
import {
  VscDebugAlt,
  VscExtensions,
  VscSourceControl,
} from 'react-icons/vsc';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from 'react-leaflet';

import bgImg1 from '../assets/images/bgImg1.png';
import bgImg2 from '../assets/images/bgImg2.jpg';
import bgImg3 from '../assets/images/bgImg3.jpg';
import bgImg4 from '../assets/images/bgImg4.jpg';
import bgImg5 from '../assets/images/bgImg5.jpg';
import bgImg6 from '../assets/images/bgImg6.jpg';
import Dock from './Dock';
import Header from './Header';
import { ModalProvider } from './ModalContext';

const DefaultIcon = L.icon({
  iconUrl,
  shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

const bgImages = [bgImg1, bgImg2, bgImg3, bgImg4, bgImg5, bgImg6];
const Desktop = () => {
  // const navigate = useNavigate();
  const [bg, setBg] = useState(Math.floor(Math.random() * 6));
  const [id, setId] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [visible, setVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  //   const { isModalOpen, closeModal } = useModal();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const searchData = [
    "Settings",
    "Notifications",
    "Messages",
    "Files",
    "Photos"
  ];
  const macOSMenu = {
    Today: ["Meeting at 10:00 AM", "Lunch with team", "Submit report"],
    QuickActions: [
      "Do Not Disturb",
      "Screen Mirroring",
      "AirDrop",
      "Night Shift"
    ],
    Shortcuts: ["System Preferences", "App Store", "Downloads", "Recent Apps"],
    RecentFile: [
      "Project_Report.pdf",
      "Budget_Q3.xlsx",
      "Design_Mockup.sketch",
      "Team_Photo.jpg"
    ],
    apple: ["About This", "App Store", "Shut Down", "Log Out"],
    Finder: [
      "About Finder",
      "Preferences",
      "Empty Bin",
      "Services",
      "Hide Finder",
      "Quit Finder"
    ],
    File: [
      "New Finder Window",
      "New Tab",
      "New Folder",
      "Open",
      "Open Recent",
      "Close Window",
      "Print",
      "Export"
    ],
    Edit: [
      "Undo",
      "Redo",
      "Cut",
      "Copy",
      "Paste",
      "Select All",
      "Find",
      "Replace",
      "Delete",
      "Speech"
    ],
    View: [
      "Show View Options",
      "Show Toolbar",
      "Show Status Bar",
      "Show Path Bar"
    ],
    Go: [
      "Back",
      "Forward",
      "Enclosing Folder",
      "Computer",
      "AirDrop",
      "Recents",
      "Go to Folder",
      "Home",
      "Documents",
      "Downloads"
    ],
    Window: [
      "Minimize",
      "Zoom",
      "Bring All to Front",
      "Close Window",
      "Hide Others"
    ],
    Help: ["Mac Help", "Search with Google", "About Help", "Send Feedback"],
    wifi: ["not avilable"],
    toggler: ["not avilable"],
    appStore: [
      "Updates Available",
      "Top Free Apps",
      "Top Paid Apps",
      "Categories",
      "Featured Apps"
    ],

    // Data for Safari
    safari: [
      "apple.com",
      "developer.apple.com",
      "github.com",
      "reactjs.org",
      "stackoverflow.com"
    ],

    // Data for Photos
    photos: [
      "Vacation_2023.jpg",
      "Family_Picnic.png",
      "Wedding_Photographer.jpg",
      "Birthday_Party.jpg",
      "Beach_Day.mp4"
    ],

    // Data for Visual Studio
    visualStudio: [
      "Project 1 - React App",
      "Project 2 - Node.js App",
      "Project 3 - JavaScript App",
      "Project 4 - Python App",
      "Project 5 - TypeScript App"
    ],

    // Data for Trash
    trash: [
      "Old Resume.pdf",
      "Old Photos.zip",
      "Document.txt",
      "Unused File1.docx",
      "Broken Image.png"
    ]
  };

  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [show] = useState<boolean>(true);
  // Removed unused time state

  const handleMsg = () => {
    alert("not avilable!");
  };

  const search = [
    "Finder",
    "Safari",
    "Mail",
    "Calendar",
    "Notes",
    "Messages",
    "FaceTime",
    "Photos",
    "Preview",
    "Music",
    "Podcasts",
    "TV",
    "App Store",
    "System Settings",
    "Terminal",
    "Activity Monitor",
    "Disk Utility",
    "Reminders",
    "Contacts",
    "Maps",
    "News",
    "Stocks",
    "Voice Memos",
    "Books",
    "Shortcuts",
    "Keynote",
    "Pages",
    "Numbers"
  ];

  const [filterSearch, setFilterSearch] = useState<string[]>(
    search.filter((item) =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  useEffect(() => {
    if (!show) return;

    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 782);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [show]);

  // Removed unused useEffect for time state

  if (!show) return null;

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault(); // Disable default right-click menu
    setMenuPosition({ x: e.pageX, y: e.pageY });
    setVisible(true);
  };

  const handleClick = () => {
    // Hide menu when clicked elsewhere
    setVisible(false);
  };

  // Calculate clock hands rotation
  // const hours = time.getHours() % 12;
  // const minutes = time.getMinutes();
  // const seconds = time.getSeconds();

  // const hourRotation = hours * 30 + minutes * 0.5 - 90;
  // const minuteRotation = minutes * 6 - 90;
  // const secondRotation = seconds * 6 - 90;

 

  return (
    <>
      {!isDesktop ? (
        <div className="items-center justify-center h-screen text-center text-gray-500 bg-black text-xl font-bold grid grid-cols-3 border ">
          {/* Text rotated vertically and centered */}
          <div className="h-full flex items-center justify-center">
            <span className="rotate-90 origin-center block whitespace-nowrap text-2xl">
              Rotate your Screen to use it ...
            </span>
          </div>

          {/* Icon centered */}
          <div className="flex items-center justify-center h-full w-full text-4xl">
            <MdScreenRotation className="text-6xl text-white animate-ping" />
          </div>
        </div>
      ) : (
        <ModalProvider>
          <div
            className="relative min-h-screen text-xs no-scrollbar overflow-hidden font-inter "
            onContextMenu={handleContextMenu}
            onClick={handleClick}
          >
            <Header openModal={openModal} id={setId} />
            <div
              className="h-[100vh] w-[100vw] pt-6.5 top-50"
              style={{
                backgroundImage: `url(${bgImages[bg]})`,
                backgroundPosition: "center",
                backgroundSize: "cover"
              }}
              onClick={closeModal}
            >
              {/* <div onClick={toggleFullScreen} className="mt-40 border cursor-pointer z-9999">asdfasdf</div> */}
              {/* top navbar */}
              <div className="">
                {/* <div className="text-3xl text-red-700 ">asdfghjkl;</div> */}
                {/* left */}
                {isModalOpen && id === "apple" && (
                  <motion.div className="relative flex items-center rounded-3xl inset-0">
                    <AnimatePresence>
                      {isModalOpen && (
                        <motion.div
                          key="modal"
                          initial={{ opacity: 0, y: -50 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -50 }}
                          transition={{ duration: 0.3 }}
                          className="modal backdrop-blur-xs bg-white/10  ms-1 py-3 px-2 border rounded-xl shadow-xl"
                        >
                          <IoMdArrowDropup className="-mt-3 ms-2" />
                          {macOSMenu?.apple?.map((file, index) => {
                            return (
                              <React.Fragment key={index}>
                                <p className="hover:underline cursor-pointer">
                                  {file}
                                </p>
                                {/* <hr className="border-white dark:border-black mt-1"/> */}
                              </React.Fragment>
                            );
                          })}

                          {/* <button onClick={closeModal} className="mt-4 px-3 py-1 bg-gray-300 rounded">
                          Close
                        </button> */}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
                {isModalOpen && id === "finder" && (
                  <motion.div className="relative flex items-center rounded-3xl inset-0">
                    <AnimatePresence>
                      {isModalOpen && (
                        <motion.div
                          key="modal"
                          initial={{ opacity: 0, y: -50 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -50 }}
                          transition={{ duration: 0.3 }}
                          className="modal backdrop-blur-xs bg-white/10  ms-16.5 p-3 border rounded-xl shadow-xl"
                        >
                          <IoMdArrowDropup className="-mt-3 ms-2" />
                          {macOSMenu?.Finder?.map((find, index) => {
                            return (
                              <React.Fragment key={index}>
                                <p className="hover:underline cursor-pointer">
                                  {find}
                                </p>
                                {/* <hr className="border-white dark:border-black mt-1"/> */}
                              </React.Fragment>
                            );
                          })}

                          {/* <button onClick={closeModal} className="mt-4 px-3 py-1 bg-gray-300 rounded">
                          Close
                        </button> */}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
                {isModalOpen && id === "file" && (
                  <motion.div className="relative flex items-center rounded-3xl ">
                    <AnimatePresence>
                      {isModalOpen && (
                        <motion.div
                          key="modal"
                          initial={{ opacity: 0, y: -50 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -50 }}
                          transition={{ duration: 0.3 }}
                          className="modal backdrop-blur-xs bg-white/10  ms-34 p-3 border rounded-xl shadow-xl"
                        >
                          <IoMdArrowDropup className="-mt-3 ms-2" />
                          {macOSMenu?.File?.map((file, index) => {
                            return (
                              <React.Fragment key={index}>
                                <p className="hover:underline cursor-pointer">
                                  {file}
                                </p>
                                {/* <hr className="border-white dark:border-black mt-1"/> */}
                              </React.Fragment>
                            );
                          })}

                          {/* <button onClick={closeModal} className="mt-4 px-3 py-1 bg-gray-300 rounded">
                          Close
                        </button> */}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
                {isModalOpen && id === "edit" && (
                  <motion.div className="relative flex items-center rounded-3xl inset-0">
                    <AnimatePresence>
                      {isModalOpen && (
                        <motion.div
                          key="modal"
                          initial={{ opacity: 0, y: -50 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -50 }}
                          transition={{ duration: 0.3 }}
                          className="modal backdrop-blur-xs bg-white/10  ms-49 p-3 border rounded-xl shadow-xl"
                        >
                          <IoMdArrowDropup className="-mt-3 ms-2" />
                          {macOSMenu?.Edit?.map((find, index) => {
                            return (
                              <React.Fragment key={index}>
                                <p className="hover:underline cursor-pointer">
                                  {find}
                                </p>
                                {/* <hr className="border-white dark:border-black mt-1"/> */}
                              </React.Fragment>
                            );
                          })}

                          {/* <button onClick={closeModal} className="mt-4 px-3 py-1 bg-gray-300 rounded">
                          Close
                        </button> */}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
                {isModalOpen && id === "view" && (
                  <motion.div className="relative flex items-center rounded-3xl inset-0">
                    <AnimatePresence>
                      {isModalOpen && (
                        <motion.div
                          key="modal"
                          initial={{ opacity: 0, y: -50 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -50 }}
                          transition={{ duration: 0.3 }}
                          className="modal backdrop-blur-xs bg-white/10  ms-65.5 p-3 border rounded-xl shadow-xl"
                        >
                          <IoMdArrowDropup className="-mt-3 ms-2" />
                          {macOSMenu?.View?.map((file, index) => {
                            return (
                              <React.Fragment key={index}>
                                <p className="hover:underline cursor-pointer">
                                  {file}
                                </p>
                                {/* <hr className="border-white dark:border-black mt-1"/> */}
                              </React.Fragment>
                            );
                          })}

                          {/* <button onClick={closeModal} className="mt-4 px-3 py-1 bg-gray-300 rounded">
                          Close
                        </button> */}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
                {isModalOpen && id === "go" && (
                  <motion.div className="relative flex items-center rounded-3xl inset-0">
                    <AnimatePresence>
                      {isModalOpen && (
                        <motion.div
                          key="modal"
                          initial={{ opacity: 0, y: -50 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -50 }}
                          transition={{ duration: 0.3 }}
                          className="modal backdrop-blur-xs bg-white/10  ms-81 p-3 border rounded-xl shadow-xl"
                        >
                          <IoMdArrowDropup className="-mt-3 ms-2" />
                          {macOSMenu?.Go?.map((find, index) => {
                            return (
                              <React.Fragment key={index}>
                                <p className="hover:underline cursor-pointer">
                                  {find}
                                </p>
                                {/* <hr className="border-white dark:border-black mt-1"/> */}
                              </React.Fragment>
                            );
                          })}

                          {/* <button onClick={closeModal} className="mt-4 px-3 py-1 bg-gray-300 rounded">
                          Close
                        </button> */}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
                {isModalOpen && id === "window" && (
                  <motion.div className="relative flex items-center rounded-3xl inset-0">
                    <AnimatePresence>
                      {isModalOpen && (
                        <motion.div
                          key="modal"
                          initial={{ opacity: 0, y: -50 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -50 }}
                          transition={{ duration: 0.3 }}
                          className="modal backdrop-blur-xs bg-white/10  ms-99 p-3 border rounded-xl shadow-xl"
                        >
                          <IoMdArrowDropup className="-mt-3 ms-2" />
                          {macOSMenu?.Window?.map((file, index) => {
                            return (
                              <React.Fragment key={index}>
                                <p className="hover:underline cursor-pointer">
                                  {file}
                                </p>
                                {/* <hr className="border-white dark:border-black mt-1"/> */}
                              </React.Fragment>
                            );
                          })}

                          {/* <button onClick={closeModal} className="mt-4 px-3 py-1 bg-gray-300 rounded">
                          Close
                        </button> */}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
                {isModalOpen && id === "help" && (
                  <motion.div className="relative flex items-center rounded-3xl inset-0">
                    <AnimatePresence>
                      {isModalOpen && (
                        <motion.div
                          key="modal"
                          initial={{ opacity: 0, y: -50 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -50 }}
                          transition={{ duration: 0.3 }}
                          className="modal backdrop-blur-xs bg-white/10  ms-117 p-3 border rounded-xl shadow-xl"
                        >
                          <IoMdArrowDropup className="-mt-3 ms-2" />
                          {macOSMenu?.Help?.map((find, index) => {
                            return (
                              <React.Fragment key={index}>
                                <p className="hover:underline cursor-pointer">
                                  {find}
                                </p>
                                {/* <hr className="border-white dark:border-black mt-1"/> */}
                              </React.Fragment>
                            );
                          })}

                          {/* <button onClick={closeModal} className="mt-4 px-3 py-1 bg-gray-300 rounded">
                          Close
                        </button> */}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </div>

              {/* right */}
              <div className="relative top-9">
                {isModalOpen && id === "wifi" && (
                  <motion.div className="absolute flex items-center justify-end  inset-0 -top-7 right-50 ">
                    <AnimatePresence>
                      {isModalOpen && (
                        <motion.div
                          key="modal"
                          initial={{ opacity: 0, y: -50 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -50 }}
                          transition={{ duration: 0.3 }}
                          className="modal backdrop-blur-xs bg-white/10 p-3 border rounded-xl shadow-xl"
                        >
                          <IoMdArrowDropup className="-mt-3 ms-2" />
                          {macOSMenu?.wifi?.map((file, index) => {
                            return (
                              <React.Fragment key={index}>
                                <p className="hover:underline cursor-pointer">
                                  {file}
                                </p>
                                {/* <hr className="border-white dark:border-black mt-1"/> */}
                              </React.Fragment>
                            );
                          })}

                          {/* <button onClick={closeModal} className="mt-4 px-3 py-1 bg-gray-300 rounded">
                            Close
                        </button> */}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}

                {isModalOpen && id === "search" && (
                  <motion.div
                    className="relative flex items-center justify-center rounded-3xl overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <AnimatePresence>
                      {isModalOpen && (
                        <motion.div
                          onClick={(e) => e.stopPropagation()}
                          key="modal"
                          initial={{ opacity: 0, y: -50 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -50 }}
                          transition={{ duration: 0.3 }}
                          className="modal flex items-center backdrop-blur-xs bg-white/10 border rounded-xl mt-40 shadow-xl w-150 px-5 py-2 "
                        >
                          <div className="flex w-full flex-col">
                            <div className="flex items-center">
                              <IoSearchOutline className="text-4xl" />
                              <form
                                className="h-full w-full"
                                onSubmit={(e) => {
                                  e.preventDefault();
                                  handleMsg();
                                }}
                              >
                                <input
                                  type="text"
                                  className="h-full w-full py-1 px-2 outline-none text-2xl placeholder:text-2xl"
                                  placeholder="Search hear!"
                                  onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    // Filter results as user types
                                    const filtered = searchData.filter((item) =>
                                      item
                                        .toLowerCase()
                                        .includes(e.target.value.toLowerCase())
                                    );
                                    setFilterSearch(filtered);
                                  }}
                                />
                              </form>
                            </div>

                            {/* Show results only when typing */}
                            {searchTerm && (
                              <div className="mt-2 h-60 overflow-x-auto no-scrollbar">
                                {filterSearch.length > 0 ? (
                                  filterSearch.map((result, index) => (
                                    <React.Fragment key={index}>
                                      <li className="list-none hover:underline cursor-pointer py-2 ps-2 text-xl backdrop:blur-4xl bg-dark/10 border-b 1rounded-2xl ">
                                        {result}
                                      </li>
                                      {/* <hr className="border-white dark:border-black mt-1"/> */}
                                    </React.Fragment>
                                  ))
                                ) : (
                                  <li className="list-none hover:underline cursor-pointer py-2 ps-2 text-xl backdrop:blur-4xl bg-dark/10 text-center w-full flex items-center justify-center mt-20">
                                    Not Found!
                                  </li>
                                )}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}

                {isModalOpen && id === "toggle" && (
                  <motion.div className="absolute flex items-center justify-end  inset-0 -top-7  right-32 ">
                    <AnimatePresence>
                      {isModalOpen && (
                        <motion.div
                          key="modal"
                          initial={{ opacity: 0, y: -50 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -50 }}
                          transition={{ duration: 0.3 }}
                          className="modal backdrop-blur-xs bg-white/10   p-3 border rounded-xl shadow-xl"
                        >
                          <IoMdArrowDropup className="-mt-3 ms-2" />
                          {macOSMenu?.toggler?.map((file, index) => {
                            return (
                              <React.Fragment key={index}>
                                <p className="hover:underline cursor-pointer">
                                  {file}
                                </p>
                                {/* <hr className="border-white dark:border-black mt-1"/> */}
                              </React.Fragment>
                            );
                          })}

                          {/* <button onClick={closeModal} className="mt-4 px-3 py-1 bg-gray-300 rounded">
                            Close
                        </button> */}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}

                {isModalOpen && id === "admin" && (
                  <motion.div
                    key="modal"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
                  >
                    <motion.div
                      initial={{ scale: 0.95, y: -30 }}
                      animate={{ scale: 1, y: 0 }}
                      exit={{ scale: 0.9, y: -20 }}
                      transition={{ duration: 0.4, type: "spring", stiffness: 120 }}
                      onClick={(e) => e.stopPropagation()}
                      className="relative w-full max-w-md md:max-w-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-6 text-white overflow-hidden"
                    >
                      {/* macOS Top Buttons */}
                      <div className="absolute top-4 left-4 flex space-x-2">
                        <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                        <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                        <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                      </div>

                      {/* Profile Content */}
                      <div className="flex flex-col items-center text-center mt-10">
                        <img
                          src="https://avatars.githubusercontent.com/u/000000?v=4" // 🔁 Replace with your image
                          alt="Bajrang Vaishnav"
                          className="w-24 h-24 rounded-full border-4 border-white/30 shadow-lg hover:scale-105 transition duration-300"
                        />

                        <h2 className="text-2xl font-bold mt-4">Bajrang Vaishnav</h2>
                        <p className="text-sm text-gray-300 mt-1">
                          Full Stack Dev | React ⚛️ | Laravel 🚀 | Open Source ❤️
                        </p>

                        <p className="text-xs text-gray-300 mt-3 px-3">
                          👋 Hi! I'm Bajrang from India 🇮🇳. Passionate about building web and mobile apps that are clean, fast and scalable.
                        </p>

                        <div className="mt-4 text-sm text-gray-100">
                          <span className="font-semibold">Tech Stack:</span>
                          <div className="flex flex-wrap justify-center gap-2 mt-2 text-xs">
                            <span className="bg-white/20 px-2 py-1 rounded-full">React</span>
                            <span className="bg-white/20 px-2 py-1 rounded-full">Laravel</span>
                            <span className="bg-white/20 px-2 py-1 rounded-full">TailwindCSS</span>
                            <span className="bg-white/20 px-2 py-1 rounded-full">Node.js</span>
                            <span className="bg-white/20 px-2 py-1 rounded-full">MongoDB</span>
                          </div>
                        </div>

                        <div className="flex justify-center gap-5 mt-5 text-2xl p-4">
                          <a
                            href="https://github.com/BajrangVaishnav"
                            target="_blank"
                            
                          >
                            <FaGithub className="hover:text-gray-300 transition hover:scale-110"/>
                          </a>
                          <a
                            href="https://www.instagram.com/dev.bjv/"
                            target="_blank"
                            
                          >
                            <FaInstagram className="hover:text-pink-500 hover:bg-white rounded  transition hover:scale-110"/>
                          </a>
                          <a
                            href="https://x.com/BajrangVaisnnav?t=DrcPx0yh0-wCRbxJUndTEw&s=09"
                            target="_blank"
                            
                          >
                            <RiTwitterXFill className="hover:text-white hover:bg-black rounded transition hover:scale-110"/>
                          </a>
                          <a
                            href="mailto:bxj@outlook.in"
                            
                          >
                            <MdOutlineEmail className="hover:text-red-400 hover:bg-white rounded transition hover:scale-110"/>
                          </a>
                        </div>

                        <div className="mt-5 text-xs text-gray-400 flex flex-col items-center">
                          {/* <p>📈 GitHub Stats: 25+ Public Repos, 80+ Contributions</p> */}
                          <p>Click hear to check my portfolio -</p>
                          <p>
                            {/* ⭐ Fav Project:{" "} */}
                            <a
                              href="https://webpack-react-portfolio.vercel.app/"
                              target="_blank"
                              className="underline text-blue-300"
                            >
                              MyPortfolio
                            </a>
                          </p>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setIsModalOpen(false)}
                          className="mt-6 px-4 py-2 text-sm bg-white/20 hover:bg-white/30 backdrop-blur rounded-xl transition-all"
                        >
                          Close
                        </motion.button>
                      </div>
                    </motion.div>
                  </motion.div>


                )}

                {isModalOpen && id === "date" && (
                  <motion.div className="absolute flex items-center justify-end -top-9 right-2 ">
                    <AnimatePresence>
                      {isModalOpen && (
                        <motion.div
                          key="modal"
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -50 }}
                          transition={{ duration: 0.3 }}
                          className="modal backdrop-blur-xl bg-black/10 shadow-black rounded-xl shadow-xs max-w-sm h-[90vh] no-scrollbar overflow-y-auto w-full "
                          onClick={(e) => e.stopPropagation()}
                        >
                          {/* <IoMdArrowDropup className="-mt-3  flex shadow-black w-full text-end justify-end" /> */}
                          <div className="w-80 h-full bg-dark/20 backdrop-blur-xl rounded-r-xl p-4 flex flex-col gap-4 overflow-y-auto text-white no-scrollbar">
                            {/* Header with time and date */}
                            <div className="flex justify-between items-center ">
                              <div className="text-xl font-semibold">
                                {new Date().toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit"
                                })}
                              </div>
                              <div className="text-sm opacity-80">
                                {new Date().toLocaleDateString([], {
                                  weekday: "short",
                                  month: "short",
                                  day: "numeric"
                                })}
                              </div>
                            </div>

                            {/* Analog Clock */}
                            <div className="flex justify-center my-2 backdrop-blur-xs bg-white/10 p-3 rounded-xl">
                              <div className="w-32 h-32 rounded-full border-2 border-white/30 relative">
                                {/* Clock hands */}
                                <div
                                  className="absolute top-1/2 left-1/2 w-1/2 h-1 bg-white origin-left"
                                  style={{
                                    transform: `rotate(${
                                      (new Date().getHours() % 12) * 30 +
                                      new Date().getMinutes() * 0.5 -
                                      90
                                    }deg)`
                                  }}
                                ></div>
                                <div
                                  className="absolute top-1/2 left-1/2 w-2/5 h-0.5 bg-white origin-left"
                                  style={{
                                    transform: `rotate(${
                                      new Date().getMinutes() * 6 - 90
                                    }deg)`
                                  }}
                                ></div>
                                <div
                                  className="absolute top-1/2 left-1/2 w-1/3 h-0.5 bg-red-400 origin-left"
                                  style={{
                                    transform: `rotate(${
                                      new Date().getSeconds() * 6 - 90
                                    }deg)`
                                  }}
                                ></div>
                                {/* Center dot */}
                                <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                              </div>
                            </div>

                            {/* Calendar Section */}
                            <div className="backdrop-blur-xs bg-white/10 p-3 rounded-xl">
                              <div className="flex justify-between items-center mb-2">
                                <h3 className="font-medium">Calendar</h3>
                                <span className="text-xs opacity-70">
                                  {new Date().toLocaleDateString([], {
                                    month: "long",
                                    year: "numeric"
                                  })}
                                </span>
                              </div>
                              <div className="grid grid-cols-7 gap-1 text-center text-xs">
                                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(
                                  (day, i) => (
                                    <div key={i} className="py-1 opacity-60">
                                      {day}
                                    </div>
                                  )
                                )}
                                {Array.from({
                                  length: new Date(
                                    new Date().getFullYear(),
                                    new Date().getMonth() + 1,
                                    0
                                  ).getDate()
                                }).map((_, i) => (
                                  <div
                                    key={i}
                                    className={`py-1 rounded-full ${
                                      i + 1 === new Date().getDate()
                                        ? "bg-blue-500/80 cursor-pointer"
                                        : "hover:bg-gray-700 cursor-pointer"
                                    }`}
                                  >
                                    {i + 1}
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Notification Sections */}
                            <div className="flex flex-col gap-2">
                              {/* Today Summary */}
                              <div className="backdrop-blur-xs bg-white/10 p-3 rounded-xl">
                                <h3 className="font-medium mb-2">Today</h3>
                                {macOSMenu?.Today?.map((item, index) => (
                                  <div
                                    key={index}
                                    className="py-1.5 px-1 hover:bg-white/5 rounded cursor-pointer flex items-center gap-2"
                                  >
                                    <div className="w-2 h-2 rounded-full bg-blue-400 "></div>
                                    <p>{item}</p>
                                  </div>
                                ))}
                              </div>

                              {/* Quick Actions */}
                              <div className="grid grid-cols-2 gap-2">
                                <div className="backdrop-blur-xs bg-white/10 p-3 rounded-xl">
                                  <h3 className="font-medium mb-2">
                                    Quick Actions
                                  </h3>
                                  {macOSMenu?.QuickActions?.slice(0, 3).map(
                                    (action, index) => (
                                      <p
                                        key={index}
                                        className="py-1 hover:underline cursor-pointer text-xs"
                                      >
                                        {action}
                                      </p>
                                    )
                                  )}
                                </div>
                                <div className="backdrop-blur-xs bg-white/10 p-3 rounded-xl">
                                  <h3 className="font-medium mb-2">
                                    Shortcuts
                                  </h3>
                                  {macOSMenu?.Shortcuts?.slice(0, 3).map(
                                    (shortcut, index) => (
                                      <p
                                        key={index}
                                        className="py-1 hover:underline cursor-pointer text-xs"
                                      >
                                        {shortcut}
                                      </p>
                                    )
                                  )}
                                </div>
                              </div>

                              {/* Files Section */}
                              <div className="backdrop-blur-xs bg-white/10 p-3 rounded-xl">
                                <h3 className="font-medium mb-2">
                                  Recent Files
                                </h3>
                                {macOSMenu?.RecentFile?.slice(0, 4).map(
                                  (file, index) => (
                                    <div
                                      key={index}
                                      className="py-1.5 px-1 hover:bg-white/5 rounded cursor-pointer flex items-center gap-2"
                                    >
                                      <div className="w-3 h-3 rounded-sm bg-yellow-400"></div>
                                      <p className="text-sm truncate">{file}</p>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                          {/* {macOSMenu?.File?.map((file, index) => {
                          return (
                            <React.Fragment key={index}>
                              <p className="hover:underline cursor-pointer">
                                {file}
                              </p>
                            </React.Fragment>
                          );
                        })} */}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </div>

              {/* mac apps screen Terminal */}
              <div className="relative ">
                {isModalOpen && id === "finderapp" && (
                  <motion.div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
                    <AnimatePresence>
                      {isModalOpen && (
                        <motion.div
                          key="modal"
                          initial={{ opacity: 0, y: -50 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -50 }}
                          transition={{ duration: 0.3 }}
                          className="modal backdrop-blur-md bg-white/10 rounded-2xl shadow-lg max-w-2xl w-full max-h-[500px] h-full  relative flex flex-col border border-gray-300/30 overflow-hidden"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {/* MacOS Title Bar */}
                          <AppTitle name={'Finder'} closeModal={closeModal}/>
                          <Finder />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}

                {isModalOpen && id === "terminal" && (
                  <motion.div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
                    <AnimatePresence>
                      {isModalOpen && (
                        <motion.div
                          key="modal"
                          initial={{ opacity: 0, y: -50 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -50 }}
                          transition={{ duration: 0.3 }}
                          className="modal backdrop-blur-md bg-white/10  rounded-2xl shadow-lg max-w-2xl w-full relative"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {/* MacOS Title Bar */}
                          <AppTitle name={'Terminal'} closeModal={closeModal}/>
                          <Terminal />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}

                {/* App Store Modal */}
                {isModalOpen && id === "appstore" && (
                  <motion.div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
                    <AnimatePresence>
                      {isModalOpen && (
                        <motion.div
                          key="modal"
                          initial={{ opacity: 0, y: -50 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -50 }}
                          transition={{ duration: 0.3 }}
                          className="modal backdrop-blur-md bg-white/10  rounded-2xl shadow-lg max-w-2xl w-full max-h-2xl relative border border-gray-300/30"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {/* MacOS Title Bar */}
                          <AppTitle name={'App Store'} closeModal={closeModal}/>
                          <AppStore />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}

                {/* Safari Modal */}
                {isModalOpen && id === "safari" && (
                  <motion.div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
                    <AnimatePresence>
                      {isModalOpen && (
                        <motion.div
                          key="modal"
                          initial={{ opacity: 0, y: -50 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -50 }}
                          transition={{ duration: 0.3 }}
                          className="modal backdrop-blur-md bg-white/10  rounded-2xl shadow-lg max-w-2xl w-full max-h-2xl relative border border-gray-300/30"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {/* MacOS Title Bar */}
                          <div className="flex items-center justify-between bg-gray-200/80 dark:bg-gray-700/80 p-2 rounded-t-xl border-b border-gray-300/30">
                            <div className="flex space-x-2 ms-2 group">
                              <button
                                className="w-3 h-3 rounded-full bg-red-500 flex items-center justify-center cursor-pointer hover:bg-red-600 transition-colors"
                                onClick={closeModal}
                              >
                                <RxCross2 className="text-transparent group-hover:text-white text-xs" />
                              </button>
                              <button className="w-3 h-3 rounded-full bg-yellow-400 flex items-center justify-center cursor-pointer hover:bg-yellow-500 transition-colors">
                                <FiMinus className="text-transparent group-hover:text-white text-xs" />
                              </button>
                              <button className="w-3 h-3 rounded-full bg-green-500 flex items-center justify-center cursor-pointer hover:bg-green-600 transition-colors">
                                <TfiArrowsCorner className="text-transparent group-hover:text-white text-[10px]" />
                              </button>
                            </div>
                            <div className="flex-1 mx-4">
                              <div className="bg-white/90 dark:bg-gray-800 rounded-full px-4 py-1 flex items-center">
                                <span className="text-xs text-gray-500">
                                  https://www.
                                </span>
                                <input
                                  type="text"
                                  className="bg-transparent border-none outline-none flex-1 text-sm text-gray-700 dark:text-gray-200"
                                  autoFocus
                                  placeholder="search or enter website name"
                                />
                              </div>
                            </div>
                            <div className="w-6"></div>
                          </div>

                          <Safari />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}

                {/* Photos Modal */}
                {isModalOpen && id === "photos" && ( 
                  <motion.div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
                    <AnimatePresence>
                      {isModalOpen && (
                        <motion.div
                          key="modal"
                          initial={{ opacity: 0, y: -50 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -50 }}
                          transition={{ duration: 0.3 }}
                          className="modal backdrop-blur-md bg-white/10  rounded-2xl shadow-lg max-w-2xl w-full max-h-[400px] h-full relative border border-gray-300/30 flex flex-col"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {/* MacOS Title Bar */}
                          <AppTitle name={'Photos'} closeModal={closeModal}/>
                          <Photos />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}

                {/* Visual Studio Modal */}
                {isModalOpen && id === "visualstudio" && (
                  <motion.div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 font-Mono">
                    <AnimatePresence>
                      {isModalOpen && (
                        <motion.div
                          key="modal"
                          initial={{ opacity: 0, y: -50 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -50 }}
                          transition={{ duration: 0.3 }}
                          className="modal backdrop-blur-md bg-[#1e1e1e] rounded-2xl shadow-lg max-w-2xl w-full max-h-[500px] h-full relative border border-gray-700 flex flex-col"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <AppTitle name={'Visual Studio Code'} closeModal={closeModal}/>
                          <VisualStudio />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}

                {/* Maps Modal */}
                {isModalOpen && id === "maps" && (
                  <motion.div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
                    <AnimatePresence>
                      {isModalOpen && (
                        <motion.div
                          key="modal"
                          initial={{ opacity: 0, y: -50 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -50 }}
                          transition={{ duration: 0.3 }}
                          className="modal backdrop-blur-md bg-white/10  rounded-2xl shadow-lg max-w-2xl w-full max-h-[500px] h-full relative border border-gray-300/30 flex flex-col"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {/* MacOS Title Bar */}
                          <div className="flex items-center justify-between bg-gray-200/80 dark:bg-gray-700/80 p-2 rounded-t-xl border-b border-gray-300/30">
                            <div className="flex space-x-2 ms-2 group">
                              <button
                                className="w-3 h-3 rounded-full bg-red-500 flex items-center justify-center cursor-pointer hover:bg-red-600 transition-colors"
                                onClick={closeModal}
                              >
                                <RxCross2 className="text-transparent group-hover:text-white text-xs" />
                              </button>
                              <button className="w-3 h-3 rounded-full bg-yellow-400 flex items-center justify-center cursor-pointer hover:bg-yellow-500 transition-colors">
                                <FiMinus className="text-transparent group-hover:text-white text-xs" />
                              </button>
                              <button className="w-3 h-3 rounded-full bg-green-500 flex items-center justify-center cursor-pointer hover:bg-green-600 transition-colors">
                                <TfiArrowsCorner className="text-transparent group-hover:text-white text-[10px]" />
                              </button>
                            </div>
                            <div className="flex-1 mx-4">
                              <div className="bg-white/90 dark:bg-gray-800 rounded-full px-4 py-1 flex items-center max-w-md">
                                <FiSearch
                                  className="text-gray-500 mr-2"
                                  size={14}
                                />
                                <input
                                  type="text"
                                  className="bg-transparent border-none outline-none flex-1 text-sm text-gray-700 dark:text-gray-200"
                                  placeholder="Search for a place or address"
                                />
                              </div>
                            </div>
                            <div className="w-6"></div>
                          </div>
                          {/* <AppTitle name={'Trash'} closeModal={closeModal}/> */}
                          <Maps />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}

                {/* Trash Modal */}
                {isModalOpen && id === "trash" && (
                  <motion.div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
                    <AnimatePresence>
                      {isModalOpen && (
                        <motion.div
                          key="modal"
                          initial={{ opacity: 0, y: -50 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -50 }}
                          transition={{ duration: 0.3 }}
                          className="modal backdrop-blur-md bg-white/10  rounded-2xl shadow-lg max-w-2xl w-full max-h-2xl relative border border-gray-300/30 flex flex-col"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <AppTitle name={'Trash'} closeModal={closeModal}/>

                          <RecycleBin />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </div>

              {/* handle mouse right click */}
              <div className=" w-screen bg-gray-100">
                {visible && (
                  <div
                    style={{
                      top: menuPosition.y,
                      left: menuPosition.x,
                      position: "absolute"
                    }}
                    className="bg-white/60 backdrop:blur-2xl shadow-black shadow-md rounded-md p-2 z-50"
                  >
                    <ul className="space-y-2">
                      <li
                        className="hover:bg-gray-400 p-1 rounded cursor-pointer"
                        onClick={() => handleMsg()}
                      >
                        {" "}
                        New Folder
                      </li>
                      <li
                        className="hover:bg-gray-400 p-1 rounded cursor-pointer"
                        onClick={() => window.location.reload()}
                      >
                        refresh
                      </li>
                      <li
                        className="hover:bg-gray-400 p-1 rounded cursor-pointer"
                        onClick={() => handleMsg()}
                      >
                        Get Info
                      </li>
                      <li
                        className="hover:bg-gray-400 p-1 rounded cursor-pointer"
                        onClick={() => {
                          setBg(Math.floor(Math.random() * 6));
                        }}
                      >
                        Change Wallpaper
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <Dock openModal={openModal} id={setId} />
          </div>
        </ModalProvider>
      )}
    </>
  );
};

export default Desktop;




/**
 * ------------ title componenet start ------------
 *  */ 

interface AppTitleProps {
  name: string;
  closeModal: () => void;
}

const AppTitle: React.FC<AppTitleProps> = ({ name, closeModal }) => {
  return (
    <>
      {/* MacOS Title Bar */}
      <div className="grid grid-cols-3 text-center items-center justify-between bg-gray-200/80 dark:bg-gray-700/80 p-2 rounded-t-xl border-b border-gray-300/30">
        <div className="flex space-x-2 ms-2 group">
          <button
            className="w-3 h-3 rounded-full bg-red-500 flex items-center justify-center cursor-pointer hover:bg-red-600 transition-colors"
            onClick={closeModal}
          >
            <RxCross2 className="text-transparent group-hover:text-white text-xs" />
          </button>
          <button className="w-3 h-3 rounded-full bg-yellow-400 flex items-center justify-center cursor-pointer hover:bg-yellow-500 transition-colors">
            <FiMinus className="text-transparent group-hover:text-white text-xs" />
          </button>
          <button className="w-3 h-3 rounded-full bg-green-500 flex items-center justify-center cursor-pointer hover:bg-green-600 transition-colors">
            <TfiArrowsCorner className="text-transparent group-hover:text-white text-[10px]" />
          </button>
        </div>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
          {name}
        </p>
        <div className="w-6"></div>
      </div>
    </>
  );
};
// title componenet end 

/**
 * ------------ Apps window ------------
 *  */ 

const Finder = () => {
  const finderSidebarItems = [
    {
      title: "iCloud",
      items: [
        { name: "iCloud Drive", icon: FiCloud },
        { name: "Desktop", icon: FiMonitor },
        { name: "Documents", icon: FiFileText }
      ]
    },
    {
      title: "Locations",
      items: [
        { name: "Macintosh HD", icon: FiHardDrive },
        { name: "External", icon: HiExternalLink },
        { name: "Network", icon: FiGlobe }
      ]
    },
    {
      title: "Tags",
      items: [
        { name: "Red", icon: FiTag },
        { name: "Blue", icon: FiTag },
        { name: "Important", icon: FiTag }
      ]
    }
  ];
  const finderFiles = [
    {
      name: "Applications",
      type: "folder",
      icon: FiFolder,
      dateModified: "Today"
    },
    {
      name: "Desktop",
      type: "folder",
      icon: FiFolder,
      dateModified: "Today"
    },
    {
      name: "Documents",
      type: "folder",
      icon: FiFolder,
      dateModified: "Yesterday"
    },
    {
      name: "Downloads",
      type: "folder",
      icon: FiFolder,
      dateModified: "Yesterday"
    },
    {
      name: "Project Report.pdf",
      type: "file",
      icon: FiFileText,
      dateModified: "May 15, 2023"
    },
    {
      name: "Vacation.jpg",
      type: "file",
      icon: FiImage,
      dateModified: "April 22, 2023"
    },
    {
      name: "Presentation.key",
      type: "file",
      icon: FiFile,
      dateModified: "May 10, 2023"
    },
    {
      name: "Budget.xlsx",
      type: "file",
      icon: FiFileText,
      dateModified: "May 5, 2023"
    }
  ];
  return (
    <>
      {/* Finder Toolbar */}
      <div className="flex items-center justify-between w-full max-w-5xl overflow-auto h-fit bg-gray-100/80 dark:bg-gray-800/80 p-2 border-b border-gray-300/30">
        <div className="flex space-x-2">
          <button className="p-1 rounded-md hover:bg-gray-300/50 dark:hover:bg-gray-700/50">
            <FiChevronLeft className="text-gray-700 dark:text-gray-300" />
          </button>
          <button className="p-1 rounded-md hover:bg-gray-300/50 dark:hover:bg-gray-700/50">
            <FiChevronRight className="text-gray-700 dark:text-gray-300" />
          </button>
          <button className="p-1 rounded-md hover:bg-gray-300/50 dark:hover:bg-gray-700/50">
            <FiEye className="text-gray-700 dark:text-gray-300" />
          </button>
        </div>
        <div className="flex-1 mx-4">
          <div className="bg-white/90 dark:bg-gray-700/90 rounded-full px-4 py-1 flex items-center max-w-md">
            <FiSearch className="text-gray-500 mr-2" size={14} />
            <input
              type="text"
              className="bg-transparent border-none outline-none flex-1 text-sm text-gray-700 dark:text-gray-200"
              placeholder="Search this Mac"
            />
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="p-1 rounded-md hover:bg-gray-300/50 dark:hover:bg-gray-700/50">
            <FiShare2 className="text-gray-700 dark:text-gray-300" />
          </button>
          <button className="p-1 rounded-md hover:bg-gray-300/50 dark:hover:bg-gray-700/50">
            <FiTag className="text-gray-700 dark:text-gray-300" />
          </button>
        </div>
      </div>

      {/* Sidebar and Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-48 bg-gray-100/50 dark:bg-gray-800/50 border-r border-gray-300/30 p-2 overflow-y-auto">
          <div className="space-y-1">
            <div className="flex items-center p-2 rounded-md bg-blue-100/50 dark:bg-blue-900/30">
              <FiStar className="text-blue-500 mr-2" />
              <span className="text-sm text-gray-700 dark:text-gray-200">
                Favorites
              </span>
            </div>
            {finderSidebarItems.map((section, index) => (
              <div key={index} className="mt-2">
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase px-2 py-1">
                  {section.title}
                </p>
                {section.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center p-2 rounded-md hover:bg-gray-300/30 dark:hover:bg-gray-700/30 cursor-pointer"
                  >
                    <item.icon className="text-gray-700 dark:text-gray-300 mr-2" />
                    <span className="text-sm text-gray-700 dark:text-gray-200">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="grid grid-cols-4 gap-4">
            {finderFiles.map((file, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-300/30 dark:hover:bg-gray-700/30 cursor-pointer"
                onDoubleClick={() => console.log(`Opening ${file.name}`)}
              >
                <div className="w-16 h-16 mb-2 flex items-center justify-center">
                  {file.type === "folder" ? (
                    <div className="w-full h-full bg-blue-100/30 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                      <FiFolder className="text-blue-500" size={32} />
                    </div>
                  ) : (
                    <div className="w-full h-full bg-gray-200/30 dark:bg-gray-700/30 rounded-lg flex items-center justify-center">
                      <file.icon
                        className="text-gray-700 dark:text-gray-300"
                        size={28}
                      />
                    </div>
                  )}
                </div>
                <p className="text-xs text-center text-gray-700 dark:text-gray-200 truncate w-full">
                  {file.name}
                </p>
                {file.dateModified && (
                  <p className="text-[10px] text-gray-500 dark:text-gray-400">
                    {file.dateModified}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between bg-gray-100/80 dark:bg-gray-800/80 p-1 px-3 text-xs text-gray-600 dark:text-gray-400 border-t border-gray-300/30 rounded-b-xl">
        <div>{finderFiles.length} items</div>
        <div>Available: 256 GB</div>
      </div>
    </>
  );
};

const Terminal = () => {
  const [command, setCommand] = useState("");
  const [output, setOutput] = useState<{ command: string; result: string }[]>(
    []
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommand(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(command);
      setCommand("");
    }
  };

  const executeCommand = (command: string) => {
    let result = "";
    if (command === "help") {
      result = "Available commands: help, clear";
    } else if (command === "clear") {
      setOutput([]);
      return;
    } else if (command) {
      result = `command not found: ${command}`;
    }
    setOutput([...output, { command: command, result: result }]);
  };

  return (
    <div className="bg-gray-900 text-green-400 font-mono p-4 rounded-b-xl shadow-lg w-full max-w-5xl overflow-y-auto h-74 no-scrollbar">
      <div className=" ">
        {output.map((item, index) => (
          <div key={index}>
            <div className="font-bold">{`> ${item.command}`}</div>
            <div>{item.result}</div>
          </div>
        ))}
      </div>
      <div className="flex items-center mt-2">
        <span className="mr-2">{"macos clone ~ % >"}</span>
        <input
          type="text"
          value={command}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="bg-gray-900 text-green-400 outline-none flex-grow"
          placeholder="help command"
        />
      </div>
    </div>
  );
};

const AppStore = () => {
  // App Store Data
  const appStoreApps = [
    {
      name: "Xcode",
      icon: "https://developer.apple.com/assets/elements/icons/xcode/xcode-64x64.png"
    },
    {
      name: "Final Cut Pro",
      icon: "https://www.apple.com/autopush/ww/search/modules/finalcutpro/image__do2eec8w8n42_large_2x.jpg"
    },
    {
      name: "Logic Pro",
      icon: "https://www.apple.com/autopush/ww/search/modules/logicpro/image_large_2x.jpg"
    },
    {
      name: "Jio Savan",
      icon: "https://www.apple.com/in/app-store/images/overview/chiclets/hero_06_3__d0wa93mp2o4m_large.jpg"
    },
    {
      name: "Lenscart",
      icon: "https://www.apple.com/in/app-store/images/overview/chiclets/hero_12_3__b16lgsrcybiq_large.jpg"
    },
    {
      name: "Snapchat",
      icon: "https://www.apple.com/in/app-store/images/overview/chiclets/hero_08_2__bgrvezafhu2q_large.jpg"
    },
    {
      name: "Notes",
      icon: "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/d1/03/37/d10337b7-652b-c6af-c36e-fc76968ad0fc/logo_keep_2020q4_color-0-1x_U007emarketing-0-0-0-7-0-0-0-85-220-0.png/350x350.png"
    },
    {
      name: "Hot Star",
      icon: "https://www.apple.com/in/app-store/images/overview/chiclets/hero_10_4__chkyg5imbwty_large.jpg"
    }
  ];
  return (
    <>
      {/* Modal Content */}
      <div className="p-4 bg-white/5 rounded-b-xl">
        <div className="grid grid-cols-4 gap-4">
          {appStoreApps.map((app, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-3 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            >
              <div className="w-16 h-16 bg-white/10 rounded-xl mb-2 flex items-center justify-center">
                <img
                  src={app.icon}
                  alt={app.name}
                  className="w-12 h-12 object-contain"
                />
              </div>
              <p className="text-xs text-center text-white dark:text-gray-100">
                {app.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const Safari = () => {
  // Safari Favorites
  const safariFavorites = [
    {
      name: "Google",
      icon: "https://www.google.com/favicon.ico"
    },
    {
      name: "YouTube",
      icon: "https://www.youtube.com/favicon.ico"
    },
    {
      name: "GitHub",
      icon: "https://github.com/favicon.ico"
    },
    {
      name: "Twitter",
      icon: "https://abs.twimg.com/favicons/twitter.ico"
    },
    {
      name: "Apple",
      icon: "https://www.apple.com/favicon.ico"
    },
    {
      name: "Wikipedia",
      icon: "https://www.wikipedia.org/static/favicon/wikipedia.ico"
    }
  ];

  return (
    <>
      {/* Modal Content - Favorites */}
      <div className="p-4 bg-white/5 rounded-b-xl">
        <h3 className="text-sm font-medium text-white dark:text-gray-200 mb-3">
          Favorites
        </h3>
        <div className="grid grid-cols-6 gap-4">
          {safariFavorites.map((fav, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-12 h-12 bg-white/10 rounded-xl mb-1 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors">
                <img
                  src={fav.icon}
                  alt={fav.name}
                  className="w-8 h-8 object-contain"
                />
              </div>
              <p className="text-xs text-center text-white dark:text-gray-200 truncate w-full">
                {fav.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const Photos = () => {
  // Photo Library
  const photoLibrary = [
    {
      name: "Beach Sunset",
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format"
    },
    {
      name: "Mountain View",
      url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500&auto=format"
    },
    {
      name: "Cityscape",
      url: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=500&auto=format"
    },
    {
      name: "Forest Path",
      url: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=500&auto=format"
    },
    {
      name: "Desert",
      url: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=500&auto=format"
    },
    {
      name: "Waterfall",
      url: "https://images.unsplash.com/photo-1511497584788-876760111969?w=500&auto=format"
    },
    {
      name: "Autumn Trees",
      url: "https://images.unsplash.com/photo-1503435980610-a51f3ddfee50?w=500&auto=format"
    },
    {
      name: "Winter Landscape",
      url: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=500&auto=format"
    }
  ];

  return (
    <>
      {/* Modal Content */}
      <div className="flex-1 p-4 bg-white/5 rounded-b-xl overflow-hidden">
        <div className="h-full grid grid-cols-4 gap-4 overflow-y-auto">
          {photoLibrary.map((photo, index) => (
            <div
              key={index}
              className="aspect-square bg-gray-200/20 rounded-md overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
            >
              <img
                src={photo.url}
                alt={photo.name}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const VisualStudio = () => {
  // VS Code Data
  const vsCodeIcons = [
    <LuFiles />,
    <BsSearch />,
    <VscSourceControl />,
    <VscDebugAlt />,
    <VscExtensions />
  ];

  const vsCodeFiles = [
    {
      name: "my-project",
      files: ["index.js", "styles.css", "package.json"]
    },
    {
      name: "public",
      files: ["index.html", "favicon.ico"]
    },
    {
      name: "node_modules"
    },
    {
      name: "src",
      files: ["App.js", "App.css", "index.js"]
    }
  ];
  return (
    <>
      {/* Sidebar */}
      <div className="flex flex-1 overflow-hidden">
        <div className="w-12 bg-[#252526] flex flex-col items-center py-2 border-r  border-gray-700">
          {vsCodeIcons.map((icon, index) => (
            <div
              key={index}
              className="p-2 mb-2 rounded-md hover:bg-gray-700/50 cursor-pointer"
            >
              <span className="text-xl text-gray-400">{icon}</span>
            </div>
          ))}
        </div>

        {/* File Explorer */}
        <div className="w-44 bg-[#252526] border-r border-gray-700 p-2 overflow-y-auto">
          <div className="text-gray-400 text-xs font-medium mb-2">EXPLORER</div>
          {vsCodeFiles.map((folder, index) => (
            <div key={index} className="mb-2">
              <div className="flex items-center text-gray-300 text-sm px-2 py-1 rounded hover:bg-gray-700/50 cursor-pointer">
                <BiChevronRight className="w-4 h-4 mr-1" />
                {folder.name}
              </div>
              {folder.files && (
                <div className="ml-6">
                  {folder.files.map((file, i) => (
                    <div
                      key={i}
                      className="flex items-center text-gray-400 text-sm px-2 py-1 rounded hover:bg-gray-700/50 cursor-pointer"
                    >
                      <GoFileDirectoryFill className="w-4 h-4 mr-2" />
                      {file}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Editor Area */}
        <div className="flex-1 bg-[#1e1e1e] p-4 overflow-auto">
          <div className="bg-[#1e1e1e] rounded border border-gray-700 h-full">
            {/* Editor tabs */}
            <div className="flex bg-[#252526] border-b border-gray-700">
              <div className="px-4 py-2 text-sm text-gray-300 border-t-2 border-blue-500 bg-[#1e1e1e]">
                index.js
              </div>
              <div className="px-4 py-2 text-sm text-gray-500">styles.css</div>
            </div>

            {/* Code editor */}
            <div className="p-4 font-mono text-sm text-gray-300">
              <div className="text-gray-500 mb-4">// Start coding here...</div>
              <div className="text-blue-400">function</div>{" "}
              <span className="text-yellow-300">App</span>() {"{"}
              <div className="ml-4">
                <div className="text-blue-400">return</div> (
                <div className="ml-4">
                  &lt;
                  <span className="text-green-400">div</span>{" "}
                  <span className="text-purple-400">className</span>=
                  <span className="text-orange-300">"App"</span>
                  &gt;
                  <div className="ml-4">
                    &lt;
                    <span className="text-green-400">h1</span>
                    &gt;Hello World&lt;/
                    <span className="text-green-400">h1</span>
                    &gt;
                  </div>
                  &lt;/
                  <span className="text-green-400">div</span>
                  &gt;
                </div>
                );
              </div>
              {"}"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Maps = () => {
  // Map Locations
  const mapLocations = [
    {
      name: "Apple Park",
      address: "1 Apple Park Way, Cupertino, CA"
    },
    {
      name: "Golden Gate Bridge",
      address: "Golden Gate Bridge, San Francisco, CA"
    },
    {
      name: "Yosemite National Park",
      address: "Yosemite Valley, CA"
    }
  ];
  return (
    <>
      {/* Modal Content */}
      <div className="flex-1 p-0 bg-white/5 rounded-b-xl overflow-hidden relative">
        {/* Map placeholder */}
        <div className="absolute inset-0 bg-blue-100/10 flex  justify-center">
          {/* <div className="text-center">
                              <FiMap
                                className="mx-auto text-gray-400"
                                size={48}
                              />
                              <p className="text-gray-400 mt-2">Map View</p>
                            </div> */}
          <MapContainer
            center={[29.6772078, 79.4023615]}
            zoom={10}
            style={{ height: "520px", width: "100%" }}
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[29.6772078, 79.4023615]}>
              <Popup>New Delhi</Popup>
            </Marker>
          </MapContainer>
        </div>

        {/* Search results */}
        <div
          className="absolute bottom-4 left-4 right-4 bg-white/90 dark:bg-gray-800/90 rounded-xl p-3 shadow-lg z-9999">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            Search Results
          </h3>
          <div className="">
            {mapLocations.map((location, index) => (
              <div
                key={index}
                className="flex items-center p-2 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-700/50 cursor-pointer overflow-auto"
              >
                <div className="w-8 h-8 bg-blue-100/30 dark:bg-blue-900/30 rounded-full flex items-center justify-center mr-3">
                  <FiMapPin className="text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    {location.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {location.address}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const RecycleBin = () => {
  // Trash Items
  const trashItems = [
    {
      name: "Old Project",
      icon: "https://www.svgrepo.com/show/484464/file-part-2.svg",
      deletedDate: "2 days ago"
    },
    {
      name: "Screenshot.png",
      icon: "https://www.svgrepo.com/show/439308/screen-capture.svg",
      deletedDate: "1 week ago"
    },
    {
      name: "Document.pdf",
      icon: "https://www.svgrepo.com/show/349472/pdf.svg",
      deletedDate: "3 days ago"
    }
  ];
  return (
    <>
      {/* Modal Content */}
      <div className="flex-1 p-4 bg-white/5 rounded-b-xl overflow-hidden">
        <div className="h-full flex flex-col">
          {/* Empty button */}
          <div className="flex justify-end mb-4">
            <button className="px-3 py-1 bg-gray-200/50 dark:bg-gray-700/50 rounded-md text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-300/50 dark:hover:bg-gray-600/50 transition-colors">
              Empty Trash
            </button>
          </div>

          {/* Trash items */}
          <div className="flex-1 overflow-y-auto">
            {trashItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-400">
                <FiTrash2 size={48} className="mb-4" />
                <p>Trash is empty</p>
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-4">
                {trashItems.map((item, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-white/10 rounded-lg mb-1 flex items-center justify-center">
                      <img
                        src={item.icon}
                        alt={item.name}
                        className="w-12 h-12 object-contain opacity-70"
                      />
                    </div>
                    <p className="text-xs text-center text-white dark:text-gray-200 truncate w-full">
                      {item.name}
                    </p>
                    <p className="text-[10px] text-gray-400">
                      {item.deletedDate}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
