import useFetchById from "../../useFetchById";
import profileImage from "../../../assets/empty-avatar.jpg";
import { Link } from "react-router-dom";
const Comment = (props) => {

    const {data: commentorData} = useFetchById(
        `https://karkade-development-default-rtdb.firebaseio.com/users/${props.comment.commentorId}.json`
      );

    return ( <div className="comment">
        {!commentorData&&<img alt="pic" src={profileImage} />}
        {commentorData&&
            <Link to={`/Profile/${props.comment.commentorId}`}>
                <img alt="pic" src={commentorData?.imageUrl} />
            </Link>}
        <div className="comment-text-wrapper">
            <Link to={`/Profile/${props.comment.commentorId}`}><p className="comment-author">{commentorData?.username} <br/> <span className="comment-date">{props.comment.date}</span></p></Link>
            <p className="comment-text">{props.comment.comment}</p>
        </div>
    </div> );
}
 
export default Comment;