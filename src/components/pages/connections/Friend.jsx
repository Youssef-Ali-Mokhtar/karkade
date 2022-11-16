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
        const follower = {
            [localStorage.getItem("userId")]: true
        }

        const following = {
            [props.user]: true
        }

        if(!follow){
            fetch(`https://karkade-development-default-rtdb.firebaseio.com/users/${props.user}/followers.json`, {
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
            fetch(`https://karkade-development-default-rtdb.firebaseio.com/users/${props.user}/followers/${localStorage.getItem("userId")}.json`, {
                method: "DELETE"
            }).then(()=>{
                setFollow(false);
            })

            fetch(`https://karkade-development-default-rtdb.firebaseio.com/users/${localStorage.getItem("userId")}/following/${props.user}.json`, {
                method: "DELETE"
            }).then(()=>{
                setFollow(false);
            })
        }
    }

    return ( <div className="note">
        <div className="original-poster-section friend-space-between">
            <Link to={`/karkade/Profile/${userData?.userId}`} className="friend-info-wrapper">
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