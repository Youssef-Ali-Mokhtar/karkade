const Comment = (props) => {
    return ( <div className="comment">
        <img alt="pic" src={"https://i.imgur.com/3hWUzZr.jpg"} />
        <div className="comment-text-wrapper">
            <p className="comment-author">{"Youssef Ali Mokhtar"} . {"28 Sep 21"}</p>
            <p className="comment-text">{props.comment}</p>
        </div>
    </div> );
}
 
export default Comment;