import useFetchById from "../../useFetchById";
import profileImage from "../../../assets/empty-avatar.jpg";
import { Link } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
const Comment = (props) => {
    const {data: commentorData} = useFetchById(
        `https://karkade-development-default-rtdb.firebaseio.com/users/${props.comment.commentorId}.json`
      );

    const deleteComment = ()=>{
        const deleteComment = window.confirm("Are you sure you want to delete this comment?");
        if(deleteComment){
            fetch(`https://karkade-development-default-rtdb.firebaseio.com/posts/${props.postId}/comments/${props.comment.commentId}.json`, {
                method: "DELETE"
            }).then(()=>{
                fetch(`https://karkade-development-default-rtdb.firebaseio.com/users/${props.comment.postPoster}/notifications/${props.comment.commentId+"n"}.json`, {
                    method: "DELETE"
                }).then(()=>{
                     window.location.reload();
                })
            })
        }
    }

    return ( <div className="comment">
        {!commentorData&&<img alt="pic" src={profileImage} />}
        {commentorData&&
            <Link to={`/Profile/${props.comment.commentorId}`}>
                <img alt="pic" src={commentorData?.imageUrl} />
            </Link>}
        <div className="comment-text-wrapper">
            <div className="comment-author-and-delete">
                <Link to={`/Profile/${props.comment.commentorId}`}>
                    <p className="comment-author">{commentorData?.username} 
                        <br/> 
                        <span className="comment-date">{props.comment.date}</span>
                    </p>
                </Link>
                <div className="post-status-item" >
                            {props.comment.commentorId===localStorage.getItem("userId")?
                            <AiOutlineDelete className="post-icon" onClick={deleteComment} size={20}/>:""}
                </div>
            </div>
            <p className="comment-text">{props.comment.comment}</p>
        </div>
    </div> );
}
 
export default Comment;