import Comment from "./Comment";

const CommentsList = (props) => {
    return ( <div className="comments-list">
        {props.comments.map((comment)=>
                <Comment comment={comment} key={Date.now()+Math.random()}/>
        )}
    </div> );
}
 
export default CommentsList;