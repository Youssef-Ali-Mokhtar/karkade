import { BiComment, BiUpvote, BiDownvote} from "react-icons/bi";
import {BsBookmark, BsFillBookmarkCheckFill} from "react-icons/bs";
import { useState, useEffect } from "react";
import profileImage from "../../../assets/empty-avatar.jpg";
import { Link } from "react-router-dom";
import useFetchById from "../../useFetchById";
import PostComment from "./PostComment";
import CommentsList from "./CommentsList";
import { AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const PostDetailsBody = (props) => {
    const [smallIconSize, setSmallIconSize] = useState();
    const [bookmark, setBookmark] = useState(false);
    const [upvote, setUpvote] = useState(false);
    const [upvoteNumber, setUpvoteNumber] = useState(0);
    const [downvote, setDownvote] = useState(false);
    const [downvoteNumber, setDownvoteNumber] = useState(0);

    const navigate = useNavigate();
    // const {data: currentUserData} = useFetchById(
    //     `https://karkade-development-default-rtdb.firebaseio.com/users/${localStorage.getItem("userId")}.json`
    //   );

    useEffect(()=>{
        setBookmark(props.data?.bookmarks?.[props.postId]?true:false);
        setUpvote(props.data?.upvotes?.[localStorage.getItem("userId")]?true:false);
        setUpvoteNumber(props.data?.upvotes?Object.keys(props.data.upvotes).length:0);
        setDownvote(props.data?.downvotes?.[localStorage.getItem("userId")]?true:false);
        setDownvoteNumber(props.data?.downvotes?Object.keys(props.data.downvotes).length:0);
    },[props])

    const bookmarkHandler = ()=>{

        const bookmarkUserId = {
            [localStorage.getItem("userId")]: true
        }

        if(!bookmark){
            setBookmark(true);
            fetch(`https://karkade-development-default-rtdb.firebaseio.com/posts/${props.postId}/bookmarks.json`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bookmarkUserId),
            })
        }else{
            setBookmark(false);
            fetch(`https://karkade-development-default-rtdb.firebaseio.com/posts/${props.postId}/bookmarks/${localStorage.getItem("userId")}.json`, {
                method: "DELETE"
            })
        }
    }

    const upvoteHandler = ()=>{
        const upvoteUserId = {
            [localStorage.getItem("userId")]: true
        }
        if(!upvote){
            setUpvote(true);
            setUpvoteNumber(prev=>prev+1);
            fetch(`https://karkade-development-default-rtdb.firebaseio.com/posts/${props.postId}/upvotes.json`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(upvoteUserId),
            })
            if(downvote){
                setDownvote(false);
                setDownvoteNumber(prev=>prev-1);
                fetch(`https://karkade-development-default-rtdb.firebaseio.com/posts/${props.postId}/downvotes/${localStorage.getItem("userId")}.json`, {
                    method: "DELETE"
                })
            }
        }else{
            setUpvote(false);
            setUpvoteNumber(prev=>prev-1);
            fetch(`https://karkade-development-default-rtdb.firebaseio.com/posts/${props.postId}/upvotes/${localStorage.getItem("userId")}.json`, {
                method: "DELETE"
            })
            
        }
        
    }

    const downvoteHandler = ()=>{
        const downvoteUserId = {
            [localStorage.getItem("userId")]: true
        }
        if(!downvote){
            setDownvote(true);
            setDownvoteNumber(prev=>prev+1);
            fetch(`https://karkade-development-default-rtdb.firebaseio.com/posts/${props.postId}/downvotes.json`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(downvoteUserId),
            })
            if(upvote){
                setUpvote(false);
                setUpvoteNumber(prev=>prev-1);
                fetch(`https://karkade-development-default-rtdb.firebaseio.com/posts/${props.postId}/upvotes/${localStorage.getItem("userId")}.json`, {
                    method: "DELETE"
                })
            }
        }else{
            setDownvote(false);
            setDownvoteNumber(prev=>prev-1);
            fetch(`https://karkade-development-default-rtdb.firebaseio.com/posts/${props.postId}/downvotes/${localStorage.getItem("userId")}.json`, {
                method: "DELETE"
            })
            
        }
        
    }

    const deletePost = ()=>{
        const deletePost = window.confirm("Are you sure you want to delete this post?");
        if(deletePost){
            fetch(`https://karkade-development-default-rtdb.firebaseio.com/posts/${props.postId}.json`, {
                method: "DELETE"
            }).then(()=>{
                fetch(`https://karkade-development-default-rtdb.firebaseio.com/users/${localStorage.getItem("userId")}/posts/${props.postId}.json`, {
                    method: "DELETE"
                }).then(()=>{
                    navigate("/");
                    window.location.reload();
                })
            })
        }
    }

    useEffect(()=>{
        window.addEventListener("resize", (event) => {
            if (window.innerWidth <= 330) {
                setSmallIconSize(true);
            } else {
                setSmallIconSize(false);
            }
          });
    },[])

    const {data: userData} = useFetchById(`https://karkade-development-default-rtdb.firebaseio.com/users/${props.data.authorId}.json`);

    return ( <div className="post-details-body">
                <div className="post-text-content">
                    <div className="original-poster-section">
                        <Link to={`/Profile/${props.data.authorId}`}>
                            {!userData?.imageUrl && <img src={profileImage} alt="profile_pic"/>}
                            {userData?.imageUrl && <img src={userData.imageUrl?userData.imageUrl:profileImage} alt="profile_pic"/>}
                        </Link>
                        <div className="original-poster-info-section">
                            <Link to={`/Profile/${props.data.authorId}`}>
                                <p className="original-poster-name">{userData?.username}</p>
                            </Link>
                            <p className="original-poster-time">{props.data.date}</p>
                        </div>
                        <div className="bookmark noselect" onClick={bookmarkHandler}>
                            {!bookmark&&<BsBookmark  className="post-icon noselect" size={smallIconSize?15:20}/>}
                            {bookmark&&<BsFillBookmarkCheckFill  className="post-icon noselect" size={smallIconSize?15:20}/>}
                        </div>
                    </div>
                    <p className="post-details-title">{props.data.title}</p>
                    <p className="post-details-article">{props.data.body}</p>
                </div>
                {props.data.imageUrl&&<img className="post-details-pic" alt="pic" src={props.data.imageUrl} />}
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
                            {props?.data?.comments?<p>{Object.keys(props.data?.comments).length}</p>:<p>{"0"}</p>}
                        </div>
                    </div>
                    <div className="post-status-item" >
                        {props.data.authorId===localStorage.getItem("userId")?<AiOutlineDelete className="post-icon" onClick={deletePost} size={smallIconSize?15:20}/>:""}
                    </div>
                </div>
                <p className="comments-section-title">
                    {props.data?.comments?(Object.keys(props.data?.comments).length>1?
                                            `${Object.keys(props.data?.comments).length} Comments`:"1 Comment"):
                                            `0 Comments`} 
                </p>
                <div className="divider"/>
                <div className="comments-section">
                    <PostComment postId={props.postId} post={props.data} userData={props.userData}/>
                    {props.data?.comments?
                        <CommentsList comments={Object.values(props.data.comments)}  postId={props.postId}/>:
                        <p>Be the first to comment!</p>}
                </div>
    </div> );
}
 
export default PostDetailsBody;