import { BiComment, BiUpvote, BiDownvote} from "react-icons/bi";
import {BsBookmark, BsFillBookmarkCheckFill} from "react-icons/bs";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import profileImage from "../../../assets/empty-avatar.jpg";
import useFetchById from "../../useFetchById";

const Post = (props) => {
    const [bookmark, setBookmark] = useState(false);
    const [smallIconSize, setSmallIconSize] = useState();
    useEffect(()=>{
        window.addEventListener("resize", (event) => {
            if (window.innerWidth <= 330) {
                setSmallIconSize(true);
            } else {
                setSmallIconSize(false);
            }
          });
    },[])

    const {data: userData} = useFetchById(
        `https://karkade-development-default-rtdb.firebaseio.com/users/${localStorage.getItem("userId")}.json`
      );

    useEffect(()=>{
        setBookmark(userData?.bookmarks?.[props.post.id]?true:false);
    },[userData, props.post.id])



    const userProfileData = useFetchById(
        `https://karkade-development-default-rtdb.firebaseio.com/users/${props.post.authorId}.json`
      );

    const bookmarkHandler = ()=>{

        const bookmarkPostId = {
            [props.post.id]: true
        }
        console.log(localStorage.getItem("userId"), Object.keys(bookmarkPostId).toString());
        if(!bookmark){
            fetch(`https://karkade-development-default-rtdb.firebaseio.com/users/${localStorage.getItem("userId")}/bookmarks.json`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bookmarkPostId),
            }).then(()=>{
                setBookmark(true);
            })
        }else{
            fetch(`https://karkade-development-default-rtdb.firebaseio.com/users/${localStorage.getItem("userId")}/bookmarks/${props.post.id}.json`, {
                method: "DELETE"
            }).then(()=>{
                setBookmark(false);
            })
        }
    }

    return ( <div className="home-post">
                <div className="post-text-content">
                    <div className="original-poster-section">
                        <Link to={`/karkade/Profile/${props.post.authorId}`}>
                            {!userProfileData.data && <img src={profileImage} alt="profile_pic"/>}
                            {userProfileData.data && <img src={userProfileData.data.imageUrl?userProfileData.data.imageUrl:profileImage} alt="profile_pic"/>}
                        </Link>
                        <div className="original-poster-info-section">

                            <Link className="original-poster-name noselect" to={`/karkade/Profile/${props.post.authorId}`}>
                                {!userProfileData.data && "Loading..."}
                                {userProfileData.data && userProfileData.data.username}
                            </Link>
                            <Link className="original-poster-time" to={`/karkade/posts/${props.post.id}`}>{props.post.date}</Link>
                        </div>
                        <div className="bookmark noselect" onClick={bookmarkHandler}>
                            {!bookmark&&<BsBookmark  className="post-icon noselect" size={smallIconSize?15:20}/>}
                            {bookmark&&<BsFillBookmarkCheckFill  className="post-icon noselect" size={smallIconSize?15:20}/>}
                        </div>
                    </div>
                    <Link className="post-title" to={`/karkade/posts/${props.post.id}`}>{props.post.title}</Link>
                </div>
                
                <Link className="post-image-holder" to={`/karkade/posts/${props.post.id}`}>
                    {/* {props.image?<img alt="pic" src={props.image} />:""} */}
                    {props.post.imageUrl&&<img alt="pic" src={props.post.imageUrl} />}
                </Link>

                <div className="post-status">
                    <div className="post-status-item">
                        <BiUpvote className="post-icon" size={smallIconSize?15:20}/>
                        <p>{"456"}</p>
                    </div>
                    <div className="post-status-item">
                        <BiDownvote className="post-icon" size={smallIconSize?15:20}/>
                        <p>{"28"}</p>
                    </div>
                    <div className="post-status-item">
                        <BiComment className="post-icon" size={smallIconSize?15:20}/>
                        <p>{"41"}</p>
                    </div>
                </div>
    </div> );
}
 
export default Post;