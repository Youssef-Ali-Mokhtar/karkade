import {BsPersonPlus} from "react-icons/bs";
import {BsPersonCheck} from "react-icons/bs";
import useFetchById from "../../useFetchById";
import profileImage from "../../../assets/empty-avatar.jpg";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const Friend = (props) => {

    const [follow, setFollow] = useState(false);

    const {data: userData} = useFetchById(
        `https://karkade-development-default-rtdb.firebaseio.com/users/${props.user}.json`
      );

    useEffect(()=>{
        setFollow(userData?.followers?.[localStorage.getItem("userId")]?true:false);
    },[userData])

    const followHandler = ()=>{
        const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        const d = new Date();
        let minute = d.getMinutes().toString();
        let hour = d.getHours().toString();
        let day = d.getDate().toString();
        let month = d.getMonth().toString();
        let year = d.getFullYear().toString();
        const notificationId = Date.now()+"n";

        const notificationPost = {
            notificationId: notificationId,
            type:"follow",
            sender: localStorage.getItem("userId"),
            receiver:props.user,
            message: "Followed you",
            target: `/profile/${localStorage.getItem("userId")}`,
            checked: false,
            date: `${hour.length===1?`0${hour}`:hour}:${minute.length===1?`0${minute}`:minute} . ${day} ${months[month]} ${year}`
        }

        const follower = {
            [localStorage.getItem("userId")]: true
        }

        const following = {
            [props.user]: true
        }

        if(!follow){

            setFollow(true)
            fetch(`https://karkade-development-default-rtdb.firebaseio.com/users/${props.user}/followers.json`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(follower),
            })

            fetch(`https://karkade-development-default-rtdb.firebaseio.com/users/${localStorage.getItem("userId")}/following.json`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(following),
            })

            fetch(`https://karkade-development-default-rtdb.firebaseio.com/users/${props.user}/notifications/${notificationId}.json`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(notificationPost),
            })
        }else{
            setFollow(false);
            fetch(`https://karkade-development-default-rtdb.firebaseio.com/users/${props.user}/followers/${localStorage.getItem("userId")}.json`, {
                method: "DELETE"
            })

            fetch(`https://karkade-development-default-rtdb.firebaseio.com/users/${localStorage.getItem("userId")}/following/${props.user}.json`, {
                method: "DELETE"
            })

            fetch(`https://karkade-development-default-rtdb.firebaseio.com/users/${props.user}/notifications/${notificationId}.json`, {
                method: "DELETE"
            })
        }
    }

    return ( <div className="note">
        <div className="original-poster-section friend-space-between">
            <Link to={`/Profile/${userData?.userId}`} className="friend-info-wrapper">
                {!userData && <img src={profileImage} alt="profile_pic"/>}
                {userData && <img src={userData?.imageUrl?userData.imageUrl:profileImage} alt="profile_pic"/>}
                <p className="original-poster-name">{`${userData?.username?userData.username:"Loading..."}
                    ${props.user!==localStorage.getItem("userId")?"":"(You)"}`}</p>
            </Link>
            {   props.user!==localStorage.getItem("userId")&&
                <div onClick={followHandler} className={`follow-button ${follow?"follow-button-pressed":""}`}>
                    {   follow?
                        <BsPersonCheck className="friend-icon" size={16}/>:
                        <BsPersonPlus className="friend-icon" size={16}/>
                    }
                    <p className="friend-text">{follow?"Following":"Follow"}</p>
                </div>
            }
        </div>
    </div> );
}
 
export default Friend;