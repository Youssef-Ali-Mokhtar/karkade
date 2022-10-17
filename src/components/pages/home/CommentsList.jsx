import Comment from "./Comment";

const CommentsList = (props) => {
    return ( <div className="comments-list">
        {props.comments.map((comment)=><Comment comment={comment} key={Math.floor(Math.random()*10000)}/>)}
    </div> );
}
 
export default CommentsList;