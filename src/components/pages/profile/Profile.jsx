import { useState } from "react";
import ProfilePosts from "./ProfilePosts";
import ProfileFollowing from "./ProfileFollowing";
import ProfileFollowers from "./ProfileFollowers";
import profileImage from "../../../assets/empty-avatar.jpg";
import { useParams } from "react-router-dom";
import useFetchById from "../../useFetchById";
import { useEffect } from "react";

const Profile = (props) => {
    const [list, setList] = useState("Posts");
    const [follow, setFollow] = useState(false);
    const { profileId } = useParams();

    const {data: userData,
        loadingMessage,
        errorMessage}  = useFetchById(
        `https://karkade-development-default-rtdb.firebaseio.com/users/${profileId}.json`
    )

    useEffect(()=>{
        setFollow(userData?.followers?.[(localStorage.getItem("userId"))]?true:false);
    },[userData])

    const {data: postsData} = props.posts;


    const followHandler = ()=>{
        const follower = {
            [localStorage.getItem("userId")]: true
        }

        const following = {
            [profileId]: true
        }

        console.log();
        if(!follow){
            fetch(`https://karkade-development-default-rtdb.firebaseio.com/users/${profileId}/followers.json`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(follower),
            }).then(()=>{
                setFollow(true);
            })

            fetch(`https://karkade-development-default-rtdb.firebaseio.com/users/${localStorage.getItem("userId")}/following.json`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(following),
            }).then(()=>{
                setFollow(true);
            })
        }else{
            fetch(`https://karkade-development-default-rtdb.firebaseio.com/users/${profileId}/followers/${localStorage.getItem("userId")}.json`, {
                method: "DELETE"
            }).then(()=>{
                setFollow(false);
            })

            fetch(`https://karkade-development-default-rtdb.firebaseio.com/users/${localStorage.getItem("userId")}/following/${profileId}.json`, {
                method: "DELETE"
            }).then(()=>{
                setFollow(false);
            })
        }
    }

    
    return ( <div className="profile">
        <div className="profile-header-section">
            <div className="profile-info-section">
                {loadingMessage && <p className="profile-name">{ loadingMessage }</p>}
                {errorMessage && <p className="profile-name">{ errorMessage }</p>}
                {!userData&&<div className="profile-info">
                    <img alt="pic" src={profileImage} />
                    <div className="profile-text-info-wrapper">
                        <p className="profile-name">{ "Loading..." }</p> 
                    </div>
                </div>}
                {userData && <div className="profile-info">
                    <img alt="pic" src={userData.imageUrl?userData.imageUrl:profileImage} />
                    <div className="profile-text-info-wrapper">
                        <p className="profile-name">{ userData.username }</p> 
                        <p className="profile-country">{ userData.country }</p>
                    </div>
                    
                </div>}
            </div>
            {(localStorage.getItem("userId")!==profileId)&&
                <div onClick={followHandler} className={`follow-button ${follow?"follow-button-pressed":""}`} style={{marginRight:"10px"}}>
                    <p className="friend-text">{follow?"Following":"Follow"}</p>
                </div>
            }
        </div>
        {!userData && <p className="profile-motto">{"Loading..."}</p>}
        {userData && <p className="profile-motto">{userData.bio}</p>}
        <div className="profile-navbar">
            <p onClick={()=>{setList("Posts")}}>Posts</p>
            <p onClick={()=>{setList("Following")}}>Following</p>
            <p onClick={()=>{setList("Followers")}}>Followers</p>
        </div>
        <div className="divider"/>
        <p className="current-profile-list">{list}</p>
        <div className="divider"/>
        {list==="Posts"?<ProfilePosts posts={postsData} profileId={profileId}/>:""}
        {list==="Following"?<ProfileFollowing user={userData} profileId={profileId}/>:""}
        {list==="Followers"?<ProfileFollowers user={userData} profileId={profileId}/>:""}
    </div> );
}
 
export default Profile;