import { FloatingDock } from './FloatingDock'

import Finder from '../assets/Finder.ico';
import Terminal from '../assets/terminal.ico';
import AppStore from '../assets/App_Store.ico';
import Maps from '../assets/Maps.ico';
import Safari from '../assets/Safari.ico';
import Vscode from '../assets/Vscode.ico';
import Photos from '../assets/photos.ico';
import { BsTrash2Fill } from 'react-icons/bs';

interface DockProps {
  openModal: () => void;
  id: (arg: string) => void;
}

const Dock = ({openModal, id}: DockProps) => {
      const links = [
        {
          title: "Finder",
          icon: (
            // <ImFinder className="h-full w-full text-blue-500 border-white border bg-white p-0 rounded-2xl overflow-visible" />
            <img src={Finder} alt="icon1" className="w-20 h-auto transition-transform duration-300 hover:scale-125 " />
          ),
          clickId: "finderapp"
        },
        {
          title: "Terminal",
          icon: (
            // <BsTerminalFill className="h-auto w-full text-black border-white border bg-white p-0 rounded-4xl overflow-visible" />
            <img src={Terminal} alt="icon1" className="w-20 h-auto transition-transform duration-300 hover:scale-125  " />
    
          ),
          clickId: "terminal"
        },
        {
          title: "App Store",
          icon: (
            // <FaAppStoreIos className="h-full w-full text-[#1b91f5] bg-white rounded-4xl overflow-visible" />
            <img src={AppStore} alt="icon1" className="w-20 h-auto transition-transform duration-300 hover:scale-125 " />
    
          ),
          clickId: "appstore"
        },
        {
          title: "Safari",
          icon: (
            // <FaSafari className="h-full w-full text-[#1db5f1] bg-red-500  rounded-4xl overflow-visible" />
            //<img src="https://assets.aceternity.com/logo-dark.png" width={20} height={20} alt="Aceternity Logo"/>
            <img src={Safari} alt="icon1" className="w-20 h-auto transition-transform duration-300 hover:scale-125 " />
    
          ),
          clickId: "safari"
        },
        {
          title: "Photos",
          icon: (
            // <TbBrandGooglePhotos className="h-full w-full  bg-gradient-to-r from-purple-400 to-pink-600  rounded-4xl" />
            <img src={Photos} alt="icon1" className="w-20 h-auto transition-transform duration-300 hover:scale-125 " />
    
          ),
          clickId: "photos"
        },
        {
          title: "Visual Studio",
          icon: (
            // <BiLogoVisualStudio className="h-full w-full text-blue-400 bg-white rounded-4xl overflow-visible" />
            <img src={Vscode} alt="icon1" className="w-20 h-auto transition-transform duration-300 hover:scale-125 " />
    
          ),
          clickId: "visualstudio"
        },
        {
          title: "Maps",
          icon: (
            // <SiGooglemaps className="h-full w-full bg-white text-red-700 rounded-4xl overflow-visible" />
            <img src={Maps} alt="icon1" className="w-20 h-auto transition-transform duration-300 hover:scale-125 " />
    
          ),
          clickId: "maps"
        },
        {
          title: "Trash",
          icon: (
            <BsTrash2Fill className="h-full w-full text-gray-500" />
            // <img src={img} alt="icon1" className="w-20 h-20 transition-transform duration-300 hover:scale-125 " />
    
          ),
          clickId: "trash"
        }
      ];
  return (
    <>
      <div className="w-full absolute bottom-2 flex items-center justify-center z-50 font-inter">
          <FloatingDock openModal={openModal} id={id} items={links} />
        </div>
    </>
  )
}

export default Dock
