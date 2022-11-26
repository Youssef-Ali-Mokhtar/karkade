import { useRef } from "react";

const PostComment = (props) => {
    const comment = useRef();
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    console.log();
    const addCommentHandler=()=>{
        if(!comment.current.value){
            return;
        }

        const d = new Date();
        let minute = d.getMinutes().toString();
        let hour = d.getHours().toString();
        let day = d.getDate().toString();
        let month = d.getMonth().toString();
        let year = d.getFullYear().toString();
        const postId = Date.now();

        console.log(comment.current.value);
        const commentPost = {
            comment: comment.current.value,
            commentorId: localStorage.getItem("userId"),
            date: `${hour.length===1?`0${hour}`:hour}:${minute.length===1?`0${minute}`:minute} . ${day} ${months[month]} ${year}`
        }
        fetch(`https://karkade-development-default-rtdb.firebaseio.com/posts/${props.postId}/comments/${postId}.json`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(commentPost),
        }).then(()=>{
            window.location.reload();
        })
        comment.current.value="";
    }

    return ( <div className="post-comment">
        
        <form>
            <div className="image-and-form-wrapper">
                <img alt="pic" src={props.userData.imageUrl} />
                <textarea ref={comment} type="text" maxLength={500}/>
            </div>
                
            <button onClick={(e)=>{e.preventDefault(); addCommentHandler();}}>Add comment</button>
        </form>
    </div> );
}
 
export default PostComment;