import { BiComment, BiUpvote, BiDownvote} from "react-icons/bi";
import {BsBookmark} from "react-icons/bs";
import { useState, useEffect } from "react";
import profileImage from "../../../assets/empty-avatar.jpg";
import { Link } from "react-router-dom";
// import PostComment from "./PostComment";
// import CommentsList from "./CommentsList";

const PostDetailsBody = (props) => {
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

    return ( <div className="post-details-body">
                <div className="post-text-content">
                    <div className="original-poster-section">
                        <Link to={`/karkade/Profile/${props.data.authorId}`}>
                            <img alt="pic" src={props.data.authorImageUrl?props.data.authorImageUrl:profileImage} />
                        </Link>
                        <div className="original-poster-info-section">
                            <Link to={`/karkade/Profile/${props.data.authorId}`}>
                                <p className="original-poster-name">{props.data.author}</p>
                            </Link>
                            <p className="original-poster-time">{props.data.date}</p>
                        </div>
                        <div className="bookmark">
                            <BsBookmark className="post-icon" size={smallIconSize?15:20}/>
                        </div>
                    </div>
                    <p className="post-details-title">{props.data.title}</p>
                </div>
                {props.data.imageUrl&&<img className="post-details-pic" alt="pic" src={props.data.imageUrl} />}
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
                {/* <p className="comments-section-title">{props.data.comments.length} Comments</p>
                <div className="divider"/>
                <div className="comments-section">
                    <PostComment/>
                    {props.data.comments.length>0?
                        <CommentsList comments={props.data.comments}/>:
                        <p>Be the first to comment!</p>}
                    
                </div> */}
    </div> );
}
 
export default PostDetailsBody;