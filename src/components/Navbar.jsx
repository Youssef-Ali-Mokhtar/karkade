import { useState, useRef, useEffect } from "react";
import { AiOutlineHome, AiOutlineBell, AiOutlineSearch, AiOutlineRight, AiOutlineSetting } from "react-icons/ai";
import { BsPeople, BsBookmarks} from "react-icons/bs";
import { MdDarkMode, MdLogout} from "react-icons/md";
import profileImage from "../assets/empty-avatar.jpg";
import { Link, useLocation } from "react-router-dom";
import { logout } from "../firebase";

const Navbar = (props) => {
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    
    const [focusedIcon, setFocusedIcon] = useState(`${location.pathname}`);
    const dropdownRef = useRef();

    async function handleLogout() {
        if(!navigator.onLine){
            alert("No Internet Connection");
            return;
        }
        setLoading(true);
        try {
          await logout();
          console.log("LOGOUT PLEAAAASE");
          props.loggedInHandler(false);
        } catch {
          alert("Error!");
        }
        setLoading(false);
    }

    useEffect(()=>{
        const closeDropdown = e=>{
            if(!dropdownRef.current.contains(e.target)){
                setDropdown(false);
            }   
        }
        document.body.addEventListener("click", closeDropdown);
        return ()=>{
            document.body.removeEventListener("click", closeDropdown);
        }
    }, [])

    return ( <div className="navbar">
            <Link to="/"><h2>Karkade</h2></Link>
            <Link to="/" className="navbar-icons-wrapper" onClick={()=>setFocusedIcon("/")}><AiOutlineHome className={`navbar-icons ${focusedIcon==="/"?'focused-icon':''}`} size={25}/></Link>
            <Link to="/Connections" className="navbar-icons-wrapper" onClick={()=>setFocusedIcon("/Connections")}><BsPeople className={`navbar-icons ${focusedIcon==="/Connections"?'focused-icon':''}`} size={25}/></Link>
            <Link to="/Notifications" className="navbar-icons-wrapper" onClick={()=>setFocusedIcon("/Notifications")}><AiOutlineBell className={`navbar-icons ${focusedIcon==="/Notifications"?'focused-icon':''}`} size={25}/></Link>
            <form>
                <div className="search-container">
                    <AiOutlineSearch className="search-icon" size={18}/>
                    <input type="text" placeholder="Search Karkade"/>
                </div>
            </form>
            <MdDarkMode 
                onClick={props.themeModeHandler}
                className="navbar-icons" 
                size={25}
                />
            <div ref={dropdownRef} onClick={()=>setDropdown(!dropdown)} className="dropdown">
                <img  alt="pic" src={profileImage} className="noselect" />
                <div className="dropdown-menu" 
                    style={{visibility:`${dropdown?"visible":"hidden"}`, opacity: `${dropdown?"1":"0"}`}}>
                        <div className="dropdown-profile-section">
                            <Link to="/Profile" className="dropdown-profile-section-overlay" onClick={()=>setFocusedIcon("/Profile")}/>
                                <div className="dropdown-profile-image-section">
                                    <img alt="pic" src={profileImage} />
                                </div>
                                <div className="dropdown-profile-name-section">
                                    <span>Youssef Mokhtar</span>
                                    <AiOutlineRight />
                                </div>
                        </div>
                        <hr className="divider"/>
                        <div className="dropdown-menu-items-section">
                            <Link to="/Bookmarks" className="dropdown-menu-item" onClick={()=>setFocusedIcon("/Bookmarks")}>
                                <BsBookmarks className="dropdown-menu-item-icon" size={24}/>
                                <p>Bookmarks</p>
                            </Link>
                            <Link to="/Settings" className="dropdown-menu-item" onClick={()=>setFocusedIcon("/Settings")}>
                                <AiOutlineSetting className="dropdown-menu-item-icon" size={24}/>
                                <p>Settings</p>
                            </Link>
                            <Link to="/" className="dropdown-menu-item" style={{pointerEvents:`${loading?"none":"auto"}`}} onClick={ handleLogout }>
                                <MdLogout className="dropdown-menu-item-icon" size={24}/>
                                <p>Logout</p>
                            </Link>
                        </div>
                </div>
            </div>
                

            <div className="post-button" onClick={()=>{
                props.postOverlayHandler(true);
            }}>
                <p className="noselect">Post+</p>
            </div>

    </div> );
}
export default Navbar;
