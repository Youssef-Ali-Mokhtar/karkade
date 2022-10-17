import { useState } from "react";
import ProfilePosts from "./ProfilePosts";
import ProfileFollowing from "./ProfileFollowing";
import ProfileFollowers from "./ProfileFollowers";

const Profile = () => {
    const [list, setList] = useState("Posts");
    return ( <div className="profile">
        <div className="profile-info-section">
            <div className="profile-info">
                <img alt="pic" src={"https://i.imgur.com/3hWUzZr.jpg"} />
                <p className="profile-name">{"Youssef Mokhtar"}</p>
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