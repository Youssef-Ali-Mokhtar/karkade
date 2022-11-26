import Comment from "./Comment";

const CommentsList = (props) => {
    return ( <div className="comments-list">
        {props.comments.map((comment)=>{
            return <Comment postId={props.postId} comment={comment} key={comment.commentId}/>}
        )}
    </div> );
}
 
export default CommentsList;