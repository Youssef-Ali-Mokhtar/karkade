import { BiComment, BiUpvote, BiDownvote} from "react-icons/bi";
import {BsBookmark} from "react-icons/bs";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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

    return ( <Link className="home-post" to={`/posts/${props.post.id}`}>
                <div className="post-text-content">
                    <div className="original-poster-section">
                        <img alt="pic" src={"https://i.imgur.com/3hWUzZr.jpg"} />
                        <div className="original-poster-info-section">
                            <p className="original-poster-name">{props.post.author}</p>
                            <p className="original-poster-time">{"28 sep 21"}</p>
                        </div>
                        <div className="bookmark">
                            <BsBookmark className="post-icon" size={smallIconSize?15:20}/>
                        </div>
                    </div>
                    <p className="post-title">{props.post.title}</p>
                </div>
                
                <div className="post-image-holder">
                    {/* {props.image?<img alt="pic" src={props.image} />:""} */}
                    {props.post.imageUrl&&<img alt="pic" src={props.post.imageUrl} />}
                </div>

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
    </Link> );
}
 
export default Post;