import { useState } from "react";
import ProfilePosts from "./ProfilePosts";
import ProfileFollowing from "./ProfileFollowing";
import ProfileFollowers from "./ProfileFollowers";
import { getProfileName, getUserInfo } from "../../../firebase";
import { onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import useFetch from "../../useFetch";
import useFetchById from "../../useFetchById";

const Profile = () => {
    const [ profileName, setProfileName ] = useState(null);
    
    // useFetch()

    const {data: userData,
        loadingMessage,
        errorMessage} = useFetchById(`https://karkade-development-default-rtdb.firebaseio.com//users/${localStorage.getItem("userId")}/username.json`);

    console.log(userData);
    console.log(localStorage.getItem("userId"));
    console.log(localStorage.getItem("user"));
    const [list, setList] = useState("Posts");
    return ( <div className="profile">
        <div className="profile-info-section">
            <div className="profile-info">
                <img alt="pic" src={"https://i.imgur.com/3hWUzZr.jpg"} />
                {userData && <p className="profile-name">{ userData }</p>}
                {loadingMessage && <p className="profile-name">{ loadingMessage }</p>}
                {errorMessage && <p className="profile-name">{ errorMessage }</p>}
                
            </div>
            <p className="profile-motto">I'm not racist my niggas!</p>
        </div>
        <div className="profile-navbar">
            <p onClick={()=>{setList("Posts")}}>Posts</p>
            <p onClick={()=>{setList("Following")}}>Following</p>
            <p onClick={()=>{setList("Followers")}}>Followers</p>
        </div>
        <div className="divider"/>
        <p className="current-profile-list">{list}</p>
        <div className="divider"/>
        {list==="Posts"?<ProfilePosts/>:""}
        {list==="Following"?<ProfileFollowing/>:""}
        {list==="Followers"?<ProfileFollowers/>:""}
    </div> );
}
 
export default Profile;