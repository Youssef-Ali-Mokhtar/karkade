import { BiComment, BiUpvote, BiDownvote } from "react-icons/bi";
import { BsBookmark, BsFillBookmarkCheckFill } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import profileImage from "../../../assets/empty-avatar.jpg";
import useFetchById from "../../useFetchById";

const Post = (props) => {
    const [bookmark, setBookmark] = useState(false);
    const [upvote, setUpvote] = useState(false);
    const [upvoteNumber, setUpvoteNumber] = useState(0);
    const [downvote, setDownvote] = useState(false);
    const [downvoteNumber, setDownvoteNumber] = useState(0);
    
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

      const {data: postData} = useFetchById(
        `https://karkade-development-default-rtdb.firebaseio.com/posts/${props.post.id}.json`
      );
    
    useEffect(()=>{
        setBookmark(postData?.bookmarks?.[localStorage.getItem("userId")]?true:false);
        setUpvote(postData?.upvotes?.[localStorage.getItem("userId")]?true:false);
        setUpvoteNumber(postData?.upvotes?Object.keys(postData.upvotes).length:0);
        setDownvote(postData?.downvotes?.[localStorage.getItem("userId")]?true:false);
        setDownvoteNumber(postData?.downvotes?Object.keys(postData.downvotes).length:0);
    },[ props.post, postData])


    const bookmarkHandler = ()=>{

        const bookmarkUserId = {
            [localStorage.getItem("userId")]: true
        }
        
        if(!bookmark){
            setBookmark(true);
            fetch(`https://karkade-development-default-rtdb.firebaseio.com/posts/${props.post.id}/bookmarks.json`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bookmarkUserId),
            })
        }else{
            setBookmark(false);
            fetch(`https://karkade-development-default-rtdb.firebaseio.com/posts/${props.post.id}/bookmarks/${localStorage.getItem("userId")}.json`, {
                method: "DELETE"
            })
        }
    }

    const upvoteHandler = ()=>{
        const upvotePostId = {
            [localStorage.getItem("userId")]: true
        }
        if(!upvote){
            setUpvote(true);
            setUpvoteNumber(prev=>prev+1);
            fetch(`https://karkade-development-default-rtdb.firebaseio.com/posts/${props.post.id}/upvotes.json`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(upvotePostId),
            })
            if(downvote){
                setDownvote(false);
                setDownvoteNumber(prev=>prev-1);
                fetch(`https://karkade-development-default-rtdb.firebaseio.com/posts/${props.post.id}/downvotes/${localStorage.getItem("userId")}.json`, {
                    method: "DELETE"
                })
            }
        }else{
            setUpvote(false);
            setUpvoteNumber(prev=>prev-1);
            fetch(`https://karkade-development-default-rtdb.firebaseio.com/posts/${props.post.id}/upvotes/${localStorage.getItem("userId")}.json`, {
                method: "DELETE"
            })
            
        }
        
    }

    const downvoteHandler = ()=>{
        const downvotePostId = {
            [localStorage.getItem("userId")]: true
        }
        if(!downvote){
            setDownvote(true);
            setDownvoteNumber(prev=>prev+1);
            fetch(`https://karkade-development-default-rtdb.firebaseio.com/posts/${props.post.id}/downvotes.json`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(downvotePostId),
            })
            if(upvote){
                setUpvote(false);
                setUpvoteNumber(prev=>prev-1);
                fetch(`https://karkade-development-default-rtdb.firebaseio.com/posts/${props.post.id}/upvotes/${localStorage.getItem("userId")}.json`, {
                    method: "DELETE"
                })
            }
        }else{
            setDownvote(false);
            setDownvoteNumber(prev=>prev-1);
            fetch(`https://karkade-development-default-rtdb.firebaseio.com/posts/${props.post.id}/downvotes/${localStorage.getItem("userId")}.json`, {
                method: "DELETE"
            })
            
        }
        
    }

    const deletePost = ()=>{
        const deletePost = window.confirm("Are you sure you want to delete this post?");
        if(deletePost){
            fetch(`https://karkade-development-default-rtdb.firebaseio.com/posts/${props.post.id}.json`, {
                method: "DELETE"
            }).then(()=>{
                fetch(`https://karkade-development-default-rtdb.firebaseio.com/users/${localStorage.getItem("userId")}/posts/${props.post.id}.json`, {
                    method: "DELETE"
                }).then(()=>{
                    window.location.reload();
                })
            })
        }
    }

    const userProfileData = useFetchById(
        `https://karkade-development-default-rtdb.firebaseio.com/users/${props.post.authorId}.json`
      );
    return ( <div className="home-post">
                <div className="post-text-content">
                    <div className="original-poster-section">
                        <Link to={`/Profile/${props.post.authorId}`}>
                            {!userProfileData.data && <img src={profileImage} alt="profile_pic"/>}
                            {userProfileData.data && <img src={userProfileData.data.imageUrl?userProfileData.data.imageUrl:profileImage} alt="profile_pic"/>}
                        </Link>
                        <div className="original-poster-info-section">

                            <Link className="original-poster-name noselect" to={`/Profile/${props.post.authorId}`}>
                                {!userProfileData.data && "Loading..."}
                                {userProfileData.data && userProfileData.data.username}
                            </Link>
                            <Link className="original-poster-time" to={`/posts/${props.post.id}`}>{props.post.date}</Link>
                        </div>
                        <div className="bookmark noselect" onClick={bookmarkHandler}>
                            {!bookmark&&<BsBookmark  className="post-icon noselect" size={smallIconSize?15:20}/>}
                            {bookmark&&<BsFillBookmarkCheckFill  className="post-icon noselect" size={smallIconSize?15:20}/>}
                        </div>
                    </div>
                    <Link className="post-title" to={`/posts/${props.post.id}`}>{props.post.title} </Link>
                    {props.post?.body?<Link to={`/posts/${props.post.id}`} className="readMore">{"(more)"}</Link>:""}
                </div>
                
                <Link className="post-image-holder" to={`/posts/${props.post.id}`}>
                    {/* {props.image?<img alt="pic" src={props.image} />:""} */}
                    {props.post.imageUrl&&<img alt="pic" src={props.post.imageUrl} />}
                </Link>
                <div className="post-status-and-delete">
                    <div className="post-status">
                        <div className="post-status-item" onClick={upvoteHandler} style={{color:upvote?"#09f":"var(--dropdownMenuColor)"}}>
                            <BiUpvote className="post-icon" size={smallIconSize?15:20}/>
                            <p>{upvoteNumber}</p>
                        </div>
                        <div className="post-status-item" onClick={downvoteHandler} style={{color:downvote?"#09f":"var(--dropdownMenuColor)"}}>
                            <BiDownvote className="post-icon" size={smallIconSize?15:20}/>
                            <p>{downvoteNumber}</p>
                        </div>
                        <div className="post-status-item">
                            <BiComment className="post-icon" size={smallIconSize?15:20}/>
                            {props?.post?.comments?<p>{Object.keys(props.post?.comments).length}</p>:<p>{"0"}</p>}
                        </div>
                    </div>
                    <div className="post-status-item" >
                        {props.post.authorId===localStorage.getItem("userId")?
                        <AiOutlineDelete className="post-icon" onClick={deletePost} size={smallIconSize?15:20}/>:""}
                    </div>
                </div>
    </div> );
}
 
export default Post;