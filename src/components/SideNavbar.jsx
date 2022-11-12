import profileImage from "../assets/empty-avatar.jpg";
import { AiOutlineMenu, AiOutlineSetting, AiOutlineBell, AiOutlineHome } from "react-icons/ai";
import { BsBookmarks, BsPeople } from "react-icons/bs";
import { MdDarkMode, MdLogout } from "react-icons/md";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { useState } from "react";

const SideNavbar = (props) => {
    const [loading, setLoading] = useState(false);
    
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
    
    // async function handleLogout() {
    //     if(!navigator.onLine){
    //         alert("No Internet Connection");
    //         return;
    //     }
        
    //     setLoading(true);
    //     try {
    //       await logout();
    //       props.loggedInHandler(false);
    //       props.openSideNavbarHandler[1](false);
    //     } catch {
    //       alert("Error!");
    //     }
    //     localStorage.setItem("userId", null);
    //     setLoading(false);
    // }

    return (<div style={{left:`${props.openSideNavbarHandler[0]?"0":"-240"}px`}} className="side-navbar">
                <div className="side-navbar-logo-section">
                    <AiOutlineMenu  onClick={()=>props.openSideNavbarHandler[1](false)} className="side-navbar-menu-icon" size={25}/>
                    <Link to="/karkade/" onClick={()=>props.openSideNavbarHandler[1](false)}><h2 className="noselect">Karkade</h2></Link>
                </div>
                <div className="side-navbar-profile-section" onClick={()=>props.openSideNavbarHandler[1](false)}>
                    <Link to={`/karkade/Profile/${localStorage.getItem("userId")}`} className="dropdown-profile-section-overlay"></Link>

                    {userData&&<img  alt="pic" src={userData.imageUrl?userData.imageUrl:profileImage} className="noselect" />}
                    <span>{userData.username}</span>
                </div>
                <hr className="divider"/>
                <div className="side-navbar-items-section">
                            <Link to="/karkade/" className="side-navbar-menu-item" onClick={()=>props.openSideNavbarHandler[1](false)}>
                                <AiOutlineHome className="dropdown-menu-item-icon" size={30}/>
                                <p>Home</p>
                            </Link>
                            <Link to="/karkade/Connections" className="side-navbar-menu-item" onClick={()=>props.openSideNavbarHandler[1](false)}>
                                <BsPeople className="dropdown-menu-item-icon" size={30}/>
                                <p>Connections</p>
                            </Link>
                            <Link to="/karkade/Notifications" className="side-navbar-menu-item" onClick={()=>props.openSideNavbarHandler[1](false)}>
                                <AiOutlineBell className="dropdown-menu-item-icon" size={30}/>
                                <p>Notifications</p>
                            </Link>
                            <Link to="/karkade/Bookmarks" className="side-navbar-menu-item" onClick={()=>props.openSideNavbarHandler[1](false)}>
                                <BsBookmarks className="dropdown-menu-item-icon" size={30}/>
                                <p>Bookmarks</p>
                            </Link>
                            <Link to="/karkade/Settings" className="side-navbar-menu-item" onClick={()=>props.openSideNavbarHandler[1](false)}>
                                <AiOutlineSetting className="dropdown-menu-item-icon" size={30}/>
                                <p>Settings</p>
                            </Link>
                            <div onClick={props.themeModeHandler} className="side-navbar-menu-item noselect">
                                <MdDarkMode className="dropdown-menu-item-icon" size={30}/>
                                <p>{props.themeMode==="dark"?"Dark":"Light"}</p>
                            </div>
                            <Link to="/karkade/" className="side-navbar-menu-item" style={{pointerEvents:`${loading?"none":"auto"}`}} onClick={()=>{
                                logout();
                                // props.loggedInHandler(false);
                                // props.openSideNavbarHandler[1](false);
                                }}>
                                <MdLogout className="dropdown-menu-item-icon" size={30}/>
                                <p>Logout</p>
                            </Link>
                </div>
            </div> );
}
 
export default SideNavbar;