import { useState, useRef, useEffect } from "react";
import { AiOutlineHome, AiOutlineBell, AiOutlineSearch, AiOutlineRight, AiOutlineSetting } from "react-icons/ai";
import { BsPeople, BsBookmarks} from "react-icons/bs";
import { MdDarkMode, MdLogout} from "react-icons/md";
import profileImage from "../assets/empty-avatar.jpg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const Navbar = (props) => {
    const search = useRef();
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    const [focusedIcon, setFocusedIcon] = useState(`${location.pathname}`);
    const dropdownRef = useRef();
    const {data: userData} = props.userInfo;

    

    const logout = async ()=>{
        setLoading(true);
        try{
            await signOut(auth);
            props.loggedInHandler(false);
            localStorage.setItem("userId","");
        }catch(error){
            alert(error.message);
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
            <Link to="/" onClick={()=>{navigate("/"); window.location.reload();}}><h2>Karkade</h2></Link>
            <Link to="/" className="navbar-icons-wrapper" onClick={()=>{setFocusedIcon("/");}}><AiOutlineHome className={`navbar-icons ${focusedIcon==="/"?'focused-icon':''}`} size={25}/></Link>
            <Link to="/Connections" className="navbar-icons-wrapper" onClick={()=>setFocusedIcon("/Connections")}><BsPeople className={`navbar-icons ${focusedIcon==="/Connections"?'focused-icon':''}`} size={25}/></Link>
            <Link to="/Notifications" className="navbar-icons-wrapper" onClick={()=>setFocusedIcon("/Notifications")}>
                <AiOutlineBell className={`navbar-icons ${focusedIcon==="/Notifications"?'focused-icon':''}`} size={25}/>
            </Link>
            <form onSubmit={(e)=>{
                e.preventDefault();
                if(search.current.value){
                    setFocusedIcon("/Search"); 
                    props.searchValueHandler(search.current.value) ;
                    navigate("/Search");
                    search.current.value = "";
                }}}>
                <div className="search-container">
                    <AiOutlineSearch className="search-icon" size={18}/>
                    <input type="text" placeholder="Search Karkade" ref={search}/>
                </div>
            </form>
            <MdDarkMode
                onClick={props.themeModeHandler}
                className="navbar-icons" 
                size={25}
                />
            <div ref={dropdownRef} onClick={()=>setDropdown(!dropdown)} className="dropdown">

            {userData&&<img  alt="pic" src={userData.imageUrl?userData.imageUrl:profileImage} className="noselect" />}
                <div className="dropdown-menu"
                    style={{visibility:`${dropdown?"visible":"hidden"}`, opacity: `${dropdown?"1":"0"}`}}>
                        <div className="dropdown-profile-section">
                            <Link to={`/Profile/${localStorage.getItem("userId")}`} className="dropdown-profile-section-overlay" onClick={()=>setFocusedIcon("/Profile")}/>
                                <div className="dropdown-profile-image-section">
                                {userData&& <img alt="pic" src={userData.imageUrl?userData.imageUrl:profileImage} />}
                                </div>
                                <div className="dropdown-profile-name-section">
                                    {userData && <span>{userData.username}</span>}
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
                            <Link to="/" className="dropdown-menu-item" style={{pointerEvents:`${loading?"none":"auto"}`}} 
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
