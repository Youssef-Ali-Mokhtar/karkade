import { useState, useRef, useEffect } from "react";
import { AiOutlineHome, AiOutlineBell, AiOutlineSearch, AiOutlineRight, AiOutlineSetting } from "react-icons/ai";
import { BsPeople, BsBookmarks} from "react-icons/bs";
import { MdDarkMode, MdLogout} from "react-icons/md";
import profileImage from "../assets/empty-avatar.jpg";
import { Link, useLocation } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const Navbar = (props) => {
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    
    const [focusedIcon, setFocusedIcon] = useState(`${location.pathname}`);
    const dropdownRef = useRef();

    const {data: userData,
        loadingMessage,
        errorMessage} = props.userInfo;

    const logout = async ()=>{
        console.log("LOGOUT");
        setLoading(true);
        try{
            await signOut(auth);
            props.loggedInHandler(false);
            localStorage.setItem("userId","");
        }catch(error){
            console.log(error.message);
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
    // console.log(userData.imageUrl);
    return ( <div className="navbar">
            <Link to="/karkade/"><h2>Karkade</h2></Link>
            <Link to="/karkade/" className="navbar-icons-wrapper" onClick={()=>setFocusedIcon("/karkade/")}><AiOutlineHome className={`navbar-icons ${focusedIcon==="/karkade/"?'focused-icon':''}`} size={25}/></Link>
            <Link to="/karkade/Connections" className="navbar-icons-wrapper" onClick={()=>setFocusedIcon("/karkade/Connections")}><BsPeople className={`navbar-icons ${focusedIcon==="//karkadeConnections"?'focused-icon':''}`} size={25}/></Link>
            <Link to="/karkade/Notifications" className="navbar-icons-wrapper" onClick={()=>setFocusedIcon("/karkade/Notifications")}><AiOutlineBell className={`navbar-icons ${focusedIcon==="/karkade/Notifications"?'focused-icon':''}`} size={25}/></Link>
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

            {!userData&&<img  alt="pic" src={profileImage} className="noselect" />}
            {userData&&<img  alt="pic" src={userData.imageUrl?userData.imageUrl:profileImage} className="noselect" />}
                <div className="dropdown-menu"
                    style={{visibility:`${dropdown?"visible":"hidden"}`, opacity: `${dropdown?"1":"0"}`}}>
                        <div className="dropdown-profile-section">
                            <Link to={`/karkade/Profile/${localStorage.getItem("userId")}`} className="dropdown-profile-section-overlay" onClick={()=>setFocusedIcon("/karkade/Profile")}/>
                                <div className="dropdown-profile-image-section">
                                {userData&& <img alt="pic" src={userData.imageUrl?userData.imageUrl:profileImage} />}
                                </div>
                                <div className="dropdown-profile-name-section">
                                    {userData && <span>{userData.username?userData.username:"No data"}</span>}
                                    <AiOutlineRight />
                                </div>
                        </div>
                        <hr className="divider"/>
                        <div className="dropdown-menu-items-section">
                            <Link to="/karkade/Bookmarks" className="dropdown-menu-item" onClick={()=>setFocusedIcon("/karkade/Bookmarks")}>
                                <BsBookmarks className="dropdown-menu-item-icon" size={24}/>
                                <p>Bookmarks</p>
                            </Link>
                            <Link to="/karkade/Settings" className="dropdown-menu-item" onClick={()=>setFocusedIcon("/karkade/Settings")}>
                                <AiOutlineSetting className="dropdown-menu-item-icon" size={24}/>
                                <p>Settings</p>
                            </Link>
                            <Link to="/karkade/" className="dropdown-menu-item" style={{pointerEvents:`${loading?"none":"auto"}`}} 
                            onClick={ logout }>
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
