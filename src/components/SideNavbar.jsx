import profileImage from "../assets/empty-avatar.jpg";
import { AiOutlineMenu, AiOutlineSetting, AiOutlineBell, AiOutlineHome } from "react-icons/ai";
import { BsBookmarks, BsPeople } from "react-icons/bs";
import { MdDarkMode, MdLogout } from "react-icons/md";
import { logout } from "../firebase";
import { Link } from "react-router-dom";
import { useState } from "react";

const SideNavbar = (props) => {
    const [loading, setLoading] = useState(false);
    
    async function handleLogout() {
        if(!navigator.onLine){
            alert("No Internet Connection");
            return;
        }
        
        setLoading(true);
        try {
          await logout();
          props.loggedInHandler(false);
          props.openSideNavbarHandler[1](false);
        } catch {
          alert("Error!");
        }
        setLoading(false);
    }

    return (<div style={{left:`${props.openSideNavbarHandler[0]?"0":"-240"}px`}} className="side-navbar">
                <div className="side-navbar-logo-section">
                    <AiOutlineMenu  onClick={()=>props.openSideNavbarHandler[1](false)} className="side-navbar-menu-icon" size={25}/>
                    <Link to="/" onClick={()=>props.openSideNavbarHandler[1](false)}><h2 className="noselect">Karkade</h2></Link>
                </div>
                <div className="side-navbar-profile-section" onClick={()=>props.openSideNavbarHandler[1](false)}>
                    <Link to="/Profile" className="dropdown-profile-section-overlay"></Link>
                    <img  alt="pic" src={profileImage} />
                    <span>Youssef Mokhtar</span>
                </div>
                <hr className="divider"/>
                <div className="side-navbar-items-section">
                            <Link to="/" className="side-navbar-menu-item" onClick={()=>props.openSideNavbarHandler[1](false)}>
                                <AiOutlineHome className="dropdown-menu-item-icon" size={30}/>
                                <p>Home</p>
                            </Link>
                            <Link to="/Connections" className="side-navbar-menu-item" onClick={()=>props.openSideNavbarHandler[1](false)}>
                                <BsPeople className="dropdown-menu-item-icon" size={30}/>
                                <p>Connections</p>
                            </Link>
                            <Link to="/Notifications" className="side-navbar-menu-item" onClick={()=>props.openSideNavbarHandler[1](false)}>
                                <AiOutlineBell className="dropdown-menu-item-icon" size={30}/>
                                <p>Notifications</p>
                            </Link>
                            <Link to="/Bookmarks" className="side-navbar-menu-item" onClick={()=>props.openSideNavbarHandler[1](false)}>
                                <BsBookmarks className="dropdown-menu-item-icon" size={30}/>
                                <p>Bookmarks</p>
                            </Link>
                            <Link to="/Settings" className="side-navbar-menu-item" onClick={()=>props.openSideNavbarHandler[1](false)}>
                                <AiOutlineSetting className="dropdown-menu-item-icon" size={30}/>
                                <p>Settings</p>
                            </Link>
                            <div onClick={props.themeModeHandler} className="side-navbar-menu-item noselect">
                                <MdDarkMode className="dropdown-menu-item-icon" size={30}/>
                                <p>{props.themeMode==="dark"?"Dark":"Light"}</p>
                            </div>
                            <Link to="/" className="side-navbar-menu-item" style={{pointerEvents:`${loading?"none":"auto"}`}} onClick={()=>{ handleLogout();
                                }}>
                                <MdLogout className="dropdown-menu-item-icon" size={30}/>
                                <p>Logout</p>
                            </Link>
                </div>
            </div> );
}
 
export default SideNavbar;