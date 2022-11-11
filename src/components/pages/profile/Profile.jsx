import { useState } from "react";
import ProfilePosts from "./ProfilePosts";
import ProfileFollowing from "./ProfileFollowing";
import ProfileFollowers from "./ProfileFollowers";
import profileImage from "../../../assets/empty-avatar.jpg";
import { useParams } from "react-router-dom";
import useFetchById from "../../useFetchById";
const Profile = (props) => {
    const { profileId } = useParams();

    const {data: userData,
        loadingMessage,
        errorMessage}  = useFetchById(
        `https://karkade-development-default-rtdb.firebaseio.com/users/${profileId}.json`
    );

    const [list, setList] = useState("Posts");
    return ( <div className="profile">
        <div className="profile-info-section">
            {loadingMessage && <p className="profile-name">{ loadingMessage }</p>}
            {errorMessage && <p className="profile-name">{ errorMessage }</p>}
            {userData && <div className="profile-info">
                <img alt="pic" src={userData.imageUrl?userData.imageUrl:profileImage} />
                <p className="profile-name">{ userData.username }</p> 
                <p className="profile-country">{ userData.country }</p>
            </div>}
        </div>
        {userData && <p className="profile-motto">{userData.bio}</p>}
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