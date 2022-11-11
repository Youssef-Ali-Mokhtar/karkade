import { BiComment, BiUpvote, BiDownvote} from "react-icons/bi";
import {BsBookmark} from "react-icons/bs";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import profileImage from "../../../assets/empty-avatar.jpg";

const Post = (props) => {

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

    return ( <div className="home-post">
                <div className="post-text-content">
                    <div className="original-poster-section">
                        <Link to={`/karkade/Profile/${props.post.authorId}`}><img alt="pic" src={props.post.authorImageUrl?props.post.authorImageUrl:profileImage} /></Link>
                        <div className="original-poster-info-section">
                        
                            <Link className="original-poster-name" to={`/karkade/Profile/${props.post.authorId}`}>{props.post.author}</Link>
                            <Link className="original-poster-time" to={`/karkade/posts/${props.post.id}`}>{props.post.date}</Link>
                        </div>
                        <div className="bookmark">
                            <BsBookmark className="post-icon" size={smallIconSize?15:20}/>
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