import React, { useState } from 'react';
import { ConnectWallet } from '@thirdweb-dev/react';
import logo from 'assets/logo/logo.jpg';
import { useNavigate } from 'react-router-dom';
import routeConstants from 'route/routeConstants';
import {MenuOutlined,CloseOutlined} from '@ant-design/icons';
const pageNameStyle =
'bg-gradient-to-r from-sky-400 via-indigo-300 to-cyan-400 text-transparent bg-clip-text min-[800px]:text-2xl min-[400px]:text-xl min-[200px]:text-lg text-sm min-xl:border';
const activeTab =
'font-[700] bg-gradient-to-r from-teal-400 via-cyan-400 via-purple-300 to-pink-300 text-transparent bg-clip-text min-[800px]:text-2xl min-[400px]:text-xl min-[200px]:text-lg text-sm';
const wideScreenPages = "flex justify-between max-xl:hidden min-[800px]:gap-16 min-[400px]:gap-4 min-[200px]:gap-2 gap-1";
const menuPages = "flex flex-col w-full items-start space-y-4 [&>button]:p-4 [&>button]:w-full [&>button]:flex [&>button]:justify-start [&>button]:round-lg";
const Pages = ({stylePages}) => {
    const navigate = useNavigate();
    return (<div className={`${stylePages}`}>
        <button
            className={`${
                window.location.pathname === routeConstants.HOME
                    ? activeTab
                    : pageNameStyle
            }`}
            onClick={() => navigate(routeConstants.HOME)}
        >
            Home
        </button>
        <button
            className={`${
                window.location.pathname === routeConstants.BOOKING
                    ? activeTab
                    : pageNameStyle
            }`}
            onClick={() => navigate(routeConstants.BOOKING)}
        >
            Booking
        </button>
        <button
            className={`${
                window.location.pathname ===
                routeConstants.MANAGEMENT
                    ? activeTab
                    : pageNameStyle
            }`}
            onClick={() => navigate(routeConstants.MANAGEMENT)}
        >
            Management
        </button>
        <button
            className={`${
                window.location.pathname === routeConstants.HISTORY
                    ? activeTab
                    : pageNameStyle
            }`}
            onClick={() => navigate(routeConstants.HISTORY)}
        >
            History
        </button>
        {/* <button
            className={`${
                window.location.pathname === routeConstants.ABOUT_US
                    ? activeTab
                    : pageNameStyle
            }`}
            onClick={() => navigate(routeConstants.ABOUT_US)}
        >
            About us
        </button> */}
        <button
            className={`${
                window.location.pathname === routeConstants.MARKETPLACE
                    ? activeTab
                    : pageNameStyle
            }`}
            onClick={() => navigate(routeConstants.MARKETPLACE)}
        >
            Marketplace
        </button>
    </div>)
}
const Header = () => {
    const [toggleMenu, setToggleMenu] = useState(false);
        return (
        <div className="header py-2 px-4">
            <div className="flex gap-4 w-full justify-between h-full">
                <div className='h-full max-xl:hidden '>
                    <img className="w-16" src={logo} alt="Logo"></img>
                </div>
                <Pages stylePages={wideScreenPages}/>
                {
                !toggleMenu&&
                <MenuOutlined className='xl:hidden w-fit' 
                    style={{ fontSize: '48px'}}
                    onClick={()=>setToggleMenu(true)}/>
                }
                {toggleMenu&&(
                    <div className='z-20 fixed top-0 p-3 min-[600px]:w-[40vw] w-[60vw] shadow-2xl xl:hidden flex flex-col justify-start items-end rounded-md bg-slate-900 opacity-90'>
                        <CloseOutlined 
                            style={{ fontSize: '30px'}}
                            onClick={()=>setToggleMenu(false)}/>
                        <Pages stylePages={menuPages}/>
                        <div className='h-16'></div>
                    </div>)}
                <div className="flex flex-end justify-end max-xl:w-full">
                    <ConnectWallet></ConnectWallet>
                </div>
            </div>
        </div>
    );
};

export default Header;
